package models

import (
	"database/sql"
	"mactiv/service"

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
	Id            int    `json:"id"`
	Nama          string `json:"nama"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	Credit_score  string `json:"credit_score"`
	Catatan_minat string `json:"catatan_minat"`
	Kode_sekolah  string `json:"kode_sekolah"`
	Token         string `json:"token"`
}



func Login(email string, password string, id int) (Siswa, error) {
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
	rows := sqlstmt.QueryRow(email, user.Password).Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Catatan_minat, &siswa.Kode_sekolah, &siswa.Token)
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

	sqlstmt, err := tx.Prepare(`INSERT INTO siswa (nama,email,password,credit_score,catatan_minat,kode_sekolah,token)VALUES (?,?,?,?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(newSiswa.Nama, newSiswa.Email, newSiswa.Password, 100, "", newSiswa.Kode_sekolah, newSiswa.Token)
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

func GetUser() ([]Siswa, error) {
	rows, err := DB.Query(`SELECT * FROM siswa`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]Siswa, 0)
	for rows.Next() {
		siswa := Siswa{}
		err := rows.Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Catatan_minat, &siswa.Kode_sekolah, &siswa.Token)
		if err != nil {
			return nil, err
		}
		users = append(users, siswa)
	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return users, err
}

func GetSiswaByEmail(email string) (Siswa, error) {
	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa WHERE email = ? `)
	if err != nil {
		return Siswa{}, err
	}
	siswa := Siswa{}
	rows := sqlstmt.QueryRow(email).Scan(&siswa.Id, &siswa.Nama, &siswa.Email, &siswa.Password, &siswa.Credit_score, &siswa.Catatan_minat, &siswa.Kode_sekolah, &siswa.Token)
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

