package ph.com.alliance.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
public class BoardHomeController {
    @RequestMapping(value="/board",method=RequestMethod.GET)
    public String loadKanbanBoard(HttpServletRequest request, HttpServletResponse response, ModelMap map){
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Cache-Control","no-store");
		response.setHeader("Pragma","no-cache");
		response.setDateHeader ("Expires", 0);
		return "board";
    }
    
    
    @RequestMapping(value="/kanban",method=RequestMethod.GET)
    public String loadkanbandragdrop(HttpServletRequest request, HttpServletResponse response, ModelMap map){
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Cache-Control","no-store");
		response.setHeader("Pragma","no-cache");
		response.setDateHeader ("Expires", 0);
		return "kanban";
    }
}
