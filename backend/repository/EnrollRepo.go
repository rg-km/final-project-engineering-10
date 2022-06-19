package repository

import (
	"mactiv/models"
	"mactiv/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddMapel_siswa(c *gin.Context) {
	service.AuthJwt()
	var mapel models.Mata_pelajaran_siswa

	if err := c.ShouldBindJSON(&mapel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	temp,err:=c.Cookie("user_id")
	if temp == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id,_:= strconv.Atoi(temp)
	errMessage:="kode kelas salah atau kelas telah terdaftar"
	success, err := models.AddMapel_siswa(mapel,id)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": errMessage})
	}

}



func DeleteMapel_siswa(c *gin.Context) {

	var mapel models.Mata_pelajaran_siswa

	if err := c.ShouldBindJSON(&mapel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	temp,err:=c.Cookie("user_id")


	user_id,err:= strconv.Atoi(temp)
	if err!=nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	success, err := models.DeleteEnroll(user_id, mapel.Kode_kelas)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Enrollment telah dihapus"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func UpdateMapel_siswa(c *gin.Context) {
	var json models.Mata_pelajaran_siswa

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	success, err := models.UpdateMapel_siswa(json)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return 
	}
}