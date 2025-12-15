const fs = require('fs');

const files = [
    'courses.html', 'features.html', 'ai-tutor.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

const loadingScreen = `    <!-- Perfect Loading Screen -->
    <div class="page-loader" id="pageLoader">
        <div class="loader"></div>
        <p style="color: var(--text-secondary); margin-top: 1rem;">Loading your learning experience...</p>
    </div>
    `;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add loading screen
        content = content.replace('<body>', '<body>\n' + loadingScreen);
        
        fs.writeFileSync(file, content);
        console.log(`Added loading screen to ${file}`);
    } catch (error) {
        console.log(`Error updating ${file}: ${error.message}`);
    }
});

console.log('All files updated with loading screens!');