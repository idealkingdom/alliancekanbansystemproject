package ph.com.alliance.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OrderBy;
import javax.persistence.Table;


/**
 * The persistent class for the product database table.
 * 
 */
@Entity
@Table(name="Issue")
public class Issue implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	
	private Integer id;
	private String userInfo;
	private String issueName;
	private String issueDescription;
	private String issueStatus;
	private String issueCreated;
	private Integer issuePriority;
	
	
	
	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getUserInfo() {
		return userInfo;
	}
	public void setUserInfo(String userInfo) {
		this.userInfo = userInfo;
	}
	public String getIssueName() {
		return issueName;
	}
	public void setIssueName(String issueName) {
		this.issueName = issueName;
	}
	public String getIssueDescription() {
		return issueDescription;
	}
	public void setIssueDescription(String issueDescription) {
		this.issueDescription = issueDescription;
	}
	public String getIssueStatus() {
		return issueStatus;
	}
	public void setIssueStatus(String issueStatus) {
		this.issueStatus = issueStatus;
	}
	public String getIssueCreated() {
		return issueCreated;
	}
	public void setIssueCreated(String issueCreated) {
		this.issueCreated = issueCreated;
	}
	public Integer getIssuePriority() {
		return issuePriority;
	}
	public void setIssuePriority(Integer issuePriority) {
		this.issuePriority = issuePriority;
	}
	@Override
	public String toString() {
		return "Issue {id=" + id + ", userInfo=" + userInfo + ", issueName="
				+ issueName + ", issueDescription=" + issueDescription
				+ ", issueStatus=" + issueStatus + ", issueCreated="
				+ issueCreated + ", issuePriority=" + issuePriority + "}";
	}
	
	
	
	

	
}
