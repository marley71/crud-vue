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
        }
    }
}
export default cCalendarMixin
