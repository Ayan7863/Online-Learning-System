document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Basic email validation
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            console.log('Form submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset(); // Reset the form fields
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute && hrefAttribute.startsWith('#')) {
                e.preventDefault();
                const targetId = hrefAttribute.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Smooth scrolling for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute && hrefAttribute.startsWith('#')) {
                e.preventDefault();
                const targetId = hrefAttribute.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Timetable Planner Logic
    const startPlanningBtn = document.getElementById('startPlanningBtn');
    const timetableContainer = document.getElementById('timetableContainer');
    const addBlockForm = document.getElementById('addBlockForm');
    const weeklyTimetableBody = document.querySelector('#weeklyTimetable tbody');

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const timeSlots = []; // e.g., ["08:00", "09:00", ..., "17:00"]

    function initializeTimeSlots(startHour = 8, endHour = 18, interval = 60) { // interval in minutes
        timeSlots.length = 0; // Clear existing slots
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const h = hour.toString().padStart(2, '0');
                const m = minute.toString().padStart(2, '0');
                timeSlots.push(`${h}:${m}`);
            }
        }
    }

    function renderTimetable() {
        if (!weeklyTimetableBody) return;
        weeklyTimetableBody.innerHTML = ''; // Clear existing rows

        timeSlots.forEach(slot => {
            const row = weeklyTimetableBody.insertRow();
            const timeCell = row.insertCell();
            timeCell.textContent = slot;
            timeCell.dataset.time = slot;

            daysOfWeek.forEach(day => {
                const cell = row.insertCell();
                cell.dataset.day = day;
                cell.dataset.time = slot;
                // Add event listener for clicking on empty cells if needed later
            });
        });
    }

    if (startPlanningBtn && timetableContainer) {
        startPlanningBtn.addEventListener('click', () => {
            timetableContainer.style.display = timetableContainer.style.display === 'none' || timetableContainer.style.display === '' ? 'block' : 'none';
            if (timetableContainer.style.display === 'block') {
                initializeTimeSlots(8, 18, 60); // 8 AM to 5 PM, 1-hour slots
                renderTimetable();
            }
        });
    }

    if (addBlockForm && weeklyTimetableBody) {
        addBlockForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const day = addBlockForm.day.value;
            const time = addBlockForm.time.value; // "HH:MM"
            const subject = addBlockForm.subject.value;
            const duration = parseFloat(addBlockForm.duration.value); // in hours

            if (!day || !time || !subject || isNaN(duration) || duration <= 0) {
                alert('Please fill in all fields correctly.');
                return;
            }

            addStudyBlockToTable(day, time, subject, duration);
            addBlockForm.reset();
        });
    }

    function addStudyBlockToTable(day, startTime, subject, durationHours) {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);
        
        // Find the target cell
        const targetCell = weeklyTimetableBody.querySelector(`td[data-day="${day}"][data-time^="${startTime.substring(0,2)}"]`);

        if (targetCell) {
            const blockDiv = document.createElement('div');
            blockDiv.classList.add('study-block');
            blockDiv.innerHTML = `<strong>${subject}</strong> (${startTime} - ${calculateEndTime(startTime, durationHours)})`;
            // Basic collision detection or rowspan would be more complex and is omitted for this initial version.
            // For now, just append.
            targetCell.appendChild(blockDiv);
        } else {
            console.warn(`Could not find cell for ${day} at ${startTime}`);
        }
    }
    
    function calculateEndTime(startTime, durationHours) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalStartMinutes = hours * 60 + minutes;
        const totalDurationMinutes = durationHours * 60;
        const totalEndMinutes = totalStartMinutes + totalDurationMinutes;

        const endHours = Math.floor(totalEndMinutes / 60) % 24;
        const endMinutes = totalEndMinutes % 60;

        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    }

    // Alert System Logic (Placeholder)
    const enableAlertsToggle = document.getElementById('enableAlertsToggle');

    function isUserLoggedIn() {
        // Placeholder: In a real app, this would check authentication status (e.g., JWT in localStorage)
        return false; // Assume user is not logged in for now
    }

    if (enableAlertsToggle) {
        enableAlertsToggle.addEventListener('change', () => {
            if (enableAlertsToggle.checked) {
                if (!isUserLoggedIn()) {
                    alert('Please sign up or log in to enable study reminders and save your preferences.');
                    // Uncheck the toggle if user is not logged in and cancels/dismisses the alert
                    enableAlertsToggle.checked = false;
                } else {
                    // User is logged in, proceed to enable alerts (future implementation)
                    console.log('Alerts enabled for logged-in user.');
                    // Here you would typically make an API call to save this preference
                }
            } else {
                // User is disabling alerts
                console.log('Alerts disabled.');
                // Here you would typically make an API call to save this preference if the user was logged in
            }
        });
    }

    // Modal Handling Logic
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginBtnNav = document.getElementById('loginBtnNav');
    const signupBtnNav = document.getElementById('signupBtnNav');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    function openModal(modal) {
        if (modal) modal.style.display = 'block';
    }

    function closeModal(modal) {
        if (modal) modal.style.display = 'none';
    }

    if (loginBtnNav) loginBtnNav.onclick = () => openModal(loginModal);
    if (signupBtnNav) signupBtnNav.onclick = () => openModal(signupModal);
    if (closeLoginModal) closeLoginModal.onclick = () => closeModal(loginModal);
    if (closeSignupModal) closeSignupModal.onclick = () => closeModal(signupModal);

    if (switchToSignup) {
        switchToSignup.onclick = (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        };
    }
    if (switchToLogin) {
        switchToLogin.onclick = (e) => {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        };
    }

    // Close modals if user clicks outside of the modal content
    window.onclick = (event) => {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === signupModal) {
            closeModal(signupModal);
        }
    };

    // Placeholder for actual form submission (to be added later)
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login form submitted (no backend yet).');
            // Actual login logic will go here
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            alert('Signup form submitted (no backend yet).');
            // Actual signup logic will go here
        });
    }

    // Mock AI Tutor Chat Logic
    const chatWindow = document.getElementById('chatWindow');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    function addMessageToChat(message, sender) {
        if (!chatWindow) return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        const p = document.createElement('p');
        p.textContent = message;
        messageDiv.appendChild(p);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
    }

    function getMockAIResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        if (userMessage.includes("hello") || userMessage.includes("hi")) {
            return "Hello there! How can I assist you with your studies today?";
        } else if (userMessage.includes("math") || userMessage.includes("algebra")) {
            return "Great! I can help with Math. What specific topic are you working on?";
        } else if (userMessage.includes("science") || userMessage.includes("physics")) {
            return "Science is fascinating! Ask me anything about Physics, Chemistry, or Biology.";
        } else if (userMessage.includes("python") || userMessage.includes("coding")) {
            return "I can help with coding concepts. What programming language or problem are you stuck on?";
        } else if (userMessage.includes("thank you") || userMessage.includes("thanks")) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "I'm still learning, but I'll do my best to help. Could you please rephrase your question or ask about a specific subject like Math, Science, or Coding?";
        }
    }

    if (sendMessageBtn && userInput) {
        sendMessageBtn.addEventListener('click', () => {
            const messageText = userInput.value.trim();
            if (messageText) {
                addMessageToChat(messageText, 'user');
                userInput.value = '';
                // Simulate AI thinking time and response
                setTimeout(() => {
                    const aiResponse = getMockAIResponse(messageText);
                    addMessageToChat(aiResponse, 'ai');
                }, 1000);
            }
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}