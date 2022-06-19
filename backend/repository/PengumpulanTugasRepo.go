package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)


func SubmitTugas(c *gin.Context) {
	var tugas models.Pengumpulan_tugas
	tugas_id,err:=strconv.Atoi(c.Param("tugas_id"))
	CheckErr(err)
	temp_user_id,err:=c.Cookie("user_id")
	CheckErr(err)
	user_id,err:=strconv.Atoi(temp_user_id)
	CheckErr(err)
	mata_pelajaran_id,err:=strconv.Atoi(c.Param("mata_pelajaran_id"))
	CheckErr(err)


	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.SubmitTugas(tugas,tugas_id,user_id,mata_pelajaran_id)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}


func GetPengumpulanTugasById (c *gin.Context){
pengumpulan_id,err:=strconv.Atoi(c.Param("id_pengumumpulan"))
CheckErr(err)

var pengumpulan models.Pengumpulan_tugas

if err := c.ShouldBindJSON(&pengumpulan); err != nil {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	return
}
pengumpulan_tugas, Err := models.GetPengumpulanTugasById(pengumpulan_id)
CheckErr(Err)
if pengumpulan_tugas.Id == 0 {
	c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
} else {
	c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
}



}




func Addnilai (c *gin.Context){

}