package ph.com.alliance.controller.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ph.com.alliance.entity.Issue;
import ph.com.alliance.entity.User;
import ph.com.alliance.model.IssueModel;
import ph.com.alliance.model.UserModel;
import ph.com.alliance.service.DBIssueService;
import ph.com.alliance.service.DBTransactionTestService;

/**
 * Controller class used to hadle api requests.
 * All requests that falls through /api/* servlet mapping goes through here.
 * 
 */
@Controller
public class ModuleAPIController {
	@Autowired
	DBIssueService dis;
	@Autowired
	DBTransactionTestService dbSvc;
	@Autowired
	DozerBeanMapper dozerBeanMapper;
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @param map
	 * @return
	 */
    @RequestMapping(value = "/saveUser", method = RequestMethod.POST)
    @ResponseBody
    public UserModel saveUser(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	UserModel u = new UserModel();
    	int age = (request.getParameter("age") == "" ? 0: Integer.parseInt(request.getParameter("age")));
    	u.setEmail(request.getParameter("email").toString());
    	u.setLastname(request.getParameter("lastname").toString());
    	u.setAge(Integer.parseInt(request.getParameter("age")));
    	u.setFirstname(request.getParameter("firstname").toString());
    	u.setUsername(request.getParameter("username").toString());
    	u.setGender(String.valueOf(request.getParameter("gender")));
    	u.setPassword(request.getParameter("password"));
    	u.setType(0);
    	if(!dbSvc.createUser(this.convertToEntity(u))) {
    		u = null;
    	}
    	
    	System.out.println("MAPPED USER --- " + this.convertToEntity(u));
    	return u;
    }
    

   
    
    @RequestMapping(value = "/loginUser/{username}", method = RequestMethod.GET)
    @ResponseBody
    public UserModel loginUser(HttpSession session,HttpServletRequest request,@PathVariable("username") String username) {
    	User u = new User();
    	UserModel m = new UserModel();
    	u.setUsername(username);
    	session.setAttribute("username",u.getUsername());
    	    	
    	return convertToModel(dbSvc.selectUser(u));
    	 
    }
    
  
    
    
    /**
     * 
     * @param username
     * @return
     */
    @RequestMapping(value = "/searchUser/{username}", method = RequestMethod.GET)
    @ResponseBody
    public UserModel searchUser(@PathVariable("username") String username) {
    	User u = new User();
    	
    	u.setUsername(username);
    	
    	return convertToModel(dbSvc.selectUser(u));
    }
    
    /**
     * 
     * @return
     */
    @RequestMapping(value = "/searchAllUsers", method = RequestMethod.GET)
    @ResponseBody
    public List<UserModel> searchAllUsers() {
    	List<User> userList = dbSvc.selectAllUsers();
    	List<UserModel> userModelList = new ArrayList<UserModel>();
    	
    	for(User u : userList) {
    		userModelList.add(convertToModel(u));
    	}
    	 	
    	return userModelList;
    }	
   
	@RequestMapping(method = RequestMethod.POST, value = "/searchIssues/{issueName}")
	public String searchUsers(HttpServletRequest request, ModelMap map, @RequestParam(value = "issueName", required = true)
	String issueName) {
		String searchUserId = request.getParameter("userId");
		String searchFirstName = request.getParameter("firstName");
		String searchFamilyName = request.getParameter("familyName");
		String searchEmail = request.getParameter("email");

		Issue searchObject = new Issue();
		searchObject.setIssueName(issueName);
		List<Issue> issueList = dis.selectAllIssues();
		map.addAttribute("issueList", issueList);
		return "issues/list";
		
	}
    /**
     * This is a sample object mapper.
     * Entity to model mapping can be handled by the class constructor itself, or
     * see convertToEntity function for another type of mapping.
     * 
     * @param pUser
     * @return UserModel
     */
    private UserModel convertToModel (User pUser) { 	
    	UserModel userModel = null;
    	
    	if (pUser != null) {
    		userModel = dozerBeanMapper.map(pUser, UserModel.class);
    	} 
    	
    	return userModel;
    }
    /**
     * This is a sample object mapper.
     * Model to entity mapping can be explicitly done via setters, or
     * see convertToModel function for mapping using constructor
     * 
     * @param pUserModel
     * @return
     */
    private User convertToEntity (UserModel pUserModel) {
    	User u = null;
    	
    	if (pUserModel != null) {
    		u = dozerBeanMapper.map(pUserModel, User.class);
    	}
    	
    	return u;
    }
    
    
	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/saveIssue", method = RequestMethod.POST)
	@ResponseBody
    public IssueModel saveIssue(HttpSession session,HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	IssueModel u = new IssueModel();
    	UserModel i = new UserModel();
    	Date date = new Date();
    	//u.setEmail(request.getParameter("email").toString());
    	//u.setType(0);
    	u.setIssueName(request.getParameter(("kanbantitle").toString()));
    	u.setIssueDescription(request.getParameter(("kanbandescription").toString()));
    	u.setIssueStatus("backlog");
    	u.setIssuePriority(0);
    	u.setIssueCreated(""+date.toGMTString());
    	u.setUserInfo(""+request.getSession().getAttribute("username"));
    	if(!dis.createIssue(this.convertToEntityIssue(u))) {
    		u = null;
    	}
    	
    	System.out.println("MAPPED Issue --- " + this.convertToEntityIssue(u));
    	return u;
    }
	

	@RequestMapping(value = "/updateIssueColumn", method = RequestMethod.POST)
	@ResponseBody
    public IssueModel updateIssueColumn(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	dis.updateIssueStatus(Integer.parseInt(request.getParameter("id")), request.getParameter("status")
    			);
    	return null;
    }
	
	@RequestMapping(value = "/updateIssuePriority", method = RequestMethod.POST)
	@ResponseBody
    public IssueModel updateIssuePriority(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	dis.updateIssuePriority(Integer.parseInt(request.getParameter("id")), Integer.parseInt(request.getParameter("priority")));
    	return null;
    }
	
    @RequestMapping(value = "/searchIssue", method = RequestMethod.GET)
    @ResponseBody
    public IssueModel searchIssue(Integer id) {
    	Issue i = new Issue();
    	dis.selectIssue(id);
    	return null;
    }
    
    
	
	  @RequestMapping(value = "/searchAllIssue", method = RequestMethod.GET)
	   @ResponseBody
    public List<IssueModel> searchAllIssue(HttpServletRequest request,ModelMap map){
    	List<Issue> issueList = dis.selectAllIssues();
    	List<IssueModel> issueModelList = new ArrayList<IssueModel>();
    	
    	for(Issue u : issueList) {
    		issueModelList.add(convertToIssueModel(u));
    	}

    	return issueModelList;
    	
		
    }
	    
	    @RequestMapping(value = "/deleteIssue", method = RequestMethod.POST)
	    @ResponseBody
	    public IssueModel deleteIssue(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
	    	Issue i = new Issue();
	    	dis.deleteIssue(Integer.parseInt(request.getParameter("id")));
			return this.searchIssue(Integer.parseInt(request.getParameter("id")));
	    }

    private Issue convertToEntityIssue (IssueModel pIssueModel) {
    	Issue u = null;
    	
    	if (pIssueModel != null) {
    		u = dozerBeanMapper.map(pIssueModel, Issue.class);
    	}
    	
    	return u;
    }
    
    
    private IssueModel convertToIssueModel (Issue pIssue) { 	
    	IssueModel issueModel = null;
    	
    	if (pIssue != null) {
    		issueModel = dozerBeanMapper.map(pIssue, IssueModel.class);
    	} 
    	
    	return issueModel;
    }
    
    
}
