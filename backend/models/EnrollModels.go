package models

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)


type Mata_pelajaran_siswa struct {
	Id int `json:"id"`
	Rata_rata int `json:"rata_rata"`
	Kode_kelas int    `json:"kode_kelas"`
	Id_siswa string `json:"id_siswa"`
}


func AddMapel_siswa(newMapel Mata_pelajaran_siswa,id int) (bool, error) {
	tx,err:= DB.Begin()
	if err!=nil {
		return false,err
	}
	EnrollStatus,err:=CheckEnroll(id,newMapel.Kode_kelas)
	if !EnrollStatus {
		return false,fmt.Errorf("kelas sudah terdaftar atau kode kelas salah")
	}
	if err!=nil {
		return false,err
	}
	


	sqlstmt,err:=tx.Prepare(`INSERT INTO mata_pelajaran_siswa (rata_rata,kode_kelas,id_siswa)VALUES (?,?,?)`)
	if err!=nil {
		return false,err
	}
	defer sqlstmt.Close()
	_,Err:= sqlstmt.Exec(0,newMapel.Kode_kelas,id)
	if Err!=nil {
		return false,err
	}
	tx.Commit()
	return true,nil
}


func CheckEnroll(id_siswa,kode_kelas int)(bool,error){
	sqlstmt,err:= DB.Prepare(`SELECT * FROM mata_pelajaran_siswa WHERE id_siswa = ? AND kode_kelas =?`)
	if err!=nil {
		return false,err
	}
	enroll:=Mata_pelajaran_siswa{}
	rows:=sqlstmt.QueryRow(id_siswa,kode_kelas).Scan(&enroll.Id, &enroll.Rata_rata, &enroll.Id_siswa, &enroll.Kode_kelas)
	if rows!=nil {
	if rows==sql.ErrNoRows {
		return true,nil
	}
	return false, rows

}
return false,nil
}

func DeleteEnroll (user_id int ,kode_kelas int)(bool,error){
	tx, err := DB.Begin()

	if err != nil {
		return false, err
	}
	stmt, err := DB.Prepare("DELETE from mata_pelajaran_siswa where kode_kelas = ? AND id_siswa = ?")

	if err != nil {
		return false, err
	}
	defer stmt.Close()
	_, err = stmt.Exec(kode_kelas,user_id)
	if err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}



func UpdateMapel_siswa(ourMapel Mata_pelajaran_siswa) (bool, error) {

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE mata_pelajaran_siswa SET rata_rata = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(ourMapel.Rata_rata,ourMapel.Id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}