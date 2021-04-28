import crud from "../../../crud";

crud.conf['w-input-helped'] = {
    domainValues: {},
    domainValuesOrder: [],
    customValue: false
}

const wInputHelpedMixin = {
    methods: {
        getFieldName: function () {
            return this.name
        }
    }
}
export default wInputHelpedMixin
