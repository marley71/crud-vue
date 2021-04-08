crud.components.widgets.coreWDateText = Vue.component('core-w-date-text', {
    extends : crud.components.widgets.wBase,
    methods : {
        afterLoadResources : function () {
            var that = this;
            if (that.value)
                that.formattedValue = moment(that.value).format(that.displayFormat.toUpperCase())
            else
                that.formattedValue =  that.translate(that.nullText);
            //console.log('date-text ',that.value,that.displayFormat.toUpperCase(),that.formattedValue)
        }
    }
});
