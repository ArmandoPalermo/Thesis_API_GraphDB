const getDayToDayFlowsJSON = (res) => {

    const d2_dtime = res.records.map(record => record.get(0));
        const d2_minimum = res.records.map(record => record.get(1));
        const d2_maximum = res.records.map(record => record.get(2));
        const d_dtime = res.records.map(record => record.get(3));
        const d_minimum = res.records.map(record => record.get(4));
        const d_maximum = res.records.map(record => record.get(5));
        const value = res.records.map(record => record.get(6));
        const value_usd = res.records.map(record => record.get(7));
        return { value: value, value_usd: value_usd, d2_dtime: d2_dtime, d2_minimum: d2_minimum, 
            d2_maximum: d2_maximum, d_dtime: d_dtime, d_minimum: d_minimum, d_maximum: d_maximum }
}

module.exports = getDayToDayFlowsJSON;