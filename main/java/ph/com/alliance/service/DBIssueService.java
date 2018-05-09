package ph.com.alliance.service;

import java.util.List;

import ph.com.alliance.entity.Product;
import ph.com.alliance.entity.Issue;

public interface DBIssueService {
	/**
	 * 
	 * @return
	 */
	public boolean createIssue(Issue pIssue);
	
	/**
	 * 
	 */
	
	public Issue updateIssue(Issue pIssue);
	
	/**
	 * 
	 */
	public void deleteIssue(Issue pIssue);
	
	/**
	 * 
	 * @return
	 */
	public List<Issue> selectIssues(String pKey);
	/**
	 * 
	 * @return
	 */
	public List<Issue> selectAllIssues();
	
	/*-------------------- MULTI TABLE TRANSASCTION TESTS -----------------------*/
	public boolean createIssueAndUpdateProduct(Issue pIssue, Product pProd, boolean pRollbackFlag);


	Issue updateIssueStatus(int id, String status);

	void deleteIssue(Integer id);

	Issue updateIssuePriority(int id, int issuePriority);

	Issue selectIssue(Integer id);


	
	
}
