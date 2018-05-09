package ph.com.alliance.dao;

import java.util.List;

import javax.persistence.EntityManager;

import ph.com.alliance.entity.Issue;

public interface IssueDao {

	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	
	public boolean createIssue(EntityManager pEM,Issue pIssue);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public Issue updateIssue(EntityManager pEM,Issue pIssue);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public int deleteIssue(EntityManager pEM,Issue pIssue);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */

	public List<Issue> selectIssues(EntityManager pEM, String pKey);
	/**
	 * 
	 * @param issuePriority2 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public Issue updateIssueStatus(EntityManager pEM, Integer id, String status);
	public Issue updateIssuePriority(EntityManager pEM, Integer id, Integer priority);
	
	public List<Issue> selectAllIssues(EntityManager pEM);
	int deleteIssue(EntityManager pEM, Integer id);
	Issue selectIssue(EntityManager pEM, Integer id);
	
	
	
	
	

	
}
