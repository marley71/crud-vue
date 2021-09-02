<template>
<!--    <div>-->
<!--        <img v-if="getType()=='image'" :src="value.url">-->
<!--        <a v-else-if="getType()=='doc'" :href="value.url">-->
<!--            <i :class="iconClass"></i>-->
<!--        </a>-->
<!--        <small v-else class="text-danger">-->
<!--            <span v-if="value.url">{{ getType() }} mimetype non riconosciuto</span>-->
<!--        </small>-->
<!--    </div>-->
  <div>
    <img class="img-fluid" v-if="getType()=='image'" :src="value.url">
    <a v-else-if="getType()=='doc'" :href="value.url">
      <i :class="iconClass + ' ' + iconSize"></i>
    </a>
    <small v-else class="text-danger">
      <span v-if="value.url">{{ getType() }} mimetype non riconosciuto</span>
    </small>
  </div>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wPreviewMixin from '../../../../core/mixins/components/widgets/wPreviewMixin'

export default {
  name: 'w-preview',
  extends: wBase,
  mixins: [wPreviewMixin]
}
</script>

<style scoped>

</style>
