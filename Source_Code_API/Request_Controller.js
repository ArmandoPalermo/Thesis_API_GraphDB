//Classe che può essere utilizzata per effettuare richieste HTTP GET al server
// Ogni metodo della classe corrisponde ad una richiesta diversa GET al server
class Request_Controller {

    constructor() {
        this.xhr = new XMLHttpRequest();
    }
    
    

    getClusterType(firstClusterTimestamp,secondClusterTimestampRange){
        const splittedTimestamp = firstClusterTimestamp.split('T');
        var typeFirstCluster = '';

        if(splittedTimestamp.length > 1){
            const splittedTime = splittedTimestamp[1].split(':');
            if(splittedTime.length > 1){
                typeFirstCluster = 'BlockTimestamp';
            } else {
                typeFirstCluster = 'HClusterTimestamp';
            }
        }else{

            const splittedDate = splittedTimestamp[0].split('-');
            if(splittedDate.length === 3){
                typeFirstCluster = 'DClusterTimestamp';
            } else {
                if(splittedDate.length === 2){
                    typeFirstCluster = 'MClusterTimestamp';
                }else{
                    typeFirstCluster = 'YClusterTimestamp';
                }
            }
        }
        
        const splittedRange = secondClusterTimestampRange.split(',');
        var typeSecondCluster = '';
        const splittedTimestampRange = splittedRange[0].split('T');
        if(splittedTimestampRange.length > 1){
            const splittedTime = splittedTimestampRange[1].split(':');
            if(splittedTime.length > 1){
                typeSecondCluster = 'BlockTimestamp';
            } else {
                typeSecondCluster = 'HClusterTimestamp';
            }
        } else {
            const splittedDate = splittedTimestampRange[0].split('-');
            if(splittedDate.length === 3){
                typeSecondCluster = 'DClusterTimestamp';
            } else {
                if(splittedDate.length === 2){
                    typeSecondCluster = 'MClusterTimestamp';
                }else{
                    typeSecondCluster = 'YClusterTimestamp';
                }
            }
        }

        return [typeFirstCluster,typeSecondCluster];
    }

