import crud from "../../../crud";

crud.conf['d-alert'] = {
    confParent: 'c-component',
}

const dAlertMixin = {
    methods : {
        // ok : function () {
        //     var that = this;
        //     var exist = that.callbacks['ok'] && {}.toString.call(that.callbacks['ok']) === '[object Function]'
        //     if (exist)
        //         return that.callbacks['ok'].apply(that);
        //     console.log('default ok');
        //     this.hide();
        // },
        // cancel : function () {
        //     var that = this;
        //     var exist = that.callbacks['cancel'] && {}.toString.call(that.callbacks['cancel']) === '[object Function]'
        //     if (exist)
        //         return that.callbacks['cancel'].apply(that);
        //     console.log('default cancel');
        //     this.hide();
        // },
        show : function () {
            var that = this;
            window.jQuery(that.jQe()).popover('show');
            if (that.cTime !== 0) {
                setTimeout(function() {
                    that.hide();
                }, that.cTime);
            }
        },
        hide : function () {
            var that = this;
            window.jQuery(that.jQe()).popover('hide');
            window.jQuery(that.jQe()).remove();
            //that.visible = false;
        },
        // callCb : function (key) {
        //     var that = this;
        //     that.callbacks[key].apply(that);
        // },
        // destroy() {
        //     let that = this;
        //     console.log('destroy',that);
        //     that.$destroy();
        //     that.jQe().remove();
        // }
    }
}
export default dAlertMixin
