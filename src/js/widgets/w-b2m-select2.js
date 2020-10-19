crud.components.widgets.coreWB2mSelect2 = Vue.component('core-w-b2m-select2', {
    extends : crud.components.widgets.coreWB2Select2,
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
            that._renderHidden();
        },

        _connectEvents : function () {
            var that = this;
            that.jQe('[c-select2]').on('select2:select', function (e) {
                that._renderHidden();
                that.change(e);
            });
            that.jQe('[c-select2]').on('select2:unselect', function (e) {
                that._renderHidden();
                that.change(e);
            });
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
            // var data = that.data || [];
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
            var data = this._getSelectedValues();
            //console.log('DATA',data);
            that.jQe('[c-select2]').select2({
                data : data,
                ajax : that._getAjaxConf(),
                placeholder: that.translate(that.placeholder?that.placeholder:'app.seleziona'),
                allowClear : that.allowClear,
                theme : that.theme,
            });
        },

        // afterLoadResources : function () {
        //     var that = this;
        //     var selected = [];
        //     for (var i in that.value) {
        //         selected.push({
        //             id : that.value[i].id,
        //             text : that.getLabel(that.value[i]),
        //             selected : true,
        //         });
        //     }
        //     jQuery(that.$el).find('[c-select2]').select2({
        //         data : selected,
        //         ajax : that._getAjaxConf(),
        //         allowClear : that.allowClear,
        //         placeholder: that.placeholder?that.placeholder:"Seleziona",
        //     });

        //
        //     that._renderHidden();
        //
        // },

        getValue : function () {
            var that = this;
            var selValues = that.jQe('[c-select2]').select2('data');
            //console.log('selValues',selValues);
            var values = [];
            for (var i in selValues) {
                values.push(selValues[i][that.primaryKey]);
            }
            //console.log('values',values);
            return values;
        },

        /**
         * serve per renderizzare degli input hidden con i valori selezionati per compatibilità con
         * la presenza di una form.
         * @private
         */
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var i in values) {
                jQuery('<input type="hidden">').attr({
                    'name': that.getFieldName() + '-' + that.primaryKey + '[]',
                    'value':values[i]
                }).appendTo(that.jQe('[c-selected-items]'));
            }

        },
        /**
         * ritorna i dati con eventuali valori gia' selezionati.
         * @private
         */

        _getSelectedValues : function (){
            var that = this;
            var data = that.data || [];
            if (that.value.length > 0) {
                for (var i in that.value) {
                    for(var j in data) {
                        //console.log('test',that.value[i],data[j][that.primaryKey])
                        if (that.value[i] == data[j][that.primaryKey]) {
                            data[j].selected = true;
                            data[j].text = that.getLabel(data[j]);
                        }
                    }
                }
            }
            return data;
        }
    }

});
