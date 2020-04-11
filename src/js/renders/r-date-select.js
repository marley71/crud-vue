crud.components.renders.rDateSelect = Vue.component('r-date-select', {
    extends : crud.components.renders.rBase,
    template: '#r-date-select-template',
    data : function() {
        var d = this._loadConf();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
            ];
        }
        return d;
    },
    computed : {
        cDay : function () {
            var that = this;
            var d = moment(that.value?that.value:that.conf.value);
            var cd = {
                value: d.date(),
                domainValues: {},
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=d.daysInMonth();i++) {
                cd.domainValues[i] = i;
            }
            if (d.date() > d.daysInMonth())
                cd.value = 1;
            cd.domainValuesOrder = Object.keys(cd.domainValues);
            return cd;
        },
        cMonth : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cm = {
                value: d.month() + 1,
                domainValues: {},
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=12;i++) {
                cm.domainValues[i] = i;
            }
            return cm;
        },
        cYear : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cy = {
                value : d.year(),
                domainValues: {

                },
                methods: {
                    change : function () {
                        that.changed();
                    }
                }
            };
            var minY = that.cConf.minYear?that.cConf.minYear:d.year()-5;
            var maxY = that.cConf.maxYear?that.cConf.maxYear:d.year()+5;
            for (let i=minY;i<=maxY;i++) {
                cy.domainValues[i] = i;
            }
            return cy;
        }
    },
    methods : {
        changed : function() {
            var that = this;
            var s = jQuery(that.$el).find('[c-marker="year"]').val() +  "-" + jQuery(that.$el).find('[c-marker="month"]').val().padStart(2,'0')  + "-" + jQuery(that.$el).find('[c-marker="day"]').val().padStart(2,'0') ;
            var dds = moment(s);
            if (dds.isValid()) {
                that.value = s;
            }

            //var sR = that.selectRanges();
            //that.cDay = sR.cDay;
            //console.log('changed',sR);
            this.$refs.day.updateConf(that.cDay);
            this.$refs.month.updateConf(that.cMonth);
            this.$refs.year.updateConf(that.cYear);

            console.log(this.getValue());
        }
    }
});
