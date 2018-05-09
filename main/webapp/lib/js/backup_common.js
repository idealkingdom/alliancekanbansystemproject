
$(document).ready(function(){
	$('.collapse').on('show', function(){
	    $(this).parent().find(".icon-chevron-right").removeClass("icon-chevron-right").addClass("icon-chevron-down");
	}).on('hide', function(){
	    $(this).parent().find(".icon-chevron-down").removeClass("icon-chevron-down").addClass("icon-chevron-right");
	});
	$("form").submit(function (e) {
		 $.blockUI({ message:"<b>Loading...</b>"});
	});
	$(function() {
	    $( ".datepicker" ).datepicker();
	});
	
});


$(document).ajaxStart(function() {
	 $.blockUI({ message:"<b>Please wait...</b>"});
});
$(document).ajaxStop(function() {
    $.unblockUI();
});
//default ajax call on pagination by page
function paginateByPage(path,page,size,tableId) {
	$.ajax({
		type: "POST",
		url: path,
		data: {"page": page, "size": size},
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	});
}

//default ajax call on pagination by size
function paginateBySize(path,size,tableId) {
	$.ajax({
		type: "POST",
		url: path,
		data: {"size": size},
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	});
}




/*================ User Manager ================*/

//custom ajax call on pagination by page on user manager
function paginateUserByPage(path,page,size,tableId) {
	if($('#searchFlag').attr('value') == 1)
		path=path+'search';
	else
		path=path+'list';
	$('#searchFilterForm').find("input[name=page]").attr('value',page);
	$('#searchFilterForm').find("input[name=size]").attr('value',size);
	$.ajax({
		type: "POST",
		url: path,
		data: $('#searchFilterForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
		}
	});
}

//custom ajax call on pagination by size on user manager
function paginateUserBySize(path,size,tableId) {
	if($('#searchFlag').attr('value') == 1)
		path=path+'search';
	else
		path=path+'list';
	$('#searchFilterForm').find("input[name=page]").attr('value','');
	$('#searchFilterForm').find("input[name=size]").attr('value',size);
	$.ajax({
		type: "POST",
		url: path,
		data: $('#searchFilterForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
		}
	});
}


function selectUsers(checkboxClass) {
	selectCheckBox(checkboxClass);
	var size = $('.'+checkboxClass+':checked').size();
	 if(size == 0) {
		$("#deleteUser").attr('disabled','disabled');
		
	} else if(size >= 1) {
		$("#deleteUser").removeAttr('disabled');
	} 
}

function showDeleteModalUsers(deleteConfirmModal, deleteNotifyModal, checkboxClass) {
	var size = $('.'+checkboxClass+':checked').size();
	if(size > 0) {
		$("#deleteUser").attr('href','#'+deleteConfirmModal);
	} else {
		$("#deleteUser").attr('href','#'+deleteNotifyModal);
	}
}

function validateUserAction(path, formId, modal) {
	var data = $("#" + formId).serialize();
	var proceed = true;
	$("#triggerModalSpan").attr('href', '#');
	$response = null;
	$.ajax({
		type : "POST",
		url : path,
		data : data,
		success : function(responseData) {
			$response = $(responseData);
			if ($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				var counter = 0;
				var fieldToFocus = '';
				$("#errorsDiv").html(
						$(responseData).find("#errorsDiv").html());
				$(responseData).find("#errorFieldsDiv :input").each(
						function() {
							var field = $(this).attr('id');
							$('[name="' + field + '"]').attr('style',
									'border-color:#B94A48;');
							if (counter == 0)
								fieldToFocus = field;
							counter++;
						});
				$(responseData).find("#okFieldsDiv :input").each(
						function() {
							var field = $(this).attr('id');
							$('[name="' + field + '"]').attr('style',
									'border-color:#3CB371;');
						});
				$("html, body").animate({
					scrollTop : 0
				}, "slow");
				$('[name="' + fieldToFocus + '"]').focus();
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
		},
		complete: function() {
			if (proceed) {
				$("#errorsDiv").html("");
				$response.find("#okFieldsDiv :input").each(function() {
					var field = $(this).attr('id');
					$('[name="' + field + '"]').attr('style', 'border-color:#3CB371;');
				});
				$("#triggerModalSpan").attr('href','#'+modal);
				$("#triggerModalSpan").trigger("click");
			}
		}
	});
}

/*============== End User Manager ==============*/



function selectAllCheckboxes(checked,checkboxClass,actionButtonId) {
	$('.'+checkboxClass).prop('checked', checked);
	if(actionButtonId != null) {
		if(checked && $('.'+checkboxClass+':checked').size() > 0)
			$("#"+actionButtonId).removeAttr('disabled');
		else
			$("#"+actionButtonId).attr('disabled','disabled');
	}
	
}

function selectCheckBox(checkboxClass,actionButtonId) {
	var size = $('.'+checkboxClass).size(); //number of existing checkboxes
	var sizeChecked = $('.'+checkboxClass+':checked').size(); //number of existing checked checkboxes
	if(size == sizeChecked)
		$('#'+checkboxClass+'All').prop('checked',true);
	else
		$('#'+checkboxClass+'All').removeAttr('checked');
	if(actionButtonId != null) {
		if(sizeChecked > 0)
			$("#"+actionButtonId).removeAttr('disabled');
		else
			$("#"+actionButtonId).attr('disabled','disabled');
	}
}




function changeFormAction(formId,action) {
	$("#"+formId).attr('action',action);
}

function changeFormActionAndSubmit(formId,action) {
	$("#"+formId).attr('action',action);
	$("#"+formId).submit();
}










//go to add member screen
function goToAddMember(path) {
	path = path+"?"+$("#groupId").serialize();
	window.location = path;
}









	 

function updateCritique(divId, path){
	var groupId = $("#groupId").serialize();
	var device = $("#device").serialize();
	var type   = $("#type").serialize();
	var lineid = $("#lineid").serialize();
	var data = groupId + "&" + device + "&" + type + "&" + lineid;
	$.ajax({
		type: "POST",
		url: path,
		data: data, 
		success: function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
		}
	});
}


function deleteCritiqueRows(divId, path){
	$.ajax({
		type: "POST",
		url: path,
		success: function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
		}
	});
}



















function showErrorCause(errorCause, resolution) {
	$("#errorBody").html(errorCause);
	$("#resolutionBody").html(resolution);
}
function removeErrorCause() {
	$("#errorModalBody").html('');
}




//ajax call for validation of delete group screen
function validateDeleteUser(checkboxClass,path,deleteConfirmModal) {
	var data = $('.'+checkboxClass+':checked').serialize();
	$("#deleteModalTrigger").attr('href','');
	var proceed = true;
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}
		},
		complete: function() {
			if(proceed) {
				$("#deleteModalTrigger").attr('href','#'+deleteConfirmModal);
				$("#deleteModalTrigger").trigger('click');
			}
		}
	});
}


function setUserIdAndSubmit(userId, formId, action) {
	$("#userId").val(userId);
	$("#"+formId).attr('action',action);
	$("#"+formId).submit();
}

function selectAllUsers(checked,checkboxClass) {
	$('.'+checkboxClass).prop('checked', checked);
	selectUsers(checkboxClass);
}


function getDeviceData(path,divId) {
	var userid = $("#userid").serialize();
	var phoneSelect = $("#phoneSelect").serialize();
	var data = phoneSelect+"&"+userid;

	
	$.ajax({
		type : "POST",
		data : data,
		url : path,
		async : false,
		success : function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
			$("#associatedIP").html($(responseData).find("#associatedIP").html());
		}
	});
}

function enablePassword(checked) {
	if(checked){
		$("#password").removeAttr('disabled');
		$("#confpassword").removeAttr('disabled');
		$("#fqSelect").removeAttr('disabled');
		$("#answer").removeAttr('disabled');
		
		$("#password").val('');
		$("#confpassword").val('');
		$("#answer").val('');
		
	}else{
		$("#password").attr('disabled', 'disabled');
		$("#confpassword").attr('disabled', 'disabled');
		$("#fqSelect").attr('disabled', 'disabled');
		$("#answer").attr('disabled', 'disabled');
		
		$("#password").val('');
		$("#confpassword").val('');
		$("#answer").val('');
	}
}













function validateUpdatePersonalPortal(formId, path, action ){
	var data = $("#" + formId).serialize();
	var proceed = true;
	$response = null;
	$.ajax({
		type : "POST",
		url : path,
		data : data,
		async : false,
		success : function(responseData) {
			$response = $(responseData);
			if ($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				$("#errorsDiv").html(
						$(responseData).find("#errorsDiv").html());
				clearfields();
				
				//animate scroll to top
				$("html, body").animate({scrollTop : 0}, "slow");
			}
		}
	});
	if (proceed) {
		$("#errorsDiv").html("");
		$("#"+formId).attr('action',action);
		$("#"+formId).submit();
	}
	
}

function displaydefault(toedit, path, modal) {
	var userId = $("#userId").serialize();
	var toEdit = "toEdit="+toedit;	
	var data = userId + "&" + toEdit;
	$.ajax({
		
		type: "POST",
		url: path,
		data: data, 
		success: function(responseData){
			if(toedit == 'pass'){
				$("#password").val('********');
				$("#confpassword").val('********');
			}else if(toedit == 'userinfo'){
				$("#givenname").val(responseData[0]);
				$("#sn").val(responseData[1]);
				$("#email").val(responseData[2]);
			}else if(toedit == 'pin'){
				$("#oldPin").html(responseData[0]);
				$("#pin").val('');
				$("#confpin").val('');
			}
		},
		complete: function() {
			$("#showEditModal").attr('href','#'+modal);
			$("#showEditModal").trigger('click');
		
		}
	});
}
function clearfields() {
	
		$("#givenname").val('');
		$("#sn").val('');
		$("#email").val('');
		$("#pin").val('');
		$("#password").val('');
		$("#confpassword").val('');
	
}

