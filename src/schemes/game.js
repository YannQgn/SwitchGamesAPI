exports.gameScheme = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "default": "skOjftUK4qzvbdb6ivAL",
            "description": "UID of the game"
        },
        "gameName": {
            "type": "string",
            "description": "Game name.",
            "default": "The Legend of Zelda : Breath of The Wild",
            "maxLength": 80
        },
        "publisher": {
            "type": "string",
            "description": "Game publisher.",
            "default": "Nintendo",
            "maxLength": 50
        },
        "players": {
            "type": "string",
            "description": "How many players can play ?",
            "default": "Single System (1)",
            "maxLength": 30
        },
        "languages": {
            "type": "string",
            "description": "In which language the game can be played ?",
            "default": "German, English, Spanish, French, Italian, Japanese",
            "maxLength": 200
        },
        "categories": {
            "type": "string",
            "description": "What categories the game have ?",
            "default": "Action, Adventure",
            "maxLength": 200
        },
        "releaseDate": {
            "type": "string",
            "description": "Release date of the game.",
            "default": "08/12/2017",
            "maxLength": 20
        },
        "ageRating": {
            "type": "string",
            "description": "PEGI n ?",
            "default": "PEGI 12",
            "maxLength": 15
        },
        "compatibleControllers": {
            "type": "string",
            "description": "Which type of controller you can play the game with.",
            "default": "Nintendo Switch Pro Controller",
            "maxLength": 75
        }
    },
    "required": [
        "gameName",
        "publisher",
        "players",
        "languages",
        "categories",
        "releaseDate",
        "ageRating",
        "compatibleControllers"
    ],
};

exports.updateGameScheme = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "default": "skOjftUK4qzvbdb6ivAL",
            "description": "UID of the game"
        },
        "gameName": {
            "type": "string",
            "description": "Game name.",
            "default": "The Legend of Zelda : Breath of The Wild",
            "maxLength": 80
        },
        "publisher": {
            "type": "string",
            "description": "Game publisher.",
            "default": "Nintendo",
            "maxLength": 50
        },
        "players": {
            "type": "string",
            "description": "How many players can play ?",
            "default": "Single System (1)",
            "maxLength": 30
        },
        "languages": {
            "type": "string",
            "description": "In which language the game can be played ?",
            "default": "German, English, Spanish, French, Italian, Japanese",
            "maxLength": 200
        },
        "categories": {
            "type": "string",
            "description": "What categories the game have ?",
            "default": "Action, Adventure",
            "maxLength": 200
        },
        "releaseDate": {
            "type": "string",
            "description": "Release date of the game.",
            "default": "08/12/2017",
            "maxLength": 20
        },
        "ageRating": {
            "type": "string",
            "description": "PEGI n ?",
            "default": "PEGI 12",
            "maxLength": 15
        },
        "compatibleControllers": {
            "type": "string",
            "description": "Which type of controller you can play the game with.",
            "default": "Nintendo Switch Pro Controller",
            "maxLength": 75
        }
    },
    "required": [
        "gameName",
        "publisher",
        "players",
        "languages",
        "categories",
        "releaseDate",
        "ageRating",
        "compatibleControllers"
    ],
};