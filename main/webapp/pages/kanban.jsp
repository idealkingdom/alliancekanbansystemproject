<!-- <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%> -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
        <meta charset="utf-8">
        <title>Kanban Board</title>
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet">
        <link href="lib/css/jquery-ui.min.css" rel="stylesheet">
        <link href="lib/toastr/build/toastr.min.css" rel="stylesheet">     
        <link href="css/kanban.css" rel="stylesheet">   
        <style>
        #bodys
        {
            background-color: #3a414c;
        }
        #inprogresss
        {

            margin-left: 640px;
        }
        h1, h2, h3, h4, h5, h6 ,label ,.card, span{
          font-family: "Poppins", sans-serif;
          font-weight: 400;
          margin: 0 0 10px 0;
          padding: 0;
      }
     .titlelabel
     {
        color:blue;
        float:center;
        margin-left: 110px;
     }
   

    #todos
    {
        margin-left: 320px;
    } 
    #dones
    {
        margin-left: 950px;

    }

    .bcont-header
    {
        padding-top: 20px;
        padding-bottom: 10px;
    }
    h1.hstyle1
    {
        text-align: center;
        color:blue;
    }
    .space
    {
        margin-top: 60px;
    }
    #board {
        display: table;
        margin: 0;
        padding: 0;
        border-spacing: 5px;
    }
    .section {
    	
        display: table-cell;
        margin: 0;
        border: 2px solid;
        border-radius: 10px;

        width: 20%;
        border-color: #6c7687;
        position: absolute;
    }
    .section.droppable {
        border: 1px dashed white;
    }
    .section > h1 {
        margin: 0;
        padding: 0;
        font-size: 12pt;
        color: Black;
        text-align: center;
        border-radius: 25px;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    #tdlabel
    {
        margin-left: 270px;
    }
    #inplabel
    {
        margin-left: 245px;
    }
    #dolabel
    {
        margin-left: 238px; 
    }
    #todos h1
    {
        background-color: #6494e0;
    }
    #inprogresss h1
    {
        background-color: #f4ed5f;
    }
    #dones h1
    {
        background-color: #64e08f;
    }
    #backlogs h1
    {
        background-color: pink;
    }
    .nondrag
    {
        font-style: bold;
    }
    .card {
        display: inline-block;
        vertical-align: top;
        margin: 10px;
        padding: 10px;
        width: 245px;
        height: 100px;
        color: white;
        background: #4b5360;
        cursor: move;
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        border: 3px solid #6c7687;
        border-radius: 13px;
        margin-top:0px; 
    	margin-left:-15px;
    }
    .list{
    	list-style-type: none;
    	width:300px;
    	min-height: 500px;
    }
    
     .issuedesc{
     	margin-top:0px;
     	font-size: 12px;
     	display: block;
  		width: 100px;
  		overflow: hidden;
  		white-space: nowrap;
 		text-overflow: ellipsis;
     }
    
</style>
</head>
<body id="bodys">

    <section id="boardcontainer" class="container">
        <div class="bcont-header">
            <button class="btn btn-primary" style="text-align:left;margin-left:1.2%;"
             type="button" data-toggle="modal" data-target="#addissueModal">
             <span>+ Add Issue</span>
         </button> 
     </div>
     <div class="container-fluid">
              <div class="row">
                <div class="panel-group">
                  <div class="col-md-3 panelspace">
                    <div class="panel panel-info">
                      <div class="panel-heading">Backlog</div>
                      <div class="panel-body">
                        <ul id="backlog" class="list-group listitem">

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 panelspace">
                    <div class="panel panel-primary">
                      <div class="panel-heading">To Do</div>
                      <div class="panel-body">
                        <ul id="todo" class="list-group listitem">
                        
                        
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 panelspace">
                    <div class="panel panel-danger">
                      <div class="panel-heading">In Progress</div>
                      <div class="panel-body">
                        <ul id="inprogress" class="list-group listitem">

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 panelspace">
                    <div class="panel panel-success">
                      <div class="panel-heading">Completed</div>
                      <div class="panel-body">
                        <ul id="done" class="list-group listitem">
                        
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> <!-- /.row -->
            <!-- Modal -->
</section>

<!-- ADD ISSUE MODAL -->
<div class="modal fade" id="addissueModal" tabindex="-1" role="dialog" aria-labelledby="addissueLabel" aria-hidden="true">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4> Add Issue </h4>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="k_title">Title</label>
                <input type="text" class="form-control" id="kanbantitle" placeholder="Enter Title . . ">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Description</label>
                <textarea style="height: 250px" type="text" class="form-control" id="kanbandescription" placeholder="Enter Description">
                </textarea>
            </div>
        </form>
    </div>
    <div class="modal-footer">
       <button type="submit" class="btn btn-primary" id="kanbansubmit">Submit</button>
       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
   </div>
</div>
</div>
</div> 

<div class="modal fade" id="deleteIssueModal" tabindex="-1" role="dialog" aria-labelledby="addissueLabel" aria-hidden="true">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4> Are you sure you want to delete this Issue ?</h4>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
               ID
                <input type="text" class="form-control" id="kanbanID" name="kanbanID">
               Title
                <input type="text" class="form-control" id="kanbantitledelete" name="kanbantitledelete" placeholder="Enter Title . . ">
            </div>
        </form>
    </div>
    <div class="modal-footer">
       <button type="submit" class="btn btn-primary" id="kanbandelete" >Submit</button>
       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
   </div>
</div>
</div>
</div> 



<div class="modal fade" id="issueMenuModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4> Menu </h4>
    </div>
    <div class="modal-body">
		<button type="submit" class="btn btn-primary" id="issueOpenEditModal" >Edit Modal</button>
       	<button type="submit" class="btn btn-secondary" id="issueOpenDeleteModal">Delete</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
   </div>
</div>
</div>
</div>  



</body>


<!-- SCRIPTS -->

<script src="lib/toastr/build/toastr.min.js"></script>
<script src="js/kanbancommon.js"></script>
<script src="js/kanban.js"></script>
<script src="js/toastconf.js"></script>
<!-- ADD ISSUE MODAL -->
</html>