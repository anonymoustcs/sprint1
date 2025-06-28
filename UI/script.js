// Global variables
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let currentCustomer = JSON.parse(localStorage.getItem('currentCustomer')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sample grocery products with Indian Rupee prices
const products = [
    { id: 1, name: "Fresh Apples", price: 180, image: "🍎" },
    { id: 2, name: "Organic Bananas", price: 120, image: "🍌" },
    { id: 3, name: "Whole Milk", price: 210, image: "🥛" },
    { id: 4, name: "Fresh Bread", price: 150, image: "🍞" },
    { id: 5, name: "Eggs (12 count)", price: 300, image: "🥚" },
    { id: 6, name: "Chicken Breast", price: 540, image: "🍗" },
    { id: 7, name: "Rice (5kg)", price: 420, image: "🍚" },
    { id: 8, name: "Tomatoes", price: 240, image: "🍅" },
    { id: 9, name: "Onions", price: 150, image: "🧅" },
    { id: 10, name: "Potatoes", price: 300, image: "🥔" },
    { id: 11, name: "Cheese Block", price: 360, image: "🧀" },
    { id: 12, name: "Yogurt", price: 180, image: "🥛" }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'home.html' || currentPage === '') {
        if (!currentCustomer) {
            window.location.href = 'login.html';
            return;
        }
        initializeHomePage();
    }
});

// Utility functions
function showAlert(message, type = 'error') {
    const alertContainer = document.getElementById('alert-container');
    if (alertContainer) {
        alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
    } else {
        alert(message);
    }
}

function generateCustomerId() {
    return 'CUST' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function saveToLocalStorage() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('currentCustomer', JSON.stringify(currentCustomer));
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Registration functionality
if (document.getElementById('registrationForm')) {
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });
}

function handleRegistration() {
    const formData = new FormData(document.getElementById('registrationForm'));
    const customerName = formData.get('customerName').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password');
    const address = formData.get('address').trim();
    const contactNumber = formData.get('contactNumber').trim();

    // Validation
    if (!validateRegistration(customerName, email, password, address, contactNumber)) {
        return;
    }

    // Check if customer already exists
    const existingCustomer = customers.find(c => c.email === email);
    if (existingCustomer) {
        showAlert('Customer with this email already exists. Please login instead.');
        return;
    }

    // Create new customer
    const newCustomer = {
        id: generateCustomerId(),
        name: customerName,
        email: email,
        password: password,
        address: address,
        contactNumber: contactNumber
    };

    customers.push(newCustomer);
    saveToLocalStorage();

    // Show success message
    showRegistrationSuccess(newCustomer);
}

function validateRegistration(customerName, email, password, address, contactNumber) {
    // Customer Name validation
    if (!customerName) {
        showAlert('Customer Name cannot be blank or null.');
        return false;
    }
    if (!/^[A-Za-z\s]+$/.test(customerName)) {
        showAlert('Customer Name must have alphabets only.');
        return false;
    }

    // Email validation
    if (!email) {
        showAlert('Email cannot be blank or null.');
        return false;
    }
    if (!email.includes('@')) {
        showAlert('Email id not valid.');
        return false;
    }

    // Password validation
    if (!password) {
        showAlert('Password cannot be blank or null.');
        return false;
    }
    if (password.length < 5) {
        showAlert('Password is not matching the criteria.');
        return false;
    }
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
        showAlert('Password is not matching the criteria.');
        return false;
    }

    // Address validation
    if (!address) {
        showAlert('Address cannot be blank or null.');
        return false;
    }

    // Contact Number validation
    if (!contactNumber) {
        showAlert('Contact Number cannot be blank or null.');
        return false;
    }
    if (!/^\d+$/.test(contactNumber)) {
        showAlert('Contact Number must not have any alphabets.');
        return false;
    }

    return true;
}

