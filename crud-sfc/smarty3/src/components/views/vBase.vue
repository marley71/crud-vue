<script>
import cComponent from '../misc/cComponent'
import vBaseMixin from '../../../../core/mixins/components/views/vBaseMixin'
import crud from '../../../../core/crud'
import vWidget from './vWidget'
import vAction from './vAction'

crud.conf['v-base'] = {
  confParent: 'c-component',
  viewTitle: '',
  langContext: '',
  loading: true,
  errorMsg: '',
  routeConf: null,
  autoload: true // carica la sorgente dati automaticamente
}

export default {
  name: 'v-base',
  extends: cComponent,
  mixins: [vBaseMixin],
  components: {vWidget, vAction}
}
</script>

<style scoped>

</style>
