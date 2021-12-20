const vWidgetMixin = {
    data: function () {
        var templateConf = {
            name: 'tpl-no'
        }
        if (this.cWidget) {
            var conf = null
            if (typeof this.cWidget === 'string' || this.cWidget instanceof String) {
                conf = this.getDescendantProp(window, this.cWidget)
                if (!conf) {
                    conf = this.getDescendantProp(this.$crud.conf, this.cWidget)
                }
            } else {
                conf = this.cWidget
            }
            conf = conf || {}
            // console.log('cWidget conf ', conf);
            let id = 'd' + (new Date().getTime())
            // check se template e' una stringa o una configurazione
            if (typeof conf.template === 'string' || conf.template instanceof String) {
                //console.log('istanza di una stringa ',conf.template)
                templateConf.name = conf.template
            } else if (conf.template instanceof Object) {
                //console.log('NON istanza di una stringa ',conf.template)
                templateConf = conf.template;
            }
            //console.log('templateConf',templateConf);
            return {
                templateConf: templateConf,
                conf: conf,
                id: id
            }
        }

        console.warn('configurazione non valida', this.cWidget)
        return {
            templateConf: templateConf,
            conf: {
                type: 'w-text'
            }
        }
    },
    methods: {
      getTemplateName () {
          //console.log('cTemplate',this.cTemplate,this)
          return this.templateConf.name;
      }
    }
}
export default vWidgetMixin
