package Spring.Web.SpringMvc.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import Spring.Web.SpringMvc.Entity.Dictionary;
import Spring.Web.SpringMvc.Entity.User;
import Spring.Web.SpringMvc.services.DictionaryDao;
import Spring.Web.SpringMvc.services.UserDao;

@Controller
public class HomeController {

	@RequestMapping(value = "/index")
	public ModelAndView test(HttpServletResponse response) throws IOException {
		return new ModelAndView("home");
	}
	
	@RequestMapping(value = "/userData",  method = RequestMethod.GET)
	public void getUserData(HttpServletResponse response) throws IOException{
		UserDao dao = new UserDao();
		List<User> users = dao.getUsers();
		Gson gson = new Gson();
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		String json = gson.toJson(users);
		out.print(json);
		out.flush();
	}
	
	@RequestMapping(value = "/userData/{name}",  method = RequestMethod.PUT,  headers = { "Content-Type=application/json" })
	public void updateUserData(HttpServletResponse response,@PathVariable String name,  @RequestBody User user) throws IOException{
		if(user != null && name != null){
			UserDao dao = new UserDao();
			dao.updateUser(name,user);
		}
		
	}
	@RequestMapping(value = "/userData/{name}",  method = RequestMethod.DELETE,  headers = { "Content-Type=application/json" })
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(HttpServletResponse response,  @PathVariable String name) throws IOException{
		UserDao dao = new UserDao();
		if(name != null)
			dao.removeUser(name);
		
	}
	@RequestMapping(value = "/index/{name}")
	public ModelAndView hello(HttpServletResponse response,
			@PathVariable("name") String name) throws IOException {
		ModelAndView mv = new ModelAndView("hello");
		DictionaryDao dao = new DictionaryDao();
		Dictionary dict = dao.getWord(name);
		mv.addObject("msg", dict.getName() + " -> " + dict.getDefinition());
		return mv;
	}
	@RequestMapping(value = "/words", method = RequestMethod.GET, headers = { "Accept=text/xml, application/json" })
	public void getWords(HttpServletResponse response) throws IOException {
		DictionaryDao dao = new DictionaryDao();
		List<Dictionary> words = dao.getWords();
		Gson gson = new Gson();
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		String json = gson.toJson(words);
		out.print(json);
		out.flush();		
	}

	@RequestMapping(value = "/words/{name}", method = RequestMethod.GET, headers = { "Accept=text/xml, application/json" })
	public @ResponseBody Dictionary dict(@PathVariable("name") String name) {
		DictionaryDao dao = new DictionaryDao();
		Dictionary dict = dao.getWord(name);
		return dict;
	}

	@RequestMapping(value = "/words", method = RequestMethod.POST, headers = { "Content-Type=application/json" })
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void addDefinition(@RequestBody Dictionary word) {
		DictionaryDao dao = new DictionaryDao();
		dao.addWord(word.getName(), word.getDefinition());
	}

	@RequestMapping(value = "/words/{id}", method = RequestMethod.PUT, headers = { "Content-Type=application/json" })
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateDefinition(@RequestBody Dictionary word) {
		DictionaryDao dao = new DictionaryDao();
		dao.updateWord(word.getId(), word.getName(), word.getDefinition());
	}

	@RequestMapping(value = "/words/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void addDefinition(@PathVariable("id") Integer id) {
		DictionaryDao dao = new DictionaryDao();
		dao.deleteWord(id);
	}
}