



console.log('APPLICATION CONFIG LOADED');

crud.conf['action-export-csv'] = {
    execute : function () {
        var that = this;
        var r = that.createRoute(that.routeName);
        r.setValues({
            'foorm' : that.view.modelName,
            'foormtype' : that.view.cType
        });
        var p = {
            'csvType' : that.csvType
        };
        var viewP = that.view.route.getParams();
        r.setParams(that.merge(p,viewP));
        that.waitStart(that.startMessage);
        Server.route(r,function (json) {
            that.waitEnd();
            if (json.error) {
                that.errorDialog(json.msg);
                return ;
            }
            document.location.href = json.result.link;
            console.log(json);
        })

        console.log('r',r);
    },
    type : 'collection',
    icon : "fa fa-file-text-o",
    text : "Descrizioni",
    css : 'btn-sm btn btn-outline-secondary',
    csvType : 'default',
    routeName : 'csv-exporta',
    startMessage : 'Generazione csv in corso...',
};



//crud.conf['action-save'].alertTime = 0;
//crud.conf['action-save-row'].alertTime = 0;

crud.conf['action-insert'].execute = function () {
    var that = this;
    var id = that.modelData[that.view.primaryKey];
    document.location.href = '#v-insert?cModel='+that.view.modelName;
}


crud.conf['action-edit-popup'] = {
    type : 'record',
    confParent : 'crud.conf.action-edit',
    execute : function () {
        var that = this;
        var id = that.modelData[that.view.primaryKey];
        var modalObj = null;
        var defaultConf = {};
        try {
            defaultConf = window['Model'+this.pascalCase(that.view.modelName)].edit;
        } catch (e) {};
        var cConf = {
            modelName : that.view.modelName,
            pk : id,
            customActions : {
                'action-save' : {
                    afterExecute() {
                        that.view.reload();
                        // se vogliamo chiudere la popup subito dopo il salvataggio
                        modalObj.hide();
                    }
                }
            }
        };
        cConf = that.mergeConfView(defaultConf,cConf);
        modalObj = that.createBigModalView('v-edit',{
            cConf : cConf
        },"Modifica")
    }
}

crud.conf['action-insert-popup'] = {
    confParent : 'crud.conf.action-insert',
    type : 'collection',
    icon: 'fa fa-plus text-success',
    css: 'btn-outline-success',
    text: '',
    execute : function () {
        var that = this;
        var modalObj = null;
        var defaultConf = {};
        // prima provo se ha l'edit poi l'insert
        try {
            defaultConf = window['Model'+this.pascalCase(that.view.modelName)].insert;
        } catch (e) {
            try {
                defaultConf = window['Model'+this.pascalCase(that.view.modelName)].edit;
                defaultConf = that.mergeConfView({},defaultConf);
                defaultConf.routeName = 'insert';
            } catch (e) {};
        };
        var cConf = {
            modelName : that.view.modelName,
            customActions : {
                'action-save' : {
                    afterExecute() {
                        that.view.reload();
                        // se vogliamo chiudere la popup subito dopo il salvataggio
                        modalObj.hide();
                    }
                }
            }
        };
        cConf = that.mergeConfView(defaultConf,cConf);
        modalObj = that.createBigModalView('v-edit',{
            cConf : cConf
        },"Inserimento")
    }
}


crud.conf['action-previous'] = {
    text : '<<',
    title : 'Precedente',
    execute : function () {
        this.view._backward();
    }
}
crud.conf['action-next'] = {
    text : '>>',
    title : 'Successivo',
    execute : function () {
        this.view._forward();
    }
}
crud.routes['wizard'] = {
    url : '/test-passo/{passo}',
    method : 'get',
    type : 'record',
    protocol : 'record',
}
