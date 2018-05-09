package ph.com.alliance.service;

import java.util.List;

import ph.com.alliance.entity.Issue;
import ph.com.alliance.entity.IssueSubTask;

public interface DBSubIssueService {

public boolean createSubIssue(IssueSubTask pIssue);
	
	/**
	 * 
	 */
	
	public IssueSubTask updateSubIssue(IssueSubTask pIssue);
	
	/**
	 * 
	 */
	public Issue selectSubIssue(IssueSubTask pIssue);
	
	/**
	 * 
	 * @return
	 */

	IssueSubTask updateSubIssue(IssueSubTask pIssue, Integer id, String status);

	public void deleteSubIssue(Integer id);

	List<IssueSubTask> selectSubIssues(Integer id);
	
}
