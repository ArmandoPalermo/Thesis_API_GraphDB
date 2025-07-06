const getHourToDayFlowsJSON = (res) => {

    const h_htime = res.records.map(record => record.get(0));
    const value = res.records.map(record => record.get(1));
    const value_usd = res.records.map(record => record.get(2));
    const d_dtime = res.records.map(record => record.get(3));
    return { value: value, value_usd: value_usd, h_htime: h_htime, d_dtime: d_dtime }
}

module.exports = getHourToDayFlowsJSON