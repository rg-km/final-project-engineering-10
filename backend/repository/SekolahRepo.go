package repository

import (
	"mactiv/models"
	"net/http"

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
