const dialogsMixin = {
    methods : {
        messageDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dMessage({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },
        errorDialog : function (bodyProps,callbacks) {
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dError({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },

        confirmDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dConfirm({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },

        warningDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dWarning({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },

        customDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            var _cbs = callbacks?callbacks:{};
            if (!bodyProps || typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cContent : bodyProps,
                    cCallbacks : _cbs,
                }
            } else {
                props = bodyProps;
                if (Object.keys(_cbs) > 0)
                    props.cCallbacks = _cbs;
            }

            var d = new crud.components.misc.dCustom({
                propsData : props,
                //methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return d;
        },

        alert : function (message,classes,time) {
            this._alert(message,classes,time);
        },

        alertSuccess : function (message,time) {
            this._alert(message,'alert alert-success',time);
        },
        alertError : function (message,time) {
            this._alert(message,'alert alert-danger',time);
        },
        alertInfo : function (message,time) {
            this._alert(message,'alert alert-info',time);
        },
        alertWarning : function (message,time) {
            this._alert(message,'alert alert-warning',time);
        },

        _alert : function (message,classes,time) {
            var that = this;
            var id= 'pop' + (new Date().getTime());
            _cls = 'alert alert-primary ' + (classes?classes:'');
            var content = that.translate(message);
            var _t = 2000;
            if( time === 0 ){
                content += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
                    '    <span aria-hidden="true">&times;</span>\n' +
                    '  </button>';
            } else if (time) {
                _t = time;
            }
            var top  = window.pageYOffset || document.documentElement.scrollTop;
            var style = 'position:absolute;z-index:100000;width:50%;left:25%;top:'+top+'px';
            jQuery('body').prepend('<div id="'+id+'" class="' + _cls +'" style="' + style + '">' + content +'</div>');
            if (time !== 0) {
                setTimeout(function() {
                    jQuery('#'+id).remove();
                }, _t);
            }
            jQuery('#'+id).popover('show');
        },
        popover : function (element,content,title) {
            jQuery(element).popover({
                html : true,
                content : content,
                title : title,
                trigger : 'click'

            });
            jQuery(element).popover('show');
            jQuery(element).click(function () {
                console.log('aaaa');
                jQuery(element).popover('hide');
            })
        }
    }
}
export default dialogsMixin
