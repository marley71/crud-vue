import crud from "../../../crud";

crud.conf['w-hidden'] = {
}

const wHiddenMixin = {
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
export default wHiddenMixin
