package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SubmitTugas(c *gin.Context) {
	var tugas models.Pengumpulan_tugas
	tugas_id, err := strconv.Atoi(c.Param("tugas_id"))
	CheckErr(err)
	temp_user_id, err := c.Cookie("user_id")
	CheckErr(err)
	user_id, err := strconv.Atoi(temp_user_id)
	CheckErr(err)
	mata_pelajaran_id, err := strconv.Atoi(c.Param("mata_pelajaran_id"))
	CheckErr(err)

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.SubmitTugas(tugas, tugas_id, user_id, mata_pelajaran_id)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func GetPengumpulanTugasById(c *gin.Context) {
	pengumpulan_id, err := strconv.Atoi(c.Param("id_pengumumpulan"))
	CheckErr(err)

	pengumpulan_tugas, Err := models.GetPengumpulanTugasById(pengumpulan_id)
	CheckErr(Err)
	if pengumpulan_tugas.Id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
	}

}

func SetNilai(c *gin.Context) {
	mapel_id, err := strconv.Atoi(c.Param("id_mapel"))
	CheckErr(err)
	siswa_id, err := strconv.Atoi(c.Param("id_siswa"))
	CheckErr(err)
	pengumpulan_id, err := strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)
	var pengumpulan models.Pengumpulan_tugas

	pengumpulan_tugas, Err := models.AddNilai(pengumpulan_id, pengumpulan.Nilai, pengumpulan.Status)
	CheckErr(Err)
	if pengumpulan_id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		temp:=models.CheckStatus(pengumpulan.Status)
		if temp {
			ulangan,err:=models.UpdateValue(mapel_id,siswa_id,"ulangan")
			CheckErr(err)
			tugas,err:=models.UpdateValue(mapel_id,siswa_id,"tugas")
			CheckErr(err)
			quiz,err:=models.UpdateValue(mapel_id,siswa_id,"quiz")
			CheckErr(err)
			avg:= (ulangan.Nilai*50/100)+(tugas.Nilai*30/100)+(quiz.Nilai*20/100)

			temp,err:=models.UpdateAvg(avg,mapel_id,siswa_id)
			CheckErr(err)
			if temp {
				c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
			}else {
				c.JSON(http.StatusBadRequest, gin.H{"error": err})
			}
		}


		
	}

}

func UpdatePengumpulan(c *gin.Context) {

	pengumpulan_id, err := strconv.Atoi(c.Param("id_pengumumpulan"))
	CheckErr(err)

	var pengumpulan models.Pengumpulan_tugas

	pengumpulan_tugas, Err := models.UpdatePengumpulan(pengumpulan_id, pengumpulan.Link_pengumpulan)
	CheckErr(Err)
	if pengumpulan_id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
	}

}

func GetPengumpulanByTugas(c *gin.Context) {
	temp := c.Param("id_tugas")
	tugas_id, err := strconv.Atoi(temp)
	CheckErr(err)

	pengumpulan, err := models.GetPengumpulanByTugas(tugas_id)
	CheckErr(err)
	if pengumpulan == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Kelas tidak ada"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": pengumpulan})
	}

}
