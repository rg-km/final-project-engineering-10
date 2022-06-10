package repository

import (
	"mactiv/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CheckErr (err error){
	if err != nil {
		panic(err)
	}
}

func Register(c *gin.Context){

	var guru models.Guru

	if err:=c.ShouldBindJSON(&guru);err!=nil {
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}
	success,err:=models.Register(guru)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	}else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}


func Login (c *gin.Context){
	var user models.Guru

	if err:=c.ShouldBindJSON(&user);err!=nil {
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}
	user,err:=models.Login(user.Email,user.Password,user.Id)
	CheckErr(err)
	if user.Email=="" {
		c.JSON(http.StatusBadRequest,gin.H{"message": "Email tidak ditemukan"})
	}else{
		c.JSON(http.StatusOK,gin.H{"data":user})
	}

}

func UpdateToken(c *gin.Context){

	var json models.Guru

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	personId, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
	}

	success, err := models.UpdateToken(personId)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}



}

func GetAll (c *gin.Context){
	guru,err:=models.GetUser()
	CheckErr(err)
	if guru==nil {
		c.JSON(http.StatusBadRequest,gin.H{"message": "data tidak ditemukan"})
		return
	}else{
		c.JSON(http.StatusOK,gin.H{"message": guru})

	}
}
