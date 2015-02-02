Ext.define('LoginApp.model.Word',{
	extend:'Ext.data.Model',
	fields:['id','name','definition'],
	proxy : {
        type : 'rest',
        url : '/SpringMvc/words',

        reader : {
          type : 'json',
//          root : 'users',
          successProperty : 'success'
        },
        writer : {
          type : 'json'
        }
      }
});