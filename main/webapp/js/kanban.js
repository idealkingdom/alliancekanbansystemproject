var ROOT_URL = "http://localhost:8081/SoaBaseCode/";

$(document).ready(function() {
	
	
	$('.listitem').sortable({
		connectWith: '.listitem',
		update:function(event,ui){
			var id=$(ui.item).attr("id");
			var column = $(this).attr("id");
	   			$.ajax({
					
					url: ROOT_URL + 'api/updateIssueColumn',
					type: "post",
					data:{
						  id:id,
						  status:column,
					}
				}).done(function(data) {
					
					if(data.issueStatus!=column){
						alert("SUCCESS");
					}
					else
						{
						}
				});
	               
	         
			//var indexitem = ui.item.index();
			//alert(indexitem);

			
		},
		stop: function(e, ui) {
            ($.map($(this).find('li'), function(el) {
                var a = $(el).index();
                $.ajax({
					url: ROOT_URL + 'api/updateIssuePriority',
					type: "post",
					data:{
						  id:el.id,
						  priority:$(el).index(),					  
					}
				}).done(function(data) {

				});
            }));
        }
	});
});

 function updateAllpos()
	{
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

							return null;
					});
		});
	}