function synchronizeDevice(path,divId) {
	var data = $("#userId").serialize();
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	});
}

function showServerInfo(serverId,path) {
	var data = $("#"+serverId).serialize();
	$.when($.ajax({
		type: "POST",
		url: path,
		data:data,
		success: function(responseData){
			$("#serverAlias").val(responseData[0]);
			$("#serverName").val(responseData[1]);
			$("#serverIP").val(responseData[2]);
			$("#serverType").val(responseData[3]);
			$("#failOver").val(responseData[4]);
			$("#platform").val(responseData[5]);
		}
	})).done(function() {
		$("#edit_"+serverId+"_btn").attr('href','#updateServerInfoModal');
		$("#edit_"+serverId+"_btn").trigger("click");
	});
}

function clearForm(formId) {
	$("#"+formId).trigger("reset");
}

function setServerToRemove(serverToRemoveId) {
	$("#serverToRemove").val($("#"+serverToRemoveId).val());
}

function clearAllInput(formId) {
	$("#"+formId+" :input").val('');
}

function validateAndSubmitForm(formId,validatePath, actionPath) {	
	var data = $("#"+formId).serialize();
	var proceed = true;
	$.ajax({
		global:false,
		type: "POST",
		url: validatePath,
		data:data,
		success: function(responseData){
			$response=$(responseData);
			if($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				clearForm(formId);
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
		},
		beforeSend: function() {
		    $.blockUI({ message:"<b>Please wait...</b>"});
		},
		complete: function() {
			$.unblockUI();
			if(proceed) {
				$("#"+formId).attr('action',actionPath);
				$("#"+formId).submit();
			}
		}
	});
}

function updateService(service,action, actionPath,divId) {
	var data = "action="+action+"&service="+service;
	var proceed = true;
	$.ajax({
		type: "POST",
		url: actionPath,
		data:data,
		success: function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	});
}


function editApp(divId,appName,saveButton,clearButton, changeFlag, editButton){
	var fieldClass = 'appFlds'+appName;
	$('#'+saveButton).prop('disabled',false);
	$('#'+clearButton).prop('disabled',false);
	$('#'+editButton).attr('disabled','disabled');//.prop('disabled','disabled');
	
	$('#'+changeFlag).val('1');
	
	
	//change the whole class instead of specifying id's
	$('.'+fieldClass).prop('disabled',false);
		
}

function refreshApp(path, divId){
	var data = $("#userId").serialize();
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
			$("html, body").animate({ scrollTop: $("#"+divId).offset().top }, "slow");
		}
	});
}
function validateAndSubmitApplicationForm(formId,validatePath, changeFlag, actionPath){
	var data;
	if(changeFlag == 'tag'){
		data = $("#"+formId).serialize()+"&toEdit="+changeFlag;
	}else{
		var form = $("#"+formId).serialize();
		var toEdit ="toEdit="+$("#"+changeFlag).val();//.serialize();
		data = form+"&"+toEdit;
	}
	
	var proceed = true;
	$.ajax({
		type: "POST",
		url: validatePath,
		data:data,
		success: function(responseData){
			$response=$(responseData);
			if($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("#appicationsDiv").html($(responseData).find("#appicationsDiv").html());
				clearForm("updateServerForm");
				$("html, body").animate({ scrollTop: 0 /*$("#"+divId).offset().top*/ }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
		},
		complete: function() {
			if(proceed) {
				if(formId=="qrForm"){
					$("#showEditQRAppModal").attr('href','#confEditQrModal');
					$("#showEditQRAppModal").trigger("click");
				}else if(formId=="admForm"){
					$("#showEditAdmAppModal").attr('href','#confEditAdmModal');
					$("#showEditAdmAppModal").trigger("click");
				}else if(formId=="tagForm"){
					refreshTagApp(actionPath,'tagsDiv');
				}
			}
		}
	});
}
function setTagValuesAndShowModal(tagName,tagDescription){
	$('#tagName').val(tagName);
	$('#tagDescription').val(tagDescription);
	$('#editTagHeader').html("Update Tag");
	$('#tagUpdateType').val('1');
	$('#tagOldName').val(tagName);
}

function selectAllTags(checked,checkboxClass) {
	$('.'+checkboxClass).prop('checked', checked);
	selectTags(checkboxClass);
}
function selectTags(checkboxClass) {
	selectCheckBox(checkboxClass);
	var size = $('.'+checkboxClass+':checked').size();
	 if(size == 0) {
		$("#deleteTag").attr('disabled','disabled');
		
	} else if(size >= 1) {
		$("#deleteTag").removeAttr('disabled');
	} 
}

function validateDeleteTag(checkboxClass,path,deleteConfirmModal) {
	var data = $('.'+checkboxClass+':checked').serialize();
	$("#deleteTag").attr('href','');
	var proceed = true;
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		async:false,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("#appicationsDiv").html($(responseData).find("#appicationsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}
		}
	});
	if(proceed) {
		$("#deleteTag").attr('href','#'+deleteConfirmModal);
	}
}




function validateSynchronizeDevice(path){

	var proceed = true;
	$.ajax({
		type: "POST",
		url: path,
		async:false,
//		data:data,
		success: function(responseData){
			$response=$(responseData);
			if($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				clearForm("updateServerForm");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());

			}
		},
		complete: function() {
			if(proceed) {
				$("#showSyncModal").attr('href','#confirmSynchromnizeDevice');
				$("#showSyncModal").trigger('click');
			}else{
//				$("html, body").animate({ scrollTop: 0 /*$("#"+divId).offset().top*/ }, "slow");
			}
		}
	});
	
}
function showAddTagModal(){
	$('#editTagHeader').html("New Tag");
	$("#showAddTagModal").attr('href','#updateTagModal');
	$("#showAddTagModal").trigger('click');
	
	$('#tagUpdateType').val('0');
	$('#tagOldName').val('');
}

function clearTagModal(){
	$("#tagName").val("");
	$("#tagDescription").val("");
	
}

function refreshTagApp(path, divId){
	var data = $("#tagForm").serialize();
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			$("#"+divId).html($(responseData).find("#"+divId).html());
			$("html, body").animate({ scrollTop: $("#"+divId).offset().top }, "slow");
			//reload messages
			$("#messageDiv").html($(responseData).find("#messageDiv").html());
		}
	});
}


//ajax call for validation of delete role function
function validateDeleteRole(checkboxClass,path,modalTrigger,modalId) {
	var data = $('.'+checkboxClass+':checked').serialize();
	var proceed = true;
	$("#"+modalTrigger).attr('href','');
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}
		},
		complete: function() {
			if(proceed) {
				$("#"+modalTrigger).attr('href','#'+modalId);
				$("#"+modalTrigger).trigger("click");
			}
		}
	});
}



function validateRoleAction(path, formId, insertModalTrigger, modal) {
	var data = $("#" + formId).serialize();
	var proceed = true;
	$response = null;
	$.ajax({
		type : "POST",
		url : path,
		data : data,
		success : function(responseData) {
			$response = $(responseData);
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#" + insertModalTrigger).attr('href', '');
				proceed = false;
				var counter = 0;
				var fieldToFocus = '';
				$("#errorsDiv").html(
						$(responseData).find("#errorsDiv").html());
				$(responseData).find("#errorFieldsDiv :input").each(
						function() {
							var field = $(this).attr('id');
							$('[name="' + field + '"]').attr('style',
									'border-color:#B94A48;');
							if (counter == 0)
								fieldToFocus = field;
							counter++;
						});
				$(responseData).find("#okFieldsDiv :input").each(
						function() {
							var field = $(this).attr('id');
							$('[name="' + field + '"]').attr('style',
									'border-color:#3CB371;');
						});
				$("html, body").animate({
					scrollTop : 0
				}, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				$('[name="' + fieldToFocus + '"]').focus();
			}
		},
		complete: function() {
			if (proceed) {
				$("#errorsDiv").html("");
				$response.find("#okFieldsDiv :input").each(function() {
					var field = $(this).attr('id');
					$('[name="' + field + '"]').attr('style', 'border-color:#3CB371;');
				});
				$("#" + insertModalTrigger).attr('href', '#' + modal);
				$("#" + insertModalTrigger).trigger("click");
			}			
		}
	});
}

function enableRoleDefs(checked,field) {
	if(checked) {
		$("#"+field+"defs").removeAttr('style');
		$("#"+field+"defs").removeAttr('disabled');
		if(field == 'ccr' || field == 'qr') {
			$("#"+field+"rights").removeAttr('disabled');
		}
		$("#"+field+"advanced").removeAttr('disabled');
	}
	else {
		$("#"+field+"defs").removeAttr('style');
//		$("#"+field+"defs").val('');
		$("#"+field+"defs").attr('disabled','disabled');
		if(field == 'ccr' || field == 'qr') {
			$("#"+field+"rights").attr('disabled','disabled');
			$("#"+field+"rights").attr('href','#');
		}
		$("#"+field+"advanced").attr('disabled','disabled');
	}
}


