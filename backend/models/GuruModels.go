package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

type Guru struct {
	Id           int    `json:"id"`
	Nama         string `json:"nama"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	Kode_sekolah string `json:"kode_sekolah"`
	Token        string `json:"token"`
}

type GuruProfile struct {
	Id           int    `json:"id"`
	Nama         string `json:"nama"`
	Email        string `json:"email"`
	Kode_sekolah string `json:"kode_sekolah"`
}

func LoginGuru(email string, password string, id int) (Guru, error) {

	user, err := GetGuruByEmail(email)
	if err != nil {
		return Guru{}, err

	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return Guru{}, err
	}

	guru := Guru{}
	sqlstmt, err := DB.Prepare("SELECT * FROM guru WHERE email = ? AND password = ?")
	if err != nil {
		return Guru{}, err
	}

	rows := sqlstmt.QueryRow(email, user.Password).Scan(&guru.Id, &guru.Nama, &guru.Email, &guru.Password, &guru.Kode_sekolah, &guru.Token)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Guru{}, nil
		}
		return Guru{}, rows

	}
	return guru, nil

}



func GetGuru(kode_sekolah int) (Guru, error) {
	sqlstmt,err:= DB.Prepare(`SELECT * FROM guru WHERE kode_sekolah = ?`)
	if err!=nil {
		return Guru{},err
	}
	guru:=Guru{}
	rows:=sqlstmt.QueryRow(kode_sekolah).Scan(&guru.Id, &guru.Nama, &guru.Email, &guru.Kode_sekolah)
if rows!=nil {
	if rows==sql.ErrNoRows {
		return Guru{},nil
	}
	return Guru{}, rows

}
return guru,nil
}

func GetGuruByEmail(email string) (Guru, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM guru WHERE email = ?`)
	if err != nil {
		return Guru{}, err
	}
	guru := Guru{}
	rows := sqlstmt.QueryRow(email).Scan(&guru.Id, &guru.Nama, &guru.Email, &guru.Password, &guru.Kode_sekolah, &guru.Token)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Guru{}, nil
		}
		return Guru{}, rows

	}
	return guru, nil
}

func RegisterGuru(NewGuru Guru) (bool, error) { //fungsi untuk testing db
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}
	pwSlice, err := bcrypt.GenerateFromPassword([]byte(NewGuru.Password), 14)
	if err != nil {
		return false, err
	}

	NewGuru.Password = string(pwSlice[:])

	sqlstmt, err := tx.Prepare(`INSERT INTO guru (nama,email,password,kode_sekolah,token)VALUES (?,?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(NewGuru.Nama, NewGuru.Email, NewGuru.Password, NewGuru.Kode_sekolah, NewGuru.Token)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func GetProfile(id int) (GuruProfile, error) {
	sqlstmt, err := DB.Prepare(`SELECT id, nama, email, kode_sekolah FROM guru WHERE id = ?`)
	if err != nil {
		return GuruProfile{}, err
	}
	guruProfile := GuruProfile{}
	rows := sqlstmt.QueryRow(id).Scan(&guruProfile.Id, &guruProfile.Nama, &guruProfile.Email, &guruProfile.Kode_sekolah)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return GuruProfile{}, nil
		}
		return GuruProfile{}, rows

	}
	return guruProfile, nil
}
