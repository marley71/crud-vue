import crud from "../../../crud";

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

const cCalendarMixin = {
    methods : {
        setRouteValues(route) {
            var that = this;
            if (route) {
                route.setValues({
                    modelName: that.modelName
                });
                var params = route.getParams();
                params['s_'+that.dateField+'[]'] = [that.startDate,that.endDate];
            }
            return route;
        },

        dayClick () {
            //console.log('dayClick',date, jsEvent, view);
            var that = this;
            var modalObj = null;
            // prima provo se ha l'edit poi l'insert
            var defaultConf = window['Model'+this.pascalCase(that.modelName)].insert;
            if (!defaultConf)
                defaultConf = window['Model'+this.pascalCase(that.modelName)].edit || {};

            defaultConf = that.mergeConfView({},defaultConf);
            defaultConf.routeName = 'insert';

            // TODO settare il campo data con il giorno attuale del calendario.
            var cConf = {
                modelName : that.modelName,
                actions : ['action-save'],
                customActions : {
                    'action-save' : {
                        afterExecute() {
                            that.reload();
                            // se vogliamo chiudere la popup subito dopo il salvataggio
                            modalObj.hide();
                        }
                    }
                }
            };
            cConf = that.mergeConfView(defaultConf,cConf);
            console.log('viewConf',cConf);
            modalObj = that.createModalView('v-insert',cConf,"Inserimento");
        },
        eventClick (id) {
            //console.log('eventClick ',calEvent.id);
            var that = this;
            //var id = calEvent.id;
            var modalObj = null;
            var defaultConf = {};
            try {
                defaultConf = window['Model'+this.pascalCase(that.modelName)].edit;
            } catch (e) {};
            var cConf = {
                modelName : that.modelName,
                pk : id,
                actions : ['action-save'],
                customActions : {
                    'action-save' : {
                        afterExecute() {
                            that.reload();
                            // se vogliamo chiudere la popup subito dopo il salvataggio
                            modalObj.hide();
                        }
                    }
                }
            };
            cConf = that.mergeConfView(defaultConf,cConf);
            console.log('viewConf',cConf);
            modalObj = that.createModalView('v-edit',cConf,"Modifica");
        },
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
export default cCalendarMixin
