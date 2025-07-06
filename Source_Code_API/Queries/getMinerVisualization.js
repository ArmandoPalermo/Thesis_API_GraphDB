
const getMinerVisualization = (timeStamp, miner) => {

    return 'WITH toString(datetime(\'' + timeStamp + '\') - duration(\'PT12H\')) AS firstTwelveT, toString(datetime(\'' + timeStamp + '\') + duration(\'PT12H\')) AS secondTwelveT ' +
                    'WITH split(firstTwelveT,\'T\') AS firstSplit, split(secondTwelveT,\'T\') AS secondSplit ' +
                    'WITH split(firstSplit[0],\'-\') AS firstDate, split(firstSplit[1],\':\') AS firstTime, split(secondSplit[0],\'-\') AS secondDate, split(secondSplit[1],\':\') AS secondTime ' +
                    'MATCH (b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime >= firstDate[0] AND y.ytime <= secondDate[0] AND m.mtime >= firstDate[0] + \'-\' + firstDate[1] AND m.mtime <= secondDate[0] + \'-\' + secondDate[1] ' +
                    'AND d.dtime >= firstDate[0] + \'-\' + firstDate[1] + \'-\' + firstDate[2] AND d.dtime <= secondDate[0] + \'-\' + secondDate[1] + \'-\' + secondDate[2] ' +
                    'AND h.htime >= firstDate[0] + \'-\' + firstDate[1] + \'-\' + firstDate[2] + \'T\' + firstTime[0] AND h.htime <= secondDate[0] + \'-\' + secondDate[1] + \'-\' + secondDate[2] + \'T\' + secondTime[0] ' +
                    'AND b.time >= (datetime(\'' + timeStamp + '\') - duration(\'PT12H\')) AND b.time <= (datetime(\'' + timeStamp + '\') + duration(\'PT12H\')) AND b.guessed_miner = \''+ miner+'\' ' +
                    'WITH collect(b) AS blocchi, collect(b.id) AS listBlocks ' +
                    'CALL { ' +
                    'WITH blocchi, listBlocks ' +
                    'UNWIND blocchi AS x ' +
                    'MATCH (x)-[r:inputToOutputB]->(c) ' +
                    'WHERE c.id IN listBlocks ' +
                    'RETURN x,r,c' +
                    '} ' +
                    'RETURN x.id,toString(x.time),c.id, toString(c.time),c.hash,c.guessed_miner, c.fee_total, c.output_count,c.input_count,c.output_total,c.input_total, c.transaction_count,\'null\',r.value,r.value_usd ORDER BY c.id';
};

module.exports = getMinerVisualization;