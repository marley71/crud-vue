import crud from "../../../crud";

crud.conf['w-select'] = {
    domainValues: {},
    domainValuesOrder: []
}

const wSelectMixin = {
    methods: {
        getFieldName: function () {
            return this.name;
        }
    }
}
export default wSelectMixin
