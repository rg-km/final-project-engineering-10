package main_test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"mactiv/models"
	"mactiv/repository"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func SetUpRouter() *gin.Engine {
	router := gin.Default()
	return router

}

func TestLogin(t *testing.T) {
	err := models.ConnectDB()
	repository.CheckErr(err)
	r := SetUpRouter()
	r.POST("/siswa/login/", repository.Login)
	siswa := models.Siswa{
		Email:    "anto@email.com",
		Password: "password",
	}
	jsonValue, _ := json.Marshal(siswa)
	req, _ := http.NewRequest("POST", "/siswa/login/", bytes.NewBuffer(jsonValue))
	w := httptest.NewRecorder()
	var siswaLogin []models.Siswa
	json.Unmarshal(w.Body.Bytes(), &siswaLogin)

	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)

	cookies := w.Result().Cookies()

	var isCookiesTokenExist bool
	for _, c := range cookies {
		if c.Name == "user_id" {
			isCookiesTokenExist = true
			break
		}
	}

	assert.Equal(t, isCookiesTokenExist, true)

}

func TestLoginGagal(t *testing.T) {
	err := models.ConnectDB()
	repository.CheckErr(err)
	r := SetUpRouter()
	r.POST("/siswa/login/", repository.Login)
	mockResponse := `{"message":"Email tidak terdaftar"}`
	siswa := models.Siswa{
		Email:    "emailsalah@email.com",
		Password: "password",
	}
	jsonValue, _ := json.Marshal(siswa)
	req, _ := http.NewRequest("POST", "/siswa/login/", bytes.NewBuffer(jsonValue))
	w := httptest.NewRecorder()
	var siswaLogin []models.Siswa
	json.Unmarshal(w.Body.Bytes(), &siswaLogin)

	r.ServeHTTP(w, req)
	responseData, _ := ioutil.ReadAll(w.Body)
	assert.Equal(t, mockResponse, string(responseData))
	assert.Equal(t, http.StatusBadRequest, w.Code)
}
