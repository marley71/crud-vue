<template>
    <div class="mb-3 pt-0">
        <input type="hidden" v-model="value" v-bind:name="getFieldName()"
               v-on:change="change">
        <input class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" c-picker>
    </div>
</template>

<script>
import wBase from "./wBase";
import jQuery from 'jquery';
import crud from "../../crud/confs";

crud.conf['w-date-picker'] = {
    //confParent : 'crud.conf.w-base',
    resources : [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',

        //'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css',
        //'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js'

        "https://cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.css"
    ],
    displayFormat : "dd/mm/yyyy",
    dateFormat :  "yyyy-mm-dd",
};

export default {
    name: "w-date-picker",
    extends: wBase,
    methods: {
        afterLoadResources: function () {
            var that = this;
            jQuery(that.$el).find('[c-picker]').datepicker({
                format: that.displayFormat,
            }).on('changeDate', function (ev) {
                that.value = moment(ev.date.toISOString()).format(that.dateFormat.toUpperCase()); //ev.date.toISOString();
                that.change();
            });
            console.log('dateformat', that.dateFormat.toUpperCase())
            jQuery(that.$el).find('[c-picker]').datepicker('update', moment(that.value).format(that.displayFormat.toUpperCase()));
            if (that.value) {
                var d = moment(that.value).toDate();
                jQuery(that.$el).find('[c-picker]').datepicker('setDate',d);
            }
        }
    }
}
</script>

<style scoped>

</style>
