Ext.define('LoginApp.view.Edit', {
      extend : 'Ext.window.Window',
      alias : 'widget.useredit',
      title : 'Edit User',
      layout : 'fit',
      autoShow : true,

      initComponent : function() {
        this.items = [{
              xtype : 'form',
              bodyPadding : 10,
              defaults : {
                xtype : 'textfield',
                anchor : '100%',
                labelWidth : 60,
                allowBlank : false,
                msgTarget : 'under',
                width : 350
              },
              items : [{
                    name : 'firstName',
                    fieldLabel : 'First Name',
                     allowBlank: false,
                  }, {
                    name : 'lastName',
                    fieldLabel : 'Last Name',
                    allowBlank: false
                  }, {
                    name : 'email',
                    fieldLabel : 'Email',
                    vtype: 'email'

                  }]
            }];

        this.buttons = [{
              text : 'Save',
              action : 'save'
            }, {
              text : 'Cancel',
              scope : this,
              handler : this.close
            }];

        this.callParent(arguments);
      }
    });