package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddMapel(c *gin.Context) {
	var mapel models.Mata_pelajaran

	if err := c.ShouldBindJSON(&mapel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.AddMapel(mapel)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func SearchMapel(c *gin.Context) {
	var mapel models.Mata_pelajaran

	if err := c.ShouldBindJSON(&mapel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	mapel, err := models.SearchMapel(mapel.Nama_kelas)
	CheckErr(err)
	if mapel.Nama_kelas == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": mapel})
	}

}


func GetAllMapel(c *gin.Context){
	mapel, err := models.GetAllMapel()
	CheckErr(err)
	if mapel == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "data tidak ditemukan"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": mapel})

	}
}

func UpdateMapel(c *gin.Context) {

	var json models.Mata_pelajaran

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	kodeKelas, err := strconv.Atoi(c.Param("id"))

	success, err := models.UpdateMapel(json,kodeKelas)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return 
	}
}

func DeleteMapel(c *gin.Context) {

	kodeKelas, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid kode_kelas"})
	}

	success, err := models.DeleteMapel(kodeKelas)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

