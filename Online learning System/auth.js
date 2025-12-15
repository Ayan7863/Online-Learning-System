// Authentication System
let currentUser = null;

// Check authentication status on page load
function checkAuthStatus() {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
        currentUser = JSON.parse(userData);
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    // Hide login/signup buttons
    const authButtons = document.querySelectorAll('.auth-buttons');
    authButtons.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show profile menu
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
        profileMenu.style.display = 'block';
        
        // Update profile info
        const profileName = profileMenu.querySelector('.profile-name');
        const profileEmail = profileMenu.querySelector('.profile-email');
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEmail) profileEmail.textContent = currentUser.email;
    }
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
    // Show login/signup buttons
    const authButtons = document.querySelectorAll('.auth-buttons');
    authButtons.forEach(section => {
        section.style.display = 'block';
    });
    
    // Hide profile menu
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
        profileMenu.style.display = 'none';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    currentUser = null;
    updateUIForLoggedOutUser();
    alert('Logged out successfully!');
}

// Setup modal functionality
function setupModals() {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    // Open modals
    document.getElementById('loginBtnNav')?.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    document.getElementById('signupBtnNav')?.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });
    
    // Close modals
    document.querySelectorAll('.close-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Switch between modals
    document.getElementById('switchToSignup')?.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });
    
    document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Setup authentication forms
function setupAuthForms() {
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                currentUser = data.user;
                updateUIForLoggedInUser();
                document.getElementById('loginModal').style.display = 'none';
                alert('Login successful!');
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            alert('Backend server not running!\n\nTo start the backend:\n1. Double-click "start-backend.bat"\n2. Or run: cd backend && python app.py\n\nThen try again.');
        }
    });
    
    // Signup form
    document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        if (formData.get('password') !== formData.get('confirmPassword')) {
            alert('Passwords do not match');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                currentUser = data.user;
                updateUIForLoggedInUser();
                document.getElementById('signupModal').style.display = 'none';
                alert('Registration successful!');
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            alert('Backend server not running!\n\nTo start the backend:\n1. Double-click "start-backend.bat"\n2. Or run: cd backend && python app.py\n\nThen try again.');
        }
    });
}

// Hide loader immediately
const loader = document.getElementById('pageLoader');
if (loader) {
    loader.style.display = 'none';
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader again just in case
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    checkAuthStatus();
    setupModals();
    setupAuthForms();
});