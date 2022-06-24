package models

import (
	_ "github.com/mattn/go-sqlite3"
)

type Peminatan struct {
	Id_minat   int    `json:"id"`
	Minat      string `json:"minat"`
	Deskripsi  string `json:"deskripsi"`
	Id_Siswa   int    `json:"id_siswa"`
	Nama_Siswa string `json:"nama_siswa"`
}

func AddPeminatan(newPeminatan Peminatan, id_siswa int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO peminatan (minat, deskripsi, id_siswa) VALUES (?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newPeminatan.Minat, newPeminatan.Deskripsi, id_siswa)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetAllPeminatanSiswa(id_siswa int) ([]Peminatan, error) {
	passion := make([]Peminatan, 0)
	sqlstmt := `SELECT peminatan.id , peminatan.minat , peminatan.deskripsi, peminatan.id_siswa , siswa.nama  FROM peminatan LEFT JOIN siswa ON peminatan.id_siswa  = siswa.id  WHERE id_siswa  =  ?`

	rows, err := DB.Query(sqlstmt, id_siswa)
	if err != nil {
		return []Peminatan{}, err
	}

	defer rows.Close()
	for rows.Next() {
		peminatan := Peminatan{}
		err := rows.Scan(&peminatan.Id_minat, &peminatan.Minat, &peminatan.Deskripsi, &peminatan.Id_Siswa, &peminatan.Nama_Siswa)
		if err != nil {
			return nil, err
		}

		passion = append(passion, peminatan)

	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return passion, nil
}

func UpdateMinat(id_minat int, minat Peminatan)(bool,error){
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE peminatan SET minat=? deskripsi = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&minat.Minat,&minat.Deskripsi,id_minat)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil



}




func DeletePeminatan(id int) (bool, error) {

	tx, err := DB.Begin()

	if err != nil {
		return false, err
	}

	stmt, err := DB.Prepare("DELETE from peminatan where id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}
