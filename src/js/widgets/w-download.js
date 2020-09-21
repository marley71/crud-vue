crud.components.widgets.coreWDownload = Vue.component('core-w-download',{
    extends : crud.components.widgets.wBase,
    mounted : function() {
        var that  =this;
        var url = that.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                console.log(this.status);
                console.log(this.getResponseHeader("Content-Type"));
            }
        };
        xhttp.send();
    },
    data : function () {
        var d = this._loadConf();
        d.icon = 'fa fa-file-o';
        return d;
    }
});
