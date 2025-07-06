
const getBlockVisualizationSecondPart = (blockRef) => {

    const DateTimeArray = blockRef.split('T');
    const dateArray = DateTimeArray[0].split('-');
    const timeArray = DateTimeArray[1].split(':');
    return 'WITH datetime(\''+blockRef+'\') + duration(\'PT12H\') AS secondTwelveT ' +
            'MATCH  (b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
            'WHERE y.ytime = \''+dateArray[0]+'\' AND m.mtime = \''+dateArray[0]+'-'+dateArray[1]+'\' ' +
            'AND d.dtime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'\' AND h.htime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'T'+timeArray[0]+'\' ' +
            'AND b.time=datetime(\''+blockRef+'\') ' +
            'With b, secondTwelveT MATCH (b)-[i:inputToOutputB]->(h) ' + 
            'WHERE h.time <= secondTwelveT AND h.time > b.time '+
            'RETURN b.id,toString(b.time),h.id,toString(h.time),h.hash,h.guessed_miner, '+
            'h.fee_total, h.output_count,h.input_count,h.output_total,h.input_total, h.transaction_count,\'null\',i.value,i.value_usd ORDER BY h.time';
};

module.exports = getBlockVisualizationSecondPart;