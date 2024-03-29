package models

import (
	"database/sql"
	"fmt"
	"mactiv/service"
	"strconv"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var DB *sql.DB

func ConnectDB() error {
	db, err := sql.Open("sqlite3", "./models/database/mactiv")
	if err != nil {
		return err
	}
	DB = db
	return nil
}

type Siswa struct {
	Id           int    `json:"id"`
	Nama         string `json:"nama"`
	Email        string `json:"email"`
	Password     string `json:"password,omitempty"`
	Credit_score string `json:"credit_score"`
	Kode_sekolah string `json:"kode_sekolah"`
	Token        string `json:"token,omitempty"`
	Rata_rata    *string `json:"rata_rata,omitempty"`
}

type SiswaProfile struct {
	Id           int    `json:"id"`
	Nama         string `json:"nama"`
	Email        string `json:"email"`
	Kode_sekolah string `json:"kode_sekolah"`
	Credit_score string `json:"credit_score"`
}

type RequestError struct {
	StatusCode int

	Err string
}

func (r *RequestError) Error() string {
	return fmt.Sprintf("err %v", r.Err)
}

func errorNoCode() error {
	return &RequestError{
		StatusCode: 400,
		Err:"Kode sekolah tidak ditemukan",
	}
}






func Login(email string, password string) (Siswa, error) {
	siswa := Siswa{}

	user, err := GetSiswaByEmail(email)
	if err != nil {

		return Siswa{}, err
	}

	temp := CheckPasswordHash(password, user.Password)
	if !temp {
		return Siswa{}, err
	}

	sqlstmt, err := DB.Prepare("SELECT * FROM siswa WHERE email = ? AND password = ?")
	if err != nil {
		return Siswa{}, err
	}
	rows := sqlstmt.QueryRow(email, user.Password).Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Kode_sekolah, &siswa.Token)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Siswa{}, nil
		}
		return Siswa{}, rows

	}
	return siswa, nil
}

func Register(newSiswa Siswa) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}
	pwSlice, err := bcrypt.GenerateFromPassword([]byte(newSiswa.Password), 14)
	if err != nil {
		return false, err
	}

	newSiswa.Password = string(pwSlice[:])

	kode,_:=strconv.Atoi(newSiswa.Kode_sekolah)


	_,errNew:=GetSekolahByKode(kode)
	if errNew!=nil {
		return false, errorNoCode()
	}




	sqlstmt, err := tx.Prepare(`INSERT INTO siswa (nama,email,password,credit_score,kode_sekolah,token)VALUES (?,?,?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newSiswa.Nama, newSiswa.Email, newSiswa.Password, 100, newSiswa.Kode_sekolah, newSiswa.Token)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	return true, nil
}

func UpdateToken(id int) (bool, error) {

	NewToken := service.String(15)
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE siswa SET token = ? WHERE Id = ?")

	if err != nil {
		return false, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(NewToken, id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func GetUser(kode_sekolah int) ([]Siswa, error) {

	User := make([]Siswa, 0)
	sqlstmt := `SELECT * FROM siswa WHERE kode_sekolah = ? `
	Rows, err := DB.Query(sqlstmt, kode_sekolah)
	if err != nil {
		return nil, err
	}
	defer Rows.Close()
	for Rows.Next() {
		siswa := Siswa{}
		err := Rows.Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Kode_sekolah, &siswa.Token)
		if err != nil {
			return nil, err
		}
		User = append(User, siswa)

	}
	return User, nil
}

func GetSiswaByEmail(email string) (Siswa, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa WHERE email = ? `)
	if err != nil {
		return Siswa{}, err
	}
	siswa := Siswa{}
	rows := sqlstmt.QueryRow(email).Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Kode_sekolah, &siswa.Token)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Siswa{}, nil
		}
		return Siswa{}, rows

	}
	return siswa, nil
}

func GetSiswaById(id string) (Siswa, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa WHERE id = ? `)
	if err != nil {
		return Siswa{}, err
	}
	siswa := Siswa{}
	rows := sqlstmt.QueryRow(id).Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Kode_sekolah, &siswa.Token)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Siswa{}, nil
		}
		return Siswa{}, rows
	}
	return siswa, nil
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GetProfileSiswa(id int) (SiswaProfile, error) {
	sqlstmt, err := DB.Prepare(`SELECT id, nama, email, kode_sekolah, credit_score FROM siswa WHERE id = ?`)
	if err != nil {
		return SiswaProfile{}, err
	}
	siswaProfile := SiswaProfile{}
	rows := sqlstmt.QueryRow(id).Scan(&siswaProfile.Id, &siswaProfile.Nama, &siswaProfile.Email, &siswaProfile.Kode_sekolah, &siswaProfile.Credit_score)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return SiswaProfile{}, nil
		}
		return SiswaProfile{}, rows

	}
	return siswaProfile, nil
}