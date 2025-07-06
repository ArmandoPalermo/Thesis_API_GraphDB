const getBlockInfo = (startTimestamp,endTimestamp) =>{

                const splittedTimeStamp = startTimestamp.split('T');
                const dateArray = splittedTimeStamp[0].split('-');
                const timeArray = splittedTimeStamp[1].split(':');
                
                if(endTimestamp === undefined){
                    return 'MATCH (b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime = \''+dateArray[0]+'\' AND m.mtime = \''+dateArray[0]+'-'+dateArray[1]+'\' ' +
                    'AND d.dtime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'\' AND h.htime = \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'T'+timeArray[0]+'\' ' +
                    'AND b.time = datetime(\''+startTimestamp+'\') ' +
                    'RETURN b.id,toString(b.time),b.hash,b.guessed_miner, b.fee_total, b.output_count,b.input_count,b.output_total,b.input_total, b.transaction_count ORDER BY h.time';
                }else{

                    const splittedEndTimestamp = endTimestamp.split('T');
                    const endDateArray = splittedEndTimestamp[0].split('-');
                    const endTimeArray = splittedEndTimestamp[1].split(':');

                    return 'MATCH (b:Blocks)-[i:isBofH]->(h:hCluster)-[ih:isHofD]->(d:dCluster)-[id:isDofM]->(m:mCluster)-[im:isMofY]->(y:yCluster) ' +
                    'WHERE y.ytime <= \''+endDateArray[0]+'\' AND y.ytime >= \''+dateArray[0]+'\' ' +
                    'AND m.mtime <= \''+endDateArray[0]+'-'+endDateArray[1]+'\' AND m.mtime >= \''+dateArray[0]+'-'+dateArray[1]+'\' ' +
                    'AND d.dtime <= \''+endDateArray[0]+'-'+endDateArray[1]+'-'+endDateArray[2]+'\' AND d.dtime >= \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'\' ' +
                    'AND h.htime <= \''+endDateArray[0]+'-'+endDateArray[1]+'-'+endDateArray[2]+'T'+endTimeArray[0]+'\' AND h.htime >= \''+dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2]+'T'+timeArray[0]+'\' ' +
                    'AND b.time >= datetime(\''+startTimestamp+'\') AND b.time <= datetime(\''+endTimestamp+'\') ' +
                    'RETURN b.id,toString(b.time),b.hash,b.guessed_miner, b.fee_total, b.output_count,b.input_count,b.output_total,b.input_total, b.transaction_count ORDER BY b.time';
                }

};

module.exports = getBlockInfo;