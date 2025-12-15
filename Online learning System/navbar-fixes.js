const fs = require('fs');

const files = [
    'index.html', 'courses.html', 'features.html', 'quiz.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Change logo to futuristic design
        content = content.replace(
            /<i class="fas fa-brain"><\/i> Digital Learning/g,
            '<i class="fas fa-rocket"></i> EduTech'
        );
        
        // Fix profile button - remove text, keep only icon
        content = content.replace(
            /<i class="fas fa-user-circle"><\/i> Profile/g,
            '<i class="fas fa-user"></i>'
        );
        
        // Remove duplicate profile entries
        content = content.replace(
            /<li class="profile-menu"><button id="profileBtn" class="nav-button"><i class="fas fa-user"><\/i><\/button><\/li>\s*<li class="profile-menu"><button id="profileBtn" class="nav-button"><i class="fas fa-user"><\/i><\/button><\/li>/g,
            '<li class="profile-menu"><button id="profileBtn" class="nav-button"><i class="fas fa-user"></i></button></li>'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Fixed navbar in ${file}`);
    } catch (error) {
        console.log(`Error fixing ${file}: ${error.message}`);
    }
});

console.log('Navbar fixes applied!');