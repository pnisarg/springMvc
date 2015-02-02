

Ext.define('LoginApp.view.Login', {
      extend : 'Ext.window.Window',
      alias : 'widget.login',
      autoShow : true,
      height : 170,
      width : 360,
      layout : {
        type : 'fit'
      },
      title : 'Login',
      closable : false,
      closeAction : 'hide',
      resizable : false,
      draggable : false,
      icon: 'resources/extjs/images/icon/key.png',
      items : [{
            xtype : 'form',
            frame : false,
            bodyPadding : 15,
            defaults : {
              xtype : 'textfield',
              anchor : '100%',
              labelWidth : 60,
              allowBlank : false,
              vtype : 'alphanum',
              minLength : 3,
              msgTarget : 'under'
            },
            dockedItems : [{
                  xtype : 'toolbar',
                  dock : 'bottom',
                  items : [{
                        xtype : 'tbfill' // fill with blank space (align right)
                      },{
                        xtype : 'button',
                        itemId : 'cancel',
                        text : 'Reset'
                        
                      }, {
                        xtype : 'button',
                        itemId : 'register',
                        text : 'Register'

                      }, {
                        xtype : 'button',
                        itemId : 'submit',
                        text : 'Login',
                        formBind : true,
                        icon : 'resources/extjs/images/icon/lock_unlock_01.png'
                      }]
                }],
            items : [{
                  name : 'user',
                  fieldLabel : 'Username',
                  maxLength : 20
                }, {
                  name : 'password',
                  inputType : 'password',
                  fieldLabel : 'Password',
                  maxLength : 20
                  
                }]
          }]
    })