package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddMapel(c *gin.Context) {
	var mapel models.Mata_pelajaran

	temp, err := c.Cookie("kode_sekolah")
	CheckErr(err)
	kode_sekolah, err := strconv.Atoi(temp)
	CheckErr(err)

	if err := c.ShouldBindJSON(&mapel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.AddMapel(mapel, kode_sekolah)
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

func GetAllMapel(c *gin.Context) {
	temp, err := c.Cookie("kode_sekolah")
	CheckErr(err)
	kode_sekolah, err := strconv.Atoi(temp)
	CheckErr(err)

	mapel, err := models.GetAllMapel(kode_sekolah)
	CheckErr(err)
	if mapel ==nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Kelas tidak ada"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": mapel})
	}
}

func UpdateMapel(c *gin.Context) {

	var json models.Mata_pelajaran

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	kodeKelas, err := strconv.Atoi(c.Param("id"))
	CheckErr(err)

	success, err := models.UpdateMapel(json, kodeKelas)

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

func GetMapelByID(c *gin.Context) {
	var mapel models.Mata_pelajaran

	kode_kelas := c.Param("id_mapel")

	mapel, Err := models.GetMapelByID(kode_kelas)
	CheckErr(Err)
	if mapel.Kode_sekolah == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": mapel})
	}

}

func ShowMapel(c *gin.Context) {

	kodeKelas, err := strconv.Atoi(c.Param("id_mapel"))
	CheckErr(err)

	mapel, err := models.FindMapel(kodeKelas)
	CheckErr(err)
	if mapel.Nama_kelas == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": mapel})
	}

}

func GetSiswaByMapel (c *gin.Context){
	id_mapel,err:=strconv.Atoi(c.Param("id_mapel"))
	CheckErr(err)

	siswa, err := models.GetSiswaByMapel(id_mapel)
	CheckErr(err)
	if siswa ==nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Kelas tidak ada"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": siswa})
	}


}
