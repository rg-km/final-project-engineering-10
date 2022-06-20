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
		v1.GET("/list/", repository.GetAll)
		v1.GET("/:id_siswa/", repository.GetUserById)
		v1.POST("/enroll/",repository.AddMapel_siswa)
		v1.DELETE("/enroll/delete/",repository.DeleteMapel_siswa)
		v1.GET("/:id_siswa/mapel/search/", repository.SearchMapel)
		v1.GET("/:id_siswa/mapel/list/", repository.GetAllMapel)
		v1.GET("/:id_siswa/mapel/:id_mapel/",repository.GetMapelByID)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/search/", repository.SearchTugas)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/list/", repository.GetAllTugas)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/",repository.GetTugasById)
		v1.POST("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/pengumpulan/create/",repository.SubmitTugas)
		v1.GET("/:id_siswa/mapel/:id_mapel/tugas/:id_tugas/pengumpulan/:id_pengumpulan/",repository.GetPengumpulanTugasById)
			
	}


	

	// v2 := route.Group("/Guru")
	// {
	// 	v2.GET("/", repository.GetAllGuru)
	// 	v2.POST("/login/", repository.GuruLogin)
	// 	v2.POST("/register/", repository.RegisterGuru)

	// 	v3 := route.Group("/:id_Guru/mapel")
	// {
	// 	v3.POST("/create/", repository.AddMapel)
	// 	v3.DELETE("/:id/delete/", repository.DeleteMapel)
	// 	v3.PUT("/:id/update/", repository.UpdateMapel)
	// 	v3.GET("/search/", repository.SearchMapel)
	// 	v3.GET("/list/", repository.GetAllMapel)

	// 	v4 := route.Group(":id_mapel/tugas")
	// 	{
	// 		v4.POST("/create/", repository.AddTugas)
	// 		v4.POST("/:id/delete/", repository.DeleteTugas)
	// 		v4.POST("/:id/update/", repository.UpdateTugas)
	// 		v4.GET("/search/", repository.SearchTugas)
	// 		v4.GET("/list/", repository.GetAllTugas)
	// 		v4.GET("/:id/",repository.GetTugasById)

	// 		v5:= route.Group("/:id_/pengumpulan")
	// 		{
	// 			v5.GET("/list/")
	// 			v5.GET("/:id/")
	// 			v5.GET("/:id/nilai/")
	// 		}
	// 	}
	
	// }

	// }


}
