package routes

import (
	"mactiv/repository"

	"github.com/gin-gonic/gin"
)

func SiswaRoutes(route *gin.Engine) {
	v1 := route.Group("/siswa")
	{
		v1.GET("/", repository.GetAll)
		v1.POST("/login/", repository.Login)
		v1.POST("/register/", repository.Register)
		v1.GET("/list/",repository.GetAll)
		v1.GET("/email", repository.GetUserByUsername)
	}

	v2:=route.Group("/Guru")
	{
	v2.GET("/",repository.GetAllGuru)
	v2.POST("/login/", repository.GuruLogin)
	v2.POST("/register/", repository.RegisterGuru)
	}
}

