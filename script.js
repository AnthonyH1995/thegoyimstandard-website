'use strict';

// Load sections.json and set up everything
document.addEventListener('DOMContentLoaded', () => {
    fetch('sections.json')
        .then(response => {
            if (!response.ok) throw new Error('sections.json not found');
            return response.json();
        })
        .then(data => {
            setupNavigation(data);
            // Show Home by default
            showSection('home', data);
        })
        .catch(error => {
            console.error('Error loading sections.json:', error);
            document.getElementById('content').innerHTML = `<p style="color:red;">Error: Could not load content. Check console (F12).</p>`;
        });
});

// Build the navigation tabs
function setupNavigation(data) {
    const navContainer = document.getElementById('navigation');
    if (!navContainer) return;

    navContainer.innerHTML = data.navigation.map(item => `
        <a href="#" class="tab" data-tab-id="${item.id}">${item.title}</a>
    `).join(' ');

    // Add click listeners
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute('data-tab-id');
            showSection(tabId, data);
        });
    });
}

// Display the selected section
function showSection(tabId, data) {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;

    const section = data.sections.find(s => s.id === tabId);
    
    if (section) {
        contentDiv.innerHTML = `
            <h1>${section.title}</h1>
            <div class="section-content">${section.content}</div>
        `;
    } else {
        contentDiv.innerHTML = `<p>Section "${tabId}" not found.</p>`;
    }
}
