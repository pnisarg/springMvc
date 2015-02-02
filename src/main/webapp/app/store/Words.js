Ext.define('LoginApp.store.Words', {
      extend : 'Ext.data.Store',
      model : 'LoginApp.model.Word',
      autoLoad : true,
      autoSync : true
	  
    });