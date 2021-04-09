<template>
    <div>
        <input v-model="value" :name="getFieldName()" type="hidden">
        <div class="relative flex w-full flex-wrap items-stretch mb-3">
            <input type="text" c-autocomplete :placeholder="translate('app.digita-per-cercare')"
                   class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    :value="label"
            />
            <span v-if="clearButton" class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <button v-on:click="clear"><i class="fas fa-times"></i></button>
            </span>
        </div>
    </div>
</template>

<script>
import wBase from './wBase'
import wAutocompleteMixin from '../../../../core/mixins/components/widgets/wAutocompleteMixin'
import crud from '../../../../core/crud'

crud.conf['w-autocomplete'] = {
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
  ],
  routeName: 'autocomplete',
  primaryKey: 'id', // campo da utilizzare per assegnare il valore selezionato
  suggestValues: {},
  labelFields: [], // campi da visualizzare nell'autocomplete
  minLength: 3, // caratteri minimi prima che parta la ricerca
  clearButton: false
}

export default {
  name: 'w-autocomplete',
  extends: wBase,
  mixins: [wAutocompleteMixin]
}
</script>

<style scoped>

</style>
