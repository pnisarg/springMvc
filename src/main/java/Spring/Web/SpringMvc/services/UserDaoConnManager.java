package Spring.Web.SpringMvc.services;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class UserDaoConnManager {
	private static EntityManagerFactory emFactory;
	private static EntityManager entityManager;

	public EntityManager getEntityManager() {
		emFactory = Persistence.createEntityManagerFactory("SpringMvc");
		entityManager = emFactory.createEntityManager();
		return entityManager;
	}

	public void closeEntityManager() {
		entityManager.close();
		emFactory.close();
	}
}
