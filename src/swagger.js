const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const apiEndpointsFiles = ['src/api-endpoints.js']

const { gameScheme, updateGameScheme } = require('./schemes/game')

const doc = {
    info: {
        version: "4.0.0",
        title: "SwitchGames API Documentation",
        description: "SwitchGames API Documentation",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            email: "contact@switchgames-api.com"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
    },
    servers: [
        {
            // dev
            url: "localhost:8080/switchgames/api/v1"
            // prod
            // url: "https://www.switch-games-api.onrender.com/switchgames/api/v1"
        }
    ],
    // dev
    host: "localhost:8080/switchgames/api/v1",
    basePath: "/",
    // prod
    // host: "switch-games-api.onrender.com",
    // basePath: "/switchgames/api/v1",
    schemes: ["http", "https"],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: "authorization",
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header'
        }
    },
    // tags: [
    //     {
    //         "name": "User",
    //         "description": "Endpoints"
    //     }
    // ],
    "@definitions": {
        AddGame: gameScheme,
        UpdateGame: updateGameScheme,
    }
}


swaggerAutogen(outputFile, apiEndpointsFiles, doc).then(() => {
    // -- For auto generating swagger_output.json file
    require('./app.js')
});