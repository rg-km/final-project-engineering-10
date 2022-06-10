package models

import (
	"database/sql"
	"mactiv/service"
	_ "github.com/mattn/go-sqlite3"
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

type Guru struct {
	Id           int    `json:"id"`
	Nama         string `json:"nama"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	Kode_sekolah string `json:"kode_sekolah"`
	Token        string `json:"token"`
}

func Login(email string, password string, id int) (Guru, error) {

	success,err:=UpdateToken(id)
	if !success {
		return Guru{},err
	}

	sqlstmt,err:= DB.Prepare("SELECT * FROM guru WHERE email = ? AND password = ?")
	if err!=nil {
		return Guru{},err
	}
	guru:=Guru{}
	rows:=sqlstmt.QueryRow(email, password).Scan(&guru.Id, &guru.Nama, &guru.Email, &guru.Password, &guru.Kode_sekolah, &guru.Token)
if rows!=nil {
	if rows==sql.ErrNoRows {
		return Guru{},nil
	}
	return Guru{}, rows

}
return guru,nil
}



func UpdateToken(id int)(bool,error){

	NewToken:=service.String(15)
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE guru SET token = ? WHERE Id = ?")
	
	if err != nil {
		return false, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(NewToken,id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func GetUser() ([]Guru, error) {
	rows, err := DB.Query(`SELECT * FROM guru`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]Guru, 0)
	for rows.Next() {
		guru := Guru{}
		err := rows.Scan(&guru.Id, &guru.Nama, &guru.Email, &guru.Password, &guru.Kode_sekolah, &guru.Token)
		if err != nil {
			return nil, err
		}
		users = append(users, guru)
	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return users, err
}
