package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SubmitTugas(c *gin.Context) {
	var tugas models.Pengumpulan_tugas
	pengumpulan_id, err := strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)

	if err := c.ShouldBindJSON(&tugas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	success, err := models.SubmitTugas(tugas, pengumpulan_id)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func GetPengumpulanTugasById(c *gin.Context) {
	pengumpulan_id := c.Param("id_pengumpulan")

	pengumpulan_tugas, Err := models.GetPengumpulanTugasById(pengumpulan_id)
	CheckErr(Err)
	if pengumpulan_tugas.Id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": pengumpulan_id})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
	}

}

func SetNilai(c *gin.Context) {

	mapel_id, err := strconv.Atoi(c.Param("id_mapel"))
	CheckErr(err)
	user_id, err := strconv.Atoi(c.Param("id_siswa"))
	CheckErr(err)

	pengumpulan_id, err := strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)
	var pengumpulan models.Pengumpulan_tugas

	if err := c.ShouldBindJSON(&pengumpulan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	pengumpulan_tugas, Err := models.AddNilai(pengumpulan.Nilai, pengumpulan_id, pengumpulan.Status)
	CheckErr(Err)
	if pengumpulan_id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "test error"})
	} else {
		// id_kumpul:=strconv.Itoa(pengumpulan_id)
		// data,err:=models.GetPengumpulanTugasById(id_kumpul)
		// CheckErr(err)

		// temp:=models.CheckStatus(pengumpulan.Status)
		// 		if temp {

		// 		temp,err:=models.UpdateAvg(72,mapel_id,data.Id_Siswa)
		// 			CheckErr(err)
		// 			if temp {
		// 				c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})
		// 			}
		// 		}

		temp := models.CheckStatus(pengumpulan.Status)
		if temp {
			nilaiUlangan := models.UpdateValue(mapel_id, user_id, "ulangan")
			CheckErr(err)
			nilaiTugas := models.UpdateValue(mapel_id, user_id, "tugas")
			CheckErr(err)
			nilaiKuis := models.UpdateValue(mapel_id, user_id, "kuis")
			CheckErr(err)

			avg := (nilaiUlangan * 50 / 100) + (nilaiKuis * 20 / 100) + (nilaiTugas * 30 / 100)
			println(avg)

			avg_int := int(avg)
			temp, err := models.UpdateAvg(avg_int, mapel_id, user_id)
			CheckErr(err)
			if temp {
				c.JSON(http.StatusOK, gin.H{"data": pengumpulan_tugas})

			}
		}

	}

}

func UpdatePengumpulan(c *gin.Context) {
	var json models.Pengumpulan_tugas

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id_pengumpulan, err := strconv.Atoi(c.Param("id_pengumpulan"))
	CheckErr(err)

	success, err := models.UpdatePengumpulan(id_pengumpulan, json.Link_pengumpulan)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
}

func AvgSekolah(c *gin.Context) {
	temp, err := c.Cookie("kode_sekolah")
	CheckErr(err)
	kode_sekolah, err := strconv.Atoi(temp)
	CheckErr(err)
	avg := models.AvgSekolah(kode_sekolah)
	c.JSON(http.StatusOK, gin.H{"rata_rata": avg})

}

func AvgByIdSiswa(c *gin.Context) {
	temp := c.Param("id_siswa")
	id_siswa, err := strconv.Atoi(temp)
	CheckErr(err)
	avg := models.AvgByIdSiswa(id_siswa)
	c.JSON(http.StatusOK, gin.H{"rata_rata": avg})
}

func AvgByMapel(c *gin.Context) {
	temp := c.Param("id_mapel")
	id_mapel, err := strconv.Atoi(temp)
	CheckErr(err)
	avg := models.AvgByMapel(id_mapel)
	c.JSON(http.StatusOK, gin.H{"rata_rata": avg})
}

func AvgByMapelAndSiswa(c *gin.Context) {
	temp := c.Param("id_mapel")
	id_mapel, err := strconv.Atoi(temp)
	CheckErr(err)
	temp1 := c.Param("id_siswa")
	id_siswa, err := strconv.Atoi(temp1)

	avg := models.AvgByMapelAndSiswa(id_mapel, id_siswa)
	c.JSON(http.StatusOK, gin.H{"rata_rata": avg})
}
