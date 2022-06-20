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
		v1.GET("/email/", repository.GetUserByUsername)
		v1.POST("/enroll/",repository.AddMapel_siswa)
		v1.DELETE("/enroll/delete/",repository.DeleteMapel_siswa)
		
	}

	v2 := route.Group("/Guru")
	{
		v2.GET("/", repository.GetAllGuru)
		v2.GET("/get-profile/", repository.GetProfile)
		v2.POST("/login/", repository.GuruLogin)
		v2.POST("/register/", repository.RegisterGuru)
		v2.PUT("/Mapel/siswa/update/", repository.UpdateMapel)

	}

	v3 := route.Group("/Mapel")
	{
		v3.POST("/create/", repository.AddMapel)
		v3.DELETE("/:id/delete/", repository.DeleteMapel)
		v3.PUT("/:id/update/", repository.UpdateMapel)
		v3.GET("/:id/show/", repository.ShowMapel)
		v3.GET("/search/", repository.SearchMapel)
		v3.GET("/list/", repository.GetAllMapel)
	}

	v4 := route.Group("/tugas")
	{
		v4.POST("/create/", repository.AddTugas)
		v4.POST("/:id/delete/", repository.DeleteTugas)
		v4.POST("/update/", repository.UpdateTugas)
		v4.GET("/search/", repository.SearchTugas)
		v4.GET("/list/", repository.GetAllTugas)
	}

}
