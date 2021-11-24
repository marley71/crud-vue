import crud from '../../../core/crud'

crud.conf['v-search'].widgetTemplate = 'tpl-search'
crud.conf['v-view'].widgetTemplate = 'tpl-record-view'

crud.conf['v-edit'].beforeActions = null
crud.conf['v-edit'].beforeForm = null
crud.conf['v-insert'].beforeActions = null
crud.conf['v-insert'].beforeForm = null
crud.conf['v-list'].headerClass = null
crud.conf['v-search'].buttonsClass = null

// crud.conf.view.defaultWidgetType = 'w-input-view'
