package ph.com.alliance.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ph.com.alliance.model.IssueModel;
import ph.com.alliance.model.UserModel;
@Controller
public class LoginRegisterController {

	
    @RequestMapping(value="/login",method=RequestMethod.GET)
    public String loadLogin(HttpServletRequest request, HttpServletResponse response, ModelMap map){
    	if(request.getSession().getAttribute("isLoggedIn")!=null)
    	{
    		return "board";
    	}
    	else{
    		return "login";
    	}
		
    }
    @RequestMapping(value="/register",method=RequestMethod.GET)
    public String loadRegister(HttpServletRequest request, HttpServletResponse response, ModelMap map){
		return "register";
    }
    
    @RequestMapping(value="/profile",method=RequestMethod.GET)
    public String loadProfile(HttpServletRequest request, HttpServletResponse response, ModelMap map){

		return "profile";
    }
    
    @RequestMapping(value="/notloggedin",method=RequestMethod.GET)
    public String loadNotlogin(HttpServletRequest request, HttpServletResponse response, ModelMap map){
		return "login";

    }
    
    
    @RequestMapping(value="/forcelogout",method=RequestMethod.GET)
    public void loadforceLogout(HttpServletRequest request, HttpServletResponse response, ModelMap map){
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Cache-Control","no-store");
		response.setHeader("Pragma","no-cache");
		response.setDateHeader ("Expires", 0);
    	try {
    		request.getSession().removeAttribute("isLoggedIn");
    		request.getSession().removeAttribute("username");
    		response.sendRedirect(request.getContextPath()+"/login");
		} catch (Exception e) {
			// TODO: handle exception
		}
    }
    
    @RequestMapping(value="/forcelogin",method=RequestMethod.GET)
    public void loadforceLogin(HttpSession session,HttpServletRequest request, HttpServletResponse response, ModelMap map){
    	UserModel u = new UserModel();
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Cache-Control","no-store");
		response.setHeader("Pragma","no-cache");
		response.setDateHeader ("Expires", 0);
		if(session.getAttribute("username")!=null){
			try {
				request.getSession().setAttribute("isLoggedIn", true);
				response.sendRedirect(request.getContextPath()+"/board");
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
				
			
			
			
		
		
    	
    }
    
}
