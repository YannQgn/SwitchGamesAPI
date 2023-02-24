const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const apiEndpointsFiles = ['src/api-endpoints.js']

const doc = {
    info: {
        version: "3.0.0",
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
            // url: "localhost:8080/switchgames/api/v1"
            // prod
            host: "switch-games-api.onrender.com/switchgames/api/v1"
        }
    ],
    // dev
    // host: "localhost:8080/switchgames/api/v1",
    // basePath: "/",
    // prod
    host: "switch-games-api.onrender.com",
    basePath: "/switchgames/api/v1",
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
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    definitions: {
        User: {
            name: "Jhon Doe",
            age: 29,
            parents: {
                father: "Simon Doe",
                mother: "Marie Doe"
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
}

swaggerAutogen(outputFile, apiEndpointsFiles, doc).then(() => {
    // -- For auto generating swagger_output.json file
    require('./app.js')
});