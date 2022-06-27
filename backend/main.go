package main

import (
	// "mactiv/middleware"
	"mactiv/models"
	"mactiv/repository"
	"mactiv/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// r.Use(middleware.CORSMiddleware())
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://localhost:3001"}
	config.AllowHeaders = []string{"Content-Type", "Content-Length", "accept", "Authorization", "X-CSRF-Token", "Accept-Encoding", "Cache-Control", "origin"}
	config.AllowMethods = []string{"POST", "HEAD", "PATCH", "OPTIONS", "GET", "PUT", "DELETE"}
	config.AllowCredentials = true
	r.Use(cors.New(config))
	routes.Routes(r)
	err := models.ConnectDB()
	repository.CheckErr(err)
	r.Run()

}
