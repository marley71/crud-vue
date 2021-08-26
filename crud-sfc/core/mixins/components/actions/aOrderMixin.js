import crud from '../../../crud'

crud.conf['a-order'] = {
    componentName : 'a-order',
    confParent: 'a-base',
    type: 'collection',
    title: 'app.order',
    css: 'btn btn-default btn-sm mr-1',
    iconSortAsc: 'fa fa-sort-up',
    iconSortDesc: 'fa fa-sort-down',
    iconSort: 'fa fa-sort',
    icon: null,
    text: ''
}

const aOrderMixin = {
    mounted: function () {
        var direction = this.cConf.orderDirection ? this.cConf.orderDirection.toLowerCase() : null;
        if (direction == 'desc')
            this.icon = this.iconSortDesc;
        else if (direction == 'asc')
            this.icon = this.iconSortAsc
        else
            this.icon = this.iconSort;
        if (this.text) {
            var langKey = (this.view && this.view.langContext) ? this.view.langContext + '.' + this.text : this.text;
            if (this.hasTranslation(langKey + '.label'))
                this.text = this.translate(langKey + '.label')
        }
    },
    methods : {
        execute: function () {
            console.log('order execute', this);
            var that = this;
            if (that.view.route) {
                var params = that.view.route.getParams();
                params.order_field = that.orderField;
                params.order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc') ? 'ASC' : 'DESC';
                that.view.route.setParams(params);
                that.view.reload();
            } else {
                var order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc') ? 'ASC' : 'DESC';
                that.view.staticOrder(that.orderField, order_direction);
            }

        }
    }
}
export default aOrderMixin
