
Ext.application({
	
		name: 'LoginApp',
		appFolder: 'app',
		views: ['Login','Home'],
		controllers: ['Login','Home'],
		launch:function(){
			var user= Ext.util.Cookies.get("user");
			if (user === undefined || user == 'null' || user == null || user.length <= 0){
				Ext.widget('login');
			}
			else{
				Ext.widget('home');
			}
			
		}

});