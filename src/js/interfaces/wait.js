wait_interface = {
    methods: {
        waitStart : function (msg,container) {
            var c = container?container:'body';
            var id = wait_interface._createContainer(c);
            //wait_interface._createWaitComponent();

            var comp = new wait_interface._waitComponent({
                data : function() {
                    console.log('grlobal',(container?true:false));
                    return {
                        msg : msg,
                        global : !container?true:false,
                    }
                },
                mounted : function () {

                }
            })
            console.log('comp created',comp);
            comp.$mount('#'+id);
            wait_interface._istances.push(comp);
            // if (container) {
            //     jQuery(container).fadeTo(250,.30).css('cursor','wait').css('pointer-events','none');
            //     return ;
            // }
            //
            // if (msg) {
            //     jQuery('#wait').find('[crud-msg]').html(msg);
            // }
            // jQuery('#wait').removeClass(this.htmlClass.hide);
            // jQuery('#wait').css('cursor','wait');
        },
        waitEnd : function () {
            var that = this;
            if (wait_interface._istances.length == 0)
                return ;
            var comp = wait_interface._istances.pop();
            comp.$destroy();
            comp.$el.parentNode.removeChild(comp.$el);
        }
    },
    _createContainer : function (container) {
        var id= 'd' + (new Date().getTime());
        jQuery(container).append('<div id="'+id+'" ></div>');
        return id;
    },
    _waitComponent : Vue.component('c-wait', {
                template: '<div c-wait :class="{ \'crud-overlay-body\' : global, \'crud-overlay\' : !global}">' +
                    '<span class="crud-wait-msg">' +
                    '{{msg}}' +
                    '</span>' +
                    '</div>',
            }),
    _istances : [],
};