const getTXVisualizationSecondPartJSON = (res) => {

    const tx1_hash = res.records.map(record => record.get(0));
        const tx1_block_id = res.records.map(record => record.get(1));
        const tx2_hash = res.records.map(record => record.get(2));
        const tx2_block_id = res.records.map(record => record.get(3));
        const value = res.records.map(record => record.get(4));
        const value_usd = res.records.map(record => record.get(5));

        var i = 0;
        for (const record of tx2_hash){
            console.log('tx1_hash: ', record);
            console.log('tx1_block_id: ', tx1_block_id[i]);
            console.log('tx2_hash: ', tx1_hash[i]);
            console.log('tx2_block_id: ', tx2_block_id[i]);
            i++;
        }
        var transaction_input = [];
        var outputJSON = [];
        i = 0;
        for (const record of tx2_block_id){
            transaction_input.push({address: tx1_hash[i], block_id: tx1_block_id[i], value: value[i], value_usd: value_usd[i]});
            i++;
        }

        i = 0;
        for (const record of transaction_input){
            if(record.block_id = tx1_block_id[i]){
                outputJSON.push({hash: tx2_hash[i], id_input: tx2_block_id[i], id_output : tx1_block_id[i], transaction_in: transaction_input[i]});
            }
            i++;
        }

        console.log('outputJSON: ', outputJSON);
        return outputJSON;
}

module.exports = getTXVisualizationSecondPartJSON;