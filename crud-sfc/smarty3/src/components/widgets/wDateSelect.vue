<template>
    <div v-if="resourcesLoaded" class="mb-3 pt-0 flex flex-row">
        <input type="hidden" v-model="value" v-bind:name="getFieldName()" v-on:change="change">
        <w-select ref="day" v-bind:c-conf="cDay"></w-select>
        <w-select ref="month" v-bind:c-conf="cMonth"></w-select>
        <w-select ref="year" v-bind:c-conf="cYear"></w-select>
    </div>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-date-select'] = {
    resources: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
    ],
    minYear: null,
    maxYear: null,
};

export default {
    name: "w-date-select",
    extends: wBase,
    computed: {
        cDay: function () {
            var that = this;
            var d = moment(that.value);
            var days = that._dayValues();
            var cd = {
                value: d.date() > d.daysInMonth() ? 1 : d.date(),
                domainValues: days,
                methods: {
                    change: function () {
                        that._updateSelect();
                    }
                }
            };
            return cd;
        },
        cMonth: function () {
            var that = this;
            var d = moment(that.value);
            var months = that._monthValues();
            var cm = {
                value: d.month() + 1,
                domainValues: months,
                methods: {
                    change: function () {
                        that._updateSelect();
                    }
                }
            };
            return cm;
        },
        cYear: function () {
            var that = this;
            var d = moment(that.value);
            var years = that._yearValues();
            var cy = {
                value: d.year(),
                domainValues: years,
                methods: {
                    change: function () {
                        that._updateSelect();
                    }
                }
            };
            return cy;
        }
    },
    methods: {
        _updateSelect: function () {
            var that = this;
            if (!that._getValidDate()) {
                that.errorDialog('invalid Date');
                return;
            }
            var _cday = that.$crud.cRefs.day;
            var d = moment(that.value);
            _cday.domainValues = this._dayValues();
            _cday.domainValuesOrder = Object.keys(this._dayValues());
            _cday.value = d.date() > d.daysInMonth() ? 1 : d.date();
        },
        _getValidDate: function () {
            var that = this;
            //var s = jQuery(that.$el).find('[c-marker="year"]').val() +  "-" + jQuery(that.$el).find('[c-marker="month"]').val().padStart(2,'0')  + "-" + jQuery(that.$el).find('[c-marker="day"]').val().padStart(2,'0') ;
            var _cday = that.$crud.cRefs.day;
            var _cmonth = that.$crud.cRefs.month
            var _cyear = that.$crud.cRefs.year;

            var sdate = _cyear.getValue() + "-" + _cmonth.getValue().toString().padStart(2, '0') + "-" + _cday.getValue().toString().padStart(2, '0');

            //console.log('validate Date',_cday,_cmonth,_cyear,sdate);
            var dds = moment(sdate);
            if (!dds.isValid()) {
                _cday.setValue(1);
                sdate = _cyear.getValue() + "-" + _cmonth.getValue().toString().padStart(2, '0') + "-" + _cday.getValue().toString().padStart(2, '0');
                var dds = moment(sdate);
                if (!dds.isValid())
                    return false;
            }
            //console.log('value',sdate);
            that.value = sdate;
            that.change();
            return true;
        },
        _dayValues: function () {
            var that = this;
            var d = moment(that.value);
            var days = {};
            for (let i = 1; i <= d.daysInMonth(); i++) {
                days[i] = i;
            }
            return days;
        },
        _monthValues: function () {
            var that = this;
            var months = {};
            for (let i = 1; i <= 12; i++) {
                months[i] = i;
            }
            return months;
        },
        _yearValues: function () {
            var that = this;
            var years = {};
            var d = moment(that.value ? that.value : that.conf.value);
            var minY = that.minYear ? that.minYear : d.year() - 5;
            var maxY = that.maxYear ? that.maxYear : d.year() + 5;
            for (let i = minY; i <= maxY; i++) {
                years[i] = i;
            }
            return years;
        }
    }
}
</script>

<style scoped>

</style>
