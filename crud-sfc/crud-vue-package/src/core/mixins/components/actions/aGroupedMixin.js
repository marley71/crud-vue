import jQuery from "jquery"
import crud from '../../../crud'

crud.conf['a-grouped'] = {
    componentName : 'a-grouped',
    confParent: 'c-component',
    type: null,
    visible: true,
    enabled: true,
    title: '',
    css: '',
    icon: '',
    text: '',
    //controlType: 'button',
    href: '',
    target: '_self',
    needSelection: false,
    view: null,
    actions: [],
    actionsConfig: {},
    alertTime: null // eventuale timer per la visualizzazione di un messaggio in alert 0 chiusura manuale, null valore default , n numero millisecondi che il messaggio deve rimanere
}

const aGroupedMixin = {
    props: {
        'cKey': {
            default: null
        },
        cConfDefaultName: {
            default: 'a-grouped',
        }
    },
    mounted: function () {
        var that = this;
        //console.log('actions',this.actions);
        var actionsConf = {};
        for (var k in that.actions) {
            var row = that.index
            var aName = that.actions[k];
            var conf = that.$crud.conf[aName] || {};
            var customConf = that.actionsConfig[aName] || {};

            conf = that.mergeConf(conf);
            conf = that.merge(conf,customConf);
            conf.modelData = this.cloneObj(that.view.value[row]);
            conf.modelName = this.view.modelName;
            conf.index = row;
            conf.cRef = that.getRefId(that._uid, 'ra', row, aName);
            conf.name = aName;
            conf.view = that.view;
            if (!conf.componentName) {
                conf.componentName = 'a-base';
            }
            actionsConf[aName] = conf;
            that._createActionComponent(aName,conf);
        }
        //console.log('actionsConfig',actionsConf);
        that.actionsConfig = actionsConf;
    },
    computed: {
        _disabled: function () {
            var that = this;
            if (!that.enabled)
                return true;
            if (jQuery.isFunction(that.enabled)) {
                return !that.enabled.apply(that);
            }
            return !that.enabled;
        },
        _visible: function () {
            var that = this;
            if (!that.visible)
                return false;
            if (jQuery.isFunction(that.visible)) {
                return that.visible.apply(that);
            }
            return that.visible;
        }
    },
    methods: {

        // _beforeExecute: function (callback) {
        //     var that = this;
        //     //console.log('_beforeExecute')
        //     if (!that.beforeExecute || !jQuery.isFunction(that.beforeExecute)) {
        //         callback();
        //         return;
        //     }
        //
        //     var args = that.cConf.beforeExecute.toString()
        //         .match(/\((?:.+(?=\s*\))|)/)[0]
        //         .slice(1).split(/\s*,\s*/g);
        //     args.forEach(function (e, i, a) {
        //         a[i] = e.trim();
        //     });
        //     // se before execute ha un parametro allora e' la callback che verrà chiamata in caso di esisto positivo
        //     if (args[0]) {
        //         that.cConf.beforeExecute.apply(that, [callback]);
        //     } else {
        //         // altrimenti continuo solo se before execute mi ritorna true.
        //         if (that.cConf.beforeExecute.apply(that)) {
        //             callback();
        //         }
        //     }
        //
        //
        // },
        // _execute: function () {
        //     var that = this;
        //     if (!that.execute || !jQuery.isFunction(that.execute)) {
        //         alert('definire execute');
        //         return;
        //     }
        //     that._beforeExecute(function () {
        //         // controllo che execute abbia o no una callback per operazioni asincrone
        //         var args = that.execute.toString()
        //             .match(/\((?:.+(?=\s*\))|)/)[0]
        //             .slice(1).split(/\s*,\s*/g);
        //         args.forEach(function (e, i, a) {
        //             a[i] = e.trim();
        //         });
        //         if (args[0]) {
        //             var __cb = function () {
        //                 that._afterExecute();
        //             }
        //             that.execute.apply(that, [__cb]);
        //         } else {
        //             that.execute.apply(that);
        //             that._afterExecute();
        //         }
        //
        //     })
        // },
        // _afterExecute: function () {
        //     var that = this;
        //     if (!that.afterExecute || !jQuery.isFunction(that.afterExecute)) {
        //         return;
        //     }
        //     that.afterExecute.apply(that);
        // },

        setEnabled: function (enable) {
            this.enabled = enable;
        },

        setVisible: function (visible) {
            this.visible = visible;
        }
    }
}
export default aGroupedMixin
