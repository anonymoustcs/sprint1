#!/bin/bash

# Product Management System
# Implements User Stories: US_UI_001, US_UI_002, US_UI_003

PRODUCT_FILE="product_repository.txt"
TEMP_FILE="temp_products.txt"

# Function to display the main menu
display_menu() {
    clear
    echo "=========================================="
    echo "        PRODUCT MANAGEMENT SYSTEM"
    echo "=========================================="
    echo "1. Sort Products by Name (Customer)"
    echo "2. Search Product by Name (Customer)"
    echo "3. Search and Replace Product (Administrator)"
    echo "4. View All Products"
    echo "5. Exit"
    echo "=========================================="
    echo -n "Please select an option (1-5): "
}

# Function to check if product file exists
check_product_file() {
    if [ ! -f "$PRODUCT_FILE" ]; then
        echo "Error: Product repository file not found!"
        echo "Creating empty product repository..."
        touch "$PRODUCT_FILE"
    fi
}

# Function to display products in a formatted way
display_products() {
    if [ ! -s "$PRODUCT_FILE" ]; then
        echo "No products found in repository."
        return
    fi
    
    echo "Product Name | Category | Price (₹) | Description"
    echo "------------------------------------------------"
    while IFS='|' read -r name category price description; do
        printf "%-12s | %-9s | %-8s | %s\n" "$name" "$category" "$price" "$description"
    done < "$PRODUCT_FILE"
}

# US_UI_001: Sort products by product name in ascending order
sort_products() {
    echo "=========================================="
    echo "     SORTING PRODUCTS BY NAME"
    echo "=========================================="
    
    if [ ! -s "$PRODUCT_FILE" ]; then
        echo "No products found in repository."
        return
    fi
    
    # Sort the products by name (first field) and display
    echo "Products sorted by name (ascending order):"
    echo "------------------------------------------------"
    echo "Product Name | Category | Price (₹) | Description"
    echo "------------------------------------------------"
    
    sort -t'|' -k1 "$PRODUCT_FILE" | while IFS='|' read -r name category price description; do
        printf "%-12s | %-9s | %-8s | %s\n" "$name" "$category" "$price" "$description"
    done
    
    echo ""
    echo "Sorting completed successfully!"
}

# US_UI_003: Search product by product name
search_product() {
    echo "=========================================="
    echo "     SEARCH PRODUCT BY NAME"
    echo "=========================================="
    
    if [ ! -s "$PRODUCT_FILE" ]; then
        echo "No products found in repository."
        return
    fi
    
    echo -n "Enter product name to search: "
    read search_term
    
    if [ -z "$search_term" ]; then
        echo "Search term cannot be empty!"
        return
    fi
    
    echo ""
    echo "Search results for '$search_term':"
    echo "------------------------------------------------"
    echo "Product Name | Category | Price (₹) | Description"
    echo "------------------------------------------------"
    
    found=false
    while IFS='|' read -r name category price description; do
        if [[ "$name" == *"$search_term"* ]]; then
            printf "%-12s | %-9s | %-8s | %s\n" "$name" "$category" "$price" "$description"
            found=true
        fi
    done < "$PRODUCT_FILE"
    
    if [ "$found" = false ]; then
        echo "No products found matching '$search_term'"
    fi
}

# US_UI_002: Search and replace product by name (Administrator feature)
search_replace_product() {
    echo "=========================================="
    echo "   SEARCH AND REPLACE PRODUCT (ADMIN)"
    echo "=========================================="
    
    if [ ! -s "$PRODUCT_FILE" ]; then
        echo "No products found in repository."
        return
    fi
    
    echo -n "Enter product name to search: "
    read search_term
    
    if [ -z "$search_term" ]; then
        echo "Search term cannot be empty!"
        return
    fi
    
    # Check if product exists
    if ! grep -q "$search_term" "$PRODUCT_FILE"; then
        echo "Product '$search_term' not found in repository."
        return
    fi
    
    echo ""
    echo "Found product(s):"
    echo "------------------------------------------------"
    echo "Product Name | Category | Price (₹) | Description"
    echo "------------------------------------------------"
    
    grep "$search_term" "$PRODUCT_FILE" | while IFS='|' read -r name category price description; do
        printf "%-12s | %-9s | %-8s | %s\n" "$name" "$category" "$price" "$description"
    done
    
    echo ""
    echo -n "Enter new product name: "
    read new_name
    
    if [ -z "$new_name" ]; then
        echo "New product name cannot be empty!"
        return
    fi
    
    echo -n "Enter new category: "
    read new_category
    
    echo -n "Enter new price (in ₹, e.g., ₹5000): "
    read new_price
    
    echo -n "Enter new description: "
    read new_description
    
    # Create backup
    cp "$PRODUCT_FILE" "${PRODUCT_FILE}.backup"
    
    # Replace the product
    sed "s/^$search_term|.*/$new_name|$new_category|$new_price|$new_description/" "$PRODUCT_FILE" > "$TEMP_FILE"
    mv "$TEMP_FILE" "$PRODUCT_FILE"
    
    echo ""
    echo "Product updated successfully!"
    echo "Backup created as ${PRODUCT_FILE}.backup"
    
    echo ""
    echo "Updated product:"
    echo "------------------------------------------------"
    echo "Product Name | Category | Price (₹) | Description"
    echo "------------------------------------------------"
    printf "%-12s | %-9s | %-8s | %s\n" "$new_name" "$new_category" "$new_price" "$new_description"
}

# Main program loop
main() {
    check_product_file
    
    while true; do
        display_menu
        read choice
        
        case $choice in
            1)
                sort_products
                ;;
            2)
                search_product
                ;;
            3)
                search_replace_product
                ;;
            4)
                echo "=========================================="
                echo "           ALL PRODUCTS"
                echo "=========================================="
                display_products
                ;;
            5)
                echo "Thank you for using Product Management System!"
                exit 0
                ;;
            *)
                echo "Invalid option! Please select 1-5."
                ;;
        esac
        
        echo ""
        echo -n "Press Enter to continue..."
        read
    done
}

# Run the main program
main 
