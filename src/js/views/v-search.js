crud.components.views.coreVSearch = Vue.component('core-v-search', {
    extends : crud.components.views.vRecord,
    props : {
        cRouteConf : {},
        cType : {
            default : 'search'
        }
    },

    data :  function () {
        var _conf = this._getConf() || {};
        var d = {}
        d.defaultWidgetType  = _conf.defaultWidgetType?_conf.defaultWidgetType:'w-input';
        return d;
    },

    methods : {
        completed : function() {
            var that = this;
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
    }
});
