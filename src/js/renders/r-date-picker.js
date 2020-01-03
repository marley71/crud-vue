Vue.component('r-date-picker', {
    extends : crud.components.renders.rBase,
    template: '#r-date-picker-template',
    methods : {
        changed : function() {
            var that = this;
            //var s = jQuery(that.$el).find('[c-marker="year"]').val() +  "-" + jQuery(that.$el).find('[c-marker="month"]').val().padStart(2,'0')  + "-" + jQuery(that.$el).find('[c-marker="day"]').val().padStart(2,'0') ;
            // var dds = moment(s);
            // if (dds.isValid()) {
            //     that.value = s;
            // }
            //
            // //var sR = that.selectRanges();
            // //that.cDay = sR.cDay;
            // //console.log('changed',sR);
            // this.$refs.day.updateConf(that.cDay);
            // this.$refs.month.updateConf(that.cMonth);
            // this.$refs.year.updateConf(that.cYear);
            //
            // console.log(this);
        },
        afterLoadResources : function () {
            var that = this;
            console.log('resources loaded',that.value);
            jQuery(that.$el).find('[c-picker]').datepicker({
                format : 'yyyy-mm-dd',
                startDate : moment(that.value).toDate(),
            }).on('changeDate', function(ev) {
                that.value =  moment(ev.date.toISOString()).format('Y-M-D'); //ev.date.toISOString();
                moment(ev.date.valueOf);
                console.log('date ' ,ev.date.toISOString());
                console.log('date2 ',that.getValue())
                // if (ev.date.valueOf() < startDate.valueOf()){
                //
                // }
            });
        }
    }
});