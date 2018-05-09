package ph.com.alliance.listeners;


import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class CustomHttpListener implements HttpSessionListener {
	
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		HttpSession session = se.getSession();
		//if we want to get some service / controller usage, below is how to do it
		//ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(se.getSession().getServletContext());
		//MyService myService = (myService) ctx.getBean("myService");
		System.out.println("SESSION CREATED HERE = " + session.getId());
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		HttpSession session = se.getSession();
		//if we want to get some service / controller usage, below is how to do it
		
		/**ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(se.getSession().getServletContext());
		MyService myService = (myService) ctx.getBean("myService");**/
		
		System.out.println("SESSION ENDED HERE = " + session.getId());
	}

}

