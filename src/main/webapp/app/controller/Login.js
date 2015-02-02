/*
 * Controller for Login and user Registration page.
 */

Ext.define('LoginApp.controller.Login', {
      extend : 'Ext.app.Controller',
      views : ['Login', 'Register'],
      init : function(application) {
        // Event listeners
        this.control({
              'login #submit' : {
                click : this.submitForm
              },
              '#cancel' : {
                click : this.resetForm
              },
              '#register' : {
                click : this.createNewuser
              },
              'register #submit' : {
                click : this.registerNewuser
              },
              "login form textfield" : {
                specialkey : this.onTextfieldSpecialKey
              }
            });

      },

      // validate submitted login form and take care of ui rendering
      submitForm : function(button, e, option) {
        var form = button.up('form');
        var login = button.up('login')
        var user = form.down('textfield[name=user]').getValue();
        var password = form.down('textfield[name=password]').getValue();

        if (form.getForm().isValid()) {
          Ext.get(login.getEl()).mask("Authenticating....", "Loading");
          Ext.Ajax.request({
                url : '/SpringMvc/login',
                params : {
                  user : user,
                  password : password
                },
                failure : function(conn, response, option, eOpts) {
                  Ext.get(login.getEl()).unmask();
                  Ext.Msg.show({
                        title : 'Error',
                        msg : conn.responseText,
                        icon : Ext.Msg.ERROR,
                        buttons : Ext.Msg.OK
                      })
                },
                success : function(conn, response, options, eOpts) {
                  /*
                   * Setting true will ensure that no errors are thrown if
                   * server did not return a json format.(incase of error)
                   */
                  console.log("in success function");
                  var result = Ext.JSON.decode(conn.responseText, true);
                  // if return string was not json than result will be null
                  if (!result) {
                    result = {};
                    result.success = false;
                    result.msg = conn.responseText;
                  }
                  if (result.success == 'true') {
                    console.log("authentication successful");
                    login.close();
                    Ext.util.Cookies.set("user",user);
                    Ext.create('LoginApp.view.Home');
//                    location.href = '/SpringMvc/index';
                    // Ext.create('Packt.view.MyViewport');

                  } else {
                    Ext.Msg.show({
                          title : 'Fail!',
                          msg : result.msg,
                          icon : Ext.Msg.ERROR,
                          buttons : Ext.Msg.OK
                        });
                  }
                  Ext.get(login.getEl()).unmask();

                }
              });
        }
      },
      // on click cancel button
      resetForm : function(button, e, options) {
        button.up('form').getForm().reset();
      },

      // on click register
      createNewuser : function(button, e, options) {
        // load register view
        var view = Ext.widget('register');
      },
      
      //allow to submit form on Enter key press
      onTextfieldSpecialKey : function(field, e, options) {
        if (e.getKey() == e.ENTER) {
          var submitBtn = field.up('form').down('button#submit');
          submitBtn.fireEvent('click', submitBtn, e, options);
        }
      },

      // validate regiter form and take care of ui rendering
      registerNewuser : function(button, e, options) {

        var form = button.up('form');
        var register = button.up('register')
        var user = form.down('textfield[name=user]').getValue();
        var password = form.down('textfield[name=password]').getValue();
        var first = form.down('textfield[name=firstName]').getValue();
        var last = form.down('textfield[name=lastName]').getValue();
        var email = form.down('textfield[name=email]').getValue();
        // console.log(user+ ' ' + password+' ' + first+ ' ' + last+' ' +
        // email);
        if (form.getForm().isValid()) {
          Ext.get(register.getEl()).mask("Registering new User....", "Loading");
          Ext.Ajax.request({
                url : '/SpringMvc/register',
                params : {
                  user : user,
                  pass : password,
                  first : first,
                  last : last,
                  email : email
                },
                failure : function(conn, response, option, eOpts) {
                  Ext.get(register.getEl()).unmask();
                  Ext.Msg.show({
                        title : 'Error',
                        msg : conn.responseText,
                        icon : Ext.Msg.ERROR,
                        buttons : Ext.Msg.OK
                      })
                },
                success : function(conn, response, option) {
                  Ext.get(register.getEl()).unmask();
                  Ext.Msg.show({
                        title : 'Registration Success',
                        msg : 'Registration successful! ',
                        icon : Ext.Msg.OK,
                        buttons : Ext.Msg.OK
                      });
                  register.close();
                  // console.log("user registered successfully");
                }
              });
        }
      }
    });