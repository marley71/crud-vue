
window.ProtocolRecord = function() {

    this.value = {};
    this.metadata = {};

    this.getData = function () {
        var prop = Object.getOwnPropertyNames(this);
        var data = {}
        for (var i in prop) {
            data[prop[i]] = this[prop[i]];
        }
        return data;
    }

    this.jsonToData = function (json) {
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
        for (let field in relationsMetadata) {
            this.metadata[field] = relationsMetadata[field];
            if (relationsMetadata[field].options)
                this.metadata[field].domainValues = relationsMetadata[field].options;
            if (relationsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = relationsMetadata[field].options_order;
            if (this.metadata[field].fields) {
                var fields = this.metadata[field].fields;
                delete this.metadata[field].fields;
                this.metadata[field].relationConf = {};
                for(var f in fields) {
                    //this.metadata[field].relationConf.fields.push(f);
                    this.metadata[field].relationConf[f] = {};
                    if (fields[f].options)
                        this.metadata[field].relationConf[f].domainValues = fields[f].options;
                    if (fields[f].options_order)
                        this.metadata[field].relationConf[f].domainValuesOrder = fields[f].options_order;
                }
            }
        }
    }
}

export default window.ProtocolRecord;
