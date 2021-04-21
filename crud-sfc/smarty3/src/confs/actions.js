import crud from '../../../core/crud'

crud.conf['action-save'].css = 'btn-sm mr-1 btn-success bg-success-soft'
crud.conf['action-search'].css = 'btn-sm mr-1 btn-success bg-success-soft'
crud.conf['action-reset'].css = 'btn-sm mr-1 btn-warning bg-warning-soft'

crud.conf['action-back'].css = 'btn-sm mr-1 btn-danger bg-danger-soft'

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
