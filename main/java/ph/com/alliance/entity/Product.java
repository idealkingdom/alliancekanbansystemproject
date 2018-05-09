package ph.com.alliance.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the product database table.
 * 
 */
@Entity
@Table(name="product")
public class Product implements Serializable {

private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="serialNo")
	private String serialNo;
	
	private String productName;
	private String brand;
	private int quantity;
	
	/**
	 * 
	 * @return
	 */
	public String getSerialNo() {
		return serialNo;
	}
	
	/**
	 * 
	 * @param serialNo
	 */
	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}
	
	/**
	 * 
	 * @return
	 */
	public String getProductName() {
		return productName;
	}
	
	/**
	 * 
	 * @param productName
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	/**
	 * 
	 * @return
	 */
	public String getBrand() {
		return brand;
	}
	
	/**
	 * 
	 * @param brand
	 */
	public void setBrand(String brand) {
		this.brand = brand;
	}
	
	/**
	 * 
	 * @return
	 */
	public int getQuantity() {
		return quantity;
	}
	
	/**
	 * 
	 * @param quantity
	 */
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	@Override
    public String toString() {
        return "Product {" + "serialNo" + serialNo + ", productName=" + productName + ", brand=" + brand + ", quantity=" + quantity +'}';

    } 

}