function setRoleIdAndSubmit(roleId, formId, validationPath, action) {
	$("#roleId").val(roleId);
	var data = $("#roleId").serialize();
	var proceed = true;
	$.ajax({
		global:false,
		type: "POST",
		data: data,
		url: validationPath,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}
		},
		beforeSend: function() {
		    $.blockUI({ message:"<b>Please wait...</b>"});
		},
		complete: function() {
			$.unblockUI();
			if(proceed) {
				$("#"+formId).attr('action',action);
				$("#"+formId).submit();
			}
		}
	});
}

function addReportFilterRow(tableId) {
	$("#"+tableId+" >tbody").append($("#addRowTable >tbody").html());
}

function removeReportFilterRow(button) {
	$(button).closest("tr").remove();
}

function loadReporterFilterModal(right,reporterFilterModal,tableId,reporterFilterForm) {
	$("#modalTrigger").attr('href','#');
	if(right == "QAM")
		if(!$("#ccrCheckbox").prop('checked')) return;
	else if(right == "QR")
		if(!$("#qrCheckbox").prop('checked')) return;
	$("#rightsModal").html(right);
	$("#"+tableId+" >tbody tr:gt(0)").remove();
	clearReporterFilterModal(tableId,reporterFilterForm);
	if(right == "QAM")
		$("#reportFilterValue").val($("#ccrdefs").val());
	else if(right == "QR")
		$("#reportFilterValue").val($("#qrdefs").val());
	$("#modalTrigger").attr('href','#'+reporterFilterModal);
	$("#modalTrigger").trigger("click");
}

function clearReporterFilterModal(tableId,reporterFilterForm) {
	$("#"+tableId+" >tbody tr:gt(0)").remove();
	$("#reportFilterValue").val('');
	clearForm(reporterFilterForm);
	$("#"+tableId+" >tbody tr:first-child").find(":input").each(function() {
		if(!$(this).hasClass('selectField'))
			$(this).attr("disabled","disabled");
	});
}

function updateReporterFilter(tableId,reporterFilterForm) {
	var constructedString = "";
	$("#"+tableId+" >tbody tr").each(function() {
		var name="";
		var equator="";
		var value="";
		var join="";
		var construct = true;
		$(this).find(":input").each(function() {
			if($(this).attr("name")=="fieldSelector" && $(this).val()== "default") {
				construct = false;
				return false;
			}
			if($(this).attr("name")=="fieldSelector")
				name = $(this).val();
			else if($(this).attr("name")=="equatorSelector") {
				equator = $(this).val();
				if(equator=="eq")
					equator = "=";
				else if (equator == "neq")
					equator = "<>";
				else if (equator =="lt")
					equator = "<";
				else if (equator == "gt")
					equator = ">";
				else if (equator == "lte")
					equator = "<=";
				else if (equator == "gte")
					equator = ">=";
			}
			else if($(this).attr("name")=="fieldValue")
				value = $(this).val();
			else if($(this).attr("name")=="joinSelector")
				join = $(this).val();
		});
		if(construct) {
			if($.trim($("#reportFilterValue").val()) == "" && $.trim(constructedString) == "")
				constructedString += (name + " " + equator + " " + "'" + value + "'");
			else
				constructedString += (join + " " + name + " " + equator + " " + "'" + value + "'");
		}
	});
	constructedString = $.trim(constructedString);
	var supervisorValue = $("#supervisorSelector").val();
	if(supervisorValue!="" && constructedString == "") {
		constructedString += "<Supervisor>" + supervisorValue + "</Supervisor>";
	} else if(supervisorValue!="" && constructedString != "") {
		constructedString += " <Supervisor>" + supervisorValue + "</Supervisor>";
	}
	var reporterFilterValue = $.trim($("#reportFilterValue").val());
	$("#reportFilterValue").val($.trim(reporterFilterValue+' '+constructedString));

	$("#"+tableId+" >tbody tr:gt(0)").remove();
	clearForm(reporterFilterForm);
	$("#"+tableId+" >tbody tr:first-child").find(":input").each(function() {
		if(!$(this).hasClass('selectField'))
			$(this).attr("disabled","disabled");
	});
}

function enableReporterFilters(selectBox) {
	if($(selectBox).val() == "default") {
		$(selectBox).parent().parent().find(":input").each(function() {
			if(!$(this).hasClass('selectField') && !$(this).hasClass('removeRowButton')) {
				if($(this).is('select')) {
					$(this).prop('selectedIndex',0);
				} else {
					$(this).val('');
				}
				$(this).attr("disabled","disabled");
			}
		});
	} else {
		$(selectBox).parent().parent().find(":input").each(function() {
			if(!$(this).hasClass('selectField'))
				$(this).removeAttr('disabled');
		});
	}
}

function updateReporterFilterValue(tableId,reporterFilterForm) {
	updateReporterFilter(tableId,reporterFilterForm);
	if($("#rightsModal").html() == "QAM")
		$("#ccrdefs").val($("#reportFilterValue").val());
	else if($("#rightsModal").html() == "QR")
		$("#qrdefs").val($("#reportFilterValue").val());
}

