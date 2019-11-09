const actionBase = Vue.component('action-base', {
    props : ['c-conf','c-key'],
    methods : {
        defaultData : function () {
            var that = this;
            var adata = {
                type : 'global',
                visible : true,
                enabled : true,
                title : '???',
                css: 'btn btn-outline-secondary',
                icon : 'fa fa-help',
                text : '???',
                view : that.$parent,
                execute : function () {
                    alert('definire execute')
                }
            };
            for (var c in this.cConf) {
                if (c == 'execute') {
                    var f = this.cConf[c];
                    adata[c] = function () {
                        f.apply(that);
                    }
                } else
                    adata[c] = this.cConf[c];
            }
            return adata;
        }
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