

module.exports = {   

    getDocs: (app, port) => {

        const swaggerJsdoc = require('swagger-jsdoc');
        const swaggerUi = require('swagger-ui-express');
        port = process.env.PORT || 7474;
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'RESTful API PER ACCESSO A NEO4J',
                    description: "API endpoints for a mini blog services documented on swagger",
                    contact: {
                        name: "Armando Palermo",
                        email: "armando2007388@gmail.com",
                        url: ""
                    },
                    version: '1.0.0',
                },
                servers: [
                    {
                        url: "http://localhost:7474",
                        description: "Server locale NEO4J"
                    }
                ]
            },
            // looks for configuration in specified directories
            apis: ['./routes/*.js'],
        }
        const swaggerSpec = swaggerJsdoc(options)
        module.exports.swaggerDocs(app, port,swaggerUi,swaggerSpec);
    },

    swaggerDocs(app, port,swaggerUi,swaggerSpec) {
        // Swagger Page
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
        // Documentation in JSON format
        app.get('/docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.send(swaggerSpec)
        })
    }
}
