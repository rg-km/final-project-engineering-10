package service

import (
	"fmt"

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"

)

type Claims struct {
	jwt.StandardClaims

}


func AuthJwt() gin.HandlerFunc {
	return func(c *gin.Context) {
		
		claims:= &Claims{}
		authHeader := c.GetHeader("Set-Cookie")
		if authHeader == "" {
			c.Writer.WriteHeader(http.StatusUnauthorized)
			return
		}
		
		tkn, err := jwt.ParseWithClaims(authHeader, claims, func(token *jwt.Token) (interface{}, error) {
			return "ueu",nil
		})

	}

}
