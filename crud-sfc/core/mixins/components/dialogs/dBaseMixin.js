import crud from "../../../crud";

crud.conf['d-base'] = {
    confParent: 'c-component',
    content: null,
    visible: true,
    message: '',
    title: '',
    typeSize: 'w-1/2',
    callbacks: {},
    customClass:'',
    component : null, // eventuale componente istanziato per le dialog con componente
}

const dBaseMixin = {
    props :  {
        cConfDefaultName: {
            default: 'd-base',
        }
    },
    methods : {
        ok : function () {
            var that = this;
            var exist = that.callbacks['ok'] && {}.toString.call(that.callbacks['ok']) === '[object Function]'
            if (exist)
                return that.callbacks['ok'].apply(that);
            console.log('default ok');
            this.hide();
        },
        cancel : function () {
            var that = this;
            var exist = that.callbacks['cancel'] && {}.toString.call(that.callbacks['cancel']) === '[object Function]'
            if (exist)
                return that.callbacks['cancel'].apply(that);
            console.log('default cancel');
            this.hide();
        },
        show : function () {
            var that = this;
            that.visible = true;
        },
        hide : function () {
            var that = this;
            that.visible = false;
        },
        callCb : function (key) {
            var that = this;
            that.callbacks[key].apply(that);
        },
        destroy() {
            let that = this;
            console.log('destroy dialog component', that.component);
            that.$destroy();
            that.jQe().html(' ');
            that.jQe().remove();
            if (that.component)
                that.component.$destroy();
        }
    }
}
export default dBaseMixin
