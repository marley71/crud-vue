
export default function ProtocolList () {

    this.value = [];
    this.metadata = {};
    this.pagination = {}

    this.getData = function () {
        var prop = Object.getOwnPropertyNames(this);
        var data = {}
        for (var i in prop) {
            data[prop[i]] = this[prop[i]];
        }
        return data;
    }

    this.jsonToData = function (json) {
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

        // for (var field in json.metadata) {
        //     if (json.metadata[field].options)
        //         this.metadata[field].domainValues = json.metadata[field].options;
        //     if (json.metadata[field].options_order)
        //         this.metadata[field].domainValuesOrder = json.metadata[field].options_order;
        //     if (this.metadata[field].referred_data)
        //         this.metadata[field].referredData = fieldsMetadata[field].referred_data
        // }


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
