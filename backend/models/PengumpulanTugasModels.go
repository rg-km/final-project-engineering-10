package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)



type Pengumpulan_tugas struct{
	Id 					 int	 `json:"id"`
	Link_pengumpulan     string `json:"link_pengumpulan"`
	Nilai 				 int  	`json:"nilai"`
	Status     			 string `json:"status"`
	Id_Siswa			 int 	`json:"id_siswa,omitempty"`
	Id_Mapel  			 int    `json:"id_mata_pelajaran,omitempty"`
	Id_tugas  			 int    `json:"id_tugas,omitempty"`


}

type Avg struct{
	Nilai		int `json:"nilai"`

}




func SubmitTugas(newPengumpulan Pengumpulan_tugas,tugas_id ,user_id,mata_pelajaran_id int) (bool, error){

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO pengumpulan_tugas (link_pengumpulan,nilai,status,id_siswa,id_tugas,id_mata_pelajaran)VALUES (?,?,?,?,?,?)`)
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

func GetPengumpulanTugasById(id string )(Pengumpulan_tugas ,error){
	sqlstmt, err := DB.Prepare(`SELECT id,link_pengumpulan,nilai,status FROM pengumpulan_tugas WHERE id =  ?`)
	if err!=nil {
		return Pengumpulan_tugas{},err
	}
	user:=Pengumpulan_tugas{}
	rows:=sqlstmt.QueryRow(id).Scan(&user.Id,&user.Link_pengumpulan,&user.Nilai,&user.Status)
if rows!=nil {
	if rows==sql.ErrNoRows {
		return Pengumpulan_tugas{},nil
	}
	return Pengumpulan_tugas{}, rows


}
return user,nil

}
