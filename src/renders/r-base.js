Crud.components.renders.rBase = Vue.component('r-base', {
    extends : Crud.components.cComponent,
    props : ['c-conf','c-key','c-marker'],

    mounted : function() {
        var that = this;
        var _conf = that.cConf || {};
        if (!_conf.operator) {
            jQuery(that.$el).find('[c-operator]').remove();
        }
        var that =this;
        for (var k in _conf.methods) {
            console.log('r-base implements methods',k);
            that[k] = function () {
                console.log('call methods ', k );
                _conf.methods[k].apply(that,this.arguments);
            }
        }



        if (_conf.resources && _conf.resources.length) {
            that.beforeLoadResources();
            that.resourcesLoaded = false;
            that.crudApp.loadResources(_conf.resources,function () {
                console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                that.afterLoadResources();
            })
        }

    },
    data :  function () {
        return this.defaultData();
    },
    methods : {
        getFieldName: function () {
            var that = this;
            //console.log('GET FIELD NAME',this.cKey);
            if (that.conf.operator) {
                return 's_' + this.cKey + '[]';
            }
            return this.cKey;
        },
        getOperatorName : function () {
            var that = this;
            return 's_' + this.cKey + "_operator";
        },
        defaultData : function () {
            var _c = this.cConf || {};
            var d = {
                //fieldName : this.getFieldName(),
                value: _c.value,
                operator : _c.operator,
                //operatorName : this.getOperatorName(),
                resourcesLoaded : true,
                conf : _c,
            }
            console.log('r-base::defaultData',d);
            return d;
        },
        beforeLoadResources : function () {
            console.log('rBase.beforeLoadResources')
        },
        afterLoadResources : function () {
            console.log('rBase.afterLoadResources');
        },
        getValue : function() {
            return this.value;
        },
        //events
        change : function () {
            var that = this;
            var methods = that.conf.methods || {};
            if (methods.change) {
                methods.change.apply(that);
            }
        },
        updateConf : function (conf) {
            console.log('update conf old',this.conf,'new',conf);
            this.conf = conf;
        },

    },
    // watch : {
    //     resourcesLoaded : {
    //         deep : true,
    //         handler() {
    //             var that = this;
    //             console.log('resouces Loaded',that.resourcesLoaded)
    //             if (that.resourcesLoaded) {
    //                 jQuery(that.$el).find('[c-autocomplete]').mdbAutocomplete({
    //                     data: that.cConf.metadata.domainValues
    //                 });
    //             }
    //         }
    //     }
    // },
    template: '<div>render base</div>'
});


// Vue.component('r-input', {
//     extends : rBase,
//     template: '<input v-model="value" v-bind:name="cKey">'
// });
//
// Vue.component('r-textarea', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         //console.log('c-input',this.cData,this.cKey)
//         return {
//             value: this.cData.value
//         }
//     },
//     template: '<textarea v-model="value" v-bind:name="cKey"></textarea>'
// });
//
// Vue.component('r-text',{
//     props : ['c-data','c-key'],
//     data :  function () {
//         //console.log('c-text',this.cData)
//         return {
//             value: this.cData.value
//         }
//     },
//     template: '<div v-html="value"></div>'
// });
//
// Vue.component('r-select',{
//     props : ['c-data','c-key'],
//     data :  function () {
//         //console.log('c-select',this.cData);
//         var dV = this.cData.metadata.domainValues;
//         var dVO = this.cData.metadata.domainValuesOrder?this.cData.metadata.domainValuesOrder:Object.keys(dV);
//         return {
//             name : this.cData.name,
//             value: this.cData.value,
//             domainValues : dV,
//             domainValuesOrder : dVO
//         }
//     },
//     template: '<select v-bind:name="cKey" v-model="value">\n' +
//         '    <option v-for="key in domainValuesOrder" :value="key" :selected="value == key ? \'selected\' : \'\'">{{domainValues[key]}}</option>\n' +
//         '</select>',
//     // function () {
//     //     return '<div v-html="fieldValue"></div>'
//     // }
// });

// Vue.component('r-checkbox',{
//     props : ['data'],
//     data :  function () {
//         return {
//             fieldValue: this.data
//         }
//     },
//     template: '<select name="label_id" id="label_id" v-model="fieldValue">\n' +
//         '    <option v-for="(name, id) in " :value="id" :selected="label_selected == id ? \'selected\' : \'\'">@{{name}}</option>\n' +
//         '</select>',
//     // function () {
//     //     return '<div v-html="fieldValue"></div>'
//     // }
// });