package main

import (
	"mactiv/models"
	"mactiv/repository"
	"mactiv/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routes.GuruRoutes(r)
	err := models.ConnectDB()
	repository.CheckErr(err)
	r.Run()
}
