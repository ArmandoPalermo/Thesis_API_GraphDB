
const getHourToDayFlows = (dClusterDate,hClusterRange) => {
    const arrayDate = dClusterDate.split('-');
    const arrayRange = hClusterRange.split(',');
    
    return 'MATCH (d:dCluster)-[id:isDofM]-(m:mCluster)-[im:isMofY]->(y:yCluster) '+
            'WHERE y.ytime = \''+arrayDate[0]+'\' AND m.mtime = \''+arrayDate[0]+'-'+arrayDate[1]+'\' ' +
            'AND d.dtime=\''+arrayDate[0]+'-'+arrayDate[1]+'-'+arrayDate[2]+'\' ' +
            'WITH d ' +
            'MATCH g = (h:hCluster)-[rels:HOutputToDInput]->(d) ' +
            'WHERE h.htime >=\''+ arrayRange[0] +'\' AND h.htime <= \''+ arrayRange[1] +'\' ' +
            'RETURN  h.htime,rels.value,rels.value_usd,d.dtime';
};

module.exports = getHourToDayFlows;