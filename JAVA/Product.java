public class Product {
    private String productId;
    private String name;
    private String description;
    private int availableQuantities;
    private double price;
    
    public Product(String productId, String name, String description, int availableQuantities, double price) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.availableQuantities = availableQuantities;
        this.price = price;
    }
    
    // Getters
    public String getProductId() {
        return productId;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public int getAvailableQuantities() {
        return availableQuantities;
    }
    
    public double getPrice() {
        return price;
    }
    
    // Setters
    public void setProductId(String productId) {
        this.productId = productId;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public void setAvailableQuantities(int availableQuantities) {
        this.availableQuantities = availableQuantities;
    }
    
    public void setPrice(double price) {
        this.price = price;
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "productId='" + productId + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", availableQuantities=" + availableQuantities +
                ", price=" + price +
                '}';
    }
} 