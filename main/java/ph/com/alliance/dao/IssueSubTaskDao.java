package ph.com.alliance.dao;

import java.util.List;

import javax.persistence.EntityManager;

import ph.com.alliance.entity.Issue;
import ph.com.alliance.entity.IssueSubTask;

public interface IssueSubTaskDao{
	
	
	public boolean createSubIssue(EntityManager pEM,IssueSubTask pIssue);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public IssueSubTask updateSubIssue(EntityManager pEM, IssueSubTask pIssue);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	int deleteSubIssue(EntityManager pEM, Integer Id);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public IssueSubTask selectSubIssue(EntityManager pEM,Integer id);
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public IssueSubTask updateSubIssue(EntityManager pEM, Integer id, String task);
	
	public IssueSubTask updateSubIssueStatus(EntityManager pEM, Integer id,
			String status);
	public List<IssueSubTask> selectSubIssues(EntityManager pEM, Integer id);
	

}
