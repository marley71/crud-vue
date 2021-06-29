import Server from '../../../Server'
import crud from "../../../crud";

crud.conf['c-import'] = {
    jobId: null,
    providerName: null,
    progressValue: 20,
    saveEnabled: false,
    uploadEnabled: true,
    progressEnabled: false,
    status: 'upload',
    timerStatus: null,
    confUpload: {
        name: 'resource',
        template: 'tpl-no',
        type: 'w-upload-ajax',
        maxFileSize: '2M',
        modelName: null,
        extensions: [
            'csv'
        ],
        ajaxFields: {
            field: 'resource',
            resource_type: 'attachment'
        },
        methods: {
            onError () {

            },
            onSuccess () {
                var that = this
                var viewUpload = that.getComponent('viewUpload')
                viewUpload.getAction('action-save').setEnabled(true)
            }
        }
    },
    viewUpload: {
        cRef: 'viewUpload',
        routeName: 'datafile_insert',
        fields: [],
        actions: ['action-save', 'action-cancel'],
        customActions: {
            'action-save': {
                text: 'app.importa-csv'
            }
        }
    },
    viewSave: {
        methods: {
            setRouteValues: function (route) {
                if (route) {
                    route.setValues({
                        jobId: this.$parent.jobId,
                        modelName: this.$parent.providerName
                    })
                }
                return route
            }
        },
        cRef: 'viewSave',
        routeName: 'datafile_import',
        fields: [],
        actions: ['action-save-import'],
        customActions: {
            'action-save-import': {
                text: 'Salva Csv Caricato',
                css: 'btn bnt-outline-secondary btn-info',
                type: 'record'
            }
        }
    },
    viewList: {
        routeName: 'datafile_data',
        actions: [],
        methods: {
            setRouteValues: function (route) {
                route.setValues({
                    jobId: this.$parent.jobId,
                    modelName: this.$parent.providerName
                })
                return route
            }
        }
    }
}

