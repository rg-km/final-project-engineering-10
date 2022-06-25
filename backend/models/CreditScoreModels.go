package models

import (
	"database/sql"
	"mactiv/service"
	"strconv"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

type Credit_score struct{
	Id                int    `json:"id"`
	Goals      		  string `json:"goals"`
	Deskripsi         string `json:"deskripsi"`
	Bukti      		  string `json:"bukti"`
	Status  		  string `json:"status"`
	Point  			  int    `json:"point"`
	Id_siswa  		  string `json:"id_siswa"`

}



func GetCreditScoreByIdSiswa (user_id int)(Credit_score,error){
	service.AuthJwt()
	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa_credit_score WHERE id_siswa = ? `)
	if err != nil {
		return Credit_score{}, err
	}

	credit_score := Credit_score{}
	rows := sqlstmt.QueryRow(user_id).Scan(&credit_score.Id, &credit_score.Goals, &credit_score.Deskripsi,&credit_score.Bukti,&credit_score.Status,&credit_score.Point,&credit_score.Id_siswa,)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Credit_score{}, nil
		}
		return Credit_score{}, rows

	}
	return Credit_score{}, err

}


func AddCreditScore (credit Credit_score,user_id int) (bool,error) {
	service.AuthJwt()
	tx,err:= DB.Begin()
	if err!=nil {
		return false,err
	}

	sqlstmt,err:=tx.Prepare(`INSERT INTO siswa_credit_score (goals,deskripsi,bukti,status,point,id_siswa)VALUES (?,?,?,?,?)`)
	if err!=nil {
		return false,err
	}
	defer sqlstmt.Close()
	_,Err:= sqlstmt.Exec(credit.Goals,credit.Deskripsi,credit.Bukti,credit.Status,credit.Point,credit.Id_siswa)
	if Err!=nil {
		return false,err
	}
	tx.Commit()
	temp:=credit.Status
	status:=strings.ToLower(temp)
	if status=="berhasil" {
		UpdateCreditScore(credit.Point,user_id)

	}
	return true,nil
}

func GetCreditScore(user_id int)(Siswa,error){
	sqlstmt, err := DB.Prepare(`SELECT credit_score FROM siswa WHERE id_siswa = ? `)
	if err != nil {
		return Siswa{}, err
	}
	
	siswa := Siswa{}
	rows := sqlstmt.QueryRow(user_id).Scan(&siswa.Credit_score)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Siswa{}, nil
		}
		return Siswa{}, rows

	}
	return Siswa{}, err


}



func UpdateCreditScore(credit,user_id int ) (bool,error){

	temp,err:=GetCreditScore(user_id)
	OldCreds,err:=strconv.Atoi(temp.Credit_score)

	NewCreds:= OldCreds+credit
	if NewCreds>100 {
		NewCreds= 100
	}

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE siswa SET credit_score = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(NewCreds, user_id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func UpdateStatusCredit (newCredit Credit_score,id int )(bool,error){
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE siswa SET status = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(newCredit.Status,id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil

}

func GetCreditScoreById(id int)(Credit_score,error){

	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa WHERE id = ? `)
	if err != nil {
		return Credit_score{}, err
	}
	credit := Credit_score{}
	rows := sqlstmt.QueryRow(id).Scan(&credit.Id,&credit.Goals,&credit.Deskripsi,&credit.Bukti,&credit.Status,&credit.Point,&credit.Id_siswa)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Credit_score{}, nil
		}
		return Credit_score{}, rows
	}
	return credit, nil
	
}


func DeleteCredit(id int)(bool,error){
	
	tx, err := DB.Begin()

	if err != nil {
		return false, err
	}
	
	
	credit,err:= GetCreditScoreById(id)
	if err!=nil {
		return false,err
	}
	if strings.ToLower(credit.Status)=="berhasil" {
		id_siswa,err:=strconv.Atoi(credit.Id_siswa)
		if err!=nil {
			return false,err
		}
		update,err:=UpdateCreditScore(-credit.Point,id_siswa)
		if !update {
			return false,err
		}
	}
	
	

	stmt, err := DB.Prepare("DELETE from siswa_credit_score where id = ?")

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