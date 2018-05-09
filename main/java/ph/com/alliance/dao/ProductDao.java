package ph.com.alliance.dao;

import javax.persistence.EntityManager;

import ph.com.alliance.entity.Product;

/**
 * 
 * 
 */
public interface ProductDao {
	
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public boolean createProduct(EntityManager pEM, Product pProd);
	
	/**
	 * 
	 * @param pEM
	 * @param pProd
	 * @return
	 */
	public Product updateProduct(EntityManager pEM, Product pProd);
	
	/**
	 * 
	 * @param pEM
	 * @param pKey
	 * @return
	 */
	public Product selectProduct(EntityManager pEM, String pSerialNo);

}
