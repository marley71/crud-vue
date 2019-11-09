Crud.components.cWait = Vue.component('c-wait',{
    extends : Crud.components.cComponent,
    data : function () {
        return {
            msg : ''
        }
    },
    methods : {
        start : function () {
            this.jQe().removeClass('hide');
            this.jQe().css('cursor','wait');
        },
        end : function () {
            var that = this;
            that.jQe().remove();
            that.$destroy();
        }
    },
    template : '#c-wait-template'
})