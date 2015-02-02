Ext.define('LoginApp.store.Users', {
      extend : 'Ext.data.Store',
      model : 'LoginApp.model.User',
      autoLoad : true,

      proxy : {
        type : 'rest',
        url : '/SpringMvc/userData',
		
        reader : {
          type : 'json',
          root : 'users',
          successProperty : 'success'
        },
        writer : {
          type : 'json'
        }
      }
    });