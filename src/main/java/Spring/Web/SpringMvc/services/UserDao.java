package Spring.Web.SpringMvc.services;

import java.security.SecureRandom;
import java.util.List;

import javax.persistence.EntityManager;


import Spring.Web.SpringMvc.Entity.User;

public class UserDao {

	public void registerUser(User user){
		UserDaoConnManager daoCM = new UserDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		entityManager.persist(user);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		
	}

	public User validateUser(String username) {
		UserDaoConnManager daoCM = new UserDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		User user = entityManager.find(User.class, username);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		return user;
	}
	
	public List<User> getUsers(){
		UserDaoConnManager daoCM = new UserDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		//List<User> users = entityManager.createQuery("SELECT u FROM usertable u",User.class).getResultList();
		List<User> users = entityManager.createNamedQuery("User.getAllusers", User.class).getResultList();
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		return users;
	}
	
	public String encryptPassword(String password){
		return Crypto.sha1(password);
	}
	public String getSalt(){
		SecureRandom random = new SecureRandom();
		return Integer.toString(random.nextInt());
	}

	public boolean comparePassword(User user, String clearPassword) {
		String encryptedPass = encryptPassword(user.getSalt()+clearPassword);
		if(encryptedPass.equals(user.getPassword()))
			return true;
		return false;
	}

	public void updateUser(String name, User updatedUser) {
		UserDaoConnManager daoCM = new UserDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		User user = entityManager.find(User.class, name);
		user.setEmail(updatedUser.getEmail());
		user.setFirstName(updatedUser.getFirstName());
		user.setLastName(updatedUser.getLastName());
		entityManager.persist(user);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		
	}

	public void removeUser(String name) {
		UserDaoConnManager daoCM = new UserDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		User user = entityManager.find(User.class, name);
		entityManager.remove(user);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		
	}

	
}
