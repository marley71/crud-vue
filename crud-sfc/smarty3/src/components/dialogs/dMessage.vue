<template>
    <span v-show="visible">
        <div class="z-10 fixed inset-0 min-w-full min-h-full transition-opacity" @click.self="hide">
            <div class="absolute inset-0 bg-black opacity-50">
            </div>
        </div>
        <div class="fixed z-30 top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
            <div class="relative bg-white rounded shadow p-8 m-4  max-h-full opacity-100 z-20" :class="typeSize">
                <div class="mb-4 border-b text-2xl font-medium border-teal-600">
                  {{ title | translate }}
                </div>
                <div class="mb-8">
                    <template v-if="Array.isArray(message)">
                        <div  class="text-black-50" v-for="(msg,index) in message" v-html="msg" :key="index"></div>
                    </template>
                    <div v-else class="text-black-50">{{message}}</div>
                </div>
                <div class="">
                    <button type="button" class="text-black-50 py-2 px-4 rounded bg-blue-600  hover:bg-blue-800"  v-on:click="ok">{{ 'app.ok' | translate}}</button>
                </div>
            </div>
        </div>

    </span>
</template>

<script>
import dBase from './dBase'

export default {
  name: 'd-message',
  extends: dBase,
  methods: {
    dynamicData (conf) {
      if (!conf.title) {
        conf.title = 'app.informazione'
      }
      return conf
    }
  }
}
</script>

<style scoped>

</style>
