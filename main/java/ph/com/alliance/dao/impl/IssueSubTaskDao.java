package ph.com.alliance.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TransactionRequiredException;

import org.springframework.stereotype.Repository;

import ph.com.alliance.entity.Issue;
import ph.com.alliance.entity.IssueSubTask;

@Repository("issueSubTaskDao")
public class IssueSubTaskDao implements ph.com.alliance.dao.IssueSubTaskDao{

	@Override
	public boolean createSubIssue(EntityManager pEM, IssueSubTask pIssue) {
		boolean success = true;
		
		try {
			
			pEM.persist(pIssue);
			
		} catch (EntityExistsException ee) {
			// instantiate MyException class here and set custom error codes common to all
			// ie. throw new MyException(<ERROR CODE HERE>, <ERROR MESSAGE HERE>)
			ee.getMessage();
			success = false;
		} catch (IllegalArgumentException iae) {
			// instantiate MyException class here and set custom error codes common to all
			// ie. throw new MyException(<ERROR CODE HERE>, <ERROR MESSAGE HERE>)
			iae.getMessage();
			success = false;
		} catch (TransactionRequiredException trxe) {
			// instantiate MyException class here and set custom error codes common to all
			// ie. throw new MyException(<ERROR CODE HERE>, <ERROR MESSAGE HERE>)
			trxe.getMessage();
			success = false;
		}
		
		return success;
	}
	
	@Override
	public IssueSubTask selectSubIssue(EntityManager pEM, Integer id) {
		IssueSubTask issue = null;
		try {
			issue = pEM.find(IssueSubTask.class, id);
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		} catch (TransactionRequiredException trxe) {
			trxe.getMessage();
		}
		return issue;
	}

	@Override
	public List<IssueSubTask> selectSubIssues(EntityManager pEM, Integer id) {
		try {
			//return pEM.createQuery(cq).getResultList();
			Query query = pEM.createQuery("FROM IssueSubTask issue WHERE issue.issueID LIKE ?1")
							.setParameter(1,id);
			List<IssueSubTask> issueList = query.getResultList();
			return issueList;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public IssueSubTask updateSubIssue(EntityManager pEM,Integer id, String task) {
		IssueSubTask issue = null;
		try {
			issue = pEM.find(IssueSubTask.class, id);
			pEM.getTransaction().begin();
			issue.setSubIssueTask(task);
			pEM.getTransaction().commit();
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		} catch (TransactionRequiredException trxe) {
			trxe.getMessage();
		}
		return issue;
	}

	@Override
	public int deleteSubIssue(EntityManager pEM, Integer id) {
		Issue issue = null;
		try {
			issue = pEM.find(Issue.class, id);
			pEM.getTransaction().begin();
			pEM.remove(issue);
			pEM.getTransaction().commit();
			return 1;
		} catch (Exception e) {
			// TODO: handle exception
			return 0;
		}
	}

	@Override
	public IssueSubTask updateSubIssue(EntityManager pEM, IssueSubTask pIssue) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public IssueSubTask updateSubIssueStatus(EntityManager pEM, Integer id, String status) {
		// TODO Auto-generated method stub
		IssueSubTask issue = null;
		try {
			issue = pEM.find(IssueSubTask.class, id);
			pEM.getTransaction().begin();
			issue.setSubIssueStatus(status);
			pEM.getTransaction().commit();
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		} catch (TransactionRequiredException trxe) {
			trxe.getMessage();
		}
		return issue;
	}



}
