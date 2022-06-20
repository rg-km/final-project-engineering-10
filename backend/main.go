package main

import (
	"mactiv/middleware"
	"mactiv/models"
	"mactiv/repository"
	"mactiv/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	routes.Routes(r)
	err := models.ConnectDB()
	repository.CheckErr(err)
	r.Run()

}
