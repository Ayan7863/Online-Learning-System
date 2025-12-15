const fs = require('fs');

const files = [
    'index.html', 'courses.html', 'features.html', 'ai-tutor.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove Book Library from navbar
        content = content.replace(/<li><a href="books\.html">Book Library<\/a><\/li>/g, '');
        
        // Add Book Library to Features dropdown
        content = content.replace(
            /<a href="virtual-classroom\.html"><i class="fas fa-video"><\/i> Virtual Classroom<\/a>/g,
            '<a href="virtual-classroom.html"><i class="fas fa-video"></i> Virtual Classroom</a>\n                        <a href="books.html"><i class="fas fa-book"></i> Book Library</a>'
        );
        
        // Fix Sign Up button text
        content = content.replace(/Sign Up/g, 'Sign Up');
        
        // Fix modal structure to match homepage
        content = content.replace(
            /<div class="modal-content">/g,
            '<div class="modal-content glass">'
        );
        
        // Add modal headers
        content = content.replace(
            /<h2>Login<\/h2>/g,
            '<div class="modal-header">\n                    <div class="modal-icon"><i class="fas fa-sign-in-alt"></i></div>\n                    <h2>Welcome Back</h2>\n                    <p class="modal-subtitle">Sign in to your account</p>\n                </div>'
        );
        
        content = content.replace(
            /<h2>Sign Up<\/h2>/g,
            '<div class="modal-header">\n                    <div class="modal-icon"><i class="fas fa-user-plus"></i></div>\n                    <h2>Join Us Today</h2>\n                    <p class="modal-subtitle">Create your learning account</p>\n                </div>'
        );
        
        // Add proper input groups
        content = content.replace(
            /<input type="email" id="loginEmail" name="email" required>/g,
            '<div class="input-group">\n                        <div class="input-icon"><i class="fas fa-envelope"></i></div>\n                        <input type="email" id="loginEmail" name="email" placeholder="Enter your email" required>\n                    </div>'
        );
        
        content = content.replace(
            /<input type="password" id="loginPassword" name="password" required>/g,
            '<div class="input-group">\n                        <div class="input-icon"><i class="fas fa-lock"></i></div>\n                        <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required>\n                    </div>'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    } catch (error) {
        console.log(`Error fixing ${file}: ${error.message}`);
    }
});

console.log('All issues fixed!');