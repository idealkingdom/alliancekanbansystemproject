package ph.com.alliance.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Example controller class that hadles static view requests.
 * All requests that returns pages (html, xhtml, jsp, jspx, etc.) is handled here. 
 *
 */
@Controller
@RequestMapping("/modulename")
public class ModuleViewController {
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @param map
	 * @return
	 */
    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public String viewProfile(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	System.out.println("@/modulename/profile MODULE VIEW CONTROLLER CALLED.");
        return "profile";
    }
    
    /**
     * 
     * @param request
     * @param response
     * @param map
     * @return
     */
    @RequestMapping(value = "/messages", method = RequestMethod.GET)
    public String viewMessages(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	System.out.println("@/modulename/messages MODULE VIEW CONTROLLER CALLED.");
        return "messages";
    }
 
    /**
     * 
     * @param request
     * @param response
     * @param map
     * @return
     */
    @RequestMapping(value = "/userform", method = RequestMethod.GET)
    public String viewUserForm(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
    	System.out.println("@/modulename/userform MODULE VIEW CONTROLLER CALLED.");
        return "userform";
    }
}
