package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Mata_pelajaran struct {
	Kode_kelas   int    `json:"kode_kelas"`
	Nama_kelas   string `json:"nama_kelas"`
	Kode_sekolah int    `json:"kode_sekolah"`
}

func AddMapel(newMapel Mata_pelajaran, kode_sekolah int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO mata_pelajaran (kode_kelas,nama_kelas,kode_sekolah)VALUES (?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newMapel.Kode_kelas, newMapel.Nama_kelas, kode_sekolah)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetAllMapel(kode_sekolah int) ([]Mata_pelajaran, error) {
	sqlstmt:=`SELECT * FROM mata_pelajaran WHERE kode_sekolah =  ?`
	
	kelas := make([]Mata_pelajaran,0)

	rows,err:=DB.Query(sqlstmt,kode_sekolah)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next(){
		mata_pelajaran := Mata_pelajaran{}
		err:=rows.Scan(&mata_pelajaran.Kode_kelas, &mata_pelajaran.Nama_kelas,&kode_sekolah)
		if err!=nil {
			return nil,err
		}

		kelas = append(kelas, mata_pelajaran)

	}

	return kelas, nil
}

func SearchMapel(nama_kelas string) (Mata_pelajaran, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM mata_pelajaran WHERE nama_kelas =  ?`)
	if err != nil {
		return Mata_pelajaran{}, err
	}
	mata_pelajaran := Mata_pelajaran{}

	rows := sqlstmt.QueryRow(nama_kelas).Scan(&mata_pelajaran.Kode_kelas, &mata_pelajaran.Nama_kelas)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Mata_pelajaran{}, nil
		}
		return Mata_pelajaran{}, rows

	}
	return mata_pelajaran, nil
}

func UpdateMapel(ourMapel Mata_pelajaran, kode_kelas int) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE mata_pelajaran SET nama_kelas = ? WHERE kode_kelas = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(ourMapel.Nama_kelas, kode_kelas)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func DeleteMapel(kode_kelas int) (bool, error) {

	tx, err := DB.Begin()

	if err != nil {
		return false, err
	}

	stmt, err := DB.Prepare("DELETE from mata_pelajaran where kode_kelas = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(kode_kelas)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func GetMapelByID(Kode_kelas string) ([]Mata_pelajaran, error) {
	sqlstmt := `SELECT * FROM mata_pelajaran WHERE kode_kelas =  ?`
	kelas := make([]Mata_pelajaran,0)

	rows,err:=DB.Query(sqlstmt,Kode_kelas)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next(){
		mata_pelajaran := Mata_pelajaran{}
		err:=rows.Scan(&mata_pelajaran.Kode_kelas, &mata_pelajaran.Nama_kelas,&mata_pelajaran.Kode_sekolah)
		if err!=nil {
			return nil,err
		}

		kelas = append(kelas, mata_pelajaran)

	}

	return kelas, nil
	
}

// func GetSiswaById(id string) (Siswa, error) {
// 	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa WHERE id = ? `)

// }

	// if err != nil {
	// 	return Mata_pelajaran{}, err
	// }
	// siswa := Mata_pelajaran{}
	// rows := sqlstmt.QueryRow(Kode_kelas).Scan(&siswa.Kode_kelas, &siswa.Nama_kelas, &siswa.Kode_sekolah)
	// if rows != nil {
	// 	if rows == sql.ErrNoRows {
	// 		return Mata_pelajaran{}, nil
	// 	}
	// 	return Mata_pelajaran{}, rows
	// }
	// return siswa, nil

