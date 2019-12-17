/**
 * definizione protocollo tra json che arriva dal server e le strutture
 * dati interne alla libreria javascript
 * In caso di server con formato di dati diverso aggiungere un protocollo e definire
 * le trasformazioni in caso di record o di lista
 *
 */

var Protocol = Class.extend({
    value : null,
    metadata : {},
    resultParams : {},
    validationRules : {},
    jsonToData : function (json) {
        throw "override jsonToData function ";
    },
    getData : function () {
        var prop = Object.getOwnPropertyNames(this);
        var data = {}
        for (var i in prop) {
            //console.log(k,k,prop[k]);
            data[prop[i]] = this[prop[i]];
        }
        return data;
    }
})

Protocol.factory = function (type) {
    var className = "Protocol" + Utility.pascalCase(type);
    try {
        return new window[className]();
    } catch (e) {
        log.error('failed to create ' + className,e);
    }

}


var ProtocolRecord = Protocol.extend({
    jsonToData : function (json) {
        this.value = json.result;
        this.metadata = json.metadata?json.metadata:{};
        this.resultParams = json.resultParams?json.resultParams:{};
        this.validationRules = json.validationRules?json.validationRules:{};
        this.backParams = json.backParams;
        var fieldsMetadata = json.metadata?(json.metadata.fields || {}):{};
        for (var field in fieldsMetadata) {
            this.metadata[field] = {};
            if (fieldsMetadata[field].options)
                this.metadata[field].domainValues = fieldsMetadata[field].options;
            if (fieldsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = fieldsMetadata[field].options_order;
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
            //this.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //this.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;
        }
    }
});

var ProtocolList = Protocol.extend({
    pagination :{},
    has_errors : false,
    backParams : {},
    summary : {},
    jsonToData : function (json) {
        this.value = json.result.data;
        this.metadata = json.metadata;
        this.pagination = {
            current_page : json.result.current_page,
            from : json.result.from,
            last_page : json.result.last_page,
            pagination_steps : json.result.pagination_steps,
            per_page : json.result.per_page,
            to : json.result.to,
            total : json.result.total,

        } //_.omit(json.result, ['data','has_errors']);
        this.resultParams = json.resultParams;
        this.summary = json.summary;
        this.validationRules = json.validationRules;
        this.backParams = json.backParams;
        this.has_errors = (json.result.has_errors == true);
        this.list_header = json.data_header;

        for (var field in json.metadata) {
            if (json.metadata[field].options)
                this.metadata[field].domainValues = json.metadata[field].options;
            if (json.metadata[field].options_order)
                this.metadata[field].domainValuesOrder = json.metadata[field].options_order;

            //json.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //json.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;

        }
    }
});



var ProtocolDummyRecord = Protocol.extend({
    jsonToData : function () {
        this.value = {};
        this.metadata = {};
        this.resultParams = {};
        this.validationRules = {};
        this.backParams = {};
    }
});

var ProtocolDummyList = Protocol.extend({
    pagination :{},
    has_errors : false,
    backParams : {},
    summary : {},
    translations : {},
    jsonToData : function () {
        this.value = [];
        this.metadata = {};
        this.pagination = {};
        this.resultParams = {};
        this.summary = {};
        this.validationRules = {};
        this.backParams = {};
        this.has_errors = false;
        this.list_header = "";
    }
});