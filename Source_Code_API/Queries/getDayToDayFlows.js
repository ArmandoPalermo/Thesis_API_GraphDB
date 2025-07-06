
const getDayToDayFlows = (dClusterDate,dCusterRange) => {

    const arrayDate = dClusterDate.split('-');
    const arrayRange = dCusterRange.split(',');

    return 'MATCH (d:dCluster)-[im:isDofM]->(m:mCluster)-[iy:isMofY]->(y:yCluster) '+
                'WHERE y.ytime = \''+arrayDate[0]+'\' AND m.mtime = \''+arrayDate[0]+'-'+arrayDate[1]+'\' '+
                'AND d.dtime = \''+arrayDate[0]+'-'+arrayDate[1]+'-'+arrayDate[2]+'\' '+
                'WITH d ' +
                'MATCH p= (d2)-[io:inputToOutputD]->(d) '+ 
                'WHERE d2.dtime >= \''+arrayRange[0]+'\' AND d2.dtime <=\''+arrayRange[1]+'\' ' +
                'RETURN d2.dtime,d2.minimum,d2.maximum,d.dtime,d.minimum,d.maximum,io.value,io.value_usd';
};

module.exports = getDayToDayFlows;