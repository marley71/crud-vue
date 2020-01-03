Vue.component('r-autocomplete', {
    extends : crud.components.renders.rBase,
    template: '#r-autocomplete-template',

    data : function () {
        var d = this.defaultData();
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-autocomplete]').autoComplete({
                //data: that.conf.metadata.domainValues
                resolverSettings: {
                    url: that._createUrl()
                }
            });
        },
        _createUrl : function () {
            var that = this;
            var r = Route.factory(that.conf.routeName,{values : {modelName:that.conf.metadata.autocompleteModel} });

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:r.getUrl();
            url+= '?';

            if (that.conf.metadata.fields) {
                for(var f in that.conf.metadata.fields) {
                    url+="field[]="+that.conf.metadata.fields[f]+"&";
                }
            }
            /* @TODO se metto la description diventa difficile cambiare la
             if (that.model_description) {
             for(var f in that.model_description) {
             url+="description[]="+that.model_description[f]+"&";
             }
             }
             */
            url += that.conf.metadata.separator ? '&separator=' + that.conf.metadata.separator : '';
            url += that.conf.metadata.n_items ? '&n_items=' + that.conf.metadata.n_items : '';
            url += that.conf.metadata.method ? '&method=' + that.conf.metadata.method: '';
            return url;
        },

    }

});