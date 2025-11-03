// Main JavaScript functionality for CodeCollab

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initNavigation();
    initExerciseFilters();
    initGalleryFilters();
    initResourceSearch();
    initGroupActions();
});

// Navigation active state management
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Exercise filtering functionality
function initExerciseFilters() {
    const difficultyFilter = document.getElementById('difficulty');
    const languageFilter = document.getElementById('language');
    
    if (difficultyFilter && languageFilter) {
        [difficultyFilter, languageFilter].forEach(filter => {
            filter.addEventListener('change', filterExercises);
        });
    }
}

function filterExercises() {
    const difficulty = document.getElementById('difficulty').value;
    const language = document.getElementById('language').value;
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    exerciseCards.forEach(card => {
        const cardDifficulty = card.querySelector('.difficulty').textContent.toLowerCase();
        const cardLanguage = card.querySelector('.language').textContent.toLowerCase();
        
        const showByDifficulty = difficulty === 'all' || cardDifficulty === difficulty;
        const showByLanguage = language === 'all' || cardLanguage.includes(language);
        
        card.style.display = (showByDifficulty && showByLanguage) ? 'block' : 'none';
    });
}

// Gallery filtering functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Resource search functionality
function initResourceSearch() {
    const searchInput = document.getElementById('resource-search');
    const searchButton = document.getElementById('search-btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performResourceSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performResourceSearch();
            }
        });
    }
}

function performResourceSearch() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    const resourceItems = document.querySelectorAll('.resource-item');
    
    resourceItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Study group actions
function initGroupActions() {
    const joinButtons = document.querySelectorAll('.join-group');
    const createGroupBtn = document.querySelector('.create-group-btn');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.closest('.group-card').querySelector('h3').textContent;
            alert(`You have requested to join: ${groupName}\nThe group admin will contact you soon.`);
        });
    });
    
    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', function() {
            alert('Group creation feature coming soon!');
        });
    }
}

// CTA button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        window.location.href = 'exercises.html';
    });
}

// Start exercise buttons
const startExerciseButtons = document.querySelectorAll('.start-exercise');
startExerciseButtons.forEach(button => {
    button.addEventListener('click', function() {
        const exerciseName = this.closest('.exercise-card').querySelector('h3').textContent;
        alert(`Starting exercise: ${exerciseName}\nInteractive code editor loading...`);
    });
});