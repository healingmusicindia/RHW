document.addEventListener('DOMContentLoaded', function() {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const notification = document.getElementById('notification');
    const notificationMessage = document.querySelector('.notification-message');
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationClose = document.querySelector('.notification-close');

    // Switch between login and register forms
    sign_up_btn.addEventListener('click', () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener('click', () => {
        container.classList.remove("sign-up-mode");
    });

    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Show notification
    function showNotification(message, type) {
        notificationMessage.textContent = message;
        
        // Set icon based on notification type
        if (type === 'success') {
            notification.classList.add('success');
            notification.classList.remove('error');
            notificationIcon.className = 'notification-icon fas fa-check-circle';
        } else {
            notification.classList.add('error');
            notification.classList.remove('success');
            notificationIcon.className = 'notification-icon fas fa-exclamation-circle';
        }
        
        // Show notification
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Close notification
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // Login form submission
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validate inputs
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Here you would typically send a request to your server
            // For demo purposes, we'll just simulate a successful login
            loginUser(email, password);
        });
    }

    // Register form submission
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Validate inputs
            if (!name || !email || !password || !confirmPassword) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (!termsChecked) {
                showNotification('Please agree to the Terms & Conditions', 'error');
                return;
            }
            
            // Here you would typically send a request to your server
            // For demo purposes, we'll just simulate a successful registration
            registerUser(name, email, password);
        });
    }

    // Function to simulate user login
    function loginUser(email, password) {
        // Show loading state
        loginBtn.value = 'Logging in...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store user info in localStorage (for demo purposes)
            const user = {
                email: email,
                name: email.split('@')[0], // Just using part of email as name for demo
                isLoggedIn: true
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Show success message
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    }

    // Function to simulate user registration
    function registerUser(name, email, password) {
        // Show loading state
        registerBtn.value = 'Creating account...';
        registerBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store user info in localStorage (for demo purposes)
            const user = {
                name: name,
                email: email,
                isLoggedIn: true
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Show success message
            showNotification('Registration successful! Redirecting...', 'success');
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    }
});