//Classe che può essere utilizzata per effettuare richieste HTTP GET al server
// Ogni metodo della classe corrisponde ad una richiesta diversa GET al server

export class Request_Controller {

    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    // Inoltra e gestisce la richiesta GET tramite XMLHttpRequest
    sendRequest(url) {
        return new Promise((resolve, reject) => {

            this.xhr.open('GET', url, true);

            this.xhr.onload = () => {
                if (this.xhr.status === 200) {
                    console.log('Response received:', this.xhr.responseText);
                    resolve(this.xhr.responseText);
                } else {
                    console.error('Error:', this.xhr.statusText);
                    reject(this.xhr.statusText);
                }
            };

            this.xhr.onerror = () => {
                console.error('Error:', this.xhr.statusText);
                reject(this.xhr.statusText);
            };

            this.xhr.send();
        });
    }

    //Permette di ottenere il tipo dei cluster richiesti dal loro timestamp
    getClusterType(firstClusterTimestamp, secondClusterTimestampRange) {

        const check = (timestamp) => {
            const [date, time] = timestamp.split("T");

            if (time && time.includes(":")) return "BlockTimestamp";

            const parts = date.split("-");
            if (parts.length === 3) return "DClusterTimestamp";
            if (parts.length === 2) return "MClusterTimestamp";
            return "YClusterTimestamp";
        };

        return {
            typeFirstCluster: check(firstClusterTimestamp),
            typeSecondCluster: check(secondClusterTimestampRange.split(",")[0])
        };
    }

    //Definisce la richiesta GET per il reperimento di flussi tra cluster
    getClusterToClusterFlows(firstClusterTimestamp, secondClusterTimestampRange) {

        const { typeFirstCluster, typeSecondCluster } =
            this.getClusterType(firstClusterTimestamp, secondClusterTimestampRange);

        let queryString = `http://localhost:8000/api/flows/`;

        const map = {
            BlockTimestamp: "Block",
            HClusterTimestamp: "Hour",
            DClusterTimestamp: "Day",
            MClusterTimestamp: "Month",
            YClusterTimestamp: "Year"
        };

        queryString += `${map[typeSecondCluster]}To${map[typeFirstCluster]}`;
        queryString += `?timestamp=${firstClusterTimestamp}&rangeTimestamp=${secondClusterTimestampRange}`;

        return this.sendRequest(queryString);
    }

    //Definisce la richiesta GET per l'ottenimento di una visualizzazione di BITVAS
    getVisualization(visualizationName, blockRef, miner) {
        let url = `http://localhost:8000/api/visualizations/${visualizationName}?blockRef=${blockRef}`;

        if (visualizationName === "MinerVisualization") {
            url += `&miner=${miner}`;
        }

        return this.sendRequest(url);
    }

    // Definisce la richiesta GET per l'ottenimento di informazioni riguardo una qualsiasi entità nel DB
    getEntityInfo(entityName, startTimestamp, endTimestamp) {
        const url =
            `http://localhost:8000/api/entities/${entityName}` +
            `?startTimestamp=${startTimestamp}` +
            `&endTimestamp=${endTimestamp}`;

        return this.sendRequest(url);
    }
}