function loadComponentSecurityModal(right,componentSecurityModal,tableDiv,validatePath,actionPath, readCS) {
	$("#modalTrigger").attr('href','#');
	if(!readCS && !$("#"+right+"Checkbox").prop('checked')) return;
	if(right == "cc")
		right="QC";
	$("#advancedModalSpan").html(right.toUpperCase());
	var data = "application="+right.toUpperCase()+"&"+$("#roleId").serialize();
	var proceed = true;	
	$.when($.ajax({
		type: "POST",
		url: validatePath,
		data:data,
		success: function(responseData){
			if ($(responseData).find("#errorsDiv").html() != undefined && $(responseData).find("#errorsDiv").html() != "") {
				proceed = false;
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				//animate scroll to top
				$("html, body").animate({scrollTop : 0}, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
		}
	})).done(function() {
		if(proceed) {
			$.ajax({
				type: "POST",
				url: actionPath,
				data:data,
				success: function(responseData){
					$("#"+tableDiv).html($(responseData).find("#"+tableDiv).html());
					$("#modalTrigger").attr('href','#'+componentSecurityModal);
					$("#modalTrigger").trigger("click");
				}
			});
		}
	});
}

function updateComponentSecurity(formId,validatePath,actionPath) {
	var data = $("#"+formId).serialize();
	var proceed = true;	
	$.when($.ajax({
		type: "POST",
		url: validatePath,
		data:data,
		success: function(responseData){
			if ($(responseData).find("#errorsDiv").html() != undefined && $(responseData).find("#errorsDiv").html() != "") {
				proceed = false;
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				//animate scroll to top
				$("html, body").animate({scrollTop : 0}, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
		}
	})).done(function() {
		if(proceed) {
			changeFormActionAndSubmit(formId, actionPath);
		}
	});
}

function checkAllComponentSecurity(tableDiv,checkboxClass) {
	$('#'+tableDiv+' input:checkbox.'+checkboxClass).prop('checked', true);
}

function uncheckAllComponentSecurity(tableDiv,checkboxClass) {
	$('#'+tableDiv+' input:checkbox.'+checkboxClass).prop('checked', false);	
}

function validateSessionDetails(path, action, sessionid, application,username ){
//	var data = sessionid + "&" + application;
	var data = "sessionid="+sessionid+"&application="+application;
	var proceed = true;
	$.ajax({
		
		type: "POST",
		url: path,
		data: data, 
		success: function(responseData){
			$response=$(responseData);
			if($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				clearForm("updateServerForm");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());

			}
		},
		complete: function() {
			if(proceed) {
				setSessionValues(action,sessionid,application,username);
			}
		}
	});
}
function setSessionValues(path,sessionid,application,username){
	var data = "sessionid="+sessionid+"&application="+application;
	$.ajax({
		type: "POST",
		data: data,
		url: path,
		async:false,
		success: function(responseData){
			$("#logintime").html(responseData[0]);
			$("#loginIP").html(responseData[1]);
			if(responseData[2] == null){
				$("#logoutRow").html('');
			}else{
				$("#logouttime").html(responseData[2]);
				$("#logoutIP").html(responseData[3]);
			}
			$("#sessionUsername").html(username);
		},
		complete: function() {
			$("#showSessionDetailsModal").attr('href','#sessionDetailsModal');
			$("#showSessionDetailsModal").trigger('click');
			
		}
	});	
}

//custom ajax call on pagination by page on current users
function paginateCurrentUserListByPage(path,page,size,tableId) {
	
	$('#paginationForm').find("input[name=page]").attr('value',page);
	$('#paginationForm').find("input[name=size]").attr('value',size);
	
	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

//custom ajax call on pagination by size on current users
function paginateCurrentUserListBySize(path,size,tableId) {
	
	$('#paginationForm').find("input[name=page]").attr('value','');
	$('#paginationForm').find("input[name=size]").attr('value',size);

	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}


//custom ajax call on pagination by page on login history
function paginateSearchHistoryListByPage(path,page,size,tableId) {
	//loginhistory
	
	if($('#searchFlag').attr('value') == 1)
		path=path+'searchloginhistory';
	else
		path=path+'loginhistory';
	
	$('#paginationForm').find("input[name=page]").attr('value',page);
	$('#paginationForm').find("input[name=size]").attr('value',size);
	
	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}


//custom ajax call on pagination by size on login history
function paginateSearchHistoryListBySize(path,size,tableId) {
	if($('#searchFlag').attr('value') == 1)
		path=path+'searchloginhistory';
	else
		path=path+'loginhistory';
	
	$('#paginationForm').find("input[name=page]").attr('value','');
	$('#paginationForm').find("input[name=size]").attr('value',size);

	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

function searchSessionAndReloadTable(actionPath, formId, tableDivId){
	var data = $("#"+formId).serialize();
	$.ajax({
		type: "POST",
		url: actionPath,
		data: data,
		success: function(responseData){
			$("#"+tableDivId).html($(responseData).find("#"+tableDivId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#messageDiv").html($(responseData).find("#messageDiv").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
//			messageDiv
		}
	});
}

//custom ajax call on pagination by page on failed login
function paginateFailedLoginListByPage(path,page,size,tableId) {
	//loginhistory
	
	if($('#searchFlag').attr('value') == 1)
		path=path+'searchfailedlogin';
	else
		path=path+'failedlogin';
	
	$('#paginationForm').find("input[name=page]").attr('value',page);
	$('#paginationForm').find("input[name=size]").attr('value',size);
	
	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

//custom ajax call on pagination by size on failed login
function paginateFailedLoginListBySize(path,size,tableId) {
	if($('#searchFlag').attr('value') == 1)
		path=path+'searchfailedlogin';
	else
		path=path+'failedlogin';
	
	$('#paginationForm').find("input[name=page]").attr('value','');
	$('#paginationForm').find("input[name=size]").attr('value',size);

	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

//custom ajax call on pagination by page on unauthorized access
function paginateUnauthorizedAccessListByPage(path,page,size,tableId) {
	//loginhistory
	
	if($('#searchFlag').attr('value') == 1)
		path=path+'searchunauthorizedaccess';
	else
		path=path+'unauthorizedaccess';
	
	$('#paginationForm').find("input[name=page]").attr('value',page);
	$('#paginationForm').find("input[name=size]").attr('value',size);
	
	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

//custom ajax call on pagination by size on unauthorized access
function paginateUnauthorizedAccessListBySize(path,size,tableId) {
	if($('#searchFlag').attr('value') == 1)
		path=path+'searchunauthorizedaccess';
	else
		path=path+'unauthorizedaccess';
	
	$('#paginationForm').find("input[name=page]").attr('value','');
	$('#paginationForm').find("input[name=size]").attr('value',size);

	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}




//------------- PHONE OBJECT SCRIPTS -------------

//custom ajax call on pagination by page on phone object list
function paginatePhoneObjectListByPage(path,page,size,tableId) {
	//loginhistory
	
	if($('#searchFlag').attr('value') == 1)
		path=path+'search';
	else
		path=path+'list';
	
	$('#paginationForm').find("input[name=page]").attr('value',page);
	$('#paginationForm').find("input[name=size]").attr('value',size);
	
	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

//custom ajax call on pagination by size on phone object list
function paginatePhoneObjectListBySize(path,size,tableId) {
	if($('#searchFlag').attr('value') == 1)
		path=path+'search';
	else
		path=path+'list';
	
	$('#paginationForm').find("input[name=page]").attr('value','');
	$('#paginationForm').find("input[name=size]").attr('value',size);

	$.ajax({
		type: "POST",
		url: path,
		data: $('#paginationForm').serialize(),
		success: function(responseData){
			$("#"+tableId).html($(responseData).find("#"+tableId).html());
			$("#paginationComponent").html($(responseData).find("#paginationComponent").html());
			$("#paginationForm").html($(responseData).find("#paginationForm").html());
		}
	});
}

function selectAllPhoneObjects(checked,checkboxClass) {
	$('.'+checkboxClass).prop('checked', checked);
	selectPhoneObject(checkboxClass);
}
function selectPhoneObject(checkboxClass) {
	selectCheckBox(checkboxClass);
	var size = $('.'+checkboxClass+':checked').size();
	 if(size == 0) {
		$("#deletePhoneObjectButton").attr('disabled','disabled');
		
	} else if(size >= 1) {
		$("#deletePhoneObjectButton").removeAttr('disabled');
	} 
}

function validateDeletePhoneObject(checkboxClass,path,deleteConfirmModal) {
	var data = $('.'+checkboxClass+':checked').serialize();

	$("#deletePhoneObjectButton").attr('href','');
	var proceed = true;
	$.when($.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("#appicationsDiv").html($(responseData).find("#appicationsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}
		}
	})).done(function(){
		if(proceed) {
			$("#displayDeletePhoneObjectModal").attr('href','#'+deleteConfirmModal);
			$("#displayDeletePhoneObjectModal").trigger("click");
		}
	});
	
}

function addMenuItemTableRow(tableId) {
	var rowCount = $("#"+tableId+" >tbody >tr").length;
	$('#menuItemTemplateBasic').find("input[id=menuItem]").attr("value", "Menu Item "+(rowCount+1));
	$('#menuItemTemplateBasic').find("input[id=menuItem]").attr("name", "menuItem");
	$('#menuItemTemplateBasic').find("input[id=menuItem]").attr("id", "miName"+miIdCnt);
	$('#menuItemTemplateBasic').find("input[id=url]").attr("name", "menuURL");
	$('#menuItemTemplateBasic').find("input[id=url]").attr("id", "miURL"+miIdCnt);
	$('#menuItemTemplateBasic').find("input[id=miURL"+miIdCnt+"]").attr("onkeyup", "validateIPURL('miURL"+miIdCnt+"','serverListMIButton"+miIdCnt+"')");;
	$('#menuItemTemplateBasic').find("#serverListMIButton").attr("id", "serverListMIButton"+miIdCnt);
	$('#menuItemTemplateBasic').find("#serverListMIButton"+miIdCnt).attr("onClick", "loadServerListURL('serverListModal','miURL"+miIdCnt+"','serverListMIButton"+miIdCnt+"')");
	
	$("#"+tableId+" >tbody").append($("#menuItemTemplateBasic >tbody").html());
	

	$('#menuItemTemplateBasic').find("input[id=miName"+miIdCnt+"]").attr("value", "Menu Item");
	$('#menuItemTemplateBasic').find("input[id=miName"+miIdCnt+"]").attr("name", "tmpmenuItem");
	$('#menuItemTemplateBasic').find("input[id=miName"+miIdCnt+"]").attr("id", "menuItem");
	$('#menuItemTemplateBasic').find("#serverListMIButton"+miIdCnt).attr("onClick", "");
	$('#menuItemTemplateBasic').find("#serverListMIButton"+miIdCnt).attr("id", "serverListMIButton");
	$('#menuItemTemplateBasic').find("input[id=miURL"+miIdCnt+"]").attr("onkeyup", "");;
	$('#menuItemTemplateBasic').find("input[id=miURL"+miIdCnt+"]").attr("name", "tmpmenuURL");;
	$('#menuItemTemplateBasic').find("input[id=miURL"+miIdCnt+"]").attr("id", "url");
	miIdCnt++;
	
	
}

function removeMenuItemTableRow(button) {
	$(button).closest("tr").remove();
}
function addSoftKeyTableRow(tableId) {
//	var rowCount = $('#'+tableId+' >tbody >tr').length;
	var rowCount = $('#'+tableId+' >tbody >tr').length + 1;
	if(rowCount<9){
		
		$('#softKeyTemplateBasic').find("input[id=skName]").attr("value", "Softkey "+rowCount);
		$('#softKeyTemplateBasic').find("input[id=skName]").attr("name", "skName");//-------------------
		$('#softKeyTemplateBasic').find("input[id=skName]").attr("id", "skName"+skIdCnt);
		$('#softKeyTemplateBasic').find("#position").attr("name", "position");//-------------------
		$('#softKeyTemplateBasic').find("input[id=skURL]").attr("name", "skURL");//-------------------
		$('#softKeyTemplateBasic').find("input[id=skURL]").attr("id", "skURL"+skIdCnt);
		$('#softKeyTemplateBasic').find("input[id=skURL"+skIdCnt+"]").attr("onkeyup", "validateIPURL('skURL"+skIdCnt+"','serverListSKButton"+skIdCnt+"')");
		$('#softKeyTemplateBasic').find("#specialKeysButton").attr("onClick", "setValuesAndShowModal('skURL"+skIdCnt+"')");
		$('#softKeyTemplateBasic').find("#specialKeysButton").attr("id", "specialKeysButton"+skIdCnt);
		$('#softKeyTemplateBasic').find("#serverListSKButton").attr("id", "serverListSKButton"+skIdCnt);
		$('#softKeyTemplateBasic').find("#serverListSKButton"+skIdCnt).attr("onClick", "loadServerListURL('serverListModal','skURL"+skIdCnt+"','serverListSKButton"+skIdCnt+"')");
		
		$("#"+tableId+" >tbody").append($("#softKeyTemplateBasic >tbody").html());
		
		$('#softKeyTemplateBasic').find("input[id=skName"+skIdCnt+"]").attr("value", "");
		$('#softKeyTemplateBasic').find("input[id=skName"+skIdCnt+"]").attr("id", "skName");
		$('#softKeyTemplateBasic').find("input[id=skName]").attr("name", "tmpskName");//-------------------
		$('#softKeyTemplateBasic').find("#position").attr("name", "tmpposition");//-------------------
		$('#softKeyTemplateBasic').find("input[id=skURL"+skIdCnt+"]").attr("onkeyup", "");
		$('#softKeyTemplateBasic').find("input[id=skURL"+skIdCnt+"]").attr("id", "skURL");
		$('#softKeyTemplateBasic').find("input[id=skURL]").attr("name", "tmpskURL");//-------------------
		$('#softKeyTemplateBasic').find("#specialKeysButton"+skIdCnt).attr("onClick", "");
		$('#softKeyTemplateBasic').find("#specialKeysButton"+skIdCnt).attr("id", "specialKeysButton");
		$('#softKeyTemplateBasic').find("#serverListSKButton"+skIdCnt).attr("onClick", "");
		$('#softKeyTemplateBasic').find("#serverListSKButton"+skIdCnt).attr("id", "serverListSKButton");

		if(rowCount == 8){
			$('#addSoftkeyBtn').attr("disabled","disabled");
		}
		else if(rowCount < 8){
			$('#addSoftkeyBtn').removeAttr('disabled');
		}
		skIdCnt++;
	}else{
		$('#addSoftkeyBtn').attr("disabled","disabled");
	}
	
}

function removeSoftKeyTableRow(button) {
	$(button).closest("tr").remove();
	$('#addSoftkeyBtn').removeAttr('disabled');
}

function setMiIdCount(){
	miIdCnt = $("#menuItemTable >tbody >tr").length;
	skIdCnt = $("#softKeyTable >tbody >tr").length;
	inputIdCnt = $("#inputItemTable >tbody >tr").length;;
	gfmiIdCnt = $("#graphicFileMenuItemTable >tbody >tr").length;;
	diIdCnt = $("#directoryItemTable > tbody > tr").length;
	iconIdCnt = $("#iconItemTable > tbody > tr").length;
}

function setObjectIdAndSubmit(objectId, formId, validationPath, action) {
	$("#objectId").val(objectId);
	var data = $("#objectId").serialize();
	var proceed = false;
	$.ajax({
		global:false,
		type: "POST",
		data: data,
		url: validationPath,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}else
				proceed=true;
		},
		beforeSend: function() {
		    $.blockUI({ message:"<b>Please wait...</b>"});
		},
		complete: function() {
			$.unblockUI();
			if(proceed) {
				$("#"+formId).attr('action',action);
				$("#"+formId).submit();
			}
		}
	});
}

function loadServerListURL(serverListModal,ipAddressId,buttonId) {
	if(validateIPURL(ipAddressId,buttonId)) {
		var ipAddress = $("#"+ipAddressId).val();
		if(ipAddress.indexOf("https://") >= 0) {
			ipAddress = ipAddress.replace("https://","").split('/')[0];
			$("#protocolType").val("https://");
		} else {
			ipAddress = ipAddress.replace("http://","").split('/')[0];
			$("#protocolType").val("http://");
		}
		$("#modalTrigger").attr('href','#');
		$("#currentUrlSpan").html($("#"+ipAddressId).val());
		$("#currentIpSpan").html(ipAddress);
		$("#serverIpFieldID").val(ipAddressId);
		$('.serverIp').prop('checked', false);
		$('input:radio[name=serverIp]').filter("[value='"+ipAddress+"']").prop('checked', true);
		$("#modalTrigger").attr('href','#'+serverListModal);
		$("#modalTrigger").trigger("click");
	}
}

function changeServerIpFieldValue(){
	var serverIp = $('input[name=serverIp]:radio:checked').val();
	var tempExtension = $("#"+$("#serverIpFieldID").val()).val();
	tempExtension = tempExtension.replace($("#protocolType").val(),"");
	var slashIndex = tempExtension.indexOf('/');
	if(slashIndex >= 0) {
		tempExtension = tempExtension.substring(slashIndex,tempExtension.length+1);
		$("#"+$("#serverIpFieldID").val()).val($("#protocolType").val()+serverIp + tempExtension);
	} else {
		$("#"+$("#serverIpFieldID").val()).val($("#protocolType").val()+serverIp);
	}
}

function validateIPURL(serverIpFieldId,buttonId) {
	var ipAddress = $("#"+serverIpFieldId).val();
	var protocolType = false;
	var protocol = "";
	if(ipAddress.length > 0) {
	if(ipAddress.indexOf("https://") >= 0) {
		protocolType = true;
		protocol = "https";
	} else if (ipAddress.indexOf("http://") >= 0) {
		protocolType = true;
		protocol = "http";
	}
	if(protocolType) {
		var tempIpAddress = ipAddress.replace(protocol+"://","");
		if(tempIpAddress.length > 0) {
			$("#"+buttonId).removeAttr('disabled');
			return true;
		} else {
			$("#"+buttonId).attr('disabled','disabled');
		}
	} else {
		$("#"+buttonId).attr('disabled','disabled');		
	}
	} else {
		$("#"+buttonId).removeAttr('disabled');	
		return true;
	}
	return false;
}

function triggerNotificationModal(html){
	$("#notificationModalBody").html(html);
	$("#notificationModalBody").find(".close").remove();
	$("#notificationModalBody").find(".clear-10").remove();
	$("#notificationModalTrigger").trigger("click");
}

function changePhoneObjectForm(validatePath,actionPath,formId,detailsDivId){
	var data = $("#"+formId).serialize();
	var proceed = true;
	miIdCnt = 1;
	skIdCnt = 1;
	inputIdCnt = 1;
	gfmiIdCnt = 1;
	diIdCnt = 1;
	iconIdCnt = 1;
	$response = null; 
	if($("#objecttype").val() != "") {
		$.ajax({
			type: "POST",
			url: validatePath,
			data: data,
			success: function(responseData){
				$response = $(responseData);
				if($(responseData).find("#errorsDiv").html() != undefined) {
					$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
					$("html, body").animate({ scrollTop: 0 }, "slow");
					triggerNotificationModal($(responseData).find("#errorsDiv").html());
					proceed=false;
					$(responseData).find("#errorFieldsDiv :input").each(function(){
						var field = $(this).attr('id');
						$('[name="'+field+'"]').attr('style','border-color:#B94A48;');
					});
					$(responseData).find("#okFieldsDiv :input").each(function(){
						var field = $(this).attr('id'); 
						$('[name="'+field+'"]').attr('style','border-color:#3CB371;');
					});
				}
			},
			complete: function() {
				if(proceed) {
					$response.find("#okFieldsDiv :input").each(function(){
						var field = $(this).attr('id'); 
						$('[name="'+field+'"]').attr('style','border-color:#3CB371;');
					});
					$.ajax({
						type: "POST",
						url: actionPath,
						data:data,
						success: function(responseData){
							$("#"+detailsDivId).html($(responseData).find("#"+detailsDivId).html());
							$("#addBtn").removeAttr('disabled');
						}
					});
					
				} else {
					$("#"+detailsDivId).html("");
					$("#objecttype").prop('selectedIndex',0);
					$("#addBtn").attr('disabled','disabled');
				}
			}
		});
	} else {
		$("#"+detailsDivId).html("");
		$("#objecttype").prop('selectedIndex',0);
		$("#addBtn").attr('disabled','disabled');
	}
}

function setValuesAndShowModal(urlId){
	$('#softKeyModal').find("input[name=skUrlId]").attr("value", urlId);
	$("#showSoftKeyModal").attr('href','#softKeyModal');
	$("#showSoftKeyModal").trigger('click');
}
function closeAndReturnValue(tdElement){
	var urlField = $('#softKeyModal').find("input[name=skUrlId]").val(); 
	var shortCutKey = $(tdElement).find("input[name=shortCutKey]").val();
	$('#'+urlField).val(shortCutKey);
	
}

function validatePhoneAction(formId, path, modal ){
	var data = $("#" + formId).serialize();
	var proceed = true;
	$response = null;
	var type= $("#hiddenobjecttype").val();
	$.ajax({
		type : "POST",
		url : path,
		data : data,
		success : function(responseData) {
			$response = $(responseData);
			if ($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				$(responseData).find("#errorFieldsDiv :input").each(function(){
					var field = $(this).attr('id');
					$('[name="'+field+'"]').attr('style','border-color:#B94A48;');
				});
				$(responseData).find("#okFieldsDiv :input").each(function(){
					var field = $(this).attr('id'); 
					$('[name="'+field+'"]').attr('style','border-color:#3CB371;');
				});
				
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				if(type == 'CISCOIPPHONEMENU' || type == 'CISCOIPPHONEGRAPHICMENU') {
					$(responseData).find("#menuItemErrorFields .miErrorField").each(function(){
						var field = $(this).attr('value').split(",");
						var row = "";
						if(field[0].indexOf("name") >= 0) {
							row = field[0].replace("name","");
							$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuItem]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("url") >= 0) {
							row = field[0].replace("url","");
							$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuURL]").attr('style','border-color:#B94A48;');
						}
					});
				} else if(type == 'CISCOIPPHONEINPUT') {
					$(responseData).find("#inputItemErrorFields .inpErrorField").each(function(){
						var field = $(this).attr('value').split(",");
						var row = "";
						if(field[0].indexOf("name") >= 0) {
							row = field[0].replace("name","");
							$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputName]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("flag") >= 0) {
							row = field[0].replace("flag","");
							$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputFlag]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("param") >= 0) {
							row = field[0].replace("param","");
							$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputParam]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("default") >= 0) {
							row = field[0].replace("default","");
							$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputDefault]").attr('style','border-color:#B94A48;');
						}
					});
				} else if(type == 'CISCOIPPHONEDIRECTORY') {
					$(responseData).find("#directoryItemErrorFields .dirErrorField").each(function(){
						var field = $(this).attr('value').split(",");
						var row = "";
						if(field[0].indexOf("name") >= 0) {
							row = field[0].replace("name","");
							$('#directoryItemTable >tbody >tr:eq('+row+')').find("[name=diName]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("phone") >= 0) {
							row = field[0].replace("phone","");
							$('#directoryItemTable >tbody >tr:eq('+row+')').find("[name=diTel]").attr('style','border-color:#B94A48;');
						}
					});
				} else if(type == 'CISCOIPPHONEGRAPHICFILEMENU') {
					$(responseData).find("#graphicFileItemErrorFields .gfiErrorField").each(function(){
						var field = $(this).attr('value').split(",");
						var row = "";
						if(field[0].indexOf("name") >= 0) {
							row = field[0].replace("name","");
							$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=menuItem]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("url") >= 0) {
							row = field[0].replace("url","");
							$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=menuURL]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("xlocation") >= 0) {
							row = field[0].replace("xlocation","");
							$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=xlocation]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("ylocation") >= 0) {
							row = field[0].replace("ylocation","");
							$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=ylocation]").attr('style','border-color:#B94A48;');
						}	 else if(field[0].indexOf("width") >= 0) {
							row = field[0].replace("width","");
							$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=width]").attr('style','border-color:#B94A48;');
						}	 else if(field[0].indexOf("height") >= 0) {
							row = field[0].replace("height","");
							$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=height]").attr('style','border-color:#B94A48;');
						}
					});
				} else if(type == 'CISCOIPPHONEICONFILEMENU') {
					$(responseData).find("#iconFileItemErrorFields .ifiErrorField").each(function(){
						var field = $(this).attr('value').split(",");
						var row = "";
						if(field[0].indexOf("name") >= 0) {
							row = field[0].replace("name","");
							$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuItem]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("url") >= 0) {
							row = field[0].replace("url","");
							$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuURL]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("iconurl") >= 0) {
							row = field[0].replace("iconurl","");
							$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=iconURL]").attr('style','border-color:#B94A48;');
						} else if(field[0].indexOf("icon") >= 0) {
							row = field[0].replace("icon","");
							$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuIcon]").attr('style','border-color:#B94A48;');
						} 
					});

					$(responseData).find("#iconFileIconErrorFields .ifiErrorField").each(function(){
						var field = $(this).attr('value').split(",");
						var row = "";
						if(field[0].indexOf("icon") >= 0) {
							row = field[0].replace("icon","");
							$('#iconItemTable >tbody >tr:eq('+row+')').find("[name=icon]").attr('style','border-color:#B94A48;');
						}
					});
				}
				
				$(responseData).find("#softKeyErrorFields .skErrorField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("name") >= 0) {
						row = field[0].replace("name","");
						$('#softKeyTable >tbody >tr:eq('+row+')').find("[name=skName]").attr('style','border-color:#B94A48;');
					} else if(field[0].indexOf("url") >= 0) {
						row = field[0].replace("url","");
						$('#softKeyTable >tbody >tr:eq('+row+')').find("[name=skURL]").attr('style','border-color:#B94A48;');
					} else if(field[0].indexOf("position") >= 0) {
						row = field[0].replace("position","");
						$('#softKeyTable >tbody >tr:eq('+row+')').find("[name=position]").attr('style','border-color:#B94A48;');
					}
				});
				//animate scroll to top
				$("html, body").animate({scrollTop : 0}, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
		},
		complete: function() {
			$response.find("#okFieldsDiv :input").each(function(){
				var field = $(this).attr('id'); 
				$('[name="'+field+'"]').attr('style','border-color:#3CB371;');
			});
			
			if(type == 'CISCOIPPHONEMENU' || type == 'CISCOIPPHONEGRAPHICMENU"') {
				$response.find("#menuItemOkFields .miOkField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("name") >= 0) {
						row = field[0].replace("name","");
						$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuItem]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("url") >= 0) {
						row = field[0].replace("url","");
						$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuURL]").attr('style','border-color:#3CB371;');
		}
	});
			} else if(type == 'CISCOIPPHONEINPUT') {
				$response.find("#inputItemOkFields .inpOkField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("name") >= 0) {
						row = field[0].replace("name","");
						$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputName]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("flag") >= 0) {
						row = field[0].replace("flag","");
						$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputFlag]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("param") >= 0) {
						row = field[0].replace("param","");
						$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputParam]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("default") >= 0) {
						row = field[0].replace("default","");
						$('#inputItemTable >tbody >tr:eq('+row+')').find("[name=inputDefault]").attr('style','border-color:#3CB371;');
					}
				});
			} else if(type == 'CISCOIPPHONEDIRECTORY') {
				$response.find("#directoryItemOkFields .dirOkField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("name") >= 0) {
						row = field[0].replace("name","");
						$('#directoryItemTable >tbody >tr:eq('+row+')').find("[name=diName]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("phone") >= 0) {
						row = field[0].replace("phone","");
						$('#directoryItemTable >tbody >tr:eq('+row+')').find("[name=diTel]").attr('style','border-color:#3CB371;');
					}
				});
			} else if(type == 'CISCOIPPHONEGRAPHICFILEMENU') {
				$response.find("#graphicFileItemOkFields .gfiOkField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("name") >= 0) {
						row = field[0].replace("name","");
						$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=menuItem]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("url") >= 0) {
						row = field[0].replace("url","");
						$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=menuURL]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("xlocation") >= 0) {
						row = field[0].replace("xlocation","");
						$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=xlocation]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("ylocation") >= 0) {
						row = field[0].replace("ylocation","");
						$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=ylocation]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("width") >= 0) {
						row = field[0].replace("width","");
						$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=width]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("height") >= 0) {
						row = field[0].replace("height","");
						$('#graphicFileMenuItemTable >tbody >tr:eq('+row+')').find("[name=height]").attr('style','border-color:#3CB371;');
					}
				});
			} else if(type == 'CISCOIPPHONEICONFILEMENU') {
				$response.find("#iconFileItemOkFields .ifiOkField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("name") >= 0) {
						row = field[0].replace("name","");
						$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuItem]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("url") >= 0) {
						row = field[0].replace("url","");
						$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuURL]").attr('style','border-color:#3CB371;');
					} else if(field[0].indexOf("icon") >= 0) {
						row = field[0].replace("icon","");
						$('#menuItemTable >tbody >tr:eq('+row+')').find("[name=menuIcon]").attr('style','border-color:#3CB371;');
					} 
				});
				
				$response.find("#iconFileIconOkFields .ifiOkField").each(function(){
					var field = $(this).attr('value').split(",");
					var row = "";
					if(field[0].indexOf("icon") >= 0) {
						row = field[0].replace("icon","");
						$('#iconItemTable >tbody >tr:eq('+row+')').find("[name=icon]").attr('style','border-color:#3CB371;');
					}
				});
			}
			
			
			$response.find("#softKeyOkFields .skOkField").each(function(){
				var field = $(this).attr('value').split(",");
				var row = "";
				if(field[0].indexOf("name") >= 0) {
					row = field[0].replace("name","");
					$('#softKeyTable >tbody >tr:eq('+row+')').find("[name=skName]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("url") >= 0) {
					row = field[0].replace("url","");
					$('#softKeyTable >tbody >tr:eq('+row+')').find("[name=skURL]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("position") >= 0) {
					row = field[0].replace("position","");
					$('#softKeyTable >tbody >tr:eq('+row+')').find("[name=position]").attr('style','border-color:#3CB371;');
				}
			});
	if (proceed) {
		$("#errorsDiv").html("");
		$("#showConfirmActionModal").attr('href','#'+modal);
		$("#showConfirmActionModal").trigger("click");
	}
		}
	});
	
}

