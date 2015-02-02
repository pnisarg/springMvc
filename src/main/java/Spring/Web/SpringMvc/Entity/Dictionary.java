package Spring.Web.SpringMvc.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "dictionary")
@NamedQuery(name = "Dictionary.getAllWords", query = "SELECT d FROM Dictionary d")
public class Dictionary {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	

	private String name;
	private String definition;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDefinition() {
		return definition;
	}

	public void setDefinition(String definition) {
		this.definition = definition;
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
