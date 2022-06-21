package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddTugas(c *gin.Context) {
	temp := c.Param("id_mapel")

	id_mapel, err := strconv.Atoi(temp)
	CheckErr(err)

	var tugas models.Tugas

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.AddTugas(tugas, id_mapel)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func SearchTugas(c *gin.Context) {

	temp := c.Param("id_mapel")

	id_mapel, err := strconv.Atoi(temp)
	CheckErr(err)

	var tugas models.Tugas

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	task, err := models.SearchTugas(tugas.Title, id_mapel)
	CheckErr(err)
	if task.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": task})
	}

}

func GetAllTugas(c *gin.Context) {
	temp := c.Param("id_mapel")

	id_mapel, err := strconv.Atoi(temp)
	CheckErr(err)

	task, err := models.GetAllTugas(id_mapel)
	CheckErr(err)
	if task == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "data tidak ditemukan"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": task})

	}
}

func GetAllTugasBySiswa(c *gin.Context) {
	temp1 := c.Param("id_mapel")
	temp2 := c.Param("id_siswa")

	id_mapel, err := strconv.Atoi(temp1)
	CheckErr(err)
	id_siswa, err := strconv.Atoi(temp2)
	CheckErr(err)

	task, err := models.GetAllTugasBySiswa(id_mapel, id_siswa)
	CheckErr(err)
	if task == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "data tidak ditemukan"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": task})

	}
}

func UpdateTugas(c *gin.Context) {

	var json models.Tugas
	temp := c.Param("id_tugas")

	id_tugas, err := strconv.Atoi(temp)
	CheckErr(err)

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	success, err := models.UpdateTugas(json, id_tugas)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
}

func DeleteTugas(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id_tugas"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id"})
	}

	success, err := models.DeleteTugas(id)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func ShowTugas(c *gin.Context) {

	idTugas, err := strconv.Atoi(c.Param("id_tugas"))

	tugas, err := models.FindTugas(idTugas)
	CheckErr(err)
	if tugas.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": tugas})
	}

}

// func GetTugasById(c *gin.Context) {
// 	var tugas models.Tugas

// 	temp := c.Param("id")
// 	tugas_id, err := strconv.Atoi(temp)
// 	CheckErr(err)
// 	if err := c.ShouldBindJSON(&tugas); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	tugas, Err := models.GetTugasById(tugas_id)
// 	CheckErr(Err)
// 	if tugas.Judul == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
// 	} else {
// 		c.JSON(http.StatusOK, gin.H{"data": tugas})
// 	}

// }