function addInputItemTableRow(tableId) {
	var rowCount = $('#'+tableId+' >tbody >tr').length;
	if(rowCount < 5) {
		$('#inputItemTemplateBasic').find("input[id=inputName]").attr("value", "Input Item "+(rowCount+1));
		$('#inputItemTemplateBasic').find("input[id=inputName]").attr("name", "inputName");
		$('#inputItemTemplateBasic').find("input[id=inputName]").attr("id", "inputName"+inputIdCnt);
	
		$('#inputItemTemplateBasic').find("input[id=inputParam]").attr("value", "Param "+(rowCount+1));
		$('#inputItemTemplateBasic').find("input[id=inputParam]").attr("name", "inputParam");
		$('#inputItemTemplateBasic').find("input[id=inputParam]").attr("id", "inputParam"+inputIdCnt);
	
		$('#inputItemTemplateBasic').find("#inputFlag").attr("name", "inputFlag");
		$('#inputItemTemplateBasic').find("#inputFlag").attr("id", "inputFlag"+inputIdCnt);
	
		$('#inputItemTemplateBasic').find("input[id=inputDefault]").attr("value", "Default Value "+(rowCount+1));
		$('#inputItemTemplateBasic').find("input[id=inputDefault]").attr("name", "inputDefault");
		$('#inputItemTemplateBasic').find("input[id=inputDefault]").attr("id", "inputDefault"+inputIdCnt);
		
		$("#"+tableId+" >tbody").append($("#inputItemTemplateBasic >tbody").html());
		
	
		$('#inputItemTemplateBasic').find("input[id=inputName"+inputIdCnt+"]").attr("value", "Input Item");
		$('#inputItemTemplateBasic').find("input[id=inputName"+inputIdCnt+"]").attr("name", "tmpinputName");
		$('#inputItemTemplateBasic').find("input[id=inputName"+inputIdCnt+"]").attr("id", "inputName");
		
		$('#inputItemTemplateBasic').find("input[id=inputParam"+inputIdCnt+"]").attr("value", "Param");
		$('#inputItemTemplateBasic').find("input[id=inputParam"+inputIdCnt+"]").attr("name", "tmpinputParam");
		$('#inputItemTemplateBasic').find("input[id=inputParam"+inputIdCnt+"]").attr("id", "inputParam");
		
		$('#inputItemTemplateBasic').find("#inputFlag"+inputIdCnt).attr("name", "tmpinputFlag");
		$('#inputItemTemplateBasic').find("#inputFlag"+inputIdCnt).attr("id", "inputFlag");
	
		$('#inputItemTemplateBasic').find("input[id=inputDefault"+inputIdCnt+"]").attr("value", "Default Value");
		$('#inputItemTemplateBasic').find("input[id=inputDefault"+inputIdCnt+"]").attr("name", "tmpinputDefault");
		$('#inputItemTemplateBasic').find("input[id=inputDefault"+inputIdCnt+"]").attr("id", "inputDefault");
		
		if($('#'+tableId+' >tbody >tr').length < 5){
			$('#addInpuItemBtn').removeAttr('disabled');
		} else {
			$('#addInpuItemBtn').attr("disabled","disabled");
		}
		
		inputIdCnt++;
	} else {
		$('#addInpuItemBtn').attr("disabled","disabled");
	}
}

