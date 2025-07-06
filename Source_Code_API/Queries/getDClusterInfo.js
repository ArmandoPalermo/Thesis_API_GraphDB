
const getDClusterInfo = (startDTime, endDTime) => {
    const splittedStartDTime = startDTime.split('T');
                const startDDateArray = splittedStartDTime[0].split('-');

                if(endDTime === undefined){
                    return 'MATCH (d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime = \''+startDDateArray[0]+'\'  ' +
                    'AND m.mtime = \''+startDDateArray[0]+'-'+startDDateArray[1]+'\' ' +
                    'AND d.dtime = \''+startDTime+'\' ' +
                    'RETURN d.dtime,d.minimum,d.maximum,d.total_d_input,d.total_d_output ORDER BY d.dtime';

                }else{
                    const splittedEndDTime = endDTime.split('T');
                    const endDDateArray = splittedEndDTime[0].split('-');

                    return 'MATCH (d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime <= \''+endDDateArray[0]+'\' AND y.ytime >= \''+startDDateArray[0]+'\' ' +
                    'AND m.mtime <= \''+endDDateArray[0]+'-'+endDDateArray[1]+'\' AND m.mtime >= \''+startDDateArray[0]+'-'+startDDateArray[1]+'\' ' +
                    'AND d.dtime <= \''+endDTime+'\' AND d.dtime >= \''+startDTime+'\' ' +
                    'RETURN d.dtime,d.minimum,d.maximum,d.total_d_input,d.total_d_output ORDER BY d.dtime';
                }
};

module.exports = getDClusterInfo;