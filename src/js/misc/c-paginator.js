crud.components.misc.crudCPaginator = Vue.component('crud-c-paginator',{
    extends : crud.components.cComponent,
    props : ['c-pagination'],
    data : function () {
        var that = this;
        //console.log('paginator',that.cPagination, that.$parent.pagination )
        var pagination = that.cPagination || that.$parent.data.pagination || {};
        var d = {
            current_page : 0,
            from : 0,
            to : 0,
            last_page : 0,
            per_page : 0,
            total : 0,
            pagination_steps : {}
        }
        return this.merge(d,pagination);
    },
    methods : {
        firstPage : function () {
            var that = this;
            if (parseInt(that.current_page) == 1)
                return ;
            that.setPage(1);
        },
        prevPage : function () {
            var that = this;
            if (parseInt(that.current_page) <= 1)
                return ;
            that.setPage(parseInt(that.current_page) - 1);
        },
        nextPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(parseInt(that.current_page) + 1);
        },
        setPage : function(page) {
            var that = this;
            var route = that.$parent.route;

            var params = route.getParams();
            params['page'] = parseInt(page);
            route.setParams(params);
            that.$parent.reload();
        },
        lastPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(that.last_page);
        },
    }
})
