package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Tugas struct {
	Id_tugas  int    `json:"id"`
	Judul     string `json:"judul"`
	Deskripsi string `json:"deskripsi"`
	Tipe      string `json:"tipe"`
	Id_Mapel  int    `json:"id_mata_pelajaran"`
}


func AddTugas(newTugas Tugas) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO tugas (judul,deskripsi,tipe,id_mata_pelajaran)VALUES (?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newTugas.Judul, newTugas.Deskripsi, newTugas.Tipe, newTugas.Id_Mapel)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetAllTugas() ([]Tugas, error) {
	rows, err := DB.Query(`SELECT * FROM tugas`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	Mapel := make([]Tugas, 0)
	for rows.Next() {
		mapel := Tugas{}
		err := rows.Scan(&mapel.Id_tugas, &mapel.Judul, &mapel.Deskripsi, &mapel.Tipe, &mapel.Id_Mapel)
		if err != nil {
			return nil, err
		}
		Mapel = append(Mapel, mapel)
	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return Mapel, err
}

func SearchTugas(nama_kelas string) (Tugas, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM tugas WHERE judul =  ?`)
	if err != nil {
		return Tugas{}, err
	}
	tugas := Tugas{}

	rows := sqlstmt.QueryRow(nama_kelas).Scan(&tugas.Id_tugas, &tugas.Judul, &tugas.Deskripsi, &tugas.Tipe, &tugas.Id_Mapel)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Tugas{}, nil
		}
		return Tugas{}, rows

	}
	return tugas, nil
}

func UpdateTugas(task Tugas) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE tugas SET judul = ?, deskripsi = ?, tipe = ?, id_mata_pelajaran = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(task.Judul, task.Deskripsi, task.Tipe, task.Id_Mapel, task.Id_tugas)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func DeleteTugas(id int) (bool, error) {

	tx, err := DB.Begin()

	if err != nil {
		return false, err
	}

	stmt, err := DB.Prepare("DELETE from tugas where id = ?")

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


func GetTugasById(id int )(Tugas ,error){
	sqlstmt, err := DB.Prepare(`SELECT * FROM tugas WHERE id =  ?`)
	if err != nil {
		return Tugas{}, err
	}
	tugas := Tugas{}

	rows := sqlstmt.QueryRow(id).Scan(&tugas.Id_tugas, &tugas.Judul, &tugas.Deskripsi, &tugas.Tipe, &tugas.Id_Mapel)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Tugas{}, nil
		}
		return Tugas{}, rows

	}
	return tugas, nil

}





