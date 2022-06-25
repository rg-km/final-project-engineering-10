package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)


func SubmitTugas(c *gin.Context) {
	var tugas models.Pengumpulan_tugas
	pengumpulan_id,err:=strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.SubmitTugas(tugas,pengumpulan_id)
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
	// user_id,err:=strconv.Atoi(c.Param("id_user"))
	// CheckErr(err)

	pengumpulan_id,err:=strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)
	var pengumpulan models.Pengumpulan_tugas
	
	if err := c.ShouldBindJSON(&pengumpulan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	pengumpulan_tugas,Err:=models.AddNilai(pengumpulan.Nilai,pengumpulan_id,pengumpulan.Status) 
	CheckErr(Err)
	if pengumpulan_id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		id_kumpul:=strconv.Itoa(pengumpulan_id)
		data,err:=models.GetPengumpulanTugasById(id_kumpul)
		CheckErr(err)



		temp:=models.CheckStatus(pengumpulan.Status)
		if temp {
			nilaiUlangan,err:=models.UpdateValue(mapel_id,data.Id_Siswa,"ulangan")
			CheckErr(err)
			nilaiTugas,err:=models.UpdateValue(mapel_id,data.Id_Siswa,"ulangan")
			CheckErr(err)
			nilaiKuis,err:=models.UpdateValue(mapel_id,data.Id_Siswa,"kuis")
			CheckErr(err)
			
			avg:=(nilaiUlangan.Nilai*50/100)+(nilaiKuis.Nilai*20/100)+(nilaiTugas.Nilai*30/100)

			temp,err:=models.UpdateAvg(avg,mapel_id,data.Id_Siswa)
			CheckErr(err)
			if temp {
				c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})

			}
		}


	}

}