    //Effettua richieste GET al server per ottenere i flussi di Bitcoin che partono da un range di cluster e arrivano ad un cluster preciso
    //firstClusterTimestamp: timestamp del cluster di arrivo
    //secondClusterTimestampRange: range di timestamp dei cluster di partenza
    getClusterToClusterFlows(firstClusterTimestamp,secondClusterTimestampRange) {
        
            ({typeFirstCluster,typeSecondCluster} = this.getClusterType(firstClusterTimestamp,secondClusterTimestampRange));
            var queryString = '';
            switch (typeFirstCluster) {
                case 'BlockTimestamp':
                    if(typeSecondCluster === 'BlockTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/BlockToBlock?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'HClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/HourToBlock?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'DClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/DayToBlock?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'MClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/MonthToBlock?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'YClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/YearToBlock?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';

                    }

                    break;
                case 'HClusterTimestamp':
                    
                    if(typeSecondCluster === 'BlockTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/BlockToHour?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'HClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/HourToHour?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'DClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/DayToHour?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'MClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/MonthToHour?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'YClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/YearToHour?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    break;
                case 'DClusterTimestamp':
                    
                    if(typeSecondCluster === 'BlockTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/BlockToDay?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'HClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/HourToDay?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'DClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/DayToDay?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'MClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/MonthToDay?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'YClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/YearToDay?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    break;
                case 'MClusterTimestamp':
                    if(typeSecondCluster === 'BlockTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/BlockToMonth?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'HClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/HourToMonth?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'DClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/DayToMonth?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'MClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/MonthToMonth?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'YClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/YearToMonth?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }   

                    break;
                case 'YClusterTimestamp':
                    if(typeSecondCluster === 'BlockTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/BlockToYear?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'HClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/HourToYear?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'DClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/DayToYear?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'MClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/MonthToYear?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    if(typeSecondCluster === 'YClusterTimestamp') {
                        queryString = 'http://localhost:7474/api/flows/YearToYear?&timestamp='+ firstClusterTimestamp +'&rangeTimestamp='+secondClusterTimestampRange+'';
                    }

                    break;
                default:
                    console.log('Errore');
                    break;
            }

            // Set the URL and method (GET)
            this.xhr.open('GET', queryString, true);

            // Set the callback function when the response is received
            this.xhr.onload = function() {
            if (this.xhr.status === 200) {
                console.log('Response received:', this.xhr.responseText);
            } else {
                console.error('Error:', this.xhr.statusText);
            }
            }

            // Set the callback function when an error occurs
            this.xhr.onerror = function() {
                console.error('Error:', this.xhr.statusText);
            }

            // Send the request
            this.xhr.send();

    }


    getVisualization(VisualizationName,blockRef,miner){

        var queryString = '';
        switch(VisualizationName){
            case 'CombinedVisualization':
                queryString = 'http://localhost:7474/api/visualizations/CombinedVisualization?blockRef='+ blockRef +'';
                break;
            case 'MinerVisualization':
                queryString = 'http://localhost:7474/api/visualizations/MinerVisualization?blockRef='+ blockRef +'&miner='+miner+'';
                break;
            case 'TXVisualization':
                queryString = 'http://localhost:7474/api/visualizations/TXVisualization?blockRef='+ blockRef +'';
                break;
            case 'BlockVisualizationFirstPart':
                queryString = 'http://localhost:7474/api/visualizations/BlockVisualizationFirstPart?blockRef='+ blockRef +'';
                break;
            case 'BlockVisualizationSecondPart':
                queryString = 'http://localhost:7474/api/visualizations/BlockVisualizationSecondPart?blockRef='+ blockRef +'';
                break;
            default:
                console.log('Errore');
                break;
        }

        // Set the URL and method (GET)
        this.xhr.open('GET', queryString, true);

        // Set the callback function when the response is received
        this.xhr.onload = function() {
        if (this.xhr.status === 200) {
            console.log('Response received:', this.xhr.responseText);
        } else {
            console.error('Error:', this.xhr.statusText);
        }
        }

        // Set the callback function when an error occurs
        this.xhr.onerror = function() {
            console.error('Error:', this.xhr.statusText);
        }

        // Send the request
        this.xhr.send();
    }

    getEntityInfo(entityName,startTimestamp,endTimestamp) {

        var queryString = '';
        switch(entityName){
            case 'Block':
                queryString = 'http://localhost:7474/api/entities/Block?startTimestamp='+ startTimestamp +'&endTimestamp='+endTimestamp+'';
                break;
            case 'TX':
                queryString = 'http://localhost:7474/api/entities/TX?startTimestamp='+ startTimestamp +'&endTimestamp='+endTimestamp+'';
                break;
            case 'HCluster':
                queryString = 'http://localhost:7474/api/entities/HCluster?startTimestamp='+ startTimestamp +'&endTimestamp='+endTimestamp+'';
                break;
            case 'DCluster':
                queryString = 'http://localhost:7474/api/entities/DCluster?startTimestamp='+ startTimestamp +'&endTimestamp='+endTimestamp+'';
                break;
            case 'MCluster':
                queryString = 'http://localhost:7474/api/entities/MCluster?startTimestamp='+ startTimestamp +'&endTimestamp='+endTimestamp+'';
                break;
            case 'YCluster':
                queryString = 'http://localhost:7474/api/entities/YCluster?startTimestamp='+ startTimestamp +'&parendTimestampam3='+endTimestamp+'';
                break;
            default:
                console.log('Errore');
                break;
        }

        // Set the URL and method (GET)
        this.xhr.open('GET', queryString, true);

        // Set the callback function when the response is received
        this.xhr.onload = function() {
        if (this.xhr.status === 200) {
            console.log('Response received:', this.xhr.responseText);
        } else {
            console.error('Error:', this.xhr.statusText);
        }
        }

        // Set the callback function when an error occurs
        this.xhr.onerror = function() {
            console.error('Error:', this.xhr.statusText);
        }

        // Send the request
        this.xhr.send();
    }
}