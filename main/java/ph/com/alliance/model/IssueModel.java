package ph.com.alliance.model;


public class IssueModel {

	private Integer Id;
	private String userInfo;
	private String issueName;
	private String issueDescription;
	private String issueStatus;
	private String issueCreated;
	private Integer issuePriority;
	
	public Integer getId() {
		return Id;
	}
	public void setId(Integer id) {
		this.Id = id;
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
		return "IssueModel {Id=" + Id + ", userInfo=" + userInfo
				+ ", issueName=" + issueName + ", issueDescription="
				+ issueDescription + ", issueStatus=" + issueStatus
				+ ", issueCreated=" + issueCreated + ", issuePriority="
				+ issuePriority + "}";
	}
		
}
