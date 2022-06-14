package main

import (
	"mactiv/models"
	"mactiv/repository"
	"mactiv/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
<<<<<<< HEAD
	routes.SiswaRoutes(r)
=======
	routes.GuruRoutes(r)
>>>>>>> ba9a8a0e1fe0e6b171f775d82cca6cb8116fce84
	err := models.ConnectDB()
	repository.CheckErr(err)
	r.Run()
}
