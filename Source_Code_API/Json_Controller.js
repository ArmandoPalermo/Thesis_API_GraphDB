// Import JSON builder functions
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



// Mapping Entity 
const entityJsonMap = {
    Blocks: getBlockInfo,
    Transactions: getTXInfo,
    HCluster: getHClusterInfo,
    DCluster: getDClusterInfo,
    MCluster: getMClusterInfo,
    YCluster: getYClusterInfo
};

// Mapping Visualization 
const visualizationJsonMap = {
    CombinedVisualization: getCombinedVisualization,
    MinerVisualization: getMinerVisualization,
    TXVisualizationFirstPart: getTXVisualizationFirstPart,
    TXVisualizationSecondPart: getTXVisualizationSecondPart,
    BlockVisualizationFirstPart: getBlockVisualizationFirstPart,
    BlockVisualizationSecondPart: getBlockVisualizationSecondPart
};

// Mapping Flow 
const flowsJsonMap = {
    DayToDay: getDayToDayFlows,
    HourToDay: getHourToDayFlows
};



module.exports = {

    /** Restituisce il JSON per le entità */
    getEntityInfoJSON(entityName, res) {

        const fn = entityJsonMap[entityName];

        if (!fn) {
            console.error("Unknown entity type:", entityName);
            return null;
        }

        return fn(res);
    },

    /** Restituisce il JSON per le visualizzazioni */
    getVisualizationJSON(visualizationName, res) {

        const fn = visualizationJsonMap[visualizationName];

        if (!fn) {
            console.error("Unknown visualization:", visualizationName);
            return null;
        }

        return fn(res);
    },

    /** Restituisce il JSON dei flussi */
    getFlowsJson(flowType, res) {

        const fn = flowsJsonMap[flowType];

        if (!fn) {
            console.error("Unknown flow type:", flowType);
            return null;
        }

        return fn(res);
    }
};
