const getBlockInfoJSON =  (res) => {
    const b_id = res.records.map(record => record.get(0));
        const b_time = res.records.map(record => record.get(1));
        const b_hash = res.records.map(record => record.get(2));
        const b_guessed_miner = res.records.map(record => record.get(3));
        const b_fee_total = res.records.map(record => record.get(4));
        const b_output_count = res.records.map(record => record.get(5));
        const b_input_count = res.records.map(record => record.get(6));
        const b_output_total = res.records.map(record => record.get(7));
        const b_input_total = res.records.map(record => record.get(8));
        const b_transaction_count = res.records.map(record => record.get(9));

        

        return {id: b_id , time: b_time, hash: b_hash, guessed_miner: b_guessed_miner, fee_total: b_fee_total, output_count: b_output_count, 
                input_count: b_input_count, output_total: b_output_total,input_total: b_input_total, transaction_count: b_transaction_count}
}

module.exports = getBlockInfoJSON;
