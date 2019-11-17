Vue.component('c-paginator',{
    props : ['c-route-conf','c-route','c-pagination'],
    template : '#c-paginator-template',
    data : function () {
        var that = this;
        PAGINATOR = this;
        console.log('paginator',that.cPagination, that.$parent.pagination )
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
        return Utility.merge(d,pagination);
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
            // that.cRoute.params.page = (parseInt(that.cRoute.params.page)?parseInt(that.cRoute.params.page):1) + 1;
            // console.log('ROUTER',that.cRoute.getUrl(),new Object(that.cRoute.getParams()));
            // router.push({
            //     path : that.cRoute.getUrl(),
            //     query : that.cRoute.getParams()
            // })
            // router.go();
            // return ;

            // var params = JSON.parse(JSON.stringify(that.cRouteConf.params));
            // params['page'] = (parseInt(params['page'])?parseInt(params['page']):1) + 1;
            // that.cRouteConf.params = params;
        },
        setPage : function(page) {
            var that = this;
            var params = JSON.parse(JSON.stringify(that.cRouteConf.params));
            params['page'] = parseInt(page);
            that.cRouteConf.params = params;

        },
        lastPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(that.last_page);
        },
    }
})