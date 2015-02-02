package Spring.Web.SpringMvc.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import Spring.Web.SpringMvc.Entity.Response;
import Spring.Web.SpringMvc.Entity.User;
import Spring.Web.SpringMvc.services.UserDao;

@Controller
public class LoginController {
	@RequestMapping(value = "/register")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ModelAndView register(@RequestParam Map<String, String> params) {
		User user = new User();
		UserDao dao = new UserDao();
		user.setFirstName(params.get("first"));
		user.setLastName(params.get("last"));
		user.setEmail(params.get("email"));
		user.setUserName(params.get("user"));
		user.setSalt(dao.getSalt());
		// store password in salted hash format into database
		user.setPassword(dao.encryptPassword(user.getSalt()
				+ params.get("pass")));

		dao.registerUser(user);
		return new ModelAndView("home");
	}
	@RequestMapping(value = "/logout")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ModelAndView logout(HttpServletResponse response, HttpServletRequest request) throws IOException {
		Cookie cookie = null;
		Cookie[] cookieArr = request.getCookies();
		System.out.println(cookieArr.length);
		if(cookieArr != null){
			for(int i=cookieArr.length-1; i>=0; i--){
				cookie = cookieArr[i];
				cookie.setMaxAge(0);
				response.addCookie(cookie);
				System.out.println(cookie.getName());
			}
		}
		return new ModelAndView("home");
	}
	
	@RequestMapping(value = "/login")
	public void login(HttpServletResponse response, @RequestParam("user") String username,
			@RequestParam("password") String password) throws IOException {
		if (!username.isEmpty() && !password.isEmpty()) {
			UserDao dao = new UserDao();
			User user = dao.validateUser(username);
			Response res = new Response();
			Gson gson = new Gson();
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			
			if (user != null) {
				if (dao.comparePassword(user, password)) {
					res.setSuccess("true");
					res.setMsg("login successful");
					System.out.println("login successful");
				} 
				else {
					res.setSuccess("false");
					res.setMsg("Username or Password is incorrect.");
					System.out.println("login failed");
				}
			}
			else{
				res.setSuccess("false");
				res.setMsg("Username or Password is incorrect.");
				System.out.println("login failed");
			}
			
			String json = gson.toJson(res);
			out.print(json);
			out.flush();

		}
		//return new ModelAndView("home");
	}

}
