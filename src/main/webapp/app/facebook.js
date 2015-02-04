function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    testAPI();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
}

//loading facebook API
window.fbAsyncInit = function() {
  FB.init({
        appId : '1714268182132814',
     
        xfbml : true,
        version : 'v2.1'
      });

  FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
};

// Load the SDK asynchronously	
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "resources/fbJdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logout(){
	 FB.logout(function(response) {
              // user is now logged out
             
            });
}

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';

      var user = Ext.util.Cookies.get("user");

    if (user === undefined || user == 'null' || user == null || user.length <= 0) {
      Ext.util.Cookies.set("user", response.name);
       window.location = "/SpringMvc/index";
       

    } 

    });
}