"/add-game": {
    "post": {
      "tags": [
        "Auth"
      ],
      "summary": "Service to add a new Nintendo Switch game",
      "description": "Service to add a new Nintendo Switch game to the library.",
      "parameters": [
        {
          "name": "game",
          "in": "body",
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "example": "The Legend of Zelda : Breath of The Wild"
              },
              "publisher": {
                "example": "Nintendo"
              },
              "players": {
                "example": "Single System (1)"
              },
              "languages": {
                "example": "German, English, Spanish, French, Italian, Japanese"
              },
              "categories": {
                "example": "Action, Adventure"
              },
              "releaseDate": {
                "example": "08/12/2017"
              },
              "ageRating": {
                "example": "PEGI 12"
              },
              "compatibleControllers": {
                "example": "Nintendo Switch Pro Controller"
              }
            }
          }
        }
      ],
      "responses": {
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "500": {
          "description": "Internal Server Error"
        }
      },
      "security": [
        {
          "bearerAuth": []
        }
      ]
    }
  }