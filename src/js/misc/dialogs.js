crud.components.misc.dBase = Vue.component('d-base',{
    props :  {
        'cMessage' : {
            default : ''
        },
        'cAutohide' : {
            default : true
        },
        cButtonConf : {
            default : function() {
                return {}
            }
        },
        cBig : {
            default : false
        }
    },
    extends : crud.components.cComponent,
    mounted : function () {
        var that = this;
        //console.log('message',this.cMessage,this.message)
        //that.jQe(that.selector).modal('show');
        //that.jQe(that.selector).modal({backdrop: 'static', keyboard: false})
        if (that.cAutohide) {
            that.jQe(that.selector).modal('show');
        } else {
            that.jQe(that.selector).modal({
                backdrop: 'static',
                keyboard: false,
                show : true
            })
        }

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
        },
        callCb : function (key) {
            var that = this;
            that.cCallbacks[key].apply(that);
        }
    },
    data :function () {
        var message = Array.isArray(this.cMessage)?this.cMessage:[this.cMessage];
        console.log('DIALOG MSG',Array.isArray(this.cMessage),message,this.cMessage);
        return {
            message : message,
            title : this.cTitle,
        }
    }
});

crud.components.misc.coreDConfirm = Vue.component('core-d-confirm', {
    extends : crud.components.misc.dBase,
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

crud.components.misc.coreDMessage = Vue.component('core-d-message', {
    extends : crud.components.misc.dBase,
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

crud.components.misc.coreDError = Vue.component('core-d-error', {
    extends : crud.components.misc.dBase,
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
crud.components.misc.coreDWarning = Vue.component('core-d-warning', {
    extends : crud.components.misc.dBase,
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

crud.components.misc.coreDCustom = Vue.component('core-d-custom', {
    extends : crud.components.misc.dBase,
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
