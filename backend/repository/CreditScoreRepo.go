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
	temp,err:=c.Cookie("user_id")
	if err==http.ErrNoCookie {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	user_id,err:=strconv.Atoi(temp)
	if err!=nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

	}
	success, err := models.AddCreditScore(credit,user_id)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}


func GetCreditScoreByUserId(c *gin.Context){
	var credit models.Credit_score

	if err:=c.ShouldBindJSON(&credit);err!=nil {
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}

	temp,err:=c.Cookie("user_id")
	if err==http.ErrNoCookie {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	user_id,err:=strconv.Atoi(temp)
	if err!=nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

	}

	user,err:=models.GetCreditScoreByIdSiswa(user_id)
	CheckErr(err)
	if user.Id==0 {
		c.JSON(http.StatusBadRequest,gin.H{"message": "Data Salah, Silahkan Masukkan ulang"})
	}else{
		c.JSON(http.StatusOK,gin.H{"data":user})
	}

}



