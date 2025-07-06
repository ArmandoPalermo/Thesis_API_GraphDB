const getHClusterInfoJSON = (res) => {
    const h_htime = res.records.map(record => record.get(0));
        const h_minimum = res.records.map(record => record.get(1));
        const h_maximum = res.records.map(record => record.get(2));
        const total_h_input = res.records.map(record => record.get(3));
        const total_h_output = res.records.map(record => record.get(4));

        return {h_htime: h_htime , h_minimum: h_minimum, h_maximum: h_maximum, total_h_input: total_h_input, total_h_output: total_h_output}
}

module.exports = getHClusterInfoJSON