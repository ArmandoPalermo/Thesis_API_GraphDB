
const getMClusterInfo = (startMTime, endMTime) => {

    const splittedStartMTime = startMTime.split('-');
                const startMDateArray = splittedStartMTime[0].split('-');

                if(endMTime === undefined){
                    return 'MATCH (m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime = \''+startMDateArray[0]+'\'  ' +
                    'AND m.mtime = \''+startMTime+'\' ' +
                    'RETURN m.mtime,m.minimum,m.maximum,m.total_m_input,m.total_m_output ORDER BY m.mtime';

                }else{
                    const splittedEndMTime = endMTime.split('-');
                    const endMDateArray = splittedEndMTime[0].split('-');

                    return 'MATCH (m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime <= \''+endMDateArray[0]+'\' AND y.ytime >= \''+startMDateArray[0]+'\' ' +
                    'AND m.mtime <= \''+endMTime+'\' AND m.mtime >= \''+startMTime+'\' ' +
                    'RETURN m.mtime,m.minimum,m.maximum,m.total_m_input,m.total_m_output ORDER BY m.mtime';
                }
};

module.exports = getMClusterInfo;