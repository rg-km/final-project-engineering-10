package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)


func SubmitTugas(c *gin.Context) {
	var tugas models.Pengumpulan_tugas
	tugas_id,err:=strconv.Atoi(c.Param("id_tugas"))
	CheckErr(err)
	temp_user_id,err:=c.Cookie("user_id")
	CheckErr(err)
	user_id,err:=strconv.Atoi(temp_user_id)
	CheckErr(err)
	mata_pelajaran_id,err:=strconv.Atoi(c.Param("id_mapel"))
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
pengumpulan_id:=c.Param("id_pengumpulan")


pengumpulan_tugas, Err := models.GetPengumpulanTugasById(pengumpulan_id)
CheckErr(Err)
if pengumpulan_tugas.Link_pengumpulan == "" {
	c.JSON(http.StatusBadRequest, gin.H{"message": pengumpulan_id})
} else {
	c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
}



}


func SetNilai (c *gin.Context){
	
	mapel_id,err:=strconv.Atoi(c.Param("id_mapel"))
	CheckErr(err)
	user_id,err:=strconv.Atoi(c.Param("id_user"))
	CheckErr(err)

	pengumpulan_id,err:=strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)
	var pengumpulan models.Pengumpulan_tugas

	pengumpulan_tugas,Err:=models.AddNilai(pengumpulan_id,pengumpulan.Nilai,pengumpulan.Status) 
	CheckErr(Err)
	if pengumpulan_id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		temp:=models.CheckStatus(pengumpulan.Status)
		if temp {
			nilaiUlangan,err:=models.UpdateValue(mapel_id,user_id,"ulangan")
			CheckErr(err)
			nilaiTugas,err:=models.UpdateValue(mapel_id,user_id,"ulangan")
			CheckErr(err)
			nilaiKuis,err:=models.UpdateValue(mapel_id,user_id,"kuis")
			CheckErr(err)
			
			avg:=(nilaiUlangan.Nilai*50/100)+(nilaiKuis.Nilai*20/100)+(nilaiTugas.Nilai*30/100)

			temp,err:=models.UpdateAvg(avg,mapel_id,user_id)
			CheckErr(err)
			if temp {
				c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})

			}
		}


	}

}
