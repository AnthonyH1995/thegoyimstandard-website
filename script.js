'use strict';

// Function to load content from sections.json based on the tab clicked
function loadContent(tabId) {
    fetch('sections.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = data[tabId];
        })
        .catch(error => console.error('Error loading content:', error));
}

// Function to set up tab click events
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            loadContent(tab.getAttribute('data-tab-id'));
        });
    });
}

// Wait for the DOM to load before setting up tabs
document.addEventListener('DOMContentLoaded', setupTabs);
