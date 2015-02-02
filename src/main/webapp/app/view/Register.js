Ext.define('LoginApp.view.Register',{
	extend: 'Ext.window.Window',
	alias: 'widget.register',
	autoShow: true,
	height: 400,
	width: 380,
	layout: {
		type: 'fit'
	},
	title: 'Register New User',
	icon: 'resources/extjs/images/icon/key.png',
	items: [{
		xtype: 'form',
		frame: false,
		bodyPadding: 15,
		defaults:{
			xtype: 'textfield',
			anchor: '100%',
			labelWidth:90,
			allowBlank: false,
			vtype: 'alphanum',
			margin: 10,
			minLength: 3,
			msgTarget: 'under'
		},
		dockedItems:[{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				xtype: 'button',
				itemId: 'cancel',
				text: 'Cancel'
			},{
				xtype: 'button',
				itemId: 'submit',
				text: 'Submit',
				formBind:true,
				icon : 'resources/extjs/images/icon/lock_unlock_01.png'
			}]
		}],
		items: [{
			name: 'user',
			fieldLabel: 'Username',
			maxLength: 20
		},{
			name: 'password',
			inputType: 'password',
			fieldLabel: 'Password',
			maxLength: 20,
			id: 'password'
		},{
			name: 'confirmPassword',
			inputType: 'password',
			fieldLabel: 'Confirm Password:',
			maxLength: 20
//			vtype: 'password',
//			initialpassField: 'password'
		},{
			name: 'firstName',
			fieldLabel: 'First Name',
			maxLength: 20
		},{
			name: 'lastName',
			fieldLabel: 'Last Name',
			maxLength: 20
		},{
			name: 'email',
			fieldLabel: 'Email',
			vtype: 'email'
		}]
	}]
});

