package models

import (
	"database/sql"
	"strconv"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

type Pengumpulan_tugas struct {
	Id               int     `json:"id"`
	Link_pengumpulan string  `json:"link_pengumpulan"`
	Nilai            int     `json:"nilai"`
	Status           string  `json:"status"`
	Id_Siswa         int     `json:"id_siswa,omitempty"`
	Id_Mapel         int     `json:"id_mata_pelajaran,omitempty"`
	Id_tugas         int     `json:"id_tugas,omitempty"`
	Tipe_tugas       *string `json:"tipe,omitempty"`
}

type GetPengumpulan struct {
	Nama_Tugas string `json:"nama_tugas"`
	Tipe       string `json:"tipe"`
	Nilai      int    `json:"nilai"`
}

type Avg struct {
	Nilai int `json:"nilai,omitempty"`
}

func SubmitTugas(newPengumpulan Pengumpulan_tugas, id int) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`UPDATE pengumpulan_tugas SET link_pengumpulan=? ,status = ? WHERE id = ?`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newPengumpulan.Link_pengumpulan, "review", id)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil

}

func AddPengumpulan(newPengumpulan Pengumpulan_tugas) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO pengumpulan_tugas (link_pengumpulan,nilai,status,id_siswa,id_tugas,id_mata_pelajaran)VALUES (?,?,?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newPengumpulan.Link_pengumpulan, 0, newPengumpulan.Status, newPengumpulan.Id_Siswa, newPengumpulan.Id_tugas, newPengumpulan.Id_Mapel)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil

}

func AddNilai(nilai, id_pengumpulan int, status string) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE pengumpulan_tugas SET nilai = ?, status=? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()
	_, err = stmt.Exec(nilai, status, id_pengumpulan)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetPengumpulanTugasById(id string) (Pengumpulan_tugas, error) {
	sqlstmt, err := DB.Prepare(`SELECT pt.id,pt.link_pengumpulan,pt.nilai,pt.status, pt.id_siswa, t.tipe FROM pengumpulan_tugas pt JOIN tugas t ON pt.id_tugas=t.id WHERE pt.id =  ?`)
	if err != nil {
		return Pengumpulan_tugas{}, err
	}
	user := Pengumpulan_tugas{}
	rows := sqlstmt.QueryRow(id).Scan(&user.Id, &user.Link_pengumpulan, &user.Nilai, &user.Status, &user.Id_Siswa, &user.Tipe_tugas)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Pengumpulan_tugas{}, nil
		}
		return Pengumpulan_tugas{}, rows

	}
	return user, nil

}

func UpdatePengumpulan(id int, url string) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE pengumpulan_tugas SET link_pengumpulan = ?, status='dikirim' WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()
	_, err = stmt.Exec(url, id)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil

}

func GetPengumpulanByTugas(id_tugas int) ([]GetPengumpulan, error) {
	sqlstmt :=
		`SELECT nama_tugas,tipe,nilai 
	FROM pengumpulan_tugas
	INNER JOIN tugas ON pengumpulan_tugas.id_tugas=id_tugas
	WHERE id_tugas = ?`

	pengumpulan := make([]GetPengumpulan, 0)
	rows, err := DB.Query(sqlstmt, id_tugas)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		Pengumpulan := GetPengumpulan{}
		err := rows.Scan(&Pengumpulan.Nama_Tugas, &Pengumpulan.Tipe, &Pengumpulan.Nilai)
		if err != nil {
			return nil, err
		}
		pengumpulan = append(pengumpulan, Pengumpulan)
	}

	return pengumpulan, nil
}

func CheckStatus(status string) bool {
	status_str := strings.ToLower(status)

	if status_str == "selesai" || status_str == "gagal" {
		return true
	}

	return false
}

// func UpdateValue(id_mata_pelajaran,id_siswa int, tipe string) (int){

