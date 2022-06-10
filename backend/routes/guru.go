package routes

import (
	"github.com/gin-gonic/gin"
	"mactiv/repository"
)


func GuruRoutes(route *gin.Engine){
	v1:=route.Group("/Guru")
	{
	v1.GET("/",repository.GetAll)
	v1.POST("/login/", repository.Login)
	v1.POST("/register/",repository.Register)
	}
}