package ph.com.alliance.dao.impl;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.TransactionRequiredException;

import org.springframework.stereotype.Repository;

import ph.com.alliance.dao.ProductDao;
import ph.com.alliance.entity.Product;

/**
 * Sample data access object implementation using Java Persistence API. 
 *
 */
@Repository("productDao")
public class ProductDaoImpl implements ProductDao {

	/*
	 * (non-Javadoc)
	 * @see ph.com.alliance.dao.ProductDao#createProduct(javax.persistence.EntityManager, ph.com.alliance.entity.Product)
	 */
	@Override
	public boolean createProduct(EntityManager pEM, Product pProd) {
		boolean success = true;
		
		try {
			
			pEM.persist(pProd);
			
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

	/*
	 * (non-Javadoc)
	 * @see ph.com.alliance.dao.ProductDao#updateProduct(javax.persistence.EntityManager, ph.com.alliance.entity.Product)
	 */
	@Override
	public Product updateProduct(EntityManager pEM, Product pProd) {
		Product prod = null;
		
		try {
			prod = pEM.merge(pProd);
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		} catch (TransactionRequiredException trxe) {
			trxe.getMessage();
		}
		
		return prod;
	}

	/*
	 * (non-Javadoc)
	 * @see ph.com.alliance.dao.ProductDao#selectProduct(javax.persistence.EntityManager, ph.com.alliance.entity.Product)
	 */
	@Override
	public Product selectProduct(EntityManager pEM, String pSerialNo) {
		Product prod = null;
		
		try {
			
			prod = pEM.find(Product.class, pSerialNo);
			
		} catch (IllegalArgumentException iae) {
			iae.getMessage();
		}
		
		return prod;
	}

}
