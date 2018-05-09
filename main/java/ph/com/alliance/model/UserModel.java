package ph.com.alliance.model;

public class UserModel {
	
	private String username;
	private String password;
	private String email;
	private String firstname;
	private String lastname;
	private String gender;
	private Integer age;
	private Integer type;
	
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "UserModel {username=" + username + ", password=" + password
				+ ", email=" + email + ", firstname=" + firstname
				+ ", lastname=" + lastname + ", gender=" + gender + ", age="
				+ age + ", type=" + type + "}";
	} 
}
