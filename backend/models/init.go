package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"

)

var DB *sql.DB

func ConnectDB()error{
	db,err:=sql.Open("sqlite3","/database/mactiv")
	if err!=nil {
		return err
	}
	DB=db
	return nil
}