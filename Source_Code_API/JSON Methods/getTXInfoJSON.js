const getTXInfoJSON = (res) => {
    const tx_hash = res.records.map(record => record.get(0));
        const tx_block_id = res.records.map(record => record.get(1));
        const tx_fee = res.records.map(record => record.get(2));
        const tx_output_count = res.records.map(record => record.get(3));
        const tx_input_count = res.records.map(record => record.get(4));
        const tx_output_total = res.records.map(record => record.get(5));
        const tx_input_total = res.records.map(record => record.get(6));
        const tx_is_coinbase = res.records.map(record => record.get(7));

        return {hash: tx_hash , block_id: tx_block_id, fee: tx_fee, output_count: tx_output_count, 
            input_count: tx_input_count, output_total: tx_output_total, input_total: tx_input_total, is_coinbase: tx_is_coinbase}
}

module.exports = getTXInfoJSON;