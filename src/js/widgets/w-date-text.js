crud.components.widgets.coreWDateText = Vue.component('core-w-date-text', {
    extends : crud.components.widgets.wBase,
    methods : {
        afterLoadResources : function () {
            var that = this;
            that.formattedValue = moment(that.value).format(that.displayFormat.toUpperCase())
            //console.log('date-text ',that.value,that.displayFormat.toUpperCase(),that.formattedValue)
        }
    }
});
