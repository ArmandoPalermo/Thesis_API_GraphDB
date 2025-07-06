const getBlockVisualizationFirstPartJSON = (res) => {

    const h_id = res.records.map(record => record.get(0));
    const h_time = res.records.map(record => record.get(1));
    const b_id = res.records.map(record => record.get(2))[0];
    const b_time = res.records.map(record => record.get(3))[0];
    const b_hash = res.records.map(record => record.get(4))[0];
    const b_guessed_miner = res.records.map(record => record.get(5))[0];
    const b_fee_total = res.records.map(record => record.get(6))[0];
    const b_output_count = res.records.map(record => record.get(7))[0];
    const b_input_count = res.records.map(record => record.get(8))[0];
    const b_output_total = res.records.map(record => record.get(9))[0];
    const b_input_total = res.records.map(record => record.get(10))[0];
    const b_transaction_count = res.records.map(record => record.get(11))[0];
    const conteggioRelazioni = res.records.map(record => record.get(12));
    const value = res.records.map(record => record.get(13));
    const value_usd = res.records.map(record => record.get(14));
    const lineWidth = value.map(value => value/1000);

    var transaction_input= [];
    var outputJSON = [];
    var i = 0;
    
    i=0;
    for (const record of h_id){
        transaction_input.push({block_in: h_id[i], count: conteggioRelazioni[i], value_usd : value_usd[i], value: value[i], lineWidth: lineWidth[i]});
        i++;
    }

    for (const record of transaction_input){
        if(record.block_in != b_id){
            outputJSON.push({id: record.block_in , time: 'undefined', hash: 'undefined', guessed_miner: 'undefined', fee_total: 'undefined', output_count: 'undefined', 
            input_count: 'undefined', output_total: 'undefined', type : 1 ,input_total: 'undefined', transaction_count: 'undefinde', 
            transaction_in: []});
        }
    }

    outputJSON.push({id: b_id, time: b_time, hash: b_hash, guessed_miner: b_guessed_miner, fee_total: b_fee_total, output_count: b_output_count, 
    input_count: b_input_count, output_total: b_output_total, type : 1 ,input_total: b_input_total, transaction_count: b_transaction_count, 
    transaction_in: transaction_input});
            

    console.log('outputJSON: ', outputJSON);
    return outputJSON;
}

module.exports = getBlockVisualizationFirstPartJSON;