Vue.component('r-hasmany-attachment-edit',{
    extends : crud.components.renders.rBase,

    data :  function () {
        var that = this;
        var routeConf =  Utility.cloneObj(that.$crud.routes.uploadfile);
        var route = Route.factory('uploadfile',routeConf);
        var types = {
            ext : 'r-hidden',
            filename : 'r-hidden',
            original_name : 'r-hidden',
            random : 'r-hidden',
            nome : 'r-input',
            descrizione : 'r-textarea'
        };
        var d = this.defaultData();
        var myd =  {
            //name : this.cConf.name,
            //value: values,
            uploadRoute : route.getUrl(),
            error : false,
            errorMessage : '',
            complete:false,
            modelName : 'foto',
            renders : [],
            uploadRenders : {},
            preview : null,
            lastUpload : null,
            types : types,
            uploadFields : ['ext','random','id','status','original_name','filename','mimetype','modelName','type'],
            fields : ['nome','descrizione'],
            fieldsConfig : {
                nome : { type : 'r-input'},
                descrizione : {type : 'r-textarea'},
            },
            mainformFields : ['nome','descrizione','original_name','filename','ext','random','id','status','mimetype'],

            iconType : 'default'

        }
        return Utility.merge(d,myd);
    },
    methods : {
        itemTitle : function(index) {
            var that = this;
            var title = "";
            var r = that.renders[index];
            console.log('renders',r);
            if (r){
                title = r.nome?r.nome: (r.full_filename?r.full_filename:'');
            }
            return (title.length > 12?title.substr(0,12)+'...':title);
        },
        add : function () {
            console.log('add')
            jQuery('#d-attachment-ulpload').modal('show');
            return ;

            var d = new uploadDialog().$mount('#dialog-mount');
            jQuery('#d-image-ulpload').
            jQuery('#d-image-ulpload').modal('show');
        },
        addItem : function () {
            var that = this;
            jQuery.each(jQuery(that.$el).find('[c-marker]'),function () {
                that.lastUpload[jQuery(this).attr('c-marker')] = jQuery(this).val();
            })
            that.createItem(that.lastUpload,'new');
            //that.lastUpload['nome'] = jQuery(that.$el).find('form[name="formupload"]').find('input[name="nome"]').val();
            //that.lastUpload['descrizione'] = jQuery(that.$el).find('form[name="formupload"]').find('textarea[name="descrizione"]').val();
            // var newItem = {};
            // for (var k in that.renders) {
            //     newItem[that.cKey + '-' + k + '[]'] = {
            //         value : that.lastUpload[k],
            //         type : that.types[k]?that.types[k]:'r-input'
            //     }
            // }
            // that.value.push(newItem);
            // console.log('VALUE',that.value);
            // console.log(that);
        },
        deleteItem : function (index) {
            this.renders.splice(index,1);
        },
        uploadImage : function () {
            var that = this;
            var routeConf =  Utility.cloneObj(that.$crud.routes.uploadfile);
            var route = Route.factory('uploadfile',routeConf);
            //route.params.file = document.getElementById("image-file").files[0]; // jQuery(that.$el).find('input[name="file"]').val();
            //route.params.file = jQuery(that.$el).find('input[name="file"]').prop('files')[0];
            //route.params.modelName = 'test';
            //route.params.type = 'fotos';

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var data = new FormData();
            data.append('file',jQuery(that.$el).find('[c-attachment-file]').prop('files')[0]);
            data.append('modelName','test');
            data.append('type','attachments');

            jQuery.ajax({
                headers: {
                    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                },
                url: realUrl,
                type: 'POST',
                data: data,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function(data){
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!",data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for(k in tmp) {
                            msg += '<div>'+tmp[k]+'</div>';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.complete = true;
                that.preview = that.$crud.icons.mimetypes[data.result.ext]?that.$crud.icons.mimetypes[data.result.ext]:that.$crud.icons.mimetypes[that.iconType] //Server.getUrl('/imagecache/small/' + data.result.filename);
                that.lastUpload = Utility.cloneObj(data.result);
                for (var k in data.result) {
                    console.log('update field',k,data.result[k],jQuery(that.$el).find('[c-marker="' + k + '"]').length);
                    jQuery(that.$el).find('[c-marker="' + k + '"]').val(data.result[k]);
                }

            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });

            // Server.route(route, function (json) {
            //     that.error = json.error;
            //     that.errorMessage = json.msg;
            //
            // })
        },
        createItem : function (values,status) {
            var that = this;
            values.status=status;
            values.type = that.conf.metadata.relationName;
            values['random_id'] = values.id?values.id:new Date().getTime();
            //values['langs'] = self.langs;
            values['label'] = 'filename'//values[self.labelField]?values[self.labelField]:"";
            console.log('create Form item ' + status,values);
            var renders = {};
            for (var i in that.uploadFields) {
                var field = that.uploadFields[i];
                if ( that.mainformFields.indexOf(field) < 0)
                    continue;
                renders[that.cKey + "-" + field + "[]"] = {
                    type : 'r-hidden',
                    value : values[field]
                }

            }
            for (var i in that.fields) {
                var field = that.fields[i];
                if (that.mainformFields.indexOf(field) < 0)
                    continue;
                var type = 'r-hidden';
                if (that.fieldsConfig[field])
                    type = that.fieldsConfig[field].type || 'r-hidden';
                renders[that.cKey + "-" + field + "[]"] = {
                    type : type,
                    value : values[field]
                }
            }
            renders.preview = that.$crud.icons.mimetypes[values.ext]?that.$crud.icons.mimetypes[values.ext]:that.$crud.icons.mimetypes[that.iconType];
            that.renders.push(renders);
        }

    },
    template: '#r-hasmany-attachment-edit-template',
    mounted : function () {
        var that = this;
        // jQuery(that.$el).find('[c-image-file]').autoUpload(function () {
        //     //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
        //     that.uploadImage();
        //     //jQuery(that.$el).find('form[name="formupload"]').submit();
        // });

        jQuery(that.$el).find('[c-attachment-file]').change(function () {
            //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
            that.uploadImage();
            //jQuery(that.$el).find('form[name="formupload"]').submit();
        });


        for (var i in that.conf.value) {
            that.createItem(that.conf.value[i], 'updated');
        }

        var uploadRenders = {};
        for (var i in that.uploadFields) {
            var field = that.uploadFields[i];
            uploadRenders[field] = {
                type : 'r-hidden',
                value : ''
            }

        }
        for (var i in that.fields) {
            var field = that.fields[i];
            var type = 'r-hidden';
            if (that.fieldsConfig[field])
                type = that.fieldsConfig[field].type || 'r-hidden';
            uploadRenders[field] = {
                type : type,
                value : ''
            }
        }

        that.uploadRenders = uploadRenders;

    },
});


