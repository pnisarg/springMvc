var strTitle = 'ZAutomate';
var user = Ext.util.Cookies.get("user");
Ext.define('LoginApp.view.Home', {
      extend : 'Ext.panel.Panel',

      title : 'Zautomate',
      alias : 'widget.home',
      layout : 'border',
      frame : true,
      width : 1300,
      height : 600,
      bodyPadding : 10,
      // icon : 'resources/extjs/images/icon/batman.ico',
      frameHeader : true,
      titleAlign : 'center',
      renderTo : Ext.getBody(),
      header : {
        titlePosition : 0,
        padding : 5,
        items : [{
              xtype : 'button',
              text : 'Logout',
              handler : function(button) {
              	var home = button.up('home')
                Ext.util.Cookies.clear('user');
              	home.close();
              	Ext.create('LoginApp.view.Login');
              }
            }]
      },
      items : [{
            xtype : 'panel',
            height : 400,
            flex : 3,
            bodyPadding : 15,
            region : 'center',
            frame : true,
            frameHeader : false,
            header : false,

            items : [{
                  xtype : 'grid',
                  itemId : 'homegrid',
                  title : 'User Data',
                  // plugins : 'rowediting',
                  store : 'Users',
                  tbar : [{
                        xtype : 'button',
                        itemId : 'removeUser',
                        text : 'Remove User',
                        icon : 'resources/extjs/images/icon/Remove-Male-User-icon.png'
                      }],
                  columns : [{
                        text : 'Name',
                        dataIndex : 'firstName',
                        flex : 1,
                        editor : 'textfield'
                      }, {
                        text : 'lastName',
                        dataIndex : 'lastName',
                        flex : 1,
                        editor : 'textfield'
                      }, {
                        text : 'Email',
                        dataIndex : 'email',
                        editor : 'textfield',
                        flex : 2
                      }, {
                        text : 'userName',
                        dataIndex : 'userName',
                        flex : 1,
                        editor : 'textfield'
                      }, {
                        text : 'password',
                        dataIndex : 'password',
                        flex : 1,
                        editor : 'textfield'
                      }, {
                        text : 'salt',
                        dataIndex : 'salt',
                        flex : 1,
                        editor : 'textfield'
                      }]
                }]
          }, {
            xtype : 'panel',
            height : 400,
            flex : 1,
            region : 'east',
            bodyPadding : 15,
            buttonAlign : 'center',
            frame : true,
            frameHeader : false,
            header : false,
            collapsible : true,
            split : true,
            layout : 'fit',

            items : [{
                  xtype : 'grid',
                  itemId : 'dictgrid',
                  title : 'Dictionary',

                  plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit : 2
                      })],
                  store : 'Words',
                  tbar : [{
                        xtype : 'button',
                        itemId : 'addWord',
                        text : 'Add Word',
                        icon : 'resources/extjs/images/icon/Button-Add-icon.png',
                        handler : function() {
                          var r = Ext.create('LoginApp.model.Word', {
                                name : 'name',
                                definition : 'definition'
                              });
                          Ext.getStore('Words').insert(0, r);
                          Ext.getStore('Words').load();

                        }
                      }, {
                        xtype : 'button',
                        itemId : 'removeWord',
                        text : 'remove Word',
                        icon : 'resources/extjs/images/icon/Button-Delete-icon.png',
                        handler : function(button) {
                          var grid = button.up('grid');
                          var sm = grid.getSelectionModel();
                          Ext.getStore('Words').remove(sm.getSelection());
                          if (Ext.getStore('Words').getCount() > 0) {
                            sm.select(0);
                          }
                        }
                      }],
                  columns : [{
                        text : 'id',
                        dataIndex : 'id',
                        flex : 1

                      }, {
                        text : 'name',
                        dataIndex : 'name',
                        flex : 1,
                        editor : 'textfield'
                      }, {
                        text : 'definition',
                        dataIndex : 'definition',
                        editor : 'textfield',
                        flex : 2

                      }]
                }]

          }]

    });