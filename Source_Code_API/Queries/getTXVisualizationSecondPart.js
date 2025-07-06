const getTXVisualizationSecondPart = (hash) => {
    return 'WITH  \'' + hash + '\' AS chosenTX ' +
            'MATCH (t:Transactions) ' +
            'WHERE t.hash = chosenTX ' +
            'WITH t ' +
            'MATCH (c)-[r:inputToOutputTX]->(t) ' +
            'RETURN t.hash as hash, t.block_id as blockStart, c.hash as hashEnd, c.block_id as blockEnd, r.value as value, r.value_usd as value_usd ORDER BY c.block_id';
};

module.exports = getTXVisualizationSecondPart;