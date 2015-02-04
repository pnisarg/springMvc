Ext.define('LoginApp.controller.Home', {
      extend : 'Ext.app.Controller',
      views : ['Home', 'Edit'],
      stores : ['Users', 'Words'],
      models : ['User', 'Word'],
      init : function(application) {
        this.control({
              'home #homegrid' : {
                itemdblclick : this.editRow
              },
              'useredit button[action=save]' : {
                click : this.updateUser
              },
              'home #removeUser' : {
                click : this.removeUser
              },
              'home #logout' : {
                click : this.logout
              }

            });
      },

      editRow : function(grid, record) {
        console.log('Doubleclicked ' + record.get('name'));
        var view = Ext.widget('useredit');
        view.down('form').loadRecord(record);

      },

      updateUser : function(button) {
        var win = button.up('window');
        form = win.down('form');
        record = form.getRecord();
        values = form.getValues();
        record.set(values);
        win.close();
        this.getUsersStore().sync();
      },

      removeUser : function(button) {
        var grid = button.up('grid');
        var sm = grid.getSelectionModel();
        var selection = sm.getSelection()[0];
        this.getStore('Users').remove(selection);
        // this.getStore('Users').remove(sm.getSelection());

        this.getUsersStore().sync();

      },

      logout : function(button) {

        var home = button.up('home')

        FB.logout(function(response) {
              // user is now logged out
             
            });
        Ext.util.Cookies.clear('c_user');
        Ext.util.Cookies.clear('user');

        home.close();
        // Ext.create('LoginApp.view.Login');

        location.href = "/SpringMvc/logout";
        //window.location = "/SpringMvc/index";

      }

    });