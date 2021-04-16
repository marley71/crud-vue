<template>
    <div>
        <img v-if="getType()=='image'" :src="value.url">
        <a v-else-if="getType()=='doc'" :href="value.url">
            <i :class="iconClass"></i>
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

crud.conf['w-preview'] = {
  icon: false,
  iconClass: '',
  value: {},
  mimetypes: {
    // associazione mimetype del file con icona da visualizzare
    icons: {
      'default': 'fa fa-file-o',
      'application/xls': 'fa fa-file-excel-o',
      'xlsx': 'fa fa-file-excel-o',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fa fa-file-excel-o',
      'zip': 'fa fa-file-archive-o',
      'mp3': 'fa fa-audio-o',
      'image/jpeg': 'fa fa-image-o',
      'application/pdf': 'fa fa-file-pdf-o',
      'txt': 'fa fa-file-text-o',
      'text/plain': 'fa fa-file-text-o'
    },
    // associazione mimetype del file con il tipo upload documento
    docType: [
      'application/xls',
      'xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'zip',
      'mp3',
      'application/pdf',
      'txt',
      'csv',
      'text/plain'
    ],
    // associazione mimetype del file con il tipo upload image
    imageType: [
      'image/jpeg',
      'image/png'
    ]
  }
}

export default {
  name: 'w-preview',
  extends: wBase,
  mixins: [wPreviewMixin]
}
</script>

<style scoped>

</style>
