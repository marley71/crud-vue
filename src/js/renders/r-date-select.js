Vue.component('r-date-select', {
    extends : crud.components.renders.rBase,
    template: '#r-date-select-template',

    computed : {
        cDay : function () {
            var that = this;
            var d = moment(that.value?that.value:that.conf.value);
            var cd = {
                value: d.date(),
                metadata: {
                    domainValues: {}
                },
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=d.daysInMonth();i++) {
                cd.metadata.domainValues[i] = i;
            }
            if (d.date() > d.daysInMonth())
                cd.value = 1;
            cd.metadata.domainValuesOrder = Object.keys(cd.metadata.domainValues);
            return cd;
        },
        cMonth : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cm = {
                value: d.month() + 1,
                metadata: {
                    domainValues: {}
                },
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=12;i++) {
                cm.metadata.domainValues[i] = i;
            }
            return cm;
        },
        cYear : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cy = {
                value : d.year(),
                metadata : {
                    domainValues: {

                    }
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
                cy.metadata.domainValues[i] = i;
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