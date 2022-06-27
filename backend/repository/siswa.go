package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func CheckErr(err error) {
	if err != nil {
		panic(err)
	}
}

const (
	SecretKey = "qwe123"
)

func Register(c *gin.Context) {

	var siswa models.Siswa

	if err := c.ShouldBindJSON(&siswa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.Register(siswa)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func Login(c *gin.Context) {
	var user models.Siswa

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := models.Login(user.Email, user.Password)

	CheckErr(err)
	if user.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Email tidak terdaftar"})
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
	userId := strconv.Itoa(int(user.Id))
	kodeSekolah := user.Kode_sekolah
	c.SetCookie("jwt", token, 604800, "/", "localhost", false, true)
	c.SetCookie("user_id", userId, 604800, "/", "localhost", false, true)
	c.SetCookie("kode_sekolah", kodeSekolah, 604800, "/", "localhost", false, true)
}

func UpdateToken(c *gin.Context) {

	var json models.Siswa

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	personId, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
	}

	success, err := models.UpdateToken(personId)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}

}

func GetAll(c *gin.Context) {
	temp, err := c.Cookie("kode_sekolah")
	CheckErr(err)

	kode_sekolah, err := strconv.Atoi(temp)
	CheckErr(err)

	if err == http.ErrNoCookie {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Silahlkan login ulang"})
		return
	}
	guru, err := models.GetUser(kode_sekolah)
	CheckErr(err)
	if guru == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "data tidak ditemukan"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": guru})

	}
}

func GetUserById(c *gin.Context) {
	var user models.Siswa

	id:=c.Param("id_siswa")
	
	user, err := models.GetSiswaById(id)
	CheckErr(err)
	if user.Nama=="" {
		c.JSON(http.StatusBadRequest,gin.H{"message": "Username tidak ditemukan"})
	}else{
		c.JSON(http.StatusOK,gin.H{"data":user})
	}

}