const cImportMixin = {

    mounted() {
        var that = this;
        that.$crud.EventBus.$on('start-import',function (params) {
            console.log('event',params);
            that.jobId = params.jobId;
            that.progressEnabled = true;
            that.checkStatus();
        })

    },
    beforeDestroy() {
        var that = this;
        console.log('BEFORE DESTROY',that.timerStatus);
        if (that.timerStatus)
            window.clearTimeout(that.timerStatus);
    },
    methods : {

        dynamicData(conf) {
            var that = this;
            console.log('cConf ',that.cConf,window[that.cConf]);
            if (that.cProviderName)
                conf.providerName = that.cProviderName;
            conf.confUpload.modelName = conf.confUpload.modelName || conf.providerName;
            console.log('dynamic data ',conf);
            return conf;
        },

        checkStatus : function () {
            var that = this;
            var r = that.createRoute('status_queue');
            r.setValues({
                id : that.jobId
            });
            Server.route(r,function (json) {
                if (json.error) {
                    that.progressEnabled = false;
                    that.errorDialog(json.msg);
                    return ;
                }
                that.progress(json);
            })
        },
        progress : function (json) {
            var that = this;

            var checkError = that.checkJobError(json);

            if (checkError.error ) {
                that.progressEnabled = false;
                that.errorDialog(checkError.msg);
                if (that.timerStatus)
                    clearInterval(that.timerStatus);
                return ;
            }
            if (json.job.end) {
                console.log('job end',that.status)
                that.progressEnabled = false;
                clearInterval(that.timerStatus);
                if (that.status == 'loading') {
                    that.status = 'tosave';
                    that.saveEnabled = true;
                    that.uploadEnabled = false;
                    //that.datafileConf.jobId = that.jobId;
                    //that.modelName = that.csvProviderName;
                }
                if (that.status == 'saving') {
                    that.status = 'upload';
                    that.uploadEnabled = true;
                    that.saveEnabled = false;
                }
                console.log('job end 2',that.status,that.saveEnabled,that.uploadEnabled)
                return ;
            }
            console.log('check',that.timerStatus);
            if (!that.timerStatus)
                that.timerStatus = setInterval(that.checkStatus,2000)
        },

        checkJobError : function (json) {
            var that = this;
            if (json.error) {
                return  {
                    error : 1,
                    msg : json.msg
                };
            }
            if (json.job && json.job.error) {
                return {
                    error : 1,
                    msg : json.job.msg
                };
            }
            return {
                error : 0
            };
        },
        _listConf() {
            var that = this;
            var userConf = that.merge({},that.viewList);
            userConf.modelName = that.providerName;
            return userConf;
        },
        _saveConf() {
            var that = this;
            var userConf = that.merge({},that.viewSave);
            userConf.modelName = that.providerName;
            userConf.customActions = that.viewSave.customActions || {};;
            userConf.fieldsConfig = that.viewSave.fieldsConfig || {};
            var aS = userConf.customActions['action-save-import'] || {};
            aS.csvDashboard = that;
            aS.execute = function () {
                var thatAction = this;
                var r = thatAction.createRoute('save_datafile');
                var viewParams = thatAction.view.getViewData();
                r.setParams(viewParams);
                r.setParam('datafile_load_id',thatAction.csvDashboard.jobId);
                r.setParam('datafileProviderName',thatAction.csvDashboard.providerName);

                // var params = thatAction.merge(viewParams,{
                //     datafile_load_id : thatAction.csvDashboard.jobId,
                //     datafileProviderName : thatAction.csvDashboard.providerName,
                // })
                // r.setParams(params);
                Server.route(r,function (json) {
                    if (json.error) {
                        thatAction.errorDialog(json.msg);
                        return ;
                    }
                    thatAction.csvDashboard.jobId = json.jobId;
                    thatAction.csvDashboard.status = 'saving';
                    thatAction.csvDashboard.progressEnabled = true;
                    thatAction.csvDashboard.checkStatus();
                })
            }
            userConf.customActions['action-save'] = aS;

            return  userConf;
        },
        _uploadConf() {
            var that = this;
            var userConf = that.merge({},that.viewUpload);
            userConf.modelName = that.providerName;
            userConf.customActions = that.viewUpload.customActions || {};
            userConf.fieldsConfig = that.viewUpload.fieldsConfig || {};
            console.log('aaaa',userConf,'viewUpload',that.viewUpload);

            var rsName = that.confUpload.name;
            userConf.fields.push(rsName);
            //userConf.fields.push('resource');
            userConf.fieldsConfig[rsName] = that.confUpload;
            var aS = userConf.customActions['action-save'] || {};
            aS.enabled =  false;
            aS.csvDashboard = that;
            aS.execute = function () {
                var thatAction = this;
                thatAction.csvDashboard.status = 'loading';
                var w = thatAction.view.getWidget('resource');
                var value = JSON.parse(w.getValue());
                var r = thatAction.createRoute('load_datafile');
                var viewParams = thatAction.view.getViewData();
                r.setParams(viewParams);
                r.setParam('fileName',value.id);
                r.setParam('datafileProviderName',thatAction.csvDashboard.providerName);
                // var params = thatAction.merge(viewParams,{
                //     'fileName': value.id,
                //     'datafileProviderName': thatAction.csvDashboard.providerName,
                // })
                // r.setParams(params);
                console.log('ROUTE',r.getConf());
                Server.route(r,function (json) {
                    console.log('json',json);
                    var checkError = thatAction.csvDashboard.checkJobError(json);
                    if (checkError.error) {
                        thatAction.csvDashboard.status = 'upload';
                        thatAction.errorDialog(checkError.msg);
                        return ;
                    }
                    var params = {
                        jobId : json.jobId,
                        progressEnabled : true,
                    }
                    thatAction.$crud.EventBus.$emit('start-import',params);
                })
            }
            userConf.customActions['action-save'] = aS;
            return  userConf;
        }
    }
};

export default cImportMixin
