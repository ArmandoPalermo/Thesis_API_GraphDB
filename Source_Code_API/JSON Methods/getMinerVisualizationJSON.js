const getMinerVisualizationJSON = (res) => {

        const b_id = res.records.map(record => record.get(0));
        const h_id = res.records.map(record => record.get(2));
        const h_time = res.records.map(record => record.get(3));
        const h_hash = res.records.map(record => record.get(4));
        const h_guessed_miner = res.records.map(record => record.get(5));
        const h_fee_total = res.records.map(record => record.get(6));
        const h_output_count = res.records.map(record => record.get(7));
        const h_input_count = res.records.map(record => record.get(8));
        const h_output_total = res.records.map(record => record.get(9));
        const h_input_total = res.records.map(record => record.get(10));
        const h_transaction_count = res.records.map(record => record.get(11));
        const conteggioRelazioni = res.records.map(record => record.get(12));
        const value = res.records.map(record => record.get(13));
        const value_usd = res.records.map(record => record.get(14));
        const lineWidth = value.map(value => value/1000);

        var transaction_input= [];
        var outputJSON = [];
        var i = 0;
        
        i=0;
        var j = 0;
        var newRef = b_id[0];
        var newArrivalRef = h_id[0];
        for (const record of h_id){
            if(newArrivalRef == record){
                transaction_input.push({block_in: newRef, count: conteggioRelazioni[i], value_usd : value_usd[i], value: value[i], lineWidth: lineWidth[i]});
                j++;
                newRef= b_id[j];
            }else{
                newArrivalRef = record;
                outputJSON.push({id: h_id[i] , time: h_time[i], hash: h_hash[i], guessed_miner: h_guessed_miner[i], fee_total: h_fee_total[i], output_count: h_output_count[i], 
                input_count: h_input_count[i], output_total: h_output_total[i], type : 1 ,input_total: h_input_total[i], transaction_count: h_transaction_count[i], 
                transaction_in: transaction_input});
                transaction_input = [];
            }
            i++;
        }

        let keys = Object.keys(outputJSON);
        let values = Object.values(outputJSON);
        let lastindex = keys.length - 1;
        let arrayPosition = [];
        let missingElements = [];

        
        console.log('lastindex: ', lastindex);
        // Verifica degli elementi con id contigui non presenti nell'outputJSON
        for (let x = 0; x < values.length; x++) {
            const currentId = values[x].id;
            console.log('currentId: ', currentId);
            missingElements.push(values[x]);
            if(!isNaN(currentId)){
                if(values[x + 1] !== undefined){
                    console.log('nextid : ' , values[x + 1].id)
                    const nextId = values[x+1].id;
                    const missingElement = {
                        id: ((parseInt(currentId) + 1).toString() + '-' + (parseInt(nextId) - 1).toString()),
                        type: 0
                    };
                    
                    console.log('x: ', x);
                    arrayPosition.push(x);
                    missingElements.push(missingElement);
                    //JSONData.splice(x, 0, missingElements)
                }
            }
        }

        
        outputJSON = JSON.stringify(missingElements,null,2);
        console.log('outputJSON: ', outputJSON);
        return outputJSON;
}

module.exports = getMinerVisualizationJSON;