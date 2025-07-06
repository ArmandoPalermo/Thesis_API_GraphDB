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
const getDayToDayFlows = require('./Queries/getDayToDayFlows.js');
const getHourToDayFlows = require('./Queries/getHourToDayFlows.js');
const getTXVisualizationFirstPart = require('./Queries/getTXVisualizationFirstPart.js');
const getTXVisualizationSecondPart = require('./Queries/getTXVisualizationSecondPart.js');

//Questo modulo contiene le funzioni per la creazione delle query Cypher per interrogare il database Neo4j
module.exports  = { 



        getEntityInfo : (entityName,startTimestamp,endTimestamp) =>{
            switch(entityName){
                case 'Blocks':
                    return getBlockInfo(startTimestamp,endTimestamp);
                case 'Transactions':
                    return getTXInfo(startTimestamp,endTimestamp);
                case 'HCluster':
                    return getHClusterInfo(startTimestamp,endTimestamp);
                case 'DCluster':
                    return getDClusterInfo(startTimestamp,endTimestamp);
                case 'MCluster':
                    return getMClusterInfo(startTimestamp,endTimestamp);
                case 'YCluster':
                    return getYClusterInfo(startTimestamp,endTimestamp);
            }

        },


        getVisualization : (visualizationName,timestamp,miner) =>{
            switch(visualizationName){
                case 'CombinedVisualization':
                    console.log('CombinedVisualization');
                    return getCombinedVisualization(timestamp);
                case 'MinerVisualization':
                    return getMinerVisualization(timestamp,miner);
                case 'TXVisualizationFirstPart':
                    return getTXVisualizationFirstPart(timestamp);
                case 'TXVisualizationSecondPart':
                    return getTXVisualizationSecondPart(timestamp);
                case 'BlockVisualizationFirstPart':
                    return getBlockVisualizationFirstPart(timestamp);
                case 'BlockVisualizationSecondPart':
                    return getBlockVisualizationSecondPart(timestamp);
            }
        },

        getClusterType(firstClusterTimestamp,secondClusterTimestampRange){
            const splittedTimestamp = firstClusterTimestamp.split('T');
            var typeFirstCluster = '';
    
            if(splittedTimestamp.length > 1){
                const splittedTime = splittedTimestamp[1].split(':');
                if(splittedTime.length > 1){
                    typeFirstCluster = 'BlockTimestamp';
                } else {
                    typeFirstCluster = 'HClusterTimestamp';
                }
            }else{
    
                const splittedDate = splittedTimestamp[0].split('-');
                if(splittedDate.length === 3){
                    typeFirstCluster = 'DClusterTimestamp';
                } else {
                    if(splittedDate.length === 2){
                        typeFirstCluster = 'MClusterTimestamp';
                    }else{
                        typeFirstCluster = 'YClusterTimestamp';
                    }
                }
            }
            
            const splittedRange = secondClusterTimestampRange.split(',');
            var typeSecondCluster = '';
            const splittedTimestampRange = splittedRange[0].split('T');
            if(splittedTimestampRange.length > 1){
                const splittedTime = splittedTimestampRange[1].split(':');
                if(splittedTime.length > 1){
                    typeSecondCluster = 'BlockTimestamp';
                } else {
                    typeSecondCluster = 'HClusterTimestamp';
                }
            } else {
                const splittedDate = splittedTimestampRange[0].split('-');
                if(splittedDate.length === 3){
                    typeSecondCluster = 'DClusterTimestamp';
                } else {
                    if(splittedDate.length === 2){
                        typeSecondCluster = 'MClusterTimestamp';
                    }else{
                        typeSecondCluster = 'YClusterTimestamp';
                    }
                }
            }
    
            return [typeFirstCluster,typeSecondCluster];
        },

        getClusterToCluserFlows : (flowType,firstClusterTimestamp,secondClusterTimestampRange) => {
            switch(flowType){
                case 'DayToDay':
                    console.log('DayToDay');
                    return getDayToDayFlows(firstClusterTimestamp,secondClusterTimestampRange);
                case 'HourToDay':
                    return getHourToDayFlows(firstClusterTimestamp,secondClusterTimestampRange);
            }
        },
    
}


     
