import crud from '../../../core/crud'
import Server from '../../../core/Server'

// ------ ridefinizione del confParent
crud.conf['action-save'].confParent = 'a-square'
crud.conf['action-save-back'].confParent = 'a-square'
crud.conf['action-back'].confParent = 'a-square'
crud.conf['action-search'].confParent = 'a-square'
crud.conf['action-reset'].confParent = 'a-square'

// ------ ridefinizione css
crud.conf['action-save'].css = 'btn-sm mr-1 btn-success bg-success-soft'
crud.conf['action-search'].css = 'btn-sm mr-1 btn-success bg-success-soft'
crud.conf['action-reset'].css = 'btn-sm mr-1 btn-warning bg-warning-soft'
crud.conf['action-back'].css = 'btn-sm mr-1 btn-danger bg-danger-soft'
crud.conf['action-insert'].css = 'btn-outline-primary btn-group mr-1'
crud.conf['action-delete-selected'].css = 'btn-outline-danger mr-1'
crud.conf['action-edit'].css = 'btn-outline-secondary'
crud.conf['action-delete'].css = 'btn-outline-danger'
crud.conf['action-view'].css = 'btn-outline-secondary'

// ------ nuove azioni ---
crud.conf['action-export-csv-codici'] = {}

Object.assign(
  crud.conf['action-export-csv-codici'],
  crud.conf['action-export-csv'],
  {
    text: 'Codici',
    css: 'btn-sm btn btn-outline-primary',
    csvType: 'codici'
  }
)

crud.conf['action-export-csv-standard'] = {}
Object.assign(
  crud.conf['action-export-csv-standard'],
  crud.conf['action-export-csv'],
  {
    text: 'Export'
  }
)
crud.conf['action-export-csv-riepilogo'] = {}

Object.assign(
  crud.conf['action-export-csv-riepilogo'],
  crud.conf['action-export-csv'],
  {
    text: 'Export riepilogo',
    csvType: 'riepilogo'
  }
)

crud.conf['action-save-back'] = {}

Object.assign(
  crud.conf['action-save-back'],
  crud.conf['action-save'],
  {
    text: 'Salva e torna alla lista',
    css: 'btn-sm mr-1 btn-success bg-success-soft'
    // alertTime: 0,
  })

crud.conf['action-export-csv'] = {
  execute () {
    var that = this
    var r = that.createRoute(that.routeName)
    r.setValues({
      'foorm': that.view.modelName,
      'foormtype': that.view.cType
    })
    var p = {
      'csvType': that.csvType
    }
    var viewP = that.view.route.getParams()
    r.setParams(that.merge(p, viewP))
    that.waitStart(that.startMessage)
    Server.route(r, function (json) {
      that.waitEnd()
      if (json.error) {
        that.errorDialog(json.msg)
        return
      }
      document.location.href = json.result.link
      console.log(json)
    })

    console.log('r', r)
  },
  type: 'collection',
  icon: 'fa fa-file-text-o',
  text: 'Descrizioni',
  css: 'btn-sm btn btn-outline-secondary',
  csvType: 'default',
  routeName: 'csv-exporta',
  startMessage: 'Generazione csv in corso...'
}

crud.conf['action-edit-popup'] = {
  type: 'record',
  confParent: 'crud.conf.action-edit',
  execute () {
    var that = this
    var id = that.modelData[that.view.primaryKey]
    var modalObj = null
    var defaultConf = {}
    try {
      defaultConf = window['Model' + this.pascalCase(that.view.modelName)].edit
    } catch (e) {
    }

    var cConf = {
      modelName: that.view.modelName,
      pk: id,
      customActions: {
        'action-save': {
          afterExecute () {
            that.view.reload()
            // se vogliamo chiudere la popup subito dopo il salvataggio
            modalObj.hide()
          }
        }
      }
    }
    cConf = that.mergeConfView(defaultConf, cConf)
    modalObj = that.createBigModalView('v-edit', {
      cConf: cConf
    }, 'Modifica')
  }
}

crud.conf['action-insert-popup'] = {
  confParent: 'crud.conf.action-insert',
  type: 'collection',
  icon: 'fa fa-plus text-success',
  css: 'btn-outline-success',
  text: '',
  execute () {
    var that = this
    var modalObj = null
    var defaultConf = {}
    // prima provo se ha l'edit poi l'insert
    try {
      defaultConf = window['Model' + this.pascalCase(that.view.modelName)].insert
    } catch (e) {
      try {
        defaultConf = window['Model' + this.pascalCase(that.view.modelName)].edit
        defaultConf = that.mergeConfView({}, defaultConf)
        defaultConf.routeName = 'insert'
      } catch (e) {
      }
    }
    var cConf = {
      modelName: that.view.modelName,
      customActions: {
        'action-save': {
          afterExecute () {
            that.view.reload()
            // se vogliamo chiudere la popup subito dopo il salvataggio
            modalObj.hide()
          }
        }
      }
    }
    cConf = that.mergeConfView(defaultConf, cConf)
    modalObj = that.createBigModalView('v-edit', {
      cConf: cConf
    }, 'Inserimento')
  }
}

crud.conf['action-previous'] = {
  text: '<<',
  title: 'Precedente',
  execute () {
    this.view._backward()
  }
}

crud.conf['action-next'] = {
  text: '>>',
  title: 'Successivo',
  execute () {
    this.view._forward()
  }
}

crud.routes['wizard'] = {
  url: '/test-passo/{passo}',
  method: 'get',
  type: 'record',
  protocol: 'record'
}
