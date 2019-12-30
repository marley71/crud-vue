Crud.components.dBase = Vue.component('d-base',{
    props : ['cMessage'],
    extends : Crud.components.cComponent,
    mounted : function () {
        var that = this;
        console.log('message',this.cMessage,this.message)
        that.jQe(that.selector).modal('show');
        that.jQe(that.selector).on('hidden.bs.modal', function (e) {
            that.jQe(that.selector).remove();
            that.$destroy();
        })
    },
    methods : {
        defaultData : function () {
            return {
                message : this.cMessage,
                title : this.cTitle,
            }
        },
        ok : function () {
            console.log('default ok')
        },
        cancel : function () {
            console.log('default cancel');
        },
        hide : function () {
            var that = this;
            that.jQe(that.selector).modal('hide');
        }
    },
    data :function () {
        return this.defaultData();
    }
});

Crud.components.dConfirm = Vue.component('d-confirm', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Richiesta di Conferma'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-confirm-dialog]';
        return d;
    },
    template : '#d-confirm-template'
});

Crud.components.dMessage = Vue.component('d-message', {
    extends : Crud.components.dBase,
    props : {
        'cTitle': {
            default : 'Informazione'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-message-dialog]';
        return d;
    },
    template : '#d-message-template'
});

Crud.components.dError = Vue.component('d-error', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Errore'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-error-dialog]';
        return d;
    },
    template : '#d-error-template'
});
Crud.components.dWarning = Vue.component('d-warning', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Attenzione'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-warning-dialog]';
        return d;
    },
    template : '#d-warning-template'
});

Crud.components.dCustom = Vue.component('d-custom', {
    // mounted : function () {
    //     var that = this;
    //     for (var k in that.cCallbacks) {
    //         console.log('callback',k);
    //         that.methods[k] = function () {
    //             that.cCallbacks[k].apply(that);
    //         }
    //     }
    // },
    extends : Crud.components.dBase,
    // methods : {
    //     cbCall : function (key) {
    //         var that = this;
    //         that.cCallbacks[key].execute(that);
    //     }
    // },
    props : {
        'c-title': {
            default : ''
        },
        'c-content' : {
            default : ''
        },
        'c-callbacks' : {
            default : function () {
                return {}
            }
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-custom-dialog]';
        d.content = this.cContent;
        return d;
    },
    template : '#d-custom-template'
});