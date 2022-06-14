package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)



func GuruLogin (c *gin.Context){
	var user models.Guru

	if err:=c.ShouldBindJSON(&user);err!=nil {
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}
	user,err:=models.LoginGuru(user.Email,user.Password,user.Id)
	CheckErr(err)
	if user.Email=="" {
		c.JSON(http.StatusBadRequest,gin.H{"message": "Email tidak ditemukan"})
	}
	// else{
	// 	c.JSON(http.StatusOK,gin.H{"data":user})
	// }
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.SetCookie("jwt", token, 3600, "/", "localhost", false, true)
	
}


func GetAllGuru (c *gin.Context){
	guru,err:=models.GetGuru()
	CheckErr(err)
	if guru==nil {
		c.JSON(http.StatusBadRequest,gin.H{"message": "data tidak ditemukan"})
		return
	}else{
		c.JSON(http.StatusOK,gin.H{"message": guru})

	}
}


func RegisterGuru( c * gin.Context){


	var guru models.Guru

	if err := c.ShouldBindJSON(&guru); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.RegisterGuru(guru)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}

}



