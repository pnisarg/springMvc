Ext.define('LoginApp.model.User',{
	extend:'Ext.data.Model',
	fields:['userName','firstName','lastName','password','email','salt'],
	idProperty : 'userName'
});