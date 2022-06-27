package models

import (
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
