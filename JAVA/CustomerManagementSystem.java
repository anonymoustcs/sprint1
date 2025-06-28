import java.util.*;
import java.util.regex.Pattern;

public class CustomerManagementSystem {
    private static List<Customer> customers = new ArrayList<>();
    private static List<Product> products = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        int choice;
        do {
            displayMainMenu();
            choice = getValidChoice(1, 7);
            
            switch (choice) {
                case 1:
                    registerCustomer();
                    break;
                case 2:
                    updateCustomer();
                    break;
                case 3:
                    addUpdateProduct();
                    break;
                case 4:
                    searchCustomerByEmail();
                    break;
                case 5:
                    findProductByHighestPrice();
                    break;
                case 6:
                    sortProductsByQuantity();
                    break;
                case 7:
                    System.out.println("Thank you for using Customer Management System!");
                    break;
            }
        } while (choice != 7);
        scanner.close();
    }
    
    private static void displayMainMenu() {
        System.out.println("\n=== CUSTOMER MANAGEMENT SYSTEM ===");
        System.out.println("1. Customer Registration");
        System.out.println("2. Update Customer Details");
        System.out.println("3. Add/Update Product Details");
        System.out.println("4. Search Customer by Email");
        System.out.println("5. Find Product by Highest Price");
        System.out.println("6. Sort Products by Quantity");
        System.out.println("7. Exit");
        System.out.print("Enter your choice (1-7): ");
    }
    
    private static int getValidChoice(int min, int max) {
        while (true) {
            try {
                int choice = Integer.parseInt(scanner.nextLine().trim());
                if (choice >= min && choice <= max) {
                    return choice;
                } else {
                    System.out.println("Please enter a number between " + min + " and " + max);
                }
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid number.");
            }
        }
    }
    
    // US001: Customer Registration
    private static void registerCustomer() {
        System.out.println("\n=== CUSTOMER REGISTRATION ===");
        
        String name = getValidCustomerName();
        String email = getValidEmail();
        
        // Check if email already exists
        if (isEmailExists(email)) {
            System.out.println("Email already exists! Please use a different email.");
            return;
        }
        
        String password = getValidPassword();
        String address = getValidAddress();
        String contactNumber = getValidContactNumber();
        
        // Generate random 5-digit Customer ID
        int customerId = generateCustomerId();
        
        Customer customer = new Customer(customerId, name, email, password, address, contactNumber);
        customers.add(customer);
        
        System.out.println("Customer Registration is successful for " + customerId);
    }
    
    // US002: Update Customer Details
    private static void updateCustomer() {
        System.out.println("\n=== UPDATE CUSTOMER DETAILS ===");
        
        System.out.print("Enter customer email to update: ");
        String email = scanner.nextLine().trim();
        
        Customer customer = findCustomerByEmail(email);
        if (customer == null) {
            System.out.println("No Such Customer Exist with the Given Email");
            return;
        }
        
        System.out.println("Current customer details:");
        displayCustomer(customer);
        
        System.out.println("\nEnter new details (press Enter to keep current value):");
        
        String name = getValidCustomerName();
        String newEmail = getValidEmail();
        
        // Check if new email already exists (excluding current customer)
        if (!newEmail.equals(email) && isEmailExists(newEmail)) {
            System.out.println("Email already exists! Please use a different email.");
            return;
        }
        
        String password = getValidPassword();
        String address = getValidAddress();
        String contactNumber = getValidContactNumber();
        
        // Update customer details
        customer.setName(name);
        customer.setEmail(newEmail);
        customer.setPassword(password);
        customer.setAddress(address);
        customer.setContactNumber(contactNumber);
        
        System.out.println("Your Details updated successfully");
    }
    
    // US003: Add/Update Product Details
    private static void addUpdateProduct() {
        System.out.println("\n=== ADD/UPDATE PRODUCT DETAILS ===");
        
        System.out.print("Enter Product ID to add/update (or press Enter to generate new): ");
        String productIdInput = scanner.nextLine().trim();
        
        String productId;
        Product existingProduct = null;
        
        if (productIdInput.isEmpty()) {
            productId = generateProductId();
        } else {
            productId = productIdInput;
            existingProduct = findProductById(productId);
        }
        
        String productName = getValidProductName();
        String productDescription = getValidProductDescription();
        int availableQuantities = getValidQuantity();
        double price = getValidPrice();
        
        if (existingProduct != null) {
            // Update existing product
            existingProduct.setName(productName);
            existingProduct.setDescription(productDescription);
            existingProduct.setAvailableQuantities(availableQuantities);
            existingProduct.setPrice(price);
        } else {
            // Add new product
            Product product = new Product(productId, productName, productDescription, availableQuantities, price);
            products.add(product);
        }
        
        System.out.println("Product added successfully");
    }
    
    // US004: Search Customer by Email
    private static void searchCustomerByEmail() {
        System.out.println("\n=== SEARCH CUSTOMER BY EMAIL ===");
        
        System.out.print("Enter customer email: ");
        String email = scanner.nextLine().trim();
        
        Customer customer = findCustomerByEmail(email);
        if (customer != null) {
            System.out.println("Customer found:");
            displayCustomer(customer);
        } else {
            System.out.println("No Such Customer Exist with the Given Email");
        }
    }
    
    // US005: Find Product by Highest Price
    private static void findProductByHighestPrice() {
        System.out.println("\n=== FIND PRODUCT BY HIGHEST PRICE ===");
        
        if (products.isEmpty()) {
            System.out.println("Product List is Empty");
            return;
        }
        
        Product highestPriceProduct = products.get(0);
        for (Product product : products) {
            if (product.getPrice() > highestPriceProduct.getPrice()) {
                highestPriceProduct = product;
            }
        }
        
        System.out.println("Product with highest price:");
        displayProduct(highestPriceProduct);
    }
    
    // US006: Sort Products by Quantity
    private static void sortProductsByQuantity() {
        System.out.println("\n=== SORT PRODUCTS BY QUANTITY ===");
        
        if (products.isEmpty()) {
            System.out.println("Product List is Empty");
            return;
        }
        
        // Sort products by quantity in descending order
        List<Product> sortedProducts = new ArrayList<>(products);
        sortedProducts.sort((p1, p2) -> Integer.compare(p2.getAvailableQuantities(), p1.getAvailableQuantities()));
        
        System.out.println("Products sorted by quantity (highest to lowest):");
        for (Product product : sortedProducts) {
            displayProduct(product);
            System.out.println();
        }
    }
    
    // Helper methods for input validation
    private static String getValidCustomerName() {
        while (true) {
            System.out.print("Enter Customer Name (max 50 characters): ");
            String name = scanner.nextLine().trim();
            if (name.length() <= 50 && !name.isEmpty()) {
                return name;
            } else {
                System.out.println("Name must be between 1 and 50 characters.");
            }
        }
    }
    
    private static String getValidEmail() {
        while (true) {
            System.out.print("Enter Email: ");
            String email = scanner.nextLine().trim();
            if (isValidEmailFormat(email)) {
                return email;
            } else {
                System.out.println("Please enter a valid email address.");
            }
        }
    }
    
    private static String getValidPassword() {
        while (true) {
            System.out.print("Enter Password (6-12 characters): ");
            String password = scanner.nextLine().trim();
            if (password.length() >= 6 && password.length() <= 12) {
                return password;
            } else {
                System.out.println("Password must be between 6 and 12 characters.");
            }
        }
    }
    
    private static String getValidAddress() {
        while (true) {
            System.out.print("Enter Address (max 100 characters): ");
            String address = scanner.nextLine().trim();
            if (address.length() <= 100 && !address.isEmpty()) {
                return address;
            } else {
                System.out.println("Address must be between 1 and 100 characters.");
            }
        }
    }
    
    private static String getValidContactNumber() {
        while (true) {
            System.out.print("Enter Contact Number (exactly 10 digits): ");
            String contact = scanner.nextLine().trim();
            if (contact.matches("\\d{10}")) {
                return contact;
            } else {
                System.out.println("Contact number must be exactly 10 digits.");
            }
        }
    }
    
    private static String getValidProductName() {
        while (true) {
            System.out.print("Enter Product Name (max 50 characters): ");
            String name = scanner.nextLine().trim();
            if (name.length() <= 50 && !name.isEmpty()) {
                return name;
            } else {
                System.out.println("Product name must be between 1 and 50 characters.");
            }
        }
    }
    
    private static String getValidProductDescription() {
        while (true) {
            System.out.print("Enter Product Description (max 100 characters): ");
            String description = scanner.nextLine().trim();
            if (description.length() <= 100 && !description.isEmpty()) {
                return description;
            } else {
                System.out.println("Product description must be between 1 and 100 characters.");
            }
        }
    }
    
    private static int getValidQuantity() {
        while (true) {
            System.out.print("Enter Available Quantities: ");
            try {
                int quantity = Integer.parseInt(scanner.nextLine().trim());
                if (quantity >= 0) {
                    return quantity;
                } else {
                    System.out.println("Quantity must be a non-negative number.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid number.");
            }
        }
    }
    
    private static double getValidPrice() {
        while (true) {
            System.out.print("Enter Price (up to 2 decimal places): ");
            try {
                double price = Double.parseDouble(scanner.nextLine().trim());
                if (price >= 0) {
                    return Math.round(price * 100.0) / 100.0; // Round to 2 decimal places
                } else {
                    System.out.println("Price must be a non-negative number.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid number.");
            }
        }
    }
    
    // Helper methods for validation and generation
    private static boolean isValidEmailFormat(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return Pattern.matches(emailRegex, email);
    }
    
    private static boolean isEmailExists(String email) {
        return findCustomerByEmail(email) != null;
    }
    
    private static Customer findCustomerByEmail(String email) {
        for (Customer customer : customers) {
            if (customer.getEmail().equals(email)) {
                return customer;
            }
        }
        return null;
    }
    
    private static Product findProductById(String productId) {
        for (Product product : products) {
            if (product.getProductId().equals(productId)) {
                return product;
            }
        }
        return null;
    }
    
    private static int generateCustomerId() {
        Random random = new Random();
        return 10000 + random.nextInt(90000); // 5-digit number
    }
    
    private static String generateProductId() {
        Random random = new Random();
        int part1 = 1 + random.nextInt(9); // 1-9
        int part2 = 1000 + random.nextInt(9000); // 1000-9999
        int part3 = 1000 + random.nextInt(9000); // 1000-9999
        int part4 = 1 + random.nextInt(9); // 1-9
        return part1 + "-" + part2 + "-" + part3 + "-" + part4;
    }
    
    private static void displayCustomer(Customer customer) {
        System.out.println("Customer ID: " + customer.getCustomerId());
        System.out.println("Name: " + customer.getName());
        System.out.println("Email: " + customer.getEmail());
        System.out.println("Address: " + customer.getAddress());
        System.out.println("Contact Number: " + customer.getContactNumber());
    }
    
    private static void displayProduct(Product product) {
        System.out.println("Product ID: " + product.getProductId());
        System.out.println("Name: " + product.getName());
        System.out.println("Description: " + product.getDescription());
        System.out.println("Available Quantities: " + product.getAvailableQuantities());
        System.out.println("Price: $" + String.format("%.2f", product.getPrice()));
    }
} 
