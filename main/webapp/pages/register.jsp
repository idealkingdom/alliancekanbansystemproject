<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />
<link rel="stylesheet" href="css/registerstyle.css">

<title>Registration</title>
</head>
<body>
<div class="container">
			<div class="row main">
				<div class="main-login main-center">
				<h4>Sign Up</h4>
					<form class="" action="#">
						
						<div class="form-group">
							<label for="name" class="cols-sm-2 control-label">First Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="firstname" id="firstname"  placeholder="Enter your First Name"/>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label">Last Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="lastName" id="lastname"  placeholder="Enter your Last Name"/>
								</div>
							</div>
						</div>
						
						<div class="form-group">
							<label for="email" class="cols-sm-2 control-label">Your Email</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label">Username</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="username" id="username"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="password" class="cols-sm-2 control-label">Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>
							<div style="display: inline-block;">
							<label style="" >Gender</label></div>
							<div class="form-group" style="display: inline-block;">
							<div>
									
  									<select class="form-control" id="gender" name="gender">
    								<option value="Male">Male</option>
    								<option value="Male">Female</option>
  									</select>
							</div>
						</div>
							<div style="display: inline-block;margin-left:30px;">
							<label style="" >Age</label></div>
							<div class="form-group" style="display: inline-block;float:right;">
							<div>
									
  									<select class="form-control" id="age">
    								<%for(int i=13;i<100;i++)
    								{%><option value="<%=i%>"><%=i%></option>
    								<%} %>
  									</select>
							</div>
						</div>
						<div class="form-group ">
							<a  type="submit" id="registerButton" class="btn btn-primary btn-lg btn-block login-button">Register</a>
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