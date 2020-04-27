crud.components.dBase = Vue.component('d-base',{
    props : ['cMessage'],
    extends : crud.components.cComponent,
    mounted : function () {
        var that = this;
        //console.log('message',this.cMessage,this.message)
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

crud.components.dConfirm = Vue.component('d-confirm', {
    extends : crud.components.dBase,
    props : {
        'c-title': {
            default : 'app.richiesta-conferma'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-confirm-dialog]';
        return d;
    },
    template : '#d-confirm-template'
});

crud.components.dMessage = Vue.component('d-message', {
    extends : crud.components.dBase,
    props : {
        'cTitle': {
            default : 'app.informazione'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-message-dialog]';
        return d;
    },
    template : '#d-message-template'
});

crud.components.dError = Vue.component('d-error', {
    extends : crud.components.dBase,
    props : {
        'c-title': {
            default : 'app.errore'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-error-dialog]';
        return d;
    },
    template : '#d-error-template'
});
crud.components.dWarning = Vue.component('d-warning', {
    extends : crud.components.dBase,
    props : {
        'c-title': {
            default : 'app.attenzione'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-warning-dialog]';
        return d;
    },
    template : '#d-warning-template'
});

crud.components.dCustom = Vue.component('d-custom', {
    extends : crud.components.dBase,
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
