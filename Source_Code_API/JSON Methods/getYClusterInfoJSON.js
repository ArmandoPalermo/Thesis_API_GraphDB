const getYClusterInfoJSON = (res) => {

    const y_ytime = res.records.map(record => record.get(0));
        const y_minimum = res.records.map(record => record.get(1));
        const y_maximum = res.records.map(record => record.get(2));
        const total_y_input = res.records.map(record => record.get(3));
        const total_y_output = res.records.map(record => record.get(4));

        return {y_ytime: y_ytime , y_minimum: y_minimum, y_maximum: y_maximum, total_y_input: total_y_input, total_y_output: total_y_output}
}
module.exports = getYClusterInfoJSON