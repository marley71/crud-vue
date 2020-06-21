crud.components.actions.coreActionBase = Vue.component('crud-action-base', {
    props : ['cConf','cKey'],
    extends : crud.components.cComponent,
    mounted : function() {
        var that = this;
        if (that.controlType == 'link') {
            that._execute();
        }
    },
    computed :  {
        _disabled : function () {
            var that = this;
            if (!that.enabled)
                return true;
            if (jQuery.isFunction(that.enabled)) {
                return !that.enabled.apply(that);
            }
            return !that.enabled;
        },
        _visible : function () {
            var that = this;
            if (!that.visible)
                return false;
            if (jQuery.isFunction(that.visible)) {
                return that.visible.apply(that);
            }
            return that.visible;
        }
    },
    methods : {

        _beforeExecute : function (callback) {
            var that =this;
            //console.log('_beforeExecute')
            if (!that.beforeExecute || !jQuery.isFunction(that.beforeExecute)) {
                callback();
                return ;
            }

            var args = that.cConf.beforeExecute.toString()
                .match(/\((?:.+(?=\s*\))|)/)[0]
                .slice(1).split(/\s*,\s*/g);
            args.forEach(function (e, i, a) {a[i] = e.trim();});
            // se before execute ha un parametro allora e' la callback che verrà chiamata in caso di esisto positivo
            if (args[0]) {
                that.cConf.beforeExecute.apply(that,[callback]);
            } else {
                // altrimenti continuo solo se before execute mi ritorna true.
                if (that.cConf.beforeExecute.apply(that) ) {
                    callback();
                }
            }


        },
        _execute : function () {
            var that = this;
            if (!that.execute || !jQuery.isFunction(that.execute)) {
                alert('definire execute');
                return ;
            }
            that._beforeExecute(function () {
                // controllo che execute abbia o no una callback per operazioni asincrone
                var args = that.cConf.execute.toString()
                    .match(/\((?:.+(?=\s*\))|)/)[0]
                    .slice(1).split(/\s*,\s*/g);
                args.forEach(function (e, i, a) {a[i] = e.trim();});
                if (args[0]) {
                    var __cb = function() {
                        that._afterExecute();
                    }
                    that.execute.apply(that,[__cb]);
                } else {
                    that.execute.apply(that);
                    that._afterExecute();
                }

            })
        },
        _afterExecute : function () {
            var that =this;
            if (!that.afterExecute || !jQuery.isFunction(that.afterExecute)) {
                return ;
            }
            that.afterExecute.apply(that);
        },

        setEnabled : function (enable) {
            this.enabled = enable;
        },

        setVisible : function (visible) {
            this.visible = visible;
        }
    },
    data :  function () {
        var that = this;
        //console.log('action-base')
        //var d =  that._loadConf();
        var d = that._getConf();
        var adata = {
            type : 'collection',
            visible : true,
            enabled : true,
            title : '',
            css: 'btn btn-outline-secondary',
            icon : '',
            text : '',
            controlType : 'button',
            href : '',
            target: '_self',
            needSelection  : false,
        };
        if (!('view' in adata) )
            adata.view = that.$parent;
        return that.merge(adata,d);
    },
});


crud.components.actions.coreActionOrder = Vue.component('crud-action-order', {
    extends : crud.components.actions.coreActionBase,
    mounted : function () {
        var direction = this.cConf.orderDirection?this.cConf.orderDirection.toLowerCase():null;
        if (direction == 'desc')
            this.icon = this.cConf.iconSortDesc;
        else if (direction == 'asc')
            this.icon = this.cConf.iconSortAsc
        else
            this.icon = this.cConf.iconSort;
        if (this.text) {
            var langKey = (this.view && this.view.langContext)?this.view.langContext+'.'+this.text:this.text;
            if (this.hasTranslation(langKey+'.label'))
                this.text = this.translate(langKey+'.label')
        }
    }
})




// Vue.component('action-dialog', {
//     extends : crud.components.cComponent,
//     template : '#action-dialog-template'
// })
