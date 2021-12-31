import { crud, Server } from 'crud-vue-package'

crud.conf['action-record-grouped'].css = 'btn btn-sm btn-outline-primary rounded-circle'

// ------ ridefinizione del confParent
crud.conf['action-save'].componentName = 'a-square'
crud.conf['action-save-back'].componentName = 'a-square'
crud.conf['action-back'].componentName = 'a-square'
crud.conf['action-search'].componentName = 'a-square'
crud.conf['action-reset'].componentName = 'a-square'

// crud.conf['action-save'].confParent = 'a-square'
// crud.conf['action-save-back'].confParent = 'a-square'
// crud.conf['action-back'].confParent = 'a-square'
// crud.conf['action-search'].confParent = 'a-square'
// crud.conf['action-reset'].confParent = 'a-square'

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
crud.conf['action-edit-mode'].css = 'btn-outline-secondary'
crud.conf['action-save-row'].css = 'btn-outline-secondary'
crud.conf['action-view-mode'].css = 'btn-outline-secondary'

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
  icon: 'fa fa-file-csv',
  text: 'Esporta',
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

crud.conf['action-queue'] = {
  routeNameAddQueue: 'add-queue',
  routeNameStatusQueue: 'status-queue',
  type: 'collection',
  title: 'Export',
  queueName: 'queueName',
  jobId: null,
  extra_params: {},
  icon: 'fa fa-file-csv',
  text: 'Exporta',
  css: 'btn-sm btn btn-outline-secondary',
  startMessage: 'Generazione csv in corso...',
  statusMessage: 'Attendere terminazione lavoro...',
  execute () {
    var that = this
    var routeAdd = that.createRoute(that.routeNameAddQueue)
    that.setAddRouteValues(routeAdd)
    that.waitStart(that.startMessage)
    that.Server.route(routeAdd, function (json) {
      that.waitEnd()
      if (json.error) {
        that.errorDialog(json.msg)
        return
      }
      // prendo l'id della coda e attendo
      console.log('wait ', json, that)
      that.jobId = json.jobId
      that._waitEndJob()
    })
  },
  methods: {
    setAddRouteValues (route) {
      var that = this
      route.setValues({
        'queueName': that.queueName
      })
      route.setParams(that.extra_params)
      return route
    },
    setStatusRouteValues (route) {
      var that = this
      // console.log('jobId',that.jobId)
      route.setValues({
        'id': that.jobId
      })
      return route
    },
    _waitEndJob () {
      var that = this
      // TODO eventuali parametri extra
      var routeStatus = that.createRoute(that.routeNameStatusQueue)
      that.setStatusRouteValues(routeStatus)
      var __wait = function () {
        that.Server.route(routeStatus, function (json) {
          if (json.error) {
            that.waitEnd()
            that.errorDialog(json.msg)
            return
          }
          // prendo l'id della coda e attendo
          console.log('status ', json)
          if (json.job && json.job.error) {
            that.waitEnd()
            that.errorDialog(json.job.msg)
            return
          }
          if (!json.job.end) {
            setTimeout(__wait, 300)
            return
          }
          that.endJob(json)
        })
      }
      that.waitStart(that.statusMessage)
      __wait()
    },
    endJob (json) {
      var that = this
      that.waitEnd()
      console.log('endJob, job finito inserire qui la logica da fare')
    }
  }
}
