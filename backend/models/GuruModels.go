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

func LoginGuru(email string, password string, id int) (Guru, error) {

	user,err:=GetGuruByEmail(email)
	if err!=nil {
			return Guru{}, err

	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return Guru{}, err
	}

	guru:=Guru{}
	sqlstmt,err:= DB.Prepare("SELECT * FROM guru WHERE email = ? AND password = ?")
	if err!=nil {
		return Guru{},err
	}

	rows:= sqlstmt.QueryRow(email,user.Password).Scan(&guru.Id,&guru.Nama,&guru.Email,&guru.Password,&guru.Kode_sekolah,&guru.Token)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Guru{}, nil
		}
		return Guru{}, rows

	}
	return guru, nil


}



func GetGuru() ([]Guru, error) {
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


func GetGuruByEmail(email string)(Guru,error){
	sqlstmt,err:= DB.Prepare(`SELECT * FROM guru WHERE email = ?`)
	if err!=nil {
		return Guru{},err
	}
	guru:=Guru{}
	rows:=sqlstmt.QueryRow(email).Scan(&guru.Id, &guru.Nama, &guru.Email, &guru.Password, &guru.Kode_sekolah, &guru.Token)
if rows!=nil {
	if rows==sql.ErrNoRows {
		return Guru{},nil
	}
	return Guru{}, rows

}
return guru,nil
}



