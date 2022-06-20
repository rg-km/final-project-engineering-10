package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddTugas(c *gin.Context) {
	var tugas models.Tugas

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.AddTugas(tugas)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func SearchTugas(c *gin.Context) {
	var tugas models.Tugas

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	tugas, err := models.SearchTugas(tugas.Judul)
	CheckErr(err)
	if tugas.Judul == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": tugas})
	}

}

func GetAllTugas(c *gin.Context) {
	temp:= c.Param("id_mapel")

id_mapel,err:=strconv.Atoi(temp)
CheckErr(err) 

	task, err := models.GetAllTugas(id_mapel)
	CheckErr(err)
	if task.Id_tugas == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "data tidak ditemukan"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": task})

	}
}

func UpdateTugas(c *gin.Context) {

	var json models.Tugas
temp:= c.Param("id")

id_tugas,err:=strconv.Atoi(temp)
CheckErr(err) 


	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	success, err := models.UpdateTugas(json,id_tugas)

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


func GetTugasById(c *gin.Context) {
	var tugas models.Tugas

	temp:= c.Param("id")
	tugas_id,err:=strconv.Atoi(temp)
	CheckErr(err)
	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	tugas, Err := models.GetTugasById(tugas_id)
	CheckErr(Err)
	if tugas.Judul == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": tugas})
	}

}