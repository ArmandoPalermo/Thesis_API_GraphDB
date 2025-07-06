
//Modulo che si occupa di creare i JSON necessari per la visualizzazione dei dati
//A seconda del tipo di richiesta, vengono creati JSON diversi
const getBlockInfo = require('./JSON Methods/getBlockInfoJSON.js');
const getTXInfo = require('./JSON Methods/getTXInfoJSON.js');
const getHClusterInfo = require('./JSON Methods/getHClusterInfoJSON.js');
const getDClusterInfo = require('./JSON Methods/getDClusterInfoJSON.js');
const getMClusterInfo = require('./JSON Methods/getMClusterInfoJSON.js');
const getYClusterInfo = require('./JSON Methods/getYClusterInfoJSON.js');
const getBlockVisualizationFirstPart = require('./JSON Methods/getBlockVisualizationFirstPartJSON.js');
const getBlockVisualizationSecondPart = require('./JSON Methods/getBlockVisualizationSecondPartJSON.js');
const getCombinedVisualization = require('./JSON Methods/getCombinedVisualizationJSON.js');
const getMinerVisualization = require('./JSON Methods/getMinerVisualizationJSON.js');
const getTXVisualizationFirstPart = require('./JSON Methods/getTXVisualizationFirstPartJSON.js');
const getTXVisualizationSecondPart = require('./JSON Methods/getTXVisualizationSecondPartJSON.js');
const getDayToDayFlows = require('./JSON Methods/getDayToDayFlowsJSON.js');
const getHourToDayFlows = require('./JSON Methods/getHourToDayFlowsJSON.js');

module.exports = {

    //Funzione che restituisce il JSON relativo alle informazioni dell'entità richiesta
    getEntityInfoJSON : (entityName,res) =>{
        switch(entityName){
            case 'Blocks':
                return getBlockInfo(res);
            case 'Transactions':
                return getTXInfo(res);
            case 'HCluster':
                return getHClusterInfo(res);
            case 'DCluster':
                return getDClusterInfo(res);
            case 'MCluster':
                return getMClusterInfo(res);
            case 'YCluster':
                return getYClusterInfo(res);
        }

    },

    //Funzione che restituisce il JSON relativo alla visualizzazione richiesta
    getVisualizationJSON : (visualizationName,res) =>{
        switch(visualizationName){
            case 'CombinedVisualization':
                return getCombinedVisualization(res);
            case 'MinerVisualization':
                return getMinerVisualization(res);
            case 'TXVisualizationFirstPart':
                return getTXVisualizationFirstPart(res);
            case 'TXVisualizationSecondPart':
                return getTXVisualizationSecondPart(res);
            case 'BlockVisualizationFirstPart':
                return getBlockVisualizationFirstPart(res);
            case 'BlockVisualizationSecondPart':
                return getBlockVisualizationSecondPart(res);
        }
    },

    //Funzione che restituisce il JSON relativo al flusso di transazioni giorno per giorno
    getFlowsJson(flowType,res){
        switch(flowType){
            case 'DayToDay':
                console.log('DayToDayFlows');
                return getDayToDayFlows(res);
            case 'HourToDay':
                return getHourToDayFlows(res);
        }
    }

}


