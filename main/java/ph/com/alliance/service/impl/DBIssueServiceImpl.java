package ph.com.alliance.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.OrderBy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.stereotype.Service;

import ph.com.alliance.dao.IssueDao;
import ph.com.alliance.entity.Issue;
import ph.com.alliance.entity.Product;
import ph.com.alliance.service.DBIssueService;
@Service("dBIssueService")
public class DBIssueServiceImpl implements DBIssueService {
	
	@Autowired
	private IssueDao issueDao;
	
	@Autowired
	private JpaTransactionManager transactionManager;
	
	@Override
	public boolean createIssue(Issue pIssue) {
		// TODO Auto-generated method stub
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		boolean result = false;
		
		em.getTransaction().begin();
		try {
			result = issueDao.createIssue(em, pIssue);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			} 
		} finally {
			if (em.isOpen()) {
				em.close();
			}
		}
		
		return result;
	}
	@Override
	public Issue updateIssueStatus(int id,String status) {
		// TODO Auto-generated method stub
		
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		Issue result = null;
	
		try {
			result = issueDao.updateIssueStatus(em, id,status);
		} catch (Exception e) {
			e.getMessage();
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}
		
		return result;
	}

	@Override
	public Issue updateIssuePriority(int id, int issuePriority) {
		// TODO Auto-generated method stub
		
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		Issue result = null;
	
		try {
			result = issueDao.updateIssuePriority(em, id,issuePriority);
		} catch (Exception e) {
			e.getMessage();
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}
		
		return result;
	}
	
	@Override
	public void deleteIssue(Integer id) {
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();

		int result;

		try {
			result = issueDao.deleteIssue(em, id);
		} catch (Exception e) {
			e.getMessage();
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		} finally {
			if (em.isOpen()) {
				em.close();
			}
		}
		
	}

	@Override
	public Issue selectIssue(Integer id) {
		// TODO Auto-generated method stub
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		return issueDao.selectIssue(em, id);
	}

	@Override
	public List<Issue> selectIssues(String pKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Issue> selectAllIssues() {
		// TODO Auto-generated method stub
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		List<Issue> issueList = null;
		
		try {
			issueList = issueDao.selectAllIssues(em);
		} catch (Exception e) {
			System.out.print(e.getMessage());
		} finally {
			if (em.isOpen()) {
				em.close();
			}
		}
		
		return issueList;
	}

	@Override
	public boolean createIssueAndUpdateProduct(Issue pIssue, Product pProd,
			boolean pRollbackFlag) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Issue updateIssue(Issue pIssue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteIssue(Issue pIssue) {
		// TODO Auto-generated method stub
		
	}
	
}
