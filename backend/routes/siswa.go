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
	}
}

func GuruRoutes(route *gin.Engine){
	v1:=route.Group("/Guru")
	{
	v1.GET("/",repository.GetAllGuru)
	v1.POST("/login/", repository.GuruLogin)

	}
}