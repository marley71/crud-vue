import crud from "../../../crud";

crud.conf['c-paginator'] = {
    confParent: 'c-component',
    current_page: 0,
    from: 0,
    to: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
    pagination_steps: {}
}

const cPaginatorMixin = {
    methods: {
        firstPage () {
            var that = this;
            if (parseInt(that.current_page) == 1)
                return;
            that.setPage(1);
        },
        prevPage () {
            var that = this;
            if (parseInt(that.current_page) <= 1)
                return;
            that.setPage(parseInt(that.current_page) - 1);
        },
        nextPage: function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return;
            that.setPage(parseInt(that.current_page) + 1);
        },
        setPage: function (page) {
            var that = this;
            var route = that.$parent.route;
            route.setParam('page',page);
            // var params = route.getParams();
            // params['page'] = parseInt(page);
            // route.setParams(params);
            that.$parent.reload();
        },
        lastPage: function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return;
            that.setPage(that.last_page);
        },
    }
}
export default cPaginatorMixin
