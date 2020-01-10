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
        
        popover : function (message) {
            jQuery('body').append('<div id="c-pop">'+ message +'</div>');
            jQuery('#c-pop').popover({
                container : 'body',
                delay : 500
            })
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
    }


};