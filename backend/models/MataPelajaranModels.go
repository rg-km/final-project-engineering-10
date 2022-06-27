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

type Mata_pelajaran_Siswa struct {
	Kode_kelas   int    `json:"kode_kelas"`
	Nama_kelas   string `json:"nama_kelas"`
	Kode_sekolah int    `json:"kode_sekolah"`
	Rata_rata    int    `json:"rata_rata"`
}

func AddMapel(newMapel Mata_pelajaran, kode_sekolah int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO mata_pelajaran (nama_kelas,kode_sekolah)VALUES (?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newMapel.Nama_kelas, kode_sekolah)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetAllMapel(kode_sekolah int) ([]Mata_pelajaran, error) {
	sqlstmt := `SELECT * FROM mata_pelajaran WHERE kode_sekolah =  ?`

	kelas := make([]Mata_pelajaran, 0)

	rows, err := DB.Query(sqlstmt, kode_sekolah)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		mata_pelajaran := Mata_pelajaran{}
		err := rows.Scan(&mata_pelajaran.Kode_kelas, &mata_pelajaran.Nama_kelas, &kode_sekolah)
		if err != nil {
			return nil, err
		}

		kelas = append(kelas, mata_pelajaran)

	}

	return kelas, nil
}

func GetAllMapelBySiswa(id_siswa int) ([]Mata_pelajaran_Siswa, error) {
	sqlstmt := `SELECT mp.kode_kelas, mp.nama_kelas, mp.kode_sekolah, mps.rata_rata FROM mata_pelajaran mp JOIN mata_pelajaran_siswa mps ON mps.kode_kelas=mp.kode_kelas  WHERE mps.id_siswa =  ? `

	kelas := make([]Mata_pelajaran_Siswa, 0)

	rows, err := DB.Query(sqlstmt, id_siswa)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		mata_pelajaran_siswa := Mata_pelajaran_Siswa{}
		err := rows.Scan(&mata_pelajaran_siswa.Kode_kelas, &mata_pelajaran_siswa.Nama_kelas, &mata_pelajaran_siswa.Kode_sekolah, &mata_pelajaran_siswa.Rata_rata)
		if err != nil {
			return nil, err
		}

		kelas = append(kelas, mata_pelajaran_siswa)

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

func GetMapelByID(Kode_kelas string) (Mata_pelajaran, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM mata_pelajaran WHERE kode_kelas =  ?`)
	if err != nil {
		return Mata_pelajaran{}, err
	}
	user := Mata_pelajaran{}
	rows := sqlstmt.QueryRow(Kode_kelas).Scan(&user.Kode_kelas, &user.Nama_kelas, &user.Kode_sekolah)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Mata_pelajaran{}, nil
		}
		return Mata_pelajaran{}, rows

	}
	return user, nil
}

func FindMapel(kodeKelas int) (Mata_pelajaran, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM mata_pelajaran WHERE kode_kelas = ?`)
	if err != nil {
		return Mata_pelajaran{}, err
	}
	mata_pelajaran := Mata_pelajaran{}

	rows := sqlstmt.QueryRow(kodeKelas).Scan(&mata_pelajaran.Kode_kelas, &mata_pelajaran.Nama_kelas, &mata_pelajaran.Kode_sekolah)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Mata_pelajaran{}, nil
		}
		return Mata_pelajaran{}, rows

	}
	return mata_pelajaran, nil
}

func GetSiswaByMapel(kode_kelas int) ([]Siswa, error) {
	sqlstmt := `SELECT mps.id_siswa, mps.rata_rata ,s.nama ,s.email ,s.credit_score ,s.kode_sekolah 
	FROM mata_pelajaran_siswa mps 
	JOIN siswa s 
	ON mps.id_siswa =s.id  
	WHERE mps.kode_kelas =? `

	user := make([]Siswa, 0)

	rows, err := DB.Query(sqlstmt, kode_kelas)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		User := Siswa{}
		err := rows.Scan(&User.Id, &User.Rata_rata, &User.Nama, &User.Email, &User.Credit_score, &User.Kode_sekolah)
		if err != nil {
			return nil, err
		}

		user = append(user, User)

	}

	return user, nil

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
