Vue.component('r-upload-image',{
    extends : Crud.components.renders.rBase, //Crud.components.renders.rHasmanyImageEdit,

    data :  function () {
        var that = this;
        console.log('image edit',that);
        var routeConf =  Utility.cloneObj(that.$Crud.routes.upload);
        var route = Route.factory('upload',routeConf);
        var types = {
            ext : 'r-hidden',
            filename : 'r-hidden',
            original_name : 'r-hidden',
            random : 'r-hidden',
            nome : 'r-input',
            descrizione : 'r-textarea'
        };
        var renders = {
            id : {
                 type : 'r-hidden'
            },
            status : {
                type : 'r-hidden',
                value : 'new'
            },
            nome: {
                type : 'r-input',
            },
            descrizione: {
                type: 'r-textarea'
            },
        };
        var uploadRenders = {
            modelName: {
                type: 'r-hidden',
                //value: that.cConf.metadata.modelName
            },
            type : {
                type : 'r-hidden',
                value : that.cKey,
            },
            nome: {
                type : 'r-input',
            },
            descrizione: {
                type: 'r-textarea'
            },
        }
        var values = [];
        // for (var i in that.cConf.value) {
        //     var newItem = {};
        //     for (var k in renders) {
        //         console.log(i,'key',k,'value',that.cConf.value[i][k])
        //         newItem[that.cKey + '-' + k + '[]'] = {
        //             value : that.cConf.value[i][k]?that.cConf.value[i][k]:'',
        //             type : types[k]?types[k]:'r-input'
        //         }
        //     }
        //     ///imagecache/small/foto_2_1547553970.jpg
        //     newItem.preview = that.cConf.value[i]['full_filename'];
        //     values.push(newItem);
        // }
        //
        // console.log('values',values);
        return {
            //name : this.cConf.name,
            value: values,
            uploadRoute : route.getUrl(),
            error : false,
            errorMessage : '',
            complete:false,
            modelName : 'foto',
            renders : renders,
            uploadRenders : [],
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




            //domainValues : dV,
            //domainValuesOrder : dVO
        }
    },
    methods : {
        add : function () {
            console.log('add')
            jQuery('#d-image-ulpload').modal('show');
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
            this.value.splice(index,1);
        },
        uploadImage : function () {
            var that = this;
            var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
            var route = Route.factory('uploadfile',routeConf);
            //route.params.file = document.getElementById("image-file").files[0]; // jQuery(that.$el).find('input[name="file"]').val();
            //route.params.file = jQuery(that.$el).find('input[name="file"]').prop('files')[0];
            //route.params.modelName = 'test';
            //route.params.type = 'fotos';

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var data = new FormData();
            data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            data.append('modelName','test');
            data.append('type','fotos');

            jQuery.ajax({
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
                that.preview = Server.getUrl('/imagecache/small/' + data.result.filename);
                that.lastUpload = Utility.cloneObj(data.result);

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
            values.type = that.cConf.metadata.relationName;
            values['random_id'] = values.id?values.id:new Date().getTime();
            //values['langs'] = self.langs;
            values['label'] = 'filename'//values[self.labelField]?values[self.labelField]:"";
            console.log('create Form item ' + status,values);
            var renders = {};
            for (var i in that.uploadFields) {
                var field = that.uploadFields[i];
                if (_.indexOf(that.mainformFields,field) < 0)
                    continue;
                renders[that.cKey + "-" + field + "[]"] = {
                    type : 'r-hidden',
                    value : values[field]
                }

            }
            for (var i in that.fields) {
                var field = that.fields[i];
                if (_.indexOf(that.mainformFields,field) < 0)
                    continue;
                var type = 'r-hidden';
                if (that.fieldsConfig[field])
                    type = that.fieldsConfig[field].type || 'r-hidden';
                renders[that.cKey + "-" + field + "[]"] = {
                    type : type,
                    value : values[field]
                }
            }
            renders.preview = status=='new'?values['filename']:values['full_filename'];
            that.value.push(renders);
        }

    },
    template: '#r-hasmany-image-edit-template',
    mounted : function () {
        var that = this;
        jQuery(that.$el).find('[c-image-file]').change(function () {
            //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
            that.uploadImage();
            //jQuery(that.$el).find('form[name="formupload"]').submit();
        });


        // for (var i in that.cConf.value) {
        //     that.createItem(that.cConf.value[i], 'updated');
        // }

        var uploadRenders = {};
        // for (var i in that.uploadFields) {
        //     var field = that.uploadFields[i];
        //     uploadRenders[field] = {
        //         type : 'r-hidden',
        //         value : ''
        //     }
        //
        // }
        // for (var i in that.fields) {
        //     var field = that.fields[i];
        //     var type = 'r-hidden';
        //     if (that.fieldsConfig[field])
        //         type = that.fieldsConfig[field].type || 'r-hidden';
        //     uploadRenders[field] = {
        //         type : type,
        //         value : ''
        //     }
        // }
        //
        // that.uploadRenders = uploadRenders;


        // jQuery(this.$el).find('form[name="formupload"]').ajaxForm({
        //     beforeSubmit: function (a, f, o) {
        //         console.log('before submit',a,f,o);
        //         o.dataType = 'json';
        //         that.error = false;
        //         that.complete = false;
        //     },
        //     error: function (data, error, msg) {
        //         console.log('error',data,error,msg);
        //         that.error = true;
        //         that.errorMessage = "Upload error " + data + " " + error + " " + msg;
        //     },
        //     success: function (data) {
        //         //self.app.waitEnd();
        //         console.log('success',data);
        //         that.error = data.error;
        //         that.lastUpload = null;
        //         if (data.error) {
        //             var msg = null;
        //             try {
        //                 var tmp = JSON.parse(data.msg);
        //                 msg = "";
        //                 for(k in tmp) {
        //                     msg += '<div>'+tmp[k]+'</div>';
        //                 }
        //             } catch(e) {
        //                 msg = data.msg;
        //             }
        //             that.errorMessage = msg;
        //             //self._showError(dialog,msg);
        //             jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
        //             return;
        //         }
        //         that.complete = true;
        //         that.preview = Server.getUrl('/imagecache/small/' + data.result.filename);
        //         that.lastUpload = Utility.cloneObj(data.result);
        //
        //         // // aggiorno i campi di contorno di uploadfoto
        //         // for (var k in data.result) {
        //         //     jQuery(that.$el).find('form[name="formupload"]').find('input[name="' + k + '"]').attr('value', data.result[k]);
        //         // }
        //         //
        //         // jQuery(that.$el).find('[crud-button="ok"]').removeClass("disabled");
        //         // //self.afterUpload(data);
        //     }
        // });
    },
});


