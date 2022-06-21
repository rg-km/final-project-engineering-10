package routes

import (
	"mactiv/repository"

	"github.com/gin-gonic/gin"
)

func Routes(route *gin.Engine) {
	v1 := route.Group("/siswa")
	{
		v1.GET("/", repository.GetAll)
		v1.POST("/login/", repository.Login)
		v1.POST("/register/", repository.Register)
		v1.GET("/:id_siswa/", repository.GetUserById)
		v1.POST("/enroll/", repository.AddMapel_siswa)
		v1.DELETE("/enroll/", repository.DeleteMapel_siswa)
		v1.GET("/:id_siswa/mapel/search/", repository.SearchMapel)
		v1.GET("/:id_siswa/mapel/", repository.GetAllMapel)
		v1.GET("/:id_siswa/mapel/:id_mapel/", repository.GetMapelByID)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/search/", repository.SearchTugas)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/", repository.GetAllTugasBySiswa)
		// v1.GET("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/",repository.GetTugasById)
		v1.POST("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/pengumpulan/", repository.SubmitTugas)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/pengumpulan/:id_pengumpulan/", repository.GetPengumpulanTugasById)

	}

	v2 := route.Group("/Guru")
	{
		v2.GET("/", repository.GetAllGuru)
		v2.GET("/get-profile/", repository.GetProfile)
		v2.POST("/login/", repository.GuruLogin)
		v2.POST("/register/", repository.RegisterGuru)
		v2.POST("/:id_Guru/mapel/", repository.AddMapel)
		v2.DELETE("/:id_Guru/mapel/:id/", repository.DeleteMapel)
		v2.PUT("/:id_Guru/mapel/:id/", repository.UpdateMapel)
		v2.GET("/:id_Guru/mapel/search/", repository.SearchMapel)
		v2.GET("/:id_Guru/mapel/", repository.GetAllMapel)
		v2.POST("/:id_Guru/mapel/list/:id_mapel/tugas/", repository.AddTugas)
		v2.DELETE("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/", repository.DeleteTugas)
		v2.PUT("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/", repository.UpdateTugas)
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/search/", repository.SearchTugas)
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/", repository.GetAllTugas)
		// v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/",repository.GetTugasById)
		v2.GET("/:id_Guru/mapel/list/:id_mapel/tugas/:id_tugas/pengumpulan/:id_pengumpulan/")

	}

}
