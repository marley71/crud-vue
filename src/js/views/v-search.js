crud.components.views.vSearch = Vue.component('v-search', {
    extends : crud.components.views.vRecord,
    props : {
        cRouteConf : {},
        cType : {
            default : 'search'
        }
    },

    data :  function () {
        var that = this;
        var d = {
            defaultWidgetType : 'w-input',
        }
        return d;

    },

    methods : {
        completed : function() {
            var that = this;
            //console.log('COMPLETED',that.jQe().html())
            that.jQe('form').each(function() {
                jQuery(this).find('input').keypress(function(e) {
                    // Enter pressed?
                    if(e.which == 10 || e.which == 13) {
                        var a = that.getAction('action-search');
                        a.execute();
                    }
                });
            });
        },
        // doSearch : function (params) {
        //     var that = this;
        //     var oldP = this.cloneObj(this.cRouteConf.params);
        //
        //     for (var k in params) {
        //         oldP[k] = params[k];
        //     }
        //     this.cRouteConf.params = oldP;
        // },
        getFieldName : function (key) {
            return 's_' + key;
        },
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName
                });
            }
            return route;
        }
    },
    template : '#v-search-template'
});
