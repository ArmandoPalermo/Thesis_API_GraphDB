const getBlockInfo = require('./Queries/getBlockInfo.js');
const getTXInfo = require('./Queries/getTXInfo.js');
const getHClusterInfo = require('./Queries/getHClusterInfo.js');
const getDClusterInfo = require('./Queries/getDClusterInfo.js');
const getMClusterInfo = require('./Queries/getMClusterInfo.js');
const getYClusterInfo = require('./Queries/getYClusterInfo.js');

const getBlockVisualizationFirstPart = require('./Queries/getBlockVisualizationFirstPart.js');
const getBlockVisualizationSecondPart = require('./Queries/getBlockVisualizationSecondPart.js');
const getCombinedVisualization = require('./Queries/getCombinedVisualization.js');
const getMinerVisualization = require('./Queries/getMinerVisualization.js');
const getTXVisualizationFirstPart = require('./Queries/getTXVisualizationFirstPart.js');
const getTXVisualizationSecondPart = require('./Queries/getTXVisualizationSecondPart.js');

const getDayToDayFlows = require('./Queries/getDayToDayFlows.js');
const getHourToDayFlows = require('./Queries/getHourToDayFlows.js');


module.exports = {

    //Gestione delle query in maniera più compatta con oggetti simili a dizionari
    getEntityInfo: (entityName, startTimestamp, endTimestamp) => {

        const entityQueries = {
            Blocks: getBlockInfo,
            Transactions: getTXInfo,
            HCluster: getHClusterInfo,
            DCluster: getDClusterInfo,
            MCluster: getMClusterInfo,
            YCluster: getYClusterInfo
        };

        const fn = entityQueries[entityName];

        if (!fn) {
            console.log("Errore: entityName non valido:", entityName);
            return null;
        }

        return fn(startTimestamp, endTimestamp);
    },

    //Gestione delle query in maniera più compatta con oggetti simili a dizionari
    getVisualization: (visualizationName, timestamp, miner) => {

        const visualizationQueries = {
            CombinedVisualization: getCombinedVisualization,
            MinerVisualization: getMinerVisualization,
            TXVisualizationFirstPart: getTXVisualizationFirstPart,
            TXVisualizationSecondPart: getTXVisualizationSecondPart,
            BlockVisualizationFirstPart: getBlockVisualizationFirstPart,
            BlockVisualizationSecondPart: getBlockVisualizationSecondPart
        };

        const fn = visualizationQueries[visualizationName];

        if (!fn) {
            console.log("Errore: visualizationName non valido:", visualizationName);
            return null;
        }

        if (visualizationName === "MinerVisualization") {
            return fn(timestamp, miner);
        }

        return fn(timestamp);
    },

    //Restituisce il tipo dei cluster passati come parametri ad una richiesta GET
    getClusterType(firstClusterTimestamp, secondClusterTimestampRange) {

        function detectType(ts) {
            const splitTS = ts.split('T');

            // Block or Hour
            if (splitTS.length > 1) {
                const timePart = splitTS[1].split(':');
                if (timePart.length > 1) {
                    return 'BlockTimestamp';
                }
                return 'HClusterTimestamp';
            }

            // Day / Month / Year
            const datePart = splitTS[0].split('-');

            if (datePart.length === 3) return 'DClusterTimestamp';
            if (datePart.length === 2) return 'MClusterTimestamp';
            return 'YClusterTimestamp';
        }

        const typeFirstCluster = detectType(firstClusterTimestamp);

        const rangeFirstTS = secondClusterTimestampRange.split(',')[0];
        const typeSecondCluster = detectType(rangeFirstTS);

        return [typeFirstCluster, typeSecondCluster];
    },

    //Gestione delle query in maniera più compatta con oggetti simili a dizionari
    //Al momento sono presenti solo query lecati a flussi di 2 tipi
    //In quanto il fulcro del progetto si basava sulle visualizzazioni di BITVAS
    getClusterToCluserFlows: (flowType, firstClusterTimestamp, secondClusterTimestampRange) => {

        const flowQueries = {
            DayToDay: getDayToDayFlows,
            HourToDay: getHourToDayFlows
        };

        const fn = flowQueries[flowType];

        if (!fn) {
            console.log("Errore: flowType non valido:", flowType);
            return null;
        }

        return fn(firstClusterTimestamp, secondClusterTimestampRange);
    }

};
