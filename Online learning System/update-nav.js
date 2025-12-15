const fs = require('fs');

const files = [
    'courses.html', 'features.html', 'ai-tutor.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add virtual classroom to features dropdown
        content = content.replace(
            '<a href="ai-practice.html">AI Practice</a>\n                    </div>',
            '<a href="ai-practice.html">AI Practice</a>\n                        <a href="virtual-classroom.html">Virtual Classroom</a>\n                    </div>'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } catch (error) {
        console.log(`Error updating ${file}: ${error.message}`);
    }
});

console.log('Navigation updated in all files!');