package repository

import (
	"mactiv/models"
	"net/http"

	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllSekolah(c *gin.Context) {

	sekolah, err := models.GetAllSekolah()
	CheckErr(err)
	if sekolah == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Tidak ada sekolah"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": sekolah})
	}
}

func GetSekolahByKode(c *gin.Context) {

	kodeSekolah, err := strconv.Atoi(c.Param("kode_sekolah"))
	CheckErr(err)

	sekolah, err := models.GetSekolahByKode(kodeSekolah)
	CheckErr(err)
	if sekolah.Nama == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Tidak ada sekolah"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": sekolah})
	}
}
