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
        return {
            message : this.cMessage,
            title : this.cTitle,
        }
    }
});

crud.components.misc.crudDConfirm = Vue.component('crud-d-confirm', {
    extends : crud.components.dBase,
    props : {
        'c-title': {
            default : 'app.richiesta-conferma'
        }
    },
    data : function() {
        var d = {

        };
        d.selector = '[c-confirm-dialog]';
        return d;
    },
});

crud.components.misc.crudDMessage = Vue.component('crud-d-message', {
    extends : crud.components.dBase,
    props : {
        'cTitle': {
            default : 'app.informazione'
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-message-dialog]';
        return d;
    },
});

crud.components.misc.crudDError = Vue.component('crud-d-error', {
    extends : crud.components.dBase,
    props : {
        'c-title': {
            default : 'app.errore'
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-error-dialog]';
        return d;
    },
});
crud.components.misc.crudDWarning = Vue.component('crud-d-warning', {
    extends : crud.components.dBase,
    props : {
        'c-title': {
            default : 'app.attenzione'
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-warning-dialog]';
        return d;
    },
});

crud.components.misc.crudDCustom = Vue.component('d-custom', {
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
        var d = {};
        d.selector = '[c-custom-dialog]';
        d.content = this.cContent;
        return d;
    },
});
