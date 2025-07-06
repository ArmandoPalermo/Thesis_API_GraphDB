
const getTXInfo =  (startTimestamp,endTimestamp) => {

    const splittedTimeStamp = startTimestamp.split('T');
    const dateArray = splittedTimeStamp[0].split('-');
    const timeArray = splittedTimeStamp[1].split(':');
    
    if(endTimestamp === undefined){
        return 'MATCH (t:Transactions)-[ig:isContained]->(b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
        'WHERE y.ytime = \''+dateArray[0]+'\' AND m.mtime = \''+dateArray[0]+'-'+dateArray[1]+'\' ' +
        'AND d.dtime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'\' AND h.htime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'T'+timeArray[0]+'\' ' +
        'AND b.time = datetime(\''+startTimestamp+'\') ' +
        'RETURN t.hash,t.block_id,t.fee_, t.output_count,t.input_count,t.output_total,t.input_total,t.is_coinbase ORDER BY t.block_id';
    }else{

        const splittedEndTimestamp = endTimestamp.split('T');
        const endDateArray = splittedEndTimestamp[0].split('-');
        const endTimeArray = splittedEndTimestamp[1].split(':');

        return 'MATCH (t:Transactions)-[ig:isContained]->(b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
        'WHERE y.ytime <= \''+endDateArray[0]+'\' AND y.ytime >= \''+dateArray[0]+'\' ' +
        'AND m.mtime <= \''+endDateArray[0]+'-'+endDateArray[1]+'\' AND m.mtime >= \''+dateArray[0]+'-'+dateArray[1]+'\' ' +
        'AND d.dtime <= \''+endDateArray[0]+'-'+endDateArray[1]+'-'+endDateArray[2]+'\' AND d.dtime >= \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'\' ' +
        'AND h.htime <= \''+endDateArray[0]+'-'+endDateArray[1]+'-'+endDateArray[2]+'T'+endTimeArray[0]+'\' AND h.htime >= \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'T'+timeArray[0]+'\' ' +
        'AND b.time >= datetime(\''+startTimestamp+'\') AND b.time <= datetime(\''+endTimestamp+'\') ' +
        'RETURN t.hash,t.block_id,t.fee_, t.output_count,t.input_count,t.output_total,t.input_total,t.is_coinbase ORDER BY t.block_id';
    }
};

module.exports = getTXInfo;