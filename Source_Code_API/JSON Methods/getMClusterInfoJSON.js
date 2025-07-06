const getMClusterInfoJSON = (res) => {

    const m_mtime = res.records.map(record => record.get(0));
    const m_minimum = res.records.map(record => record.get(1));
    const m_maximum = res.records.map(record => record.get(2));
    const total_m_input = res.records.map(record => record.get(3));
    const total_m_output = res.records.map(record => record.get(4));

    return {m_mtime: m_mtime , m_minimum: m_minimum, m_maximum: m_maximum, total_m_input: total_m_input, total_m_output: total_m_output}
}

module.exports = getMClusterInfoJSON;