const getDClusterInfoJSON =  (res) => {

    const d_dtime = res.records.map(record => record.get(0));
    const d_minimum = res.records.map(record => record.get(1));
    const d_maximum = res.records.map(record => record.get(2));
    const total_d_input = res.records.map(record => record.get(3));
    const total_d_output = res.records.map(record => record.get(4));

    return {d_dtime: d_dtime , d_minimum: d_minimum, d_maximum: d_maximum, total_d_input: total_d_input, total_d_output: total_d_output}
}

module.exports = getDClusterInfoJSON;
