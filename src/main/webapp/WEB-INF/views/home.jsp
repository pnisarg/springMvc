<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Home</title>

<link href="resources/extjs/ext-theme-neptune-all.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="resources/extjs/ext-all.js"></script>
<script type="text/javascript" src="app/facebook.js"></script>
<script type="text/javascript" src="app/app.js"></script>

</head>
<body>
	

<!-- 	<div class="fb-like" data-send="true" data-width="450"
		data-show-faces="true"></div>

	<div class="fb-login-button" data-size="large" data-show-faces="false"
		data-auto-logout-link="false"></div> -->

	<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>

	<div id="status"></div>
</body>
</html>
