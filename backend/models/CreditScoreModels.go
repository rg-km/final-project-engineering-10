package models

import (
	"database/sql"
	"mactiv/service"
	"strconv"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

type Credit_score struct {
	Id        int    `json:"id,omitempty"`
	Tipe      string `json:"tipe,omitempty"`
	Deskripsi string `json:"deskripsi,omitempty"`
	Bukti     string `json:"bukti,omitempty"`
	Status    string `json:"status,omitempty"`
	Point     int    `json:"point,omitempty"`
	Id_siswa  string `json:"id_siswa,omitempty"`
}

func GetCreditScoreByIdSiswa(user_id int) ([]Credit_score, error) {
	service.AuthJwt()
	credits := make([]Credit_score, 0)

	sqlstmt := `SELECT * FROM siswa_credit_score WHERE id_siswa = ? `
	rows, err := DB.Query(sqlstmt, user_id)
	if err != nil {
		return []Credit_score{}, err
	}
	defer rows.Close()
	for rows.Next() {
		credit := Credit_score{}
		err := rows.Scan(&credit.Id, &credit.Tipe, &credit.Deskripsi, &credit.Bukti, &credit.Status, &credit.Point, &credit.Id_siswa)
		if err != nil {
			return nil, err
		}
		credits = append(credits, credit)

	}
	err = rows.Err()

	if err != nil {
		return nil, err
	}
	return credits, nil
}

func AddCreditScore(credit Credit_score, user_id int) (bool, error) {
	service.AuthJwt()
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	sqlstmt, err := tx.Prepare(`INSERT INTO siswa_credit_score (tipe,deskripsi,sta	tus,point,id_siswa)VALUES (?,?,?,?)`)
	if err != nil {
		return false, err
	}
	defer sqlstmt.Close()
	_, Err := sqlstmt.Exec(credit.Tipe, credit.Deskripsi, credit.Status, credit.Point, user_id)
	if Err != nil {
		return false, err
	}
	tx.Commit()
	temp := credit.Status
	status := strings.ToLower(temp)
	if status == "berhasil" {
		UpdateCreditScore(credit.Point, user_id)

	}
	return true, nil
}

func GetCreditScore(user_id int) (Siswa, error) {
	sqlstmt, err := DB.Prepare(`SELECT credit_score FROM siswa WHERE id = ? `)
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

func UpdateCreditScore(credit, user_id int) (bool, error) {

	temp, err := GetCreditScore(user_id)
	OldCreds, err := strconv.Atoi(temp.Credit_score)

	NewCreds := OldCreds + credit
	if NewCreds > 100 {
		NewCreds = 100
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

func UpdateStatusCredit(newCredit Credit_score, id int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE siswa_credit_score SET status = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(newCredit.Status, id)

	if err != nil {
		return false, err
	}

	tx.Commit()
	temp := newCredit.Status
	status := strings.ToLower(temp)
	if status == "berhasil" {

		creds,err:=GetCreditScoreById(id)
		if err!=nil {
			return false,err
		}

		id_siswa,err:=strconv.Atoi(creds.Id_siswa)

		UpdateCreditScore(creds.Point, id_siswa)

	}
	return true, nil

}

func SetBukti(bukti string, id int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE siswa_credit_score SET bukti=? WHERE id=?")
	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(bukti, id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil

}

func GetCreditScoreById(id int) (Credit_score, error) {

	sqlstmt, err := DB.Prepare(`SELECT * FROM siswa_credit_score WHERE id = ? `)
	if err != nil {
		return Credit_score{}, err
	}
	credit := Credit_score{}
	rows := sqlstmt.QueryRow(id).Scan(&credit.Id, &credit.Tipe, &credit.Deskripsi, &credit.Bukti, &credit.Status, &credit.Point, &credit.Id_siswa)
	if rows != nil {
		if rows == sql.ErrNoRows {
			return Credit_score{}, nil
		}
		return Credit_score{}, rows
	}
	return credit, nil

}

func DeleteCredit(id int) (bool, error) {

	tx, err := DB.Begin()

	if err != nil {
		return false, err
	}

	credit, err := GetCreditScoreById(id)
	if err != nil {
		return false, err
	}
	if strings.ToLower(credit.Status) == "berhasil" {
		id_siswa, err := strconv.Atoi(credit.Id_siswa)
		if err != nil {
			return false, err
		}
		update, err := UpdateCreditScore(-credit.Point, id_siswa)
		if !update {
			return false, err
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