function removeItemTableRow(button,buttonId) {
	$(button).closest("tr").remove();
	$('#'+buttonId).removeAttr('disabled');
}



function addGraphicFileMenuItemTableRow(tableId) {
	var rowCount = $('#'+tableId+' >tbody >tr').length;

	$('#graphicFileMenuItemTemplateBasic').find("input[id=miName]").attr("value", "Menu Item "+(rowCount+1));
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miName]").attr("name", "menuItem");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miName]").attr("id", "miName"+gfmiIdCnt);
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miURL]").attr("name", "menuURL");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miURL]").attr("id", "miURL"+gfmiIdCnt);
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miURL"+gfmiIdCnt+"]").attr("onkeyup", "validateIPURL('miURL"+gfmiIdCnt+"','serverListMIButton"+gfmiIdCnt+"')");;
	$('#graphicFileMenuItemTemplateBasic').find("#serverListMIButton").attr("id", "serverListMIButton"+gfmiIdCnt);
	$('#graphicFileMenuItemTemplateBasic').find("#serverListMIButton"+gfmiIdCnt).attr("onClick", "loadServerListURL('serverListModal','miURL"+gfmiIdCnt+"','serverListMIButton"+gfmiIdCnt+"')");

	$('#graphicFileMenuItemTemplateBasic').find("input[id=xlocation]").attr("name", "xlocation");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=xlocation]").attr("id", "xlocation"+gfmiIdCnt);
	
	$('#graphicFileMenuItemTemplateBasic').find("input[id=ylocation]").attr("name", "ylocation");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=ylocation]").attr("id", "ylocation"+gfmiIdCnt);
	
	$('#graphicFileMenuItemTemplateBasic').find("input[id=width]").attr("name", "width");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=width]").attr("id", "width"+gfmiIdCnt);
	
	$('#graphicFileMenuItemTemplateBasic').find("input[id=height]").attr("name", "height");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=height]").attr("id", "height"+gfmiIdCnt);
	
	
	$("#"+tableId+" >tbody").append($("#graphicFileMenuItemTemplateBasic >tbody").html());
	

	$('#graphicFileMenuItemTemplateBasic').find("input[id=miName"+gfmiIdCnt+"]").attr("value", "Menu Item");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miName"+gfmiIdCnt+"]").attr("name", "tmpmenuItem");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miName"+gfmiIdCnt+"]").attr("id", "miName");
	
	$('#graphicFileMenuItemTemplateBasic').find("#serverListMIButton"+gfmiIdCnt).attr("onClick", "");
	$('#graphicFileMenuItemTemplateBasic').find("#serverListMIButton"+gfmiIdCnt).attr("id", "serverListMIButton");
	
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miURL"+gfmiIdCnt+"]").attr("onkeyup", "");;
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miURL"+gfmiIdCnt+"]").attr("name", "tmpmenuURL");;
	$('#graphicFileMenuItemTemplateBasic').find("input[id=miURL"+gfmiIdCnt+"]").attr("id", "miURL");
	

	$('#graphicFileMenuItemTemplateBasic').find("input[id=xlocation"+gfmiIdCnt+"]").attr("name", "tmpxlocation");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=xlocation"+gfmiIdCnt+"]").attr("id", "xlocation");

	$('#graphicFileMenuItemTemplateBasic').find("input[id=ylocation"+gfmiIdCnt+"]").attr("name", "tmpylocation");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=ylocation"+gfmiIdCnt+"]").attr("id", "ylocation");

	$('#graphicFileMenuItemTemplateBasic').find("input[id=width"+gfmiIdCnt+"]").attr("name", "tmpwidth");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=width"+gfmiIdCnt+"]").attr("id", "width");

	$('#graphicFileMenuItemTemplateBasic').find("input[id=height"+gfmiIdCnt+"]").attr("name", "tmpheight");
	$('#graphicFileMenuItemTemplateBasic').find("input[id=height"+gfmiIdCnt+"]").attr("id", "height");
	
	gfmiIdCnt++;
}

function addDirectoryItemTableRow(tableId) {
//	var rowCount = $('#'+tableId+' >tbody >tr').length;
	var rowCount = $('#'+tableId+' >tbody >tr').length + 1;
	$('#directoryItemTemplateBasic').find("input[id=diName]").attr("value", "Entry "+rowCount);
	$('#directoryItemTemplateBasic').find("input[id=diName]").attr("name", "diName");
	$('#directoryItemTemplateBasic').find("input[id=diName]").attr("id", "diName"+diIdCnt);
	
	$('#directoryItemTemplateBasic').find("input[id=diTel]").attr("name", "diTel");
	$('#directoryItemTemplateBasic').find("input[id=diTel]").attr("id", "diTel"+diIdCnt);
	
	$("#"+tableId+" >tbody").append($("#directoryItemTemplateBasic >tbody").html());
	
	$('#directoryItemTemplateBasic').find("input[id=diName"+diIdCnt+"]").attr("id", "diName");
	$('#directoryItemTemplateBasic').find("input[id=diName]").attr("value", "Entry ");
	$('#directoryItemTemplateBasic').find("input[id=diName]").attr("name", "tmpdiName");
	
	$('#directoryItemTemplateBasic').find("input[id=diTel"+diIdCnt+"]").attr("id", "diTel");
	$('#directoryItemTemplateBasic').find("input[id=diTel]").attr("name", "tmpdiTel");
	diIdCnt++;
	
	
}

function removeDirectoryItemTableRow(button) {
	$(button).closest("tr").remove();
}

function addIconItemTableRow(tableId) {
//	var rowCount = $('#'+tableId+' >tbody >tr').length;
	var rowCount = $('#'+tableId+' >tbody >tr').length;
	if(rowCount<11){ //10 is the limit

		$('#iconItemTemplateBasic').find("input[id=iiURL]").attr("name", "iconURL");
		$('#iconItemTemplateBasic').find("input[id=iiURL]").attr("id", "iiURL"+iconIdCnt);
		
		$('#iconItemTemplateBasic').find("#serverListIIButton").attr("id", "serverListIIButton"+iconIdCnt);
		$('#iconItemTemplateBasic').find("#serverListIIButton"+iconIdCnt).attr("onClick", "loadServerListURL('serverListModal','iiURL"+iconIdCnt+"','serverListIIButton"+iconIdCnt+"')");

		$('#iconItemTemplateBasic').find("option[value='"+rowCount+"']").attr('selected', 'selected');
		$('#iconItemTemplateBasic').find("#icon").attr("value", rowCount);
		$('#iconItemTemplateBasic').find("#icon").attr("name", "icon");
		
		$("#"+tableId+" >tbody").append($("#iconItemTemplateBasic >tbody").html());
		
		$('#iconItemTemplateBasic').find("input[id=iiURL"+iconIdCnt+"]").attr("id", "iiURL");
		$('#iconItemTemplateBasic').find("input[id=iiURL]").attr("name", "tmpiconURL");
		
		
		$('#iconItemTemplateBasic').find("#serverListIIButton"+iconIdCnt).attr("id", "serverListIIButton");
		$('#iconItemTemplateBasic').find("#serverListIIButton").attr("onClick", "");

		$('#iconItemTemplateBasic').find("#icon").attr("value", 0);
		$('#iconItemTemplateBasic').find("#icon").attr("name", "tmpicon");

		if(rowCount == 9){
			$('#addIconItemBtn').attr("disabled","disabled");
		}
		else if(rowCount < 9){
			$('#addIconItemBtn').removeAttr('disabled');
		}
		iconIdCnt++;
	}else{
		$('#addIconItemBtn').attr("disabled","disabled");
	}
}

function removeIconItemTableRow(button) {
	$(button).closest("tr").remove();
	$('#addIconItemBtn').removeAttr('disabled');
}

function addModifiedMenuItemTableRow(tableId) {
//	var rowCount = $('#'+tableId+' >tbody >tr').length;
	var rowCount = $('#'+tableId+' >tbody >tr').length + 1;
	$('#menuItemTemplateBasic').find("input[id=miName]").attr("value", "Menu Item "+rowCount);
	$('#menuItemTemplateBasic').find("input[id=miName]").attr("name", "menuItem");
	$('#menuItemTemplateBasic').find("input[id=miName]").attr("id", "miName"+miIdCnt);
	
	$('#menuItemTemplateBasic').find("input[id=url]").attr("name", "menuURL");
	$('#menuItemTemplateBasic').find("input[id=url]").attr("id", "miURL"+miIdCnt);
	$('#menuItemTemplateBasic').find("input[id=miURL"+miIdCnt+"]").attr("onkeyup", "validateIPURL('miURL"+miIdCnt+"','serverListMIButton"+miIdCnt+"')");;
	
	$('#menuItemTemplateBasic').find("#serverListMIButton").attr("id", "serverListMIButton"+miIdCnt);
	$('#menuItemTemplateBasic').find("#serverListMIButton"+miIdCnt).attr("onClick", "loadServerListURL('serverListModal','miURL"+miIdCnt+"','serverListMIButton"+miIdCnt+"')");
	
	$('#menuItemTemplateBasic').find('#menuIcon').attr("name","menuIcon");
	
	
	
	$("#"+tableId+" >tbody").append($("#menuItemTemplateBasic >tbody").html());
	
	$('#menuItemTemplateBasic').find("input[id=miName"+miIdCnt+"]").attr("id", "miName");
	$('#menuItemTemplateBasic').find("input[id=miName]").attr("value", "Menu Item ");
	$('#menuItemTemplateBasic').find("input[id=miName]").attr("name", "tmpmenuItem");
	
	$('#menuItemTemplateBasic').find("input[id=miURL"+miIdCnt+"]").attr("id", "url");
	$('#menuItemTemplateBasic').find("input[id=url]").attr("name", "tmpmenuURL");
	$('#menuItemTemplateBasic').find("input[id=url]").attr("onkeyup", "");;
	
	$('#menuItemTemplateBasic').find("#serverListMIButton"+miIdCnt).attr("id", "serverListMIButton");
	$('#menuItemTemplateBasic').find("#serverListMIButton").attr("onClick", "");
	
	$('#menuItemTemplateBasic').find('#menuIcon').attr("name","tmpmenuIcon");
	
	miIdCnt++;
	
	
}

function removeModifiedMenuItemTableRow(button) {
	$(button).closest("tr").remove();
}

//ASI-606
function showModal(buttonId,modalId){
	//check input values for empty fields
	if($("#inUserId").val() != "" &&
			$("#inAnswer").val() != "" &&
			$("#inEmail").val() != ""){
		
		//show confirmation
		$("#okConfirm").show();
		$("#cancelConfirm").html("Cancel");
		$("#modalHeader").html("Confirmation Message.");
		$("#msgText").html("Are you sure you want to continue?");
		$("#showModalButton").attr('href','#'+modalId);
	}
	else 
	{
		//show error message	
		$("#modalHeader").html("Error Message!");
		$("#msgText").html("Check Empty Fields.");
		$("#okConfirm").hide();
		$("#cancelConfirm").html("Ok");
		$("#showModalButton").attr('href','#'+modalId);
	}
	
}

//ASI-606
function importUsers(path, tableId){
	
	$.ajax({
		type: "POST",
		url: path,		
		success: function(responseData){	
			var div = "";
			$("#syncLdapListTable").html($(responseData).find("#syncLdapListTable" ).html());			
			$("html, body").animate({ scrollTop: 0 }, "slow");
			if ($(responseData).find("#errorsDiv").html() != undefined){
				div = "errorsDiv";
			}
			else if ($(responseData).find("#successDiv").html() != undefined){
				div = "successDiv";
			}
			triggerNotificationModal($(responseData).find("#" +div).html());
		}
	});		
}

function updateHiddenPhoneObjecId() {
	if($("#objecttype").val() != "") {
		$("#objectNameSpan").html($("#objectid").val());
		$("#hiddenobjectid").val($("#objectid").val());
	}
}

function updateVcardFields(path){
	var data = $("#vcardSelect").serialize();
	var selectedVcard = $("#vcardSelect").val();
	
	alert("here: " + selectedVcard+"<<");
	//remove or add new template name depending on the selected value
	
	alert("SERIALIZED: " + data);
	$.ajax({
		type: "POST",
		url: path,
		data: data,
		success: function(responseData){
			alert(responseData);
			$("#templateDetailsTable").html($(responseData).find("#templateDetailsTable").html());
			$("#templateFieldsDiv").html($(responseData).find("#templateFieldsDiv").html());
			$("#templateImg").html($(responseData).find("#templateImg").html());
			if(selectedVcard == null || selectedVcard == undefined || selectedVcard == ""){
				$("#newVcardName").css("display","");
				$("#addButton").html("Add");
			}else{
				$("#newVcardName").css("display","none");
				$("#addButton").html("Update");
			}
		}
	});
}

function setValueToHidden(checkBoxId){
	if($(checkBoxId).prop('checked'))
		$(checkBoxId).parent().find("input[type=hidden]").attr("value",'T');
	else
		$(checkBoxId).parent().find("input[type=hidden]").attr("value",'F');
}

function validateVcardAction(formId, path, modal){
	var data = $("#" + formId).serialize();
	var fileName = $("#myfile").val();
	var proceed = true;
	$("#triggerModalSpan").attr('href', '#');
	alert("CONTENTS?" + fileName);
	alert("DATA: " + data);
	$response = null;
	$.ajax({
		type : "POST",
		url : path,
		data : data,
		success : function(responseData) {
			alert("HelLO");
			alert(responseData);
			$response = $(responseData);
			if ($(responseData).find("#errorsDiv").html() != undefined) {
				proceed = false;
				var counter = 0;
				var fieldToFocus = '';
				$("#errorsDiv").html(
						$(responseData).find("#errorsDiv").html());
				$(responseData).find("#errorFieldsDiv :input").each(
						function() {
							var field = $(this).attr('id');
							$('[name="' + field + '"]').attr('style',
									'border-color:#B94A48;');
							if (counter == 0)
								fieldToFocus = field;
							counter++;
						});
				$(responseData).find("#okFieldsDiv :input").each(
						function() {
							var field = $(this).attr('id');
							$('[name="' + field + '"]').attr('style',
									'border-color:#3CB371;');
						});
				$("html, body").animate({
					scrollTop : 0
				}, "slow");
				$('[name="' + fieldToFocus + '"]').focus();
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
			}
			$(responseData).find("#textFieldsErrorFields .vTextErrorField").each(function(){
				var field = $(this).attr('value').split(",");
				var row = "";
				
				if(field[0].indexOf("fieldType") >= 0) {
					row = field[0].replace("fieldType","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=fieldType]").attr('style','border-color:#B94A48;');
				} else if(field[0].indexOf("xLocation") >= 0) {
					row = field[0].replace("xLocation","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=xLocation]").attr('style','border-color:#B94A48;');
				} else if(field[0].indexOf("yLocation") >= 0) {
					row = field[0].replace("yLocation","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=yLocation]").attr('style','border-color:#B94A48;');
				} else if(field[0].indexOf("textSize") >= 0) {
					row = field[0].replace("textSize","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=textSize]").attr('style','border-color:#B94A48;');
				} else if(field[0].indexOf("isBold") >= 0) {//isBold0,isBold
					row = field[0].replace("isBold","");//0
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=isBold]").attr('style','border-color:#B94A48;');
				} else if(field[0].indexOf("fontType") >= 0) {
					row = field[0].replace("fontType","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=fontType]").attr('style','border-color:#B94A48;');
				} 
				
			});
		},
		complete: function() {
			$response.find("#okFieldsDiv :input").each(function() {
				var field = $(this).attr('id');
				$('[name="' + field + '"]').attr('style', 'border-color:#3CB371;');
			});
			
			$response.find("#textFieldsOkFields .vTextOkField").each(function(){
				var field = $(this).attr('value').split(",");
				var row = "";
				if(field[0].indexOf("fieldType") >= 0) {
					row = field[0].replace("fieldType","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=fieldType]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("xLocation") >= 0) {
					row = field[0].replace("xLocation","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=xLocation]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("yLocation") >= 0) {
					row = field[0].replace("yLocation","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=yLocation]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("textSize") >= 0) {
					row = field[0].replace("textSize","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=textSize]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("isBold") >= 0) {//isBold0,isBold
					row = field[0].replace("isBold","");//0
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=isBold]").attr('style','border-color:#3CB371;');
				} else if(field[0].indexOf("fontType") >= 0) {
					row = field[0].replace("fontType","");
					$('#templateFields >tbody >tr:eq('+row+')').find("[name=fontType]").attr('style','border-color:#3CB371;');
				}
			});
			
			if (proceed) {
				$("#errorsDiv").html("");
				
				$("#triggerModalSpan").attr('href','#'+modal);
				$("#triggerModalSpan").trigger("click");
			}
			
//			$('[name="vcardSelect"]').attr('style', 'border-color:#3CB371;');
		}
	});
}

function validateDeleteVcard(path,deleteConfirmModal) {
	var data = $("#vcardSelect").serialize();
	alert("DATA: " + data);
	var proceed = true;
	
	$.when($.ajax({
		type: "POST",
		data: data,
		url: path,
		success: function(responseData){
			if($(responseData).find("#errorsDiv").html() != undefined) {
				$("#errorsDiv").html($(responseData).find("#errorsDiv").html());
				$("#appicationsDiv").html($(responseData).find("#appicationsDiv").html());
				$("html, body").animate({ scrollTop: 0 }, "slow");
				triggerNotificationModal($(responseData).find("#errorsDiv").html());
				proceed=false;
			}
		}
	})).done(function(){
		if(proceed) {
			$("#triggerModalSpan").attr('href','#'+deleteConfirmModal);
			$("#triggerModalSpan").trigger("click");
		}
	});
	
}

function enableVcardTemplate(radioButton){
	if($(radioButton).val() == 'overlay') {
		$("#vcardTemplate").removeAttr('disabled');
	} else {
		$("#vcardTemplate").attr('disabled','disabled');
	}
}
