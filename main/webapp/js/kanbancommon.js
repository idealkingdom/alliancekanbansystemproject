var ROOT_URL = "http://localhost:8081/SoaBaseCode/";

$(document).ready(function() {
	loadIssue();

});

$('#kanbansubmit').click(function(){
	
	$.ajax({
		url: ROOT_URL + 'api/saveIssue',
		type: "post",
		data: { 	
					kanbantitle:$('#kanbantitle').val(),
					 kanbandescription:$('#kanbandescription').val()
		}
				
	}).done(function(data) {
			if(data.issueName){
				alert(data)
			}
			else
				{
				alert("Not Added");
				}
	});
});



$('#info').click(function(e){
	e.stopPropagation();
	$('#viewMenuModal').modal('show');
	
});

function card(idd,title){
	$('#deleteIssueModal').modal('show');
	pid = $('#'+idd+'').closest('li').attr("id");
		    
			$('#kanbanID').val(pid);
			$('#kanbantitledelete').val(title);
			$('#kanbandelete').click(function(){
			 	$.ajax({
					url: ROOT_URL + 'api/deleteIssue',
					type: "post",
					data:{
							id:pid
						
					}
				}).done(function(data) {
						if(data.id!=null){
							alert("Error");
						}
						else
							{
							alert("sucessfully deleted");
							}
						
				});


		});
			
	
			


	
}


function loadIssue(){
	$.ajax({
		url: ROOT_URL + 'api/searchAllIssue',
		type: "get",
		data:{
			issuName:$('kanbantitledelete').val()
		}
		}).done(function(data) {
					datalength = Object.keys(data).length;
				data.forEach(function(issue){
					var key,count = 0;
					
					for (var int = 0; int <= datalength; int++) {
						
						if(issue.issueStatus == "inprogress" && int==issue.issuePriority)
						{
						$('#inprogress').append('<li id="'+issue.id+'" class="list-group-item"><span  id="info"  class=" glyphicon glyphicon-info-sign">'
								+' </span><span style="float:right"   onclick="card(this.id,\''+issue.issueName+'\')" id="delete"  class="glyphicon glyphicon-remove">'
								+' </span><h5 style="text-align:center"> '+issue.issueName+'</h5>'
								+'<p class="issuedesc">'+issue.issueDescription+'</p><p  style="text-align:right">'+issue.issueCreated+'</p></li>')
						}
					else if(issue.issueStatus == "done" && issue.issuePriority==int){
						$('#done').append('<li id="'+issue.id+'" class="list-group-item"><span  id="info"  class=" glyphicon glyphicon-info-sign">'
								+' </span><span style="float:right"   onclick="card(this.id,\''+issue.issueName+'\')" id="delete"  class="glyphicon glyphicon-remove">'
								+' </span><h5 style="text-align:center"> '+issue.issueName+'</h5>'
								+'<p class="issuedesc">'+issue.issueDescription+'</p><p  style="text-align:right">'+issue.issueCreated+'</p></li>');
					}
					else if(issue.issueStatus == "todo" && issue.issuePriority==int){
						
								$('#todo').append('<li id="'+issue.id+'" class="list-group-item"><span  id="info"  class=" glyphicon glyphicon-info-sign">'
										+' </span><span style="float:right"   onclick="card(this.id,\''+issue.issueName+'\')" id="delete"  class="glyphicon glyphicon-remove">'
										+' </span><h5 style="text-align:center"> '+issue.issueName+'</h5>'
										+'<p class="issuedesc">'+issue.issueDescription+'</p><p  style="text-align:right">'+issue.issueCreated+'</p></li>');
					}
					else if(issue.issueStatus == "backlog" && issue.issuePriority==int)
						
						
						$('#backlog').append('<li id="'+issue.id+'" class="list-group-item"><span  id="info"  class=" glyphicon glyphicon-info-sign">'
								+' </span><span style="float:right"   onclick="card(this.id,\''+issue.issueName+'\')" id="delete"  class="glyphicon glyphicon-remove">'
								+' </span><h5 style="text-align:center"> '+issue.issueName+'</h5>'
								+'<p class="issuedesc">'+issue.issueDescription+'</p><p  style="text-align:right">'+issue.issueCreated+'</p></li>');
					
					}
					
						return null;
				});

	});
	
	
	
	
	
}




