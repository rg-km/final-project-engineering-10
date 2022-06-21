package models

import (
	"database/sql"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)



type Pengumpulan_tugas struct{
	Id 					 int	 `json:"id"`
	Link_pengumpulan     string `json:"link_pengumpulan"`
	Nilai 				 int  	`json:"nilai"`
	Status     			 string `json:"status"`
	Id_Siswa			 int 	`json:"id_siswa"`
	Id_Mapel  			 int    `json:"id_mata_pelajaran"`
	Id_tugas  			 int    `json:"id_tugas"`


}

type GetPengumpulan struct {
	Nama_Tugas		string `json:"nama_tugas"`
	Tipe			string `json:"tipe"`
	Nilai			int	`json:"nilai"`

}



type Avg struct{
	Nilai		int `json:"nilai"`

}




func SubmitTugas(newPengumpulan Pengumpulan_tugas,tugas_id ,user_id,mata_pelajaran_id int) (bool, error){

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO pengumpulan_tugas (link_pengumpulan,nilai,status,id_siswa,id_tugas,id_mata_pelajaran)VALUES (?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newPengumpulan.Link_pengumpulan,0,"review",user_id,tugas_id,mata_pelajaran_id)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil

}


func AddNilai (nilai,id_pengumpulan int, status string ) (bool,error){

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE pengumpulan_tugas SET nilai = ?, status=? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()
	_, err = stmt.Exec(nilai,status,id_pengumpulan)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetPengumpulanTugasById(id int )(Pengumpulan_tugas ,error){
	sqlstmt, err := DB.Prepare(`SELECT * FROM pengumpulan_tugas WHERE id =  ?`)
	if err != nil {
		return Pengumpulan_tugas{}, err
	}
	pengumpulanTugas := Pengumpulan_tugas{}

	rows := sqlstmt.QueryRow(id).Scan(&pengumpulanTugas.Id,&pengumpulanTugas.Link_pengumpulan,&pengumpulanTugas.Nilai)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Pengumpulan_tugas{}, nil
		}
		return Pengumpulan_tugas{}, rows

	}
	return Pengumpulan_tugas{}, nil

}


func UpdatePengumpulan (id int, url string) (bool, error){
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE pengumpulan_tugas SET link_pengumpulan = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()
	_, err = stmt.Exec(url,id)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil

}


func GetPengumpulanByTugas (id_tugas int)([]GetPengumpulan,error){
	sqlstmt:= 
	`SELECT nama_tugas,tipe,nilai 
	FROM pengumpulan_tugas
	INNER JOIN tugas ON pengumpulan_tugas.id_tugas=id_tugas
	WHERE id_tugas = ?`

	pengumpulan:= make([]GetPengumpulan,0)
	rows,err:= DB.Query(sqlstmt,id_tugas)
	if err!=nil {
		return nil,err
	}
	defer rows.Close()

	for rows.Next(){
		Pengumpulan:=GetPengumpulan{}
		err:= rows.Scan(&Pengumpulan.Nama_Tugas,&Pengumpulan.Tipe,&Pengumpulan.Nilai)
		if err!=nil {
			return nil,err
		}
		pengumpulan = append(pengumpulan, Pengumpulan)
	}

return pengumpulan,nil
}


func CheckStatus(status string)(bool){
	status_str:=strings.ToLower(status)

	if status_str == "selesai" || status_str == "gagal"{
		return true
	}

return false
}

func UpdateValue(id_mata_pelajaran,id_siswa int, tipe string) (Avg,error){


	
sqlstmt,err:= DB.Prepare(`SELECT AVG(nilai)   
FROM pengumpulan_tugas
INNER JOIN tugas ON pengumpulan_tugas.id_tugas=id_tugas
WHERE pengumpulan_tugas.id_mata_pelajaran = ? AND tugas.tipe = ? AND id_siswa =?`)

if err!=nil {
	return Avg{},err
}
Average:=Avg{}


rows:=sqlstmt.QueryRow(id_mata_pelajaran,tipe,id_siswa).Scan(&Average.Nilai)
if rows != nil {
	if rows == sql.ErrNoRows {
		return Avg{}, nil
	}
	return Avg{}, rows

}
return Avg{}, nil
	

}


func UpdateAvg(nilai,kode_kelas,id_siswa int)(bool,error){
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE mata_pelajaran_siswa SET rata_rata = ? WHERE id_siswa = ? AND kode_kelas=?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()
	_, err = stmt.Exec(nilai,id_siswa,kode_kelas)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}
