const fs = require('fs');

const files = [
    'index.html', 'courses.html', 'features.html', 'quiz.html', 'video-lessons.html', 
    'books.html', 'contact.html', 'for-educators.html', 'how-it-works.html', 
    'timetable-planner.html', 'ai-practice.html'
];

const profileDropdown = `                <li class="profile-menu">
                    <button id="profileBtn" class="nav-button"><i class="fas fa-user"></i></button>
                    <div class="profile-dropdown">
                        <div class="profile-info">
                            <div class="profile-avatar"><i class="fas fa-user"></i></div>
                            <h4 class="profile-name">Student User</h4>
                            <p class="profile-email">student@edutech.com</p>
                        </div>
                        <ul class="profile-links">
                            <li><a href="profile.html"><i class="fas fa-user-cog"></i> My Profile</a></li>
                            <li><a href="#"><i class="fas fa-chart-line"></i> Progress</a></li>
                            <li><a href="#"><i class="fas fa-bookmark"></i> Bookmarks</a></li>
                            <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                            <li><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                        </ul>
                    </div>
                </li>`;

const newDropdownOrder = `                    <div class="dropdown-content">
                        <a href="video-lessons.html"><i class="fas fa-play-circle"></i> Video Lessons</a>
                        <a href="timetable-planner.html"><i class="fas fa-calendar-alt"></i> Timetable Planner</a>
                        <a href="ai-practice.html"><i class="fas fa-brain"></i> AI Practice</a>
                        <a href="virtual-classroom.html"><i class="fas fa-video"></i> Virtual Classroom</a>
                        <a href="books.html"><i class="fas fa-book"></i> Book Library</a>
                        <a href="quiz.html"><i class="fas fa-question-circle"></i> Quiz</a>
                    </div>`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Update profile menu
        content = content.replace(
            /<li class="profile-menu"><button id="profileBtn" class="nav-button"><i class="fas fa-user"><\/i><\/button><\/li>/g,
            profileDropdown
        );
        
        // Update dropdown order
        content = content.replace(
            /<div class="dropdown-content">[\s\S]*?<\/div>/g,
            newDropdownOrder
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } catch (error) {
        console.log(`Error updating ${file}: ${error.message}`);
    }
});

console.log('All navbars updated!');