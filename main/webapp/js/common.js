var ROOT_URL = "http://localhost:8081/SoaBaseCode/";

$(document).ready(function() {
	loadKanban();
});

/*function loadUserForm() {
	$.ajax({
		url: ROOT_URL + 'modulename/userform',
		type: "get",
		dataType: "text"
	}).done(function(data) {
		$('#main-container').html(data);
	});
}*/


function loadKanban() {
	$.ajax({
		url: ROOT_URL + 'kanban',
		type: "get",
		dataType: "text"
	}).done(function(data) {
		$('#main-kanban').html(data);
	});
}

function bindUserFormEvents() {
	
	$('#lnk_home').click(function(){
		$('#lnk_home').addClass("active");
		$('#lnk_profile').removeClass("active");
		$('#lnk_messages').removeClass("active");
	});
	
	$('#lnk_profile').click(function(){
		$('#lnk_home').removeClass("active");
		$('#lnk_profile').addClass("active");
		$('#lnk_messages').removeClass("active");
		
		$.ajax({
			url: ROOT_URL + 'modulename/profile',
			type: "get",
			dataType: "text"
		}).done(function(data) {
			$('#tab-content').html(data);
		});
	});
	
	$('#lnk_messages').click(function(){
		$('#lnk_home').removeClass("active");
		$('#lnk_profile').removeClass("active");
		$('#lnk_messages').addClass("active");
		
		$.ajax({
			url: ROOT_URL + 'modulename/messages',
			type: "get",
			dataType: "text"
		}).done(function(data) {
			$('#tab-content').html(data);

		});
	});
	
	$('#save-btn').click(function(){

		if($("#fname").val() === '' || $("#lname").val() === '' || $('#uid').val() === '') {
			$('#alert-area').removeClass('alert-success');
			$('#alert-area').addClass('alert-danger');
			$('#alert-area').html("Missing required fields.");
		} else {
			var gender = 'female';
			
			if($('#btn-male').hasClass('active')){ gender = 'male';}
			
			$.ajax({
				url: ROOT_URL + 'api/saveUser',
				type: "post",
				data: {fname: $("#fname").val()
						, lname: $("#lname").val()
						, uid: $('#uid').val()
						, gender: gender
						, age: $('#age').val()}
			}).done(function(data) {
				if(data.fname) {
					$('#alert-area').removeClass('alert-danger');
					$('#alert-area').addClass('alert-success');
					$('#alert-area').html("Successfully saved " + data.fname);
				} else {
					$('#alert-area').removeClass('alert-success');
					$('#alert-area').addClass('alert-danger');
					$('#alert-area').html("There is already an existing user.");	
				}
			});
		}
	});
	
	$('#search-btn').click(function(){
		if($("#uid").val().trim() != '') {
			$.ajax({
				url: ROOT_URL + 'api/searchUser/'+ $("#username").val(),
				type: "get"
			}).done(function(data) {
				if (data.fname) {
					$('#search_result').empty();
					$('#search_result').append("<li class='list-group-item'>" + data.fname + " " + data.lname + "</li>");
				} else {
					$('#alert-area').removeClass('alert-success');
					$('#alert-area').removeClass('alert-danger');
					$('#alert-area').addClass('alert-danger');
					$('#alert-area').html("Cannot find user.");
				}
			});
		}
	});
	
	$('#search-all-btn').click(function(){
		$.ajax({
			url: ROOT_URL + 'api/searchAllUsers',
			type: "get"
		}).done(function(data) {
			$('#search_result').empty();
			data.forEach(function(user){
				$('#search_result').append("<li class='list-group-item'>" + user.fname + " " + user.lname + "</li>");
			});
		});
	});
	
	$('#btn-male').click(function(){
		$('#btn-female').removeClass('active');
	});
	
	$('#btn-female').click(function(){
		$('#btn-male').removeClass('active');
	});
	
	$("#age").keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			//display error message
			$("#age-err-msg").html("Numbers only.").show().fadeOut(1800);
			return false;
		}
	});
}



$('#loginButton').click(function(){
	
		$.ajax({
			url: ROOT_URL + 'api/loginUser/'+ $("#username").val(),
			type: "get"
		}).done(function(data) {
			if (data.username == $('#username').val() && data.password
					== $('#password').val()) {
				alert("login Successfully")	
				window.location = ROOT_URL+'forcelogin'
			} else {
				alert("No user Found");
			}
		});
		
		
		
		
});

$('#logoutButton').click(function(){
	window.location = ROOT_URL+"forcelogout"
});

$('#registerButton').click(function(){
	
	$.ajax({
		url: ROOT_URL + 'api/saveUser',
		type: "post",
		data: { 	
					firstname:$('#firstname').val(),
					 email:$('#email').val()
				  ,lastname:$('#lastname').val()
				  ,age:$('#age').val()
				  ,username: $('#username').val()
				 , password: $('#password').val()
				, gender: $('#gender').val()
				,type:0
				
		}
				
	}).done(function(data) {
			if(data.username){
				alert(data)
				window.location = ROOT_URL+"login"
			}
			else
				{
				alert("Not Registered");
				}
	});
});