
const crud = require('./core/crud');

const coreMixin = require('./core/mixins/coreMixin')
const dialogsMixin = require ('./core/mixins/dialogsMixin');
const mainMixin = require ('./core/mixins/mainMixin');
const choiceMixin = require ('./core/mixins/choiceMixin');

const aBaseMixin = require('./core/mixins/components/actions/aBaseMixin')
const aGroupedMixin = require('./core/mixins/components/actions/aGroupedMixin')
const aOrderMixin = require('./core/mixins/components/actions/aOrderMixin')

const cCalendarMixin = require('./core/mixins/components/app/cCalendarMixin')
const cImportMixin = require('./core/mixins/components/app/cImportMixin')
const cManageMixin = require('./core/mixins/components/app/cManageMixin')
const cPageMixin = require('./core/mixins/components/app/cPageMixin')

const dAlertMixin = require('./core/mixins/components/dialogs/dAlertMixin')
const dBaseMixin = require('./core/mixins/components/dialogs/dBaseMixin')

const cComponentMixin = require('./core/mixins/components/misc/cComponentMixin')
const cPaginatorMixin = require('./core/mixins/components/misc/cPaginatorMixin')
const cWaitMixin = require('./core/mixins/components/misc/cWaitMixin')

// --- views ---
const vActionMixin = require('./core/mixins/components/views/vActionMixin')
const vWidgetMixin = require('./core/mixins/components/views/vWidgetMixin')
const vBaseMixin = require('./core/mixins/components/views/vBaseMixin')
const vCollectionMixin = require('./core/mixins/components/views/vBaseMixin')
const vRecordMixin = require('./core/mixins/components/views/vRecordMixin')
const vListMixin = require('./core/mixins/components/views/vListMixin')
const vListEditMixin = require('./core/mixins/components/views/vListEditMixin')
const vEditMixin = require('./core/mixins/components/views/vEditMixin')
const vInsertMixin = require('./core/mixins/components/views/vInsertMixin')
const vViewMixin = require('./core/mixins/components/views/vViewMixin')
const vSearchMixin = require('./core/mixins/components/views/vSearchMixin')
const vHasmanyMixin = require('./core/mixins/components/views/vHasmanyMixin')


// --- widgets ---
const wBaseMixin = require('./core/mixins/components/widgets/wBaseMixin')
const wAutocompleteMixin = require('./core/mixins/components/widgets/wAutocompleteMixin')
const wB2Select2Mixin = require('./core/mixins/components/widgets/wB2Select2Mixin')
const wB2mSelect2Mixin = require('./core/mixins/components/widgets/wB2mSelect2Mixin')
const wBelongsToMixin = require('./core/mixins/components/widgets/wBelongsToMixin')
const wCheckboxMixin = require('./core/mixins/components/widgets/wCheckboxMixin')
const wCustomMixin = require('./core/mixins/components/widgets/wCustomMixin')
const wDatePickerMixin = require('./core/mixins/components/widgets/wDatePickerMixin')
const wDateSelectMixin = require('./core/mixins/components/widgets/wDateSelectMixin')
const wDateTextMixin = require('./core/mixins/components/widgets/wDateTextMixin')
const wHasmanyMixin = require('./core/mixins/components/widgets/wHasmanyMixin')
const wHasmanyListedMixin = require('./core/mixins/components/widgets/wHasmanyListedMixin')
const wHiddenMixin = require('./core/mixins/components/widgets/wHiddenMixin')
const wImageMixin = require('./core/mixins/components/widgets/wImageMixin')
const wInputMixin = require('./core/mixins/components/widgets/wInputMixin')
const wInputHelpedMixin = require('./core/mixins/components/widgets/wInputHelpedMixin')
const wMapMixin = require('./core/mixins/components/widgets/wMapMixin')
const wMapViewMixin = require('./core/mixins/components/widgets/wMapViewMixin')
const wPreviewMixin = require('./core/mixins/components/widgets/wPreviewMixin')
const wRadioMixin = require('./core/mixins/components/widgets/wRadioMixin')
const wSelectMixin = require('./core/mixins/components/widgets/wSelectMixin')
const wStatusMixin = require('./core/mixins/components/widgets/wStatusMixin')
const wSwapMixin = require('./core/mixins/components/widgets/wSwapMixin')
const wTextMixin = require('./core/mixins/components/widgets/wTextMixin')
const wTextareaMixin = require('./core/mixins/components/widgets/wTextareaMixin')
const wTexthtmlMixin = require('./core/mixins/components/widgets/wTexthtmlMixin')
const wUploadMixin = require('./core/mixins/components/widgets/wUploadMixin')
const wUploadAjaxMixin = require('./core/mixins/components/widgets/wUploadAjaxMixin')

const Server = require('./core/Server')
const Route = require('./core/Routes')
const ProtocolList = require('./core/ProtocolList')
const ProtocolRecord = require('./core/ProtocolRecord')


module.exports = {
    crud,
    coreMixin,
    dialogsMixin,
    mainMixin,
    choiceMixin,
    aBaseMixin,
    aGroupedMixin,
    aOrderMixin,
    cCalendarMixin,
    cImportMixin,
    cManageMixin,
    cPageMixin,
    dAlertMixin,
    dBaseMixin,
    cComponentMixin,
    cPaginatorMixin,
    cWaitMixin,
    vActionMixin,
    vWidgetMixin,
    vBaseMixin,
    vCollectionMixin,
    vRecordMixin,
    vListMixin,
    vListEditMixin,
    vEditMixin,
    vInsertMixin,
    vViewMixin,
    vSearchMixin,
    vHasmanyMixin,
    wBaseMixin,
    wAutocompleteMixin,
    wB2Select2Mixin,
    wB2mSelect2Mixin,
    wBelongsToMixin,
    wCheckboxMixin,
    wCustomMixin,
    wDatePickerMixin,
    wDateSelectMixin,
    wDateTextMixin,
    wHasmanyMixin,
    wHasmanyListedMixin,
    wHiddenMixin,
    wImageMixin,
    wInputMixin,
    wInputHelpedMixin,
    wMapMixin,
    wMapViewMixin,
    wPreviewMixin,
    wRadioMixin,
    wSelectMixin,
    wStatusMixin,
    wSwapMixin,
    wTextMixin,
    wTextareaMixin,
    wTexthtmlMixin,
    wUploadMixin,
    wUploadAjaxMixin,
    Server,
    Route,
    ProtocolList,
    ProtocolRecord,
}





