package Spring.Web.SpringMvc.services;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DictDaoConnManager {
	private  EntityManagerFactory dictemFactory;
	private  EntityManager dictentityManager;
	public EntityManager getEntityManager() {
		dictemFactory = Persistence.createEntityManagerFactory("SpringMvc");
		dictentityManager = dictemFactory.createEntityManager();
		return dictentityManager;
	}

	public void closeEntityManager() {
		dictentityManager.close();
		dictemFactory.close();
	}
}
