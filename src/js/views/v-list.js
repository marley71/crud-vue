crud.components.views.coreVList = Vue.component('core-v-list', {
    extends : crud.components.views.vCollection,
    props : {
        'cType' : {
            default: 'list'
        },
    },
    // data :  function () {
    //     var that = this;
    //     var _conf = that._loadConf() || {};
    //     var dList = {
    //         loading : true,
    //         widgets : {},
    //         keys : [],
    //         recordActionsName : [],
    //         recordActions: [],
    //         collectionActions : {},
    //         collectionActionsName : [],
    //         route : null,
    //         maxPage : 0,
    //         pagination : {},
    //         viewTitle : '',
    //         defaultWidgetType : 'w-text',
    //         langContext : that.cModel,
    //         json : {},
    //     };
    //     if (_conf.viewTitle) {
    //         dList.viewTitle = _conf.viewTitle;
    //     }
    //     if (!('paginator' in _conf))
    //         dList.paginator = true;
    //     //console.log('_CONFFFFFF',_conf)
    //     return dList;
    // },

    methods: {

        isOrderField : function(key) {
            var that = this;
            if (that.orderFields[key])
                return true;
            return false;
        },

        getOrderConf : function (key) {
            var that = this;
            var translateKey = that.langContext?that.langContext+'.':'';
            translateKey += key+'.label';
            var conf = that.getActionConfig('action-order','collection');
            conf.title = that.translate('app.ordina') + ' ' + that.translate(translateKey);
            conf.text = that.translate(translateKey);
            conf.orderField = that.orderFields[key]?that.orderFields[key]:key;
            //if (that.data.order_field)
            var order = that.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField)?order.direction:null;
            conf.view = that;
            return conf;
        },
        selectAllRows : function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked',sel);
        },
        selectedRows : function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    var index = jQuery(this).closest('tr').index();
                    sel.push(that.value[index].id);
                }
            });
            //console.log('select3ed',sel);
            return sel;
        },
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.modelName
                });
                console.log('setRouteValues',that);
                if (that.routeConf) {
                    var _conf = that._loadRouteConf() || {};
                    console.log('routeConf params',_conf);
                    var params = route.getParams();
                    var p2 = _conf.params || {};
                    for (var k in p2) {
                        params[k] = p2[k];
                    }
                    route.setParams(params);
                }
            }
            return route;
        }
    },
    watch : {
        routeConf : {
            deep : true,
            handler() {
                this.reload();

            }
        },
        // value : {
        //     deep : true,
        //     handler() {
        //         this.reload();
        //     }
        // }
    }
});
