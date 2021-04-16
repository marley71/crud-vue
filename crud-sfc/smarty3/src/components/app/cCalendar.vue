<template>
  <div>
    <c-loading v-show="loading" :error-msg="errorMsg"></c-loading>
    <div v-show="!loading" class="well model-calendar">
      <div crud-hidden_fields></div>
      <div crud-view_elements>
        <div crud-calendar>
        </div>
      </div>
      <div crud-view_action class="hide">
        <div crud-field="data" crud-self>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-undef: "off" */

import vList from '../views/vList'
import cCalendarMixin from '../../../../core/mixins/components/app/cCalendarMixin'
import crud from '../../../../core/crud'

crud.conf['c-calendar'] = {
  confParent: 'v-list',
  routeName: 'calendar',
  dateField: 'data',
  dateEndField: 'data_fine',
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/locale/it.min.js'
  ],
  calendarOptions: {
    'header': {
      left: 'title', // will normally be on the left. if RTL, will be on the right
      center: '',
      right: 'today prev,next' // will normally be on the right. if RTL, will be on the left
    },
    lang: 'it'
  },
  calendarContainer: null,
  autoload: false,
  startDate: null,
  endDate: null
}

crud.routes['calendar'] = {
  method: 'get',
  url: '/foorm/{modelName}',
  resultType: 'list',
  protocol: 'list',
  commonParams: {}, // parametri statici da aggiungere sempre alla chiamata
  values: {}, // vettore associativo dei parametri per la costruzione dell'url
  params: {}
}

// TODO inserire la gestione di avanti e indietro del calendario con il caricamento dei dati

export default {
  name: 'c-calendar',
  extends: vList,
  mixins: [cCalendarMixin],
  methods: {
    afterLoadData () {
      var that = this
      that.jQe().find('[crud-calendar]').fullCalendar('removeEvents')
      that.loadEvents()
    },
    afterLoadResources () {
      var that = this
      // that.loading = false

      that.startDate = that.startDate ? that.startDate : moment().format('YYYY-MM') + '-01 00:00'
      that.endDate = that.endDate ? that.endDate : moment().format('YYYY-MM') + '-' + moment().daysInMonth()

      console.log('start,end', that.startDate, that.endDate)
      that.calendarOptions.dayClick = function (date, jsEvent, view) {
        that.dayClick()
      }
      that.calendarOptions.eventClick = function (calEvent, jsEvent, view) {
        that.eventClick(calEvent.id)
      }

      // that.calendarOptions.eventAfterAllRender = function (view) {
      //
      // }
      console.log('Creo calendario', that.calendarOptions)
      that.jQe().find('[crud-calendar]').fullCalendar(that.calendarOptions)
      that.calendarContainer = that.jQe().find('[crud-calendar]')

      that.calendarContainer.find('.fc-next-button').click(function () {
        var d = that.jQe().find('[crud-calendar]').fullCalendar('getView').intervalStart
        that.startDate = d.format('YYYY-MM') + '-01'
        that.endDate = d.format('YYYY-MM') + '-' + moment().daysInMonth()
        that.reload()
      })

      that.calendarContainer.find('.fc-prev-button').click(function () {
        var d = that.jQe().find('[crud-calendar]').fullCalendar('getView').intervalStart
        that.startDate = d.format('YYYY-MM') + '-01'
        that.endDate = d.format('YYYY-MM') + '-' + moment().daysInMonth()
        that.reload()
      })
      that.load()
    },
    loadEvents () {
      var that = this
      console.log('loadEdvents', that.jQe().find('[crud-calendar]').length, this.value)

      var events = []
      // console.log(that.value)
      for (var i in that.value) {
        var value = that.value[i]
        // that.log.debug('calendar event value',value)
        var backgroundColor = 'green'
        var textColor = 'white'
        var title = 'notitle'

        if (that.backgroundColor) {
          let params = {}
          let args = that.backgroundColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/)
          for (let a in args) {
            params[args[a]] = value[args[a]]
          }
          backgroundColor = that.backgroundColor.apply(that, Object.values(params))
        }

        if (that.textColor) {
          let params = {}
          let args = that.textColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/)
          for (let a in args) {
            params[args[a]] = value[args[a]]
          }
          textColor = that.textColor.apply(that, Object.values(params))
        }

        if (typeof that.title === 'function') {
          let params = {}
          let args = that.title.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/)
          for (let a in args) {
            params[args[a]] = value[args[a]]
          }
          title = that.title.apply(that, Object.values(params))
        } else {
          title = value[that.title]
        }

        // if (!parseInt(model.data.attivo))
        //  bgcolor = 'red'
        if (!value[that.dateField]) {
          console.warn('data evento non valida. Scartato:', value)
          continue
        }
        var ev = {
          id: value[that.id] ? model.data[that.id] : value.id,
          title: title,
          start: value[that.dateField],
          end: value[that.data_fine] ? value[that.data_fine] : null,
          backgroundColor: backgroundColor,
          textColor: textColor,
          jsondata: value
        }
        // console.info(value,'evento ',ev)
        events.push(ev)
      }

      console.info('aggiunti eventi ', events)
      that.jQe().find('[crud-calendar]').fullCalendar('addEventSource', events)
      // that.jQe().find('[crud-calendar]').fullCalendar('refresh')
    }
  }
}
</script>

<style scoped>

</style>
