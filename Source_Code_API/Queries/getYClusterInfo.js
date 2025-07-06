
const getYClusterInfo = (startYTime, endYTime) => {

    if(endYTime === undefined){
        return 'MATCH (y:yCluster) ' +
        'WHERE y.ytime = \''+startYTime+'\' ' +
        'RETURN y.ytime,y.minimum,y.maximum,y.total_y_input,y.total_y_output ORDER BY y.ytime';

    }else{
        return 'MATCH (y:yCluster) ' +
        'WHERE y.ytime <= \''+endYTime+'\' AND y.ytime >= \''+startYTime+'\' ' +
        'RETURN y.ytime,y.minimum,y.maximum,y.total_y_input,y.total_y_output ORDER BY y.ytime';
    }
};

module.exports = getYClusterInfo;