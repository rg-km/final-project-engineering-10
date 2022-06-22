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
	Mapel     string `json:"nama_kelas"`
}

func AddTugas(newTugas Tugas, mapel int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO tugas (judul,deskripsi,tipe,id_mata_pelajaran)VALUES (?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newTugas.Judul, newTugas.Deskripsi, newTugas.Tipe, mapel)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}
func GetAllTugas(id_mata_pelajaran int) ([]Tugas, error) {
	assignment := make([]Tugas, 0)
	sqlstmt := `SELECT * FROM TUGAS WHERE id_mata_pelajaran = ?`

	rows, err := DB.Query(sqlstmt, id_mata_pelajaran)
	if err != nil {
		return []Tugas{}, err
	}

	defer rows.Close()
	for rows.Next() {
		tugas := Tugas{}
		err := rows.Scan(&tugas.Id_tugas, &tugas.Judul, &tugas.Deskripsi, &tugas.Tipe,&tugas.Id_Mapel)
		if err != nil {
			return nil, err
		}

		assignment = append(assignment, tugas)

	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return assignment, nil
}

func GetAllTugasBySiswa(id_mata_pelajaran int, id_siswa int) ([]Tugas, error) {
	assignment := make([]Tugas, 0)
	sqlstmt := `SELECT tugas.id, tugas.judul, tugas.deskripsi, tugas.tipe, tugas.id_mata_pelajaran,mata_pelajaran.nama_kelas FROM mata_pelajaran_siswa LEFT JOIN tugas ON mata_pelajaran_siswa.kode_kelas = tugas.id_mata_pelajaran LEFT JOIN mata_pelajaran ON mata_pelajaran_siswa.kode_kelas = mata_pelajaran.kode_kelas  WHERE mata_pelajaran_siswa.id_siswa = ? AND mata_pelajaran_siswa.kode_kelas = ?`

	rows, err := DB.Query(sqlstmt, id_siswa, id_mata_pelajaran)
	if err != nil {
		return []Tugas{}, err
	}

	defer rows.Close()
	for rows.Next() {
		tugas := Tugas{}
		err := rows.Scan(&tugas.Id_tugas, &tugas.Judul, &tugas.Deskripsi, &tugas.Tipe, &tugas.Id_Mapel, &tugas.Mapel)
		if err != nil {
			return nil, err
		}

		assignment = append(assignment, tugas)

	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return assignment, nil
}

func SearchTugas(nama_kelas string, mapel int) (Tugas, error) {
	sqlstmt, err := DB.Prepare(`SELECT tugas.id, tugas.judul, tugas.deskripsi, tugas.tipe, tugas.id_mata_pelajaran, mata_pelajaran.nama_kelas FROM tugas JOIN mata_pelajaran ON tugas.id_mata_pelajaran = mata_pelajaran.kode_kelas WHERE judul =  ? AND id_mata_pelajaran = ?`)
	if err != nil {
		return Tugas{}, err
	}
	tugas := Tugas{}

	rows := sqlstmt.QueryRow(nama_kelas, mapel).Scan(&tugas.Id_tugas, &tugas.Judul, &tugas.Deskripsi, &tugas.Tipe, &tugas.Id_Mapel, &tugas.Mapel)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Tugas{}, nil
		}
		return Tugas{}, rows

	}
	return tugas, nil
}

func UpdateTugas(task Tugas, id_tugas int) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE tugas SET judul = ?, deskripsi = ?, tipe = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(task.Judul, task.Deskripsi, task.Tipe, id_tugas)
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

// func GetTugasById(id int) (Tugas, error) {
// 	sqlstmt, err := DB.Prepare(`SELECT * FROM tugas WHERE id =  ?`)
// 	if err != nil {
// 		return Tugas{}, err
// 	}
// 	tugas := Tugas{}

// 	rows := sqlstmt.QueryRow(id).Scan(&tugas.Id_tugas, &tugas.Judul, &tugas.Deskripsi, &tugas.Tipe, &tugas.Mapel)
// 	if rows != nil {
// 		if rows == sql.ErrNoRows {
// 			return Tugas{}, nil
// 		}
// 		return Tugas{}, rows

// 	}
// 	return tugas, nil

// }
