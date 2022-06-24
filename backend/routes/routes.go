package routes

import (
	"mactiv/repository"

	"github.com/gin-gonic/gin"
)

func Routes(route *gin.Engine) {
	v1 := route.Group("/siswa")
	{
		v1.GET("/", repository.GetAll) //v
		v1.POST("/login/", repository.Login) //v
		v1.POST("/register/", repository.Register)//v
		v1.GET("/:id_siswa/", repository.GetUserById)//v
		v1.POST("/enroll/", repository.AddMapel_siswa)//v
		v1.DELETE("/enroll/", repository.DeleteMapel_siswa)//vv
		v1.GET("/:id_siswa/mapel/search/", repository.SearchMapel)
		v1.GET("/:id_siswa/mapel/", repository.GetAllMapel) //v
		v1.GET("/:id_siswa/mapel/:id_mapel/", repository.GetMapelByID)//vv
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/search/", repository.SearchTugas)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/", repository.GetAllTugasBySiswa)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/",repository.ShowTugas)
		v1.POST("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/pengumpulan/", repository.SubmitTugas)//VV
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/pengumpulan/:id_pengumpulan/", repository.GetPengumpulanTugasById)//vv

	}

	v2 := route.Group("/Guru")
	{
		v2.GET("/", repository.GetAllGuru) //vv
		v2.GET("/get-profile/", repository.GetProfile) //vv
		v2.POST("/login/", repository.GuruLogin)//vv
		v2.POST("/register/", repository.RegisterGuru)//vv
		v2.POST("/:id_Guru/mapel/", repository.AddMapel)//v
		v2.DELETE("/:id_Guru/mapel/:id/", repository.DeleteMapel)//vv
		v2.PUT("/:id_Guru/mapel/:id/", repository.UpdateMapel) // vv
		v2.GET("/:id_Guru/mapel/search/", repository.SearchMapel)
		v2.GET("/:id_Guru/mapel/:id/show/", repository.ShowMapel)
		v2.GET("/:id_Guru/mapel/", repository.GetAllMapel)//vv
		v2.POST("/:id_Guru/mapel/list/:id_mapel/tugas/", repository.AddTugas) // vv
		v2.DELETE("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/", repository.DeleteTugas)//vv
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/", repository.ShowTugas)
		v2.PUT("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/", repository.UpdateTugas) //vv
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/search/", repository.SearchTugas)
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/", repository.GetAllTugas) //vv
		// v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/",repository.GetTugasById)
		// v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/pengumpulan/",repository.GetPengumpulanTugasById)
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/pengumpulan/:id_pengumpulan/",repository.GetPengumpulanTugasById)
		v2.PUT("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/pengumpulan/:id_pengumpulan/",repository.SetNilai)

		v2.GET("/:id_Guru/minat/:id_siswa/", repository.GetAllMinatSiswa)
		v2.POST("/:id_Guru/minat/:id_siswa/", repository.AddMinat)
		v2.DELETE("/:id_Guru/minat/:id_minat/", repository.DeleteMinat)

	}

}
