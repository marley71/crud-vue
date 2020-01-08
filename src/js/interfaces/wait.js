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
            return comp;
        },
        waitEnd : function (component) {
            var that = this;
            if (wait_interface._istances.length == 0)
                return ;
            if (component) {
                for (var i in wait_interface._istances) {
                    var comp = wait_interface._istances[i];
                    if (comp._uid == component._uid) {
                        wait_interface._istances.splice(i,1);
                    }

                }
            } else {
                var comp = wait_interface._istances.pop();
                comp.$destroy();
                comp.$el.parentNode.removeChild(comp.$el);
            }

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