package ph.com.alliance.service.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaTransactionManager;

import ph.com.alliance.dao.IssueDao;
import ph.com.alliance.dao.IssueSubTaskDao;
import ph.com.alliance.entity.Issue;
import ph.com.alliance.entity.IssueSubTask;
import ph.com.alliance.service.DBSubIssueService;

public class DBSubIssueServiceImpl implements DBSubIssueService {

	@Autowired
	private IssueSubTaskDao issueSubDao;
	
	@Autowired
	private JpaTransactionManager transactionManager;
		
	@Override
	public boolean createSubIssue(IssueSubTask pIssue) {
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		boolean result = false;
		
		em.getTransaction().begin();
		try {
			result = issueSubDao.createSubIssue(em, pIssue);
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
	public IssueSubTask updateSubIssue(IssueSubTask pIssue,Integer id,String status) {
		
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		IssueSubTask result = null;
		try {
			result  = issueSubDao.updateSubIssueStatus(em, id,status);
		} catch (Exception e) {
			e.getMessage();
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}finally {
			if (em.isOpen()) {
				em.close();
			}
		}
		return result;
	}

	@Override
	public void deleteSubIssue(Integer id) {
		// TODO Auto-generated method stub
		
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();

		int result;

		try {
			result = issueSubDao.deleteSubIssue(em, id);
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
	public Issue selectSubIssue(IssueSubTask pIssue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<IssueSubTask> selectSubIssues(Integer id) {
		EntityManager em = transactionManager.getEntityManagerFactory().createEntityManager();
		List<IssueSubTask> issueList = null;
		
		try {
			issueList = issueSubDao.selectSubIssues(em, id);
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
	public IssueSubTask updateSubIssue(IssueSubTask pIssue) {
		// TODO Auto-generated method stub
		return null;
	}

}
