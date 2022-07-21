package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Sekolah struct {
	Id_sekolah     int    `json:"id"`
	Nama           string `json:"nama_sekolah"`
	Kode_sekolah   int    `json:"kode_sekolah"`
	Kepala_sekolah string `json:"kepala_sekolah"`
}

func GetAllSekolah() ([]Sekolah, error) {
	school := make([]Sekolah, 0)
	sqlstmt := `SELECT * FROM sekolah`

	rows, err := DB.Query(sqlstmt)
	if err != nil {
		return []Sekolah{}, err
	}

	defer rows.Close()
	for rows.Next() {
		sekolah := Sekolah{}
		err := rows.Scan(&sekolah.Id_sekolah, &sekolah.Nama, &sekolah.Kode_sekolah, &sekolah.Kepala_sekolah)
		if err != nil {
			return nil, err
		}

		school = append(school, sekolah)

	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return school, nil
}

func GetSekolahByKode(kodeSekolah int) (Sekolah, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM sekolah WHERE kode_sekolah = ?`)
	if err != nil {
		return Sekolah{}, err
	}
	sekolah := Sekolah{}

	rows := sqlstmt.QueryRow(kodeSekolah).Scan(&sekolah.Id_sekolah, &sekolah.Nama, &sekolah.Kode_sekolah, &sekolah.Kepala_sekolah)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Sekolah{}, sql.ErrNoRows
		}
		return Sekolah{}, rows

	}
	return sekolah, nil
}
