import crud from "../../../crud";

crud.conf['w-input'] = {
    inputType: 'text',
    placeholder: ''
}

const wInputMixin = {
    methods : {
        getValue() {
            return this.jQe('input').val();
        },
        setValue(value) {
            this.value = value;
            this.jQe('input').val(value);
        }
    }
}
export default wInputMixin
