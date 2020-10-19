crud.components.widgets.coreWB2Select2 = Vue.component('core-w-b2-select2', {
    extends : crud.components.widgets.wBase,
    methods : {

        afterLoadResources : function () {
            var that = this;
            var data = [];

            if (that.routeName === null) {  // caso di valori statici
                that._initSelectStatic();
            } else {
                that._initSelectAjax();
            }
            that._connectEvents();
        },

        _connectEvents : function () {
            var that = this;
            that.jQe('[c-select2]').on('select2:select', function (e) {
                that.change();
            });
        },

        getLabel : function(value) {
            var that  =this;
            var label = "";
            if (that.labelFields.length > 0) {
                for (var i in that.labelFields) {
                    label += value[that.labelFields[i]] + " ";
                }
            } else {
                label = value[that.primaryKey];
            }

            return label;
        },
        getValue : function () {
            var that = this;
            var selValue = that.jQe('[c-select2]').select2('data');
            console.log('selvalue',selValue);
            return selValue.length>0?selValue[0].id:null;

        },
        setRouteValues : function(route) {
            route.setValues({modelName:this.modelName});
            return route;
        },
        reset : function() {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = [];
        },

        /**
         * inizializzazione select con dati statici
         * @private
         */
        _initSelectStatic : function () {
            var that = this;
            // if (that.data === null) {
            //     console.log('select statica ma senza valori presenti in data');
            // }
            // var data = [];
            // // trasformo il valore con i labelFields per coerenza con la parte ajax
            // for (var i in that.data) {
            //     var d = {
            //         id : that.data[i][that.primaryKey],
            //         text : that.getLabel(that.data[i])
            //     };
            //     if (d.id == that.value)
            //         d.selected = true;
            //     data.push(d);
            // }
            var data = that._getSelectedValues();
            that.jQe('[c-select2]').select2({
                data : data,
                placeholder: that.translate(that.placeholder?that.placeholder:'app.seleziona'),
                allowClear : that.allowClear,
                theme : that.theme,
            });
        },
        /**
         * inizializzazione select ajax, in caso contenta un valore gia' selezionato,
         * allora staticamenti la property data deve avere un item simile alla risposta json e deve
         * avere come primary key uguale alla property value.
         * @private
         */
        _initSelectAjax : function () {
            var that = this;
            // var data = that.data || [];
            // if (that.value) {
            //     var _id = data.length?data[0][that.primaryKey]:null;
            //     if (that.value == _id) {
            //         data[0].selected = true;
            //         data[0].text = that.getLabel(data[0]);
            //     }
            // }
            var data = that._getSelectedValues();
            //console.log('DATA',data);
            that.jQe('[c-select2]').select2({
                data : data,
                ajax : that._getAjaxConf(),
                placeholder: that.translate(that.placeholder?that.placeholder:'app.seleziona'),
                allowClear : that.allowClear,
                theme : that.theme,
            });
        },
        /**
         * configurazione ajax per la gestione dei risultati
         * @return {{headers: *, delay: number, method: string, data: (function(*): {field: core-w-b2-select2.methods.name, value: *}), dataType: string, processResults: (function(*): {results: []}), url: *}}
         * @private
         */
        _getAjaxConf : function() {
            var that = this;
            that.route = that._getRoute();
            that.setRouteValues(that.route);
            var url = that.route.getUrl();
            var ajax = {
                url : url,
                method : that.route.getMethod(),
                headers: Server.getHearders(),
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        value : params.term,
                        field : that.name,
                    }
                },
                processResults: function (json) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    var items = [];
                    for (var i in json.result) {
                        items.push({
                            id : json.result[i][that.primaryKey],
                            text : that.getLabel(json.result[i]),
                            record : json.result[i]
                        });
                    }
                    //console.log(that.primaryKey,'items',items);
                    return {
                        results: items
                    };
                },
            };
            return ajax;
        },

        /**
         * ritorna i dati con eventuali valori gia' selezionati.
         * @private
         */
        _getSelectedValues : function (){
            var that = this;
            if (that.data === null && that.value) {
                console.log('select statica ma senza valori presenti in data');
                return [];
            }
            var data = that.data || [];
            // trasformo il valore con i labelFields per coerenza con la parte ajax
            for (var i in data) {
                data[i].text = that.getLabel(that.data[i]);
                if (data[i][that.primaryKey] == that.value) {
                    data[i].selected = true;
                }
            }
            return data;
        }
    }

});
