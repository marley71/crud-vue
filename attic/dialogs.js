dialogs_interface = {
    methods  : {
        messageDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dMessage({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return ;
        },
        errorDialog : function (bodyProps,callbacks) {
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dError({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        confirmDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dConfirm({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        warningDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dWarning({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        customDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (!bodyProps || typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cContent : bodyProps,
                    cCallbacks : callbacks
                }
            } else
                props.cCallbacks = callbacks;

            var d = new crud.components.dCustom({
                propsData : props,
                //methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },


        popover : function (message,classes,time) {
            dialogs_interface._popover(message,classes,time);
        },

        popoverSuccess : function (message,time) {
            dialogs_interface._popover(message,'alert alert-success',time);
        },
        popoverError : function (message,time) {
            dialogs_interface._popover(message,'alert alert-danger',time);
        },
        popoverInfo : function (message,time) {
            dialogs_interface._popover(message,'alert alert-info',time);
        },
        popoverWarning : function (message,time) {
            dialogs_interface._popover(message,'alert alert-warning',time);
        }
// var _progressDialog = null;
// App.progressDialog = function (content,callbacks) {
//     var self = this;
//     if (!_progressDialog) {
//         _progressDialog = new ProgressModal({
//             labels : jQuery.langDefs
//         });
//     }
//     _progressDialog.show(content,callbacks);
//     return _progressDialog;
// }
    },
    _popover : function (message,classes,time) {
        var id= 'pop' + (new Date().getTime());
        _cls = 'alert alert-primary ' + (classes?classes:'');
        var content = crud.translate(message);
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
    }

};