// sqlstmt,err:= DB.Prepare(`SELECT AVG(nilai)
// FROM pengumpulan_tugas
// INNER JOIN tugas ON pengumpulan_tugas.id_tugas= tugas.id
// WHERE pengumpulan_tugas.id_mata_pelajaran = ? AND tugas.tipe = ? AND id_siswa =?`)

// if err!=nil {
// 	return Avg{},err
// }
// Average:=Avg{}

// rows:=sqlstmt.QueryRow(id_mata_pelajaran,tipe,id_siswa).Scan(&Average.Nilai)

// if rows != nil {
// 	if rows == sql.ErrNoRows {
// 		return Avg{}, nil
// 	}
// 	return Avg{}, rows

// }
// return Avg{}, nil

// }

func UpdateValue(id_mata_pelajaran, id_siswa int, tipe string) float64 {

	var avg sql.NullString

	err := DB.QueryRow(`SELECT AVG(nilai)   
FROM pengumpulan_tugas
INNER JOIN tugas ON pengumpulan_tugas.id_tugas= tugas.id 
WHERE pengumpulan_tugas.id_mata_pelajaran = ? AND tugas.tipe = ? AND id_siswa =?`, id_mata_pelajaran, tipe, id_siswa).Scan(&avg)
	if err != nil {
		panic(err)
	}

	avgInt, err := strconv.ParseFloat(avg.String, 32)
	return avgInt
}

func AvgSekolah(kode_sekolah int) float64 {
	var avg sql.NullString

	err := DB.QueryRow(`
	SELECT AVG(mps.rata_rata )
	FROM mata_pelajaran_siswa mps 
	JOIN mata_pelajaran mp 
	ON mps.kode_kelas = mp.kode_kelas 
	WHERE mp.kode_sekolah =?`, kode_sekolah).Scan(&avg)
	if err != nil {
		panic(err)
	}

	avgInt, err := strconv.ParseFloat(avg.String, 32)
	return avgInt
}

func AvgByIdSiswa(id_siswa int) float64 {
	var avg sql.NullString

	err := DB.QueryRow(`
	SELECT AVG(rata_rata)  
	FROM mata_pelajaran_siswa mps
	WHERE id_siswa = ?`, id_siswa).Scan(&avg)
	if err != nil {
		panic(err)
	}

	avgInt, err := strconv.ParseFloat(avg.String, 32)
	return avgInt

}

func AvgByMapel(id_mapel int) float64 {
	var avg sql.NullString

	err := DB.QueryRow(`
	SELECT AVG(rata_rata)  
	FROM mata_pelajaran_siswa mps
	WHERE kode_kelas  = ?`, id_mapel).Scan(&avg)
	if err != nil {
		panic(err)
	}

	avgInt, err := strconv.ParseFloat(avg.String, 32)
	return avgInt
}

func AvgByMapelAndSiswa(id_mapel, id_siswa int) float64 {
	var avg sql.NullString

	err := DB.QueryRow(`
	
	SELECT AVG(rata_rata)  
	FROM mata_pelajaran_siswa mps
	WHERE kode_kelas  = ? AND id_siswa =?`, id_mapel, id_siswa).Scan(&avg)
	if err != nil {
		panic(err)
	}

	avgInt, err := strconv.ParseFloat(avg.String, 32)
	return avgInt
}

func UpdateAvg(nilai, kode_kelas, id_siswa int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE mata_pelajaran_siswa SET rata_rata = ? WHERE id_siswa = ? AND kode_kelas=?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()
	_, err = stmt.Exec(nilai, id_siswa, kode_kelas)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func CreatePengumpulan(newPengumpulan Pengumpulan_tugas) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO pengumpulan_tugas (link_pengumpulan,nilai,status,id_siswa,id_tugas,id_mata_pelajaran)VALUES (?,?,?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newPengumpulan.Link_pengumpulan, 0, "review", newPengumpulan.Id_Siswa, newPengumpulan.Id_tugas, newPengumpulan.Id_Mapel)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil

}
