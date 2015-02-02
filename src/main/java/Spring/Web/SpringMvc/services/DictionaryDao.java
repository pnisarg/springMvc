package Spring.Web.SpringMvc.services;

import java.util.List;

import javax.persistence.EntityManager;

import Spring.Web.SpringMvc.Entity.Dictionary;


public class DictionaryDao {
	
	
	public void addWord(String name, String definition){
		DictDaoConnManager daoCM = new DictDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		Dictionary dict = new Dictionary();
		dict.setName(name);
		dict.setDefinition(definition);
		entityManager.persist(dict);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		
	}
	
	public Dictionary getWord(String name){
		DictDaoConnManager daoCM = new DictDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		Dictionary dict = entityManager.find(Dictionary.class, name);
		daoCM.closeEntityManager();
		return dict;
	}
	
	public void updateWord(Integer id, String name, String definition){
		DictDaoConnManager daoCM = new DictDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		Dictionary dict = entityManager.find(Dictionary.class, id);
		dict.setDefinition(definition);
		dict.setName(name);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
	}
	
	public void deleteWord(Integer id){
		DictDaoConnManager daoCM = new DictDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		Dictionary dict = entityManager.find(Dictionary.class, id);
		entityManager.remove(dict);
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
	}
	
	public List<Dictionary> getWords(){
		DictDaoConnManager daoCM = new DictDaoConnManager();
		EntityManager entityManager = daoCM.getEntityManager();
		entityManager.getTransaction().begin();
		List<Dictionary> dictionary = entityManager.createNamedQuery("Dictionary.getAllWords", Dictionary.class).getResultList();
		if(dictionary != null){
			System.out.println(dictionary.get(0).getName());
		}
		entityManager.getTransaction().commit();
		daoCM.closeEntityManager();
		return dictionary;
	}
	
	
}
