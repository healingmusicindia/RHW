document.addEventListener('DOMContentLoaded', function() {
    // Language selector functionality
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        changeLanguage(this.value);
    });

    // Initialize with default language (English)
    changeLanguage('en');

    // Login modal functionality
    const loginButton = document.querySelector('.btn-login');
    const authModal = document.getElementById('auth-modal');
    const closeButton = document.querySelector('.close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Open modal when login button is clicked
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        authModal.style.display = 'block';
    });

    // Close modal when close button is clicked
    closeButton.addEventListener('click', function() {
        authModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Tab switching functionality
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show the corresponding form
            const tabName = this.getAttribute('data-tab');
            if (tabName === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        });
    });

    // Login form submission
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validate inputs
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send a request to your server
        // For demo purposes, we'll just simulate a successful login
        loginUser(email, password);
    });

    // Register form submission
    const registerBtn = document.getElementById('register-btn');
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Here you would typically send a request to your server
        // For demo purposes, we'll just simulate a successful registration
        registerUser(name, email, password);
    });

    // Initialize rainfall chart
    initializeRainfallChart();

    // Check if user is already logged in
    checkLoginStatus();
});

// Function to change language
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[class*="lang-"]');
    
    elements.forEach(element => {
        // Get the key from the class name (e.g., "lang-home" -> "home")
        const classes = element.className.split(' ');
        let langKey = '';
        
        for (const cls of classes) {
            if (cls.startsWith('lang-')) {
                langKey = cls.replace('lang-', '');
                break;
            }
        }
        
        // Update text content if translation exists
        if (translations[lang] && translations[lang][langKey]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][langKey];
            } else {
                element.textContent = translations[lang][langKey];
            }
        }
    });
}

// Function to simulate user login
function loginUser(email, password) {
    // In a real application, you would send a request to your server
    console.log(`Logging in user: ${email}`);
    
    // Simulate API call
    setTimeout(() => {
        // Store user info in localStorage (for demo purposes)
        const user = {
            email: email,
            name: email.split('@')[0], // Just using part of email as name for demo
            isLoggedIn: true
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Close modal and update UI
        document.getElementById('auth-modal').style.display = 'none';
        updateUIForLoggedInUser(user);
        
        alert('Login successful!');
    }, 1000);
}

// Function to simulate user registration
function registerUser(name, email, password) {
    // In a real application, you would send a request to your server
    console.log(`Registering user: ${name}, ${email}`);
    
    // Simulate API call
    setTimeout(() => {
        // Store user info in localStorage (for demo purposes)
        const user = {
            name: name,
            email: email,
            isLoggedIn: true
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Close modal and update UI
        document.getElementById('auth-modal').style.display = 'none';
        updateUIForLoggedInUser(user);
        
        alert('Registration successful!');
    }, 1000);
}

// Function to update UI for logged in user
function updateUIForLoggedInUser(user) {
    const loginButton = document.querySelector('.btn-login');
    loginButton.textContent = user.name;
    loginButton.href = '#profile';
    
    // You could add more UI changes here, like showing user-specific content
}

// Function to check if user is already logged in
function checkLoginStatus() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        const user = JSON.parse(userStr);
        if (user.isLoggedIn) {
            updateUIForLoggedInUser(user);
        }
    }
}

// Function to initialize rainfall chart
function initializeRainfallChart() {
    const ctx = document.getElementById('rainfall-chart').getContext('2d');
    
    // Sample data - in a real app, this would come from your API
    const rainfallData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Rainfall (mm)',
            data: [65, 59, 80, 81, 56, 55, 40, 30, 45, 60, 70, 80],
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            borderColor: 'rgba(33, 150, 243, 1)',
            borderWidth: 1,
            tension: 0.4
        }]
    };
    
    // Create the chart
    const rainfallChart = new Chart(ctx, {
        type: 'line',
        data: rainfallData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rainfall (mm)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
    
    // Update the rainfall insights with sample data
    document.getElementById('annual-rainfall-value').textContent = '750 mm';
    document.getElementById('rainy-season-value').textContent = 'June to September';
    document.getElementById('harvesting-potential').textContent = '45,000 liters';
}