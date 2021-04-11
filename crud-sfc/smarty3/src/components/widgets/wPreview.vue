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
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-preview'] = {
    icon: false,
    iconClass: '',
    value: {},
};

export default {
    name: "w-preview",
    extends: wBase,
    methods: {
        getType: function () {
            var that = this;
            if (!that.value.mimetype)
                return null;
            if (that.$crud.mimetypes.docType.indexOf(that.value.mimetype) >= 0) {
                that.icon = true;
                that.iconClass = that.$crud.mimetypes.icons['default'];
                if (that.$crud.mimetypes.icons[that.value.mimetype])
                    that.iconClass = that.$crud.mimetypes.icons[that.value.mimetype];
                return 'doc';
            }

            if (that.$crud.mimetypes.imageType.indexOf(that.value.mimetype) >= 0) {
                return 'image';
            }
            console.warn('mimetype invalid ' + that.value.mimetype)
            return null;
        }
    }
}
</script>

<style scoped>

</style>
