package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Mata_pelajaran struct {
	Kode_kelas int    `json:"kode_kelas"`
	Nama_kelas string `json:"nama_kelas"`
}

func AddMapel(newMapel Mata_pelajaran) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO mata_pelajaran (kode_kelas, nama_kelas) VALUES (?,?))`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newMapel.Kode_kelas, newMapel.Nama_kelas)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func SearchMapel(nama_kelas string) (Mata_pelajaran, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM mata_pelajaran WHERE nama_kelas = ?`)
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

func UpdateMapel(ourMapel Mata_pelajaran, id int) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE mata_pelajaran SET nama_kelas = ? WHERE kode_kelas = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(ourMapel.Nama_kelas, ourMapel.Kode_kelas)

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
