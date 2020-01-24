Vue.component('r-download',{
    extends : crud.components.renders.rBase,
    template: '#r-download-template',
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
        var d = this.defaultData();
        d.icon = 'fa fa-file-o';
        return d;
    }
});