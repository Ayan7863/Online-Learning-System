const fs = require('fs');

const pages = {
    'features.html': 'features.html',
    'about.html': 'about.html',
    'ai-tutor.html': 'features.html',
    'video-lessons.html': 'features.html',
    'timetable-planner.html': 'features.html',
    'ai-practice.html': 'features.html',
    'books.html': 'features.html',
    'for-educators.html': 'for-educators.html',
    'how-it-works.html': 'how-it-works.html'
};

Object.keys(pages).forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        const activeLink = pages[file];
        
        // Add active class to appropriate navigation item
        if (activeLink === 'features.html') {
            content = content.replace(
                /<a href="features\.html">Features<\/a>/g,
                '<a href="features.html" class="active">Features</a>'
            );
        } else if (activeLink === 'about.html') {
            content = content.replace(
                /<a href="about\.html">About<\/a>/g,
                '<a href="about.html" class="active">About</a>'
            );
        } else if (activeLink === 'for-educators.html') {
            content = content.replace(
                /<a href="for-educators\.html">For Educators<\/a>/g,
                '<a href="for-educators.html" class="active">For Educators</a>'
            );
        } else if (activeLink === 'how-it-works.html') {
            content = content.replace(
                /<a href="how-it-works\.html">How It Works<\/a>/g,
                '<a href="how-it-works.html" class="active">How It Works</a>'
            );
        }
        
        fs.writeFileSync(file, content);
        console.log(`Added active navigation to ${file}`);
    } catch (error) {
        console.log(`Error updating ${file}: ${error.message}`);
    }
});

console.log('Active navigation added to all pages!');