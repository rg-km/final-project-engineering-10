package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddMinat(c *gin.Context) {

	temp := c.Param("id_siswa")

	id_siswa, err := strconv.Atoi(temp)
	CheckErr(err)

	var minat models.Peminatan

	if err := c.ShouldBindJSON(&minat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.AddPeminatan(minat, id_siswa)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func GetAllMinatSiswa(c *gin.Context) {
	temp := c.Param("id_siswa")

	id_siswa, err := strconv.Atoi(temp)
	CheckErr(err)

	minat, err := models.GetAllPeminatanSiswa(id_siswa)
	CheckErr(err)
	if minat == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Kelas tidak ada"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": minat})
	}
}

func DeleteMinat(c *gin.Context) {

	id_minat, err := strconv.Atoi(c.Param("id_minat"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id"})
	}
	success, err := models.DeletePeminatan(id_minat)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}
