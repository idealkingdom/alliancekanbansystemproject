package ph.com.alliance.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="subIssue")
public class IssueSubTask implements Serializable {

	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="subIssueId")
	
	
	private Integer subIssueId;
	private Integer issueID;
	private String subIssueTask;
	private String subIssueStatus;
	
	
	
	
	public Integer getIssueID() {
		return issueID;
	}
	public void setIssueID(Integer issueID) {
		this.issueID = issueID;
	}
	public Integer getSubIssueId() {
		return subIssueId;
	}
	public void setSubIssueId(Integer subIssueId) {
		this.subIssueId = subIssueId;
	}
	public String getSubIssueTask() {
		return subIssueTask;
	}
	public void setSubIssueTask(String subIssueTask) {
		this.subIssueTask = subIssueTask;
	}
	public String getSubIssueStatus() {
		return subIssueStatus;
	}
	public void setSubIssueStatus(String subIssueStatus) {
		this.subIssueStatus = subIssueStatus;
	}
	
	
	@Override
	public String toString() {
		return "IssueSubTask {subIssueId=" + subIssueId + ", issueID="
				+ issueID + ", subIssueTask=" + subIssueTask
				+ ", subIssueStatus=" + subIssueStatus + "}";
	}
	
	
	
}
