    var express = require('express');
    const apicache = require('apicache');
    var query_controller = require('./Query_Controller');
    var jsonController = require('./Json_Controller');
    
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsdoc = require('swagger-jsdoc');

    
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
          title: 'RESTful API PER ACCESSO A NEO4J',
          version: '1.0.0',
          description: 'API documentation',
        },
        servers: [
          {
            url: 'http://localhost:8000',
          },
        ],
    };

    const options = {
    swaggerDefinition,
    apis: ['index_server.js'], // Path to the API docs
    };

    const swaggerSpec = swaggerJsdoc(options);

    //Crea una nuova instanza di apicache(middelware)
    let cache = apicache.middleware;
    const app = express();
    const cors = require('cors');
    const URI = 'bolt://localhost';
    const USER = 'neo4j';
    const PASSWORD = '*** INSERISCI LA TUA PASSWORD ***';
    const neo4j = require('neo4j-driver');
    //Creazione di un'istanza del driver per la connessione al database Neo4j
    const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD),{ disableLosslessIntegers: true });
    

    //Definizione header per la gestione del CORS
    const corsOptions = {
        origin: '*',
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type, Authorization",
    };

    app.use(cors(corsOptions));


    //Abilitazione della cache per 5 minuti
    app.use(cache('5 minutes'));


      /**
     * @openapi
     * /api/flows/{ClusterToCluster}:
     *  get:
     *     tags:
     *     - Flows controller
     *     summary: Get flows from a cluster to another
     *     parameters:
     *      - in: path
     *        name: ClusterToCluster
     *        description: entities involved in the flows
     *        required: true
     *      - in: query
     *        name: timestamp
     *        description: timestamp of the entity that receives the flows
     *        required: true
     *      - in: query
     *        name: rangeTimestamp
     *        description: range timestamp of the entities that sends the flows
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.get('/api/flows/:ClusterToCluster', (req, res) => {
        const flowType = req.params.ClusterToCluster;
        const {timestamp, rangeTimestamp } = req.query;

        //Creazione di una nuova sessione del server
        const session = driver.session();

        //Definizione della query in base al tipo di richiesta(valore di type)
        let query = query_controller.getClusterToCluserFlows(flowType,timestamp,rangeTimestamp);

        //Esecuzione della query e creazione dei JSON in base al tipo di richiesta
        session.run(query)
            .then(result => {
                res.json(jsonController.getFlowsJson(flowType,result));
            })
            
            //Gestione dell'errore in caso di fallimento della query
            .catch(error => {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'An error occurred' });
            })
            .finally(() => {
                //Chiusura della sessione
                session.close();
            });
    });

    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Definizione endpoint per la richiesta delle visualizzazioni di BITVAS 
     /**
     * @openapi
     * /api/visualizations/{nomeVisual}:
     *  get:
     *     tags:
     *     - Visualization controller
     *     summary: Get a visualization by name
     *     parameters:
     *      - in: path
     *        name: nomeVisual
     *        description: The name of the Visualization
     *        required: true
     *      - in: query
     *        name: blockRef
     *        description: Block Reference
     *        required: true
     *      - in: query
     *        name: miner
     *        description: Miner Name (required only for MinerVisualization)
     *        required: false
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.get('/api/visualizations/:nomeVisual', (req, res) => {
        const { blockRef, miner } = req.query;
        const visualizationName = req.params.nomeVisual;
        //Istanza di una nuova sessione del server con il driver
        const session = driver.session();
        let query;
        //Definizione della query in base al tipo di richiesta(valore di visualizationName)
        query = query_controller.getVisualization(visualizationName,blockRef,miner);
    
        //Esecuzione della query e creazione dei JSON in base al tipo di richiesta
        session.run(query)
            .then(result => {
                //Invio della risposta al client sotto forma di JSON
                res.json(jsonController.getVisualizationJSON(visualizationName,result,blockRef));
            })
            .catch(error => {
                //Gestione dell'errore in caso di fallimento della query
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'An error occurred' });
            })
            .finally(() => {
                //Chiusura della sessione
                session.close();
            });
    });

    

    /**
     * @openapi
     * /api/entities/{entityName}:
     *  get:
     *     tags:
     *     - Entity controller
     *     summary: Get entity info by name and Timestamp
     *     parameters:
     *      - in: path
     *        name: entityName
     *        description: The name of the Entity in the database
     *        required: true
     *      - in: query
     *        name: startTimestamp
     *        description: Timestamp of the entity
     *        required: true
     *      - in: query
     *        name: endTimestamp
     *        description: end Timestamp of the entity (insert only if you want info of entities in a range of time)
     *        required: false
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.get('/api/entities/:entityName',(req, res) => {
        const {startTimestamp, endTimestamp } = req.query;
        const entityName = req.params.entityName;
        //Creazione di una nuova sessione del server
        const session = driver.session();

        console.log(entityName);
        console.log(startTimestamp);
        console.log(endTimestamp);
        //Definizione della query in base al tipo di richiesta(valore di type)
        let query;
        query = query_controller.getEntityInfo(entityName,startTimestamp,endTimestamp);

        //Esecuzione della query e creazione dei JSON in base al tipo di richiesta
        session.run(query)
            .then(result => {
                res.json(jsonController.getEntityInfoJSON(entityName,result));
            })
            //Gestione dell'errore in caso di fallimento della query
            .catch(error => {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'An error occurred' });
            })
            .finally(() => {
                //Chiusura della sessione
                session.close();
            });
    });

    //Avvio del server sulla porta 8000
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });

    //swaggerDocs.getDocs(app, 7474);

