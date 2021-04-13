import Server from '../../Server'
import jQuery from 'jquery'
import Vue from 'vue'
import crud from "../../crud";

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
            // var htmlNode = jQuery(html);
            //
            // if (htmlNode.find('html').length >= 1) {
            //     console.log(htmlNode.html())
            //     throw new Error({ code : 500, message: 'Invalid html'})
            // }
            // console.log(jQuery(html).is('html'));

            var htmlNode = jQuery('<div>' + html + '</div>');
            // contiene il tag html => pagina principale
            if (htmlNode.find('html').length >= 1) {
                console.log(htmlNode.html())
                throw new Error({ code : 500, message: 'Invalid html'})
            }
            console.log(htmlNode.html());



            jQuery.each(htmlNode.find('script'), function () {
                //console.log('script',jQuery(this).text());
                jQuery('body').append(jQuery(this));
                jQuery(this).remove();
            })

            //console.log('html', htmlNode.html());
            Vue.prototype.$crud = that.$crud;
            var cdef = Vue.component('async-comp', {
                extends: that.$options.components['c-component'],
                template: htmlNode.html()
            });
            //cdef.prototype.$crud = that.$crud;

            var id = 'd' + (new Date().getTime());

            //jQuery('#' + that.contentId).html('<div id="' + id + '" ></div>');
            //console.log('componente container length id ' + id,jQuery('#' + id).length);
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
