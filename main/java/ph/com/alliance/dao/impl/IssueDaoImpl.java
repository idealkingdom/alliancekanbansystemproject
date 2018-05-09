package ph.com.alliance.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TransactionRequiredException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import ph.com.alliance.dao.IssueDao;
import ph.com.alliance.entity.Issue;
@Repository("issueDao")
public class IssueDaoImpl implements IssueDao {

	@Override
	public boolean createIssue(EntityManager pEM, Issue pIssue) {
		// TODO Auto-generated method stub
		boolean success = true;
		try {
			pEM.persist(pIssue);
		} catch (EntityExistsException ee) {
			// TODO: handle exception
			ee.getMessage();
			success=false;
		}catch (IllegalArgumentException iae) {
			// TODO: handle exception
			iae.getMessage();
			success = false;
		}catch (TransactionRequiredException tre) {
			// TODO: handle exception
			tre.getMessage();
			success=false;
		}
		
		return success;
	}

	@Override
	public Issue updateIssueStatus(EntityManager pEM, Integer id, String status) {
		Issue issue = null;
		try {
			issue = pEM.find(Issue.class, id);
			pEM.getTransaction().begin();
			issue.setIssueStatus(status);
			pEM.getTransaction().commit();
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		} catch (TransactionRequiredException trxe) {
			trxe.getMessage();
		}
		return issue;
	}

	@Override
	public int deleteIssue(EntityManager pEM, Integer id) {
		// TODO Auto-generated method stub
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
	public List<Issue> selectIssues(EntityManager pEM, String pKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Issue> selectAllIssues(EntityManager pEM) {
		// TODO Auto-generated method stub
		
		//CriteriaBuilder cb = pEM.getCriteriaBuilder();
		//CriteriaQuery<Issue> cq = cb.createQuery(Issue.class);
		//Root<Issue> issueRoot = cq.from(Issue.class);
		//cq.select(issueRoot).orderBy();
		
		
		// generates equivalent "SELECT u FROM Issue u"
		try {
			//return pEM.createQuery(cq).getResultList();
			Query query = pEM.createQuery("FROM Issue issue ORDER BY issue.issuePriority ASC ");
			List<Issue> issueList = query.getResultList();
			return issueList;
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Issue selectIssue(EntityManager pEM, Integer id) {
		Issue issue = null;
		try {
			issue = pEM.find(Issue.class, id);
		} catch (IllegalArgumentException iae) {
			// TODO: handle exception
			iae.getMessage();
		}catch (TransactionRequiredException tre) {
			// TODO: handle exception
			tre.getMessage();
		}
		return issue;
	}

	@Override
	public Issue updateIssue(EntityManager pEM, Issue pIssue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteIssue(EntityManager pEM, Issue pIssue) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Issue updateIssuePriority(EntityManager pEM, Integer id,Integer priority) {
		Issue issue = null;
		try {
			issue = pEM.find(Issue.class, id);
			pEM.getTransaction().begin();
			issue.setIssuePriority(priority);
			pEM.getTransaction().commit();
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		} catch (TransactionRequiredException trxe) {
			trxe.getMessage();
		}
		return issue;
	}


	
		
	


}
