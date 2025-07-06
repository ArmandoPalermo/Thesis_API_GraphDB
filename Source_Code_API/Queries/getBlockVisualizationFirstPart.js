
const getBlockVisualizationFirstPart = (blockRef) => {
    const DateTimeArray = blockRef.split('T');
    const dateArray = DateTimeArray[0].split('-');
    const timeArray = DateTimeArray[1].split(':');
    return 'WITH datetime(\''+blockRef+'\') - duration(\'PT12H\') AS firstTwelveT ' +
            'MATCH  (b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
            'WHERE y.ytime = \''+dateArray[0]+'\' AND m.mtime = \''+dateArray[0]+'-'+dateArray[1]+'\' ' +
            'AND d.dtime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'\' AND h.htime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'T'+timeArray[0]+'\' ' +
            'AND b.time=datetime(\''+blockRef+'\') ' +
            'With b, firstTwelveT MATCH (h)-[i:inputToOutputB]->(b) ' + 
            'WHERE h.time >= firstTwelveT AND h.time<= b.time ' +
            'RETURN h.id,toString(h.time),b.id,toString(b.time),b.hash,b.guessed_miner, '+
            'b.fee_total, b.output_count,b.input_count,b.output_total,b.input_total, b.transaction_count,\'null\',i.value,i.value_usd ORDER BY h.id';
};

module.exports = getBlockVisualizationFirstPart;