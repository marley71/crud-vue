import Vue from 'vue'

import vWidget from './vWidget'
import vAction from './vAction'
import vBase from './vBase'
import vCollection from './vCollection'
import vList from './vList'
import vRecord from './vRecord'
import vInsert from './vInsert'
import vEdit from './vEdit'
import vView from './vView'
import vSearch from './vSearch'
import vListEdit from './vListEdit'
import vHasmany from './vHasmany'

Vue.component('v-widget', vWidget)
Vue.component('v-action', vAction)
Vue.component('v-base', vBase)
Vue.component('v-collection', vCollection)
Vue.component('v-list', vList)
Vue.component('v-record', vRecord)
Vue.component('v-insert', vInsert)
Vue.component('v-edit', vEdit)
Vue.component('v-view', vView)
Vue.component('v-search', vSearch)
Vue.component('v-list-edit', vListEdit)
Vue.component('v-hasmany', vHasmany)