function showRegistrationSuccess(customer) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="form-container">
            <div class="logo">🛒</div>
            <h1 class="subtitle">Registration Successful</h1>
            <div class="alert alert-success">Customer Registration successful.</div>
            <div style="text-align: left; background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Customer ID:</strong> ${customer.id}</p>
                <p><strong>Customer Name:</strong> ${customer.name}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
            </div>
            <a href="login.html" class="btn">Proceed to Login</a>
        </div>
    `;
}

// Login functionality
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

function handleLogin() {
    const formData = new FormData(document.getElementById('loginForm'));
    const customerId = formData.get('customerId').trim();
    const password = formData.get('password');

    // Find customer
    const customer = customers.find(c => c.id === customerId);
    
    if (!customer) {
        showAlert('ID not valid');
        return;
    }

    if (customer.password !== password) {
        showAlert('Password not valid');
        return;
    }

    // Login successful
    currentCustomer = customer;
    saveToLocalStorage();
    window.location.href = 'home.html';
}

// Home page functionality
function initializeHomePage() {
    if (!currentCustomer) {
        window.location.href = 'login.html';
        return;
    }

    // Update welcome message
    document.getElementById('customer-name').textContent = currentCustomer.name;
    
    // Load products
    loadProducts();
    
    // Update cart count
    updateCartCount();
    
    // Show home content by default
    showHome();
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveToLocalStorage();
    updateCartCount();
    showAlert('Product added to cart!', 'success');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Navigation functions
function showHome() {
    hideAllContent();
    document.getElementById('home-content').style.display = 'block';
}

function showProfile() {
    hideAllContent();
    document.getElementById('profile-content').style.display = 'block';
    loadProfileDetails();
}

function showCart() {
    hideAllContent();
    document.getElementById('cart-content').style.display = 'block';
    loadCartDetails();
}

function hideAllContent() {
    document.getElementById('home-content').style.display = 'none';
    document.getElementById('profile-content').style.display = 'none';
    document.getElementById('cart-content').style.display = 'none';
    document.getElementById('invoice-content').style.display = 'none';
}

// Profile functionality
function loadProfileDetails() {
    const profileDetails = document.getElementById('profile-details');
    profileDetails.innerHTML = `
        <div class="form-group">
            <label>Customer ID</label>
            <input type="text" value="${currentCustomer.id}" readonly>
        </div>
        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" id="profile-name" value="${currentCustomer.name}" readonly>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="profile-email" value="${currentCustomer.email}" readonly>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea id="profile-address" readonly>${currentCustomer.address}</textarea>
        </div>
        <div class="form-group">
            <label>Contact Number</label>
            <input type="text" id="profile-contact" value="${currentCustomer.contactNumber}" readonly>
        </div>
    `;
}

function editProfile() {
    const inputs = document.querySelectorAll('#profile-details input, #profile-details textarea');
    inputs.forEach(input => {
        if (input.id !== 'profile-id') {
            input.readOnly = false;
        }
    });
    
    document.querySelector('.edit-btn').style.display = 'none';
    document.querySelector('.save-btn').style.display = 'inline-block';
}

function saveProfile() {
    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const address = document.getElementById('profile-address').value.trim();
    const contactNumber = document.getElementById('profile-contact').value.trim();

    // Validation
    if (!validateRegistration(name, email, currentCustomer.password, address, contactNumber)) {
        return;
    }

    // Update customer data
    currentCustomer.name = name;
    currentCustomer.email = email;
    currentCustomer.address = address;
    currentCustomer.contactNumber = contactNumber;

    // Update in customers array
    const customerIndex = customers.findIndex(c => c.id === currentCustomer.id);
    if (customerIndex !== -1) {
        customers[customerIndex] = currentCustomer;
    }

    saveToLocalStorage();

    // Update welcome message
    document.getElementById('customer-name').textContent = currentCustomer.name;

    // Reset form
    const inputs = document.querySelectorAll('#profile-details input, #profile-details textarea');
    inputs.forEach(input => {
        if (input.id !== 'profile-id') {
            input.readOnly = true;
        }
    });

    document.querySelector('.edit-btn').style.display = 'inline-block';
    document.querySelector('.save-btn').style.display = 'none';

    showAlert('Profile updated successfully!', 'success');
}

// Cart functionality
function loadCartDetails() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSummaryDetails = document.getElementById('cart-summary-details');

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        cartSummaryDetails.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    // Load cart items
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button class="delete-btn" onclick="removeFromCart(${item.id})">Delete</button>
        `;
        cartItemsList.appendChild(cartItem);
    });

    // Load cart summary
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSummaryDetails.innerHTML = `
        ${cart.map(item => `
            <div class="summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="summary-item total">
            <span>Total Amount</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
    `;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveToLocalStorage();
    updateCartCount();
    loadCartDetails();
}

function checkout() {
    if (cart.length === 0) {
        showAlert('Your cart is empty.');
        return;
    }

    // Generate invoice
    const invoice = {
        orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        customerId: currentCustomer.id,
        customerName: currentCustomer.name,
        customerEmail: currentCustomer.email,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toLocaleDateString()
    };

    // Clear cart
    cart = [];
    saveToLocalStorage();
    updateCartCount();

    // Show invoice
    showInvoice(invoice);
}

function showInvoice(invoice) {
    hideAllContent();
    document.getElementById('invoice-content').style.display = 'block';

    const invoiceDetails = document.getElementById('invoice-details');
    invoiceDetails.innerHTML = `
        <div class="invoice-details">
            <div>
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${invoice.orderId}</p>
                <p><strong>Date:</strong> ${invoice.date}</p>
            </div>
            <div>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> ${invoice.customerName}</p>
                <p><strong>Email:</strong> ${invoice.customerEmail}</p>
            </div>
        </div>
        <div class="invoice-items">
            <h3>Items</h3>
            ${invoice.items.map(item => `
                <div class="invoice-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
        </div>
        <div class="invoice-total">
            <span>Total: ₹${invoice.total.toFixed(2)}</span>
        </div>
        <button class="btn" onclick="showHome()">Continue Shopping</button>
    `;
} 