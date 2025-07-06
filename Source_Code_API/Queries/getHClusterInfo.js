
const getHClusterInfo = (startHTime, endHTime) => {

    const splittedStartHTime = startHTime.split('T');
                const startHDateArray = splittedStartHTime[0].split('-');

                if(endHTime === undefined){
                    return 'MATCH (h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime = \''+startHDateArray[0]+'\'  ' +
                    'AND m.mtime = \''+startHDateArray[0]+'-'+startHDateArray[1]+'\' ' +
                    'AND d.dtime = \''+startHDateArray[0]+'-'+startHDateArray[1]+'-'+startHDateArray[2]+'\' ' +
                    'AND h.htime = \''+startHTime+'\' ' +
                    'RETURN h.htime,h.minimum,h.maximum,h.total_h_input,h.total_h_output ORDER BY h.htime';

                }else{
                    const splittedEndHTime = endHTime.split('T');
                    const endHDateArray = splittedEndHTime[0].split('-');

                    return 'MATCH (h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime <= \''+endHDateArray[0]+'\' AND y.ytime >= \''+startHDateArray[0]+'\' ' +
                    'AND m.mtime <= \''+endHDateArray[0]+'-'+endHDateArray[1]+'\' AND m.mtime >= \''+startHDateArray[0]+'-'+startHDateArray[1]+'\' ' +
                    'AND d.dtime <= \''+endHDateArray[0]+'-'+endHDateArray[1]+'-'+endHDateArray[2]+'\' AND d.dtime >= \''+startHDateArray[0]+'-'+startHDateArray[1]+'-'+startHDateArray[2]+'\' ' +
                    'AND h.htime <= \''+endHTime+'\' AND h.htime >= \''+startHTime+'\' ' +
                    'RETURN h.htime,h.minimum,h.maximum,h.total_h_input,h.total_h_output ORDER BY h.htime';
                }
};

module.exports = getHClusterInfo;