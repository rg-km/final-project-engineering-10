package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddCreditScore(c *gin.Context) {
	var credit models.Credit_score

	if err := c.ShouldBindJSON(&credit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	temp := c.Param("id_siswa")
	user_id, err := strconv.Atoi(temp)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

	}
	success, err := models.AddCreditScore(credit, user_id)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

// func GetCreditScoreByUserId(c *gin.Context){
// 	var credit models.Credit_score

// 	if err:=c.ShouldBindJSON(&credit);err!=nil {
// 		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
// 		return
// 	}

// 	temp,err:=c.Cookie("user_id")
// 	if err==http.ErrNoCookie {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 	}
// 	user_id,err:=strconv.Atoi(temp)
// 	if err!=nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

// 	}

// 	user,err:=models.GetCreditScoreByIdSiswa(user_id)
// 	CheckErr(err)
// 	if user.Id==0 {
// 		c.JSON(http.StatusBadRequest,gin.H{"message": "Data Salah, Silahkan Masukkan ulang"})
// 	}else{
// 		c.JSON(http.StatusOK,gin.H{"data":user})
// 	}

// }

func GetCreditScoreByIdSiswa(c *gin.Context) {

	siswaId, err := strconv.Atoi(c.Param("id_siswa"))

	CheckErr(err)
	user, err := models.GetCreditScoreByIdSiswa(siswaId)
	CheckErr(err)
	if user == nil {
		c.JSON(http.StatusOK, gin.H{"message": "Data Credit Score Kosong"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": user})
	}

}

func GetCreditScoreById(c *gin.Context) {

	var credit models.Credit_score

	if err := c.ShouldBindJSON(&credit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// credits,err:=strconv.Atoi(credit.Id_siswa)
	// CheckErr(err)
	credits, err := strconv.Atoi(c.Param("id_credit"))

	user, err := models.GetCreditScoreById(credits)
	CheckErr(err)
	if user.Id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Data Salah, Silahkan Masukkan ulang"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": user})
	}

}

func UpdateStatusCredit(c *gin.Context) {
	var json models.Credit_score
	id, err := strconv.Atoi(c.Param("id_credit"))

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	success, err := models.UpdateStatusCredit(json, id)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

}

func SetBukti(c *gin.Context) {

	var json models.Credit_score

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id_credit, err := strconv.Atoi(c.Param("id_credit"))
	CheckErr(err)
	success, err := models.SetBukti(json.Bukti, id_credit)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
}

func DeleteCredit(c *gin.Context) {
	credits, err := strconv.Atoi(c.Param("id_credit"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id credit"})
	}

	success, err := models.DeleteCredit(credits)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}

}
