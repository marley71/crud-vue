import Server from '../../../Server'
import Vue from 'vue'

const cPageMixin = {
    beforeDestroy() {
        if (this.component)
            this.component.$destroy();
    },
    mounted() {
        var that = this;

        var route = that.createRoute('pages');
        var path = that.cPath.replaceAll('/', '.');
        route.setValues({
            path: path
        })
        var params = {};
        route.setParams(params);
        Server.route(route, function (html) {
            if (html.error) {
                that.errorDialog(html.msg);
                return;
            }
            var htmlNode = window.jQuery('<div>' + html + '</div>');
            // contiene il tag html => pagina principale
            if (htmlNode.find('html').length >= 1) {
                // console.log(htmlNode.html())
                throw new Error({ code : 500, message: 'Invalid html'})
            }
            window.jQuery.each(htmlNode.find('script'), function () {
                // console.log('script',window.jQuery(this).text());
                window.jQuery('body').append(window.jQuery(this));
                window.jQuery(this).remove();
            })

            // console.log('html', htmlNode.html());
            var id = Math.floor(Math.random()*1000);
            Vue.prototype.$crud = that.$crud;
            var cdef = Vue.component('page'+id, {
                extends: that.$options.components['c-component'],
                template: htmlNode.html()
            });
            var componente = new cdef();
            componente.$mount('#page_container' );
            that.component = componente;

        })
    },
    data() {
        return {
            component : null,
        }
    }

}
export default cPageMixin
