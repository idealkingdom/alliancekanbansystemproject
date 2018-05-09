<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />
<link rel="stylesheet" href="css/registerstyle.css">

<title>Login</title>
</head>
<body>
<div class="container">
			<div class="row main">
				<div class="main-login main-center">
				<h4>Login</h4>
					<form class="" method="post" action="#">
						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label">First Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="username" id="username"  placeholder="Enter your First Name"/>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="password" class="cols-sm-2 control-label">Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>


						<div class="form-group ">
						   <a  type="submit" name="LoginButton" id="loginButton" class="btn btn-primary btn-lg btn-block login-button">Log In</a>
							<a  type="submit" href="register" name="RegButton" id="regButton" class="btn btn-primary btn-lg btn-block Register-button">Register</a>
						</div>
						
					</form>
				</div>
			</div>
		</div>


</body>
	<script src="lib/js/jquery-1.10.1.min.js"></script>
	<script src="lib/js/bootstrap.min.js"></script>
	<script src="js/common.js"></script>
</html>