package main

import (
	"github.com/gin-gonic/gin"
	"mactiv/repository"
	"mactiv/routes"
	"mactiv/models"
)
	



func main (){
	r:=gin.Default()
	routes.GuruRoutes(r)
	err:=models.ConnectDB()
	repository.CheckErr(err)
	r.Run()
}