Vue.component('r-b2m-select2', {
    extends : Crud.components.renders.rBase,
    template: '#r-b2m-select2-template',
    data : function () {
        var d = this.defaultData();
        //d.conf = this.cConf;
        console.log('conf ',d.conf);
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            console.log('b2 afterloadresources')
            var r = Route.factory('autocomplete',{
                values : {
                    modelName : that.conf.metadata.autocompleteModel
                }
            });
            var selected = [];
            for (var i in that.value) {
                selected.push({
                    id : that.value[i].id,
                    text : that._getLabel(that.value[i]),
                    selected : true,
                });
            }


            jQuery(that.$el).find('[c-select2]').select2({
                data : selected,
                ajax : {
                    url : r.getUrl(),
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (data) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in data.result) {
                            items.push({
                                id : data.result[i].id,
                                text : that._getLabel(data.result[i])
                            });
                        }
                        return {
                            results: items
                        };
                    },
                },
                placeholder: that.placeholder?self.placeholder:"Seleziona",
            });
            jQuery(that.$el).find('[c-select2]').on('select2:select', function () {
                that._renderHidden();
            });
            jQuery(that.$el).find('[c-select2]').on('select2:unselect', function () {
                that._renderHidden();
            });
            that._renderHidden();

        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.conf.labelFields) {
                label += value[that.conf.labelFields[i]] + " ";
            }
            return label;
        },
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var f in that.conf.hiddenFields) {
                var field = that.conf.hiddenFields[f];
                for (var i in values) {
                    jQuery('<input type="hidden">').attr({
                        'name': that.getFieldName() + '-' + field + '[]',
                        'value':values[i][field]
                    }).appendTo(that.jQe('[c-selected-items]'));
                }
            }

        },
        getValue : function () {
            var that = this;
            return jQuery(that.$el).find('[c-select2]').select2('data');
        },
    }

});