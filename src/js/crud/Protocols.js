/**
 * definizione protocollo tra json che arriva dal server e le strutture
 * dati interne delle views alla libreria javascript
 * In caso di server con formato di dati diverso aggiungere un protocollo e definire
 * le trasformazioni in caso di record o di lista
 * vanno definiti due metodi:
 * - jsonToData chiamato per riempire le strutture dati interne
 *              utilizzando i dati arrivati in json
 * - getData che viene chiamato per prendersi i dati valorizzati dal metodo jsonToData
 */


class Protocol {
    constructor() {

    }
    getData() {
        var prop = Object.getOwnPropertyNames(this);
        var data = {}
        for (var i in prop) {
            data[prop[i]] = this[prop[i]];
        }
        return data;
    }
    jsonToData(json) {
        throw "Implentare il metodo jsonToData"
    }
}

class ProtocolRecord extends Protocol {
    constructor() {
        super();
        this.value = {};
        this.metadata = {};
    }
    jsonToData(json) {
        this.value = json.result;
        this.metadata = json.metadata?json.metadata:{};
        var fieldsMetadata = json.metadata?(json.metadata.fields || {}):{};
        for (var field in fieldsMetadata) {
            this.metadata[field] = {};
            if (fieldsMetadata[field].options)
                this.metadata[field].domainValues = fieldsMetadata[field].options;
            if (fieldsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = fieldsMetadata[field].options_order;
            if (fieldsMetadata[field].referred_data)
                this.metadata[field].referredData = fieldsMetadata[field].referred_data
            //this.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //this.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;
        }
        var relationsMetadata = json.metadata?(json.metadata.relations || {}):{};
        for (var field in relationsMetadata) {
            this.metadata[field] = relationsMetadata[field];
            if (relationsMetadata[field].options)
                this.metadata[field].domainValues = relationsMetadata[field].options;
            if (relationsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = relationsMetadata[field].options_order;
        }
    }
}

class ProtocolList extends Protocol {
    constructor() {
        super();
        this.value = [];
        this.metadata = {};
        this.pagination = {}
    }

    jsonToData(json) {
        this.value = json.result.data;
        this.metadata = json.metadata || {};
        this.pagination = {
            current_page : json.result.current_page,
            from : json.result.from,
            last_page : json.result.last_page,
            pagination_steps : json.result.pagination_steps,
            per_page : json.result.per_page,
            to : json.result.to,
            total : json.result.total,

        }
        for (var field in json.metadata) {
            if (json.metadata[field].options)
                this.metadata[field].domainValues = json.metadata[field].options;
            if (json.metadata[field].options_order)
                this.metadata[field].domainValuesOrder = json.metadata[field].options_order;
            if (this.metadata[field].referred_data)
                this.metadata[field].referredData = fieldsMetadata[field].referred_data
        }
    }
}
