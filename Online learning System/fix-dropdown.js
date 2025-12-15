const fs = require('fs');

const files = [
    'courses.html', 'features.html', 'ai-tutor.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'about.html', 'ai-practice.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add icons to dropdown menu items
        content = content.replace(
            /<a href="ai-tutor\.html">AI Tutor<\/a>/g,
            '<a href="ai-tutor.html"><i class="fas fa-comments"></i> AI Tutor</a>'
        );
        content = content.replace(
            /<a href="video-lessons\.html">Video Lessons<\/a>/g,
            '<a href="video-lessons.html"><i class="fas fa-play-circle"></i> Video Lessons</a>'
        );
        content = content.replace(
            /<a href="timetable-planner\.html">Timetable Planner<\/a>/g,
            '<a href="timetable-planner.html"><i class="fas fa-calendar-alt"></i> Timetable Planner</a>'
        );
        content = content.replace(
            /<a href="ai-practice\.html">AI Practice<\/a>/g,
            '<a href="ai-practice.html"><i class="fas fa-brain"></i> AI Practice</a>'
        );
        content = content.replace(
            /<a href="virtual-classroom\.html">Virtual Classroom<\/a>/g,
            '<a href="virtual-classroom.html"><i class="fas fa-video"></i> Virtual Classroom</a>'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated dropdown in ${file}`);
    } catch (error) {
        console.log(`Error updating ${file}: ${error.message}`);
    }
});

console.log('Dropdown menus updated in all files!');