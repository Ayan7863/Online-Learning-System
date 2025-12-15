// Script to update all HTML files
const fs = require('fs');
const path = require('path');

const files = [
    'courses.html', 'features.html', 'ai-tutor.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove copyright
        content = content.replace(/&copy; 2025 AI Learning Assistant\. All rights reserved\./g, '');
        
        // Fix modal inputs - remove labels
        content = content.replace(/<label for="[^"]*">[^<]*<\/label>/g, '');
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } catch (error) {
        console.log(`Error updating ${file}: ${error.message}`);
    }
});

console.log('All files updated!');