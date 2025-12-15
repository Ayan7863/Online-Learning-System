const fs = require('fs');

const files = [
    'index.html', 'courses.html', 'features.html', 'ai-tutor.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Change logo to Digital Learning with brain icon
        content = content.replace(
            /AI Learning Assistant/g,
            '<i class="fas fa-brain"></i> Digital Learning'
        );
        
        // Add profile button to navbar
        content = content.replace(
            /<li class="auth-buttons"><button id="signupBtnNav" class="nav-button">Sign Up<\/button><\/li>/g,
            '<li class="auth-buttons"><button id="signupBtnNav" class="nav-button">Sign Up</button></li>\n                <li class="profile-menu"><button id="profileBtn" class="nav-button"><i class="fas fa-user-circle"></i> Profile</button></li>'
        );
        
        // Remove duplicate Book Library entries
        content = content.replace(
            /<a href="books\.html"><i class="fas fa-book"><\/i> Book Library<\/a>\s*<a href="books\.html"><i class="fas fa-book"><\/i> Book Library<\/a>/g,
            '<a href="books.html"><i class="fas fa-book"></i> Book Library</a>'
        );
        
        // Change AI Tutor to Quiz everywhere
        content = content.replace(/AI Tutor/g, 'Quiz');
        content = content.replace(/ai-tutor\.html/g, 'quiz.html');
        
        // Remove JavaScript code snippets from about page
        content = content.replace(
            /counter\.textContent.*?statsObserver\.observe\(statsSection\);\s*}\s*}\);\s*}/gs,
            ''
        );
        
        // Center text in about page
        if (file === 'about.html') {
            content = content.replace(
                /<section id="about"/g,
                '<section id="about" style="text-align: center;"'
            );
        }
        
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    } catch (error) {
        console.log(`Error fixing ${file}: ${error.message}`);
    }
});

console.log('All final fixes applied!');