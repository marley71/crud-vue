const actionBase = Vue.component('action-base', {
    props : ['c-conf','c-key','c-ref'],
    mounted : function () {
        // var id = parseInt(Math.random() * 10000);
        // jQuery(this.$el).attr('ref','a'+id);
        console.log('action moubnted',this.$ref);
        this.view?this.view.vueRefs[this.cRef] = this:null;
    },
    computed :  {
        _disabled : function () {
            var that = this;
            console.log('enabled',that.enabled)
            if (!that.enabled)
                return true;
            if (jQuery.isFunction(that.enabled)) {
                return !that.enabled.apply(that);
            }
            return !that.enabled;
        },
        _visible : function () {
            var that = this;
            if (!that.visible)
                return false;
            if (jQuery.isFunction(that.visible)) {
                return that.visible.apply(that);
            }
            return that.visible;
        }
    },
    methods : {
        defaultData : function () {
            var that = this;
            var adata = {
                type : 'global',
                visible : true,
                enabled : true,
                title : '',
                css: 'btn btn-outline-secondary',
                icon : 'fa fa-help',
                text : '',
                view : that.$parent,
                // execute : function () {
                //     alert('definire execute')
                // }
            };
            for (var c in this.cConf) {
                // if (c ===  'execute') {
                //     var f = this.cConf[c];
                //     adata[c] = function () {
                //         f.apply(that);
                //     }
                // } else
                //if (jQuery.inArray(c,['execute','beforeExecute','afterExecute','enabled','visible']) < 0)
                    adata[c] = this.cConf[c];
            }
            return adata;
        },
        _beforeExecute : function (callback) {
            var that =this;
            if (!that.beforeExecute || !jQuery.isFunction(that.beforeExecute)) {
                callback();
                return ;
            }
            // controllo se la funzione before execute ha una callback per controlli asincroni.
            if (that.cConf.length > 0) {
                that.cConf.apply(that,[callback]);
                return ;
            }
            return that.cConf.beforeExecute.apply(that);
        },
        _execute : function () {
            var that = this;
            if (!that.execute || !jQuery.isFunction(that.execute)) {
                alert('definire execute');
                return ;
            }
            that._beforeExecute(function () {
                that.execute.apply(that);
                that._afterExecute();
            })
        },
        _afterExecute : function () {
            var that =this;
            if (!that.afterExecute || !jQuery.isFunction(that.afterExecute)) {
                return ;
            }
            that.afterExecute.apply(that);
        },

        setEnabled : function (enabled) {
            this.enabled = enabled;
        },

        setVisible : function (visible) {
            this.visible = visible;
        }
        // _disabled : function () {
        //     var that = this;
        //     console.log('enabled',that.cConf.enable)
        //     if (!that.cConf.enabled)
        //         return true;
        //     if (jQuery.isFunction(that.cConf.enabled)) {
        //         return !that.cConf.enabled.apply(that);
        //     }
        //     return !that.cConf.enabled;
        // },
        // _visible : function () {
        //     var that = this;
        //     if (!that.visible)
        //         return false;
        //     if (jQuery.isFunction(that.visible)) {
        //         return that.visible.apply(that);
        //     }
        //     return that.visible;
        // }
    },
    data :  function () {
        return this.defaultData();
    },
    template: '#action-template'
});

Vue.component('action-edit', {
    extends : actionBase
});

Vue.component('action-view', {
    extends : actionBase
});

Vue.component('action-save', {
    extends : actionBase
});

Vue.component('action-insert', {
    extends : actionBase
});

Vue.component('action-back', {
    extends : actionBase
});

Vue.component('action-search', {
    extends : actionBase
});

Vue.component('action-delete', {
    extends : actionBase
});

Vue.component('action-delete-selected', {
    extends : actionBase
});

Vue.component('action-order', {
    extends : actionBase,
    mounted : function () {
        var direction = this.cConf.orderDirection?this.cConf.orderDirection.toLowerCase():null;
        if (direction == 'desc')
            this.icon = this.cConf.iconDown;
        else if (direction == 'asc')
            this.icon = this.cConf.iconUp
        else
            this.icon = null;
        //this.icon = (this.cConf.orderDirection === null)?null:(this.cConf.orderDirection.toLowerCase()=='asc'?this.cConf.iconUp:this.cConf.iconDown);
    }
})

Vue.component('action-edit-mode',{
    extends : actionBase
})

Vue.component('action-view-mode',{
    extends : actionBase
})


Vue.component('action-dialog', {
    extends : actionBase,
    data : function () {
        var d = this.defaultData();
        d.dialog = this.$parent;
        return d;

    }
})
// Vue.component('action-edit', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     console.log('execute before',f);
//                     f.apply(that);
//                     //this.cData[c].apply(this,[])
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
//
// Vue.component('action-view', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
//
//
// Vue.component('action-save', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
//
// Vue.component('action-insert', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });

// Vue.component('action-back', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });