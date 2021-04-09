<template>
    <div class="flex justify-between items-center bg-yellow-200 relative text-yellow-600 py-3 px-3 rounded-lg">
        <div>
            <span class="font-semibold text-yellow-700">Bummer !!!</span>
            A simple warning alert—check it out!
        </div>
        <div>
            <button type="button" class=" text-yellow-700">
                <span class="text-2xl">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
import dBase from './dBase'

export default {
  name: 'd-alert',
  extends: dBase,
  props: {
    'cMessage': {
      default: ''
    },
    'cTime': {
      default: 2000
    },
    'cClasses': {
      default: 'alert alert-primary'
    }
  }
}
</script>

<style scoped>

</style>
