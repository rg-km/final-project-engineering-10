package repository

import (
	"mactiv/models"
	"mactiv/service"

	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func GuruLogin(c *gin.Context) {
	var user models.Guru

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := models.LoginGuru(user.Email, user.Password, user.Id)
	CheckErr(err)
	if user.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Email tidak ditemukan"})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userId:=strconv.Itoa(int(user.Id))
	kodeSekolah:=user.Kode_sekolah
	c.SetCookie("jwt", token, 604800, "/", "localhost", false, true)
	c.SetCookie("user_id", userId, 604800, "/", "localhost", false, true)
	c.SetCookie("kode_sekolah", kodeSekolah, 604800, "/", "localhost", false, true)
}



func GetAllGuru (c *gin.Context){
	temp,err:=c.Cookie("kode_sekolah")
	CheckErr(err)

	kode_sekolah,err:=strconv.Atoi(temp)
	CheckErr(err)


	if err==http.ErrNoCookie {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Silahlkan login ulang"})
		return
	}
	guru,err:=models.GetGuru(kode_sekolah)
	CheckErr(err)
	if guru==nil {
		c.JSON(http.StatusBadRequest,gin.H{"message": "data tidak ditemukan"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": guru})

	}
}

func RegisterGuru(c *gin.Context) {

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

func GetProfile(c *gin.Context) {
	service.AuthJwt()

	temp, err := c.Cookie("user_id")
	if temp == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, _ := strconv.Atoi(temp)
	guru, err := models.GetProfile(id)

	CheckErr(err)

	c.JSON(http.StatusOK, gin.H{"message": guru})

}
