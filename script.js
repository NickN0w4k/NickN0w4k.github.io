// Funktion zum Laden der GitHub-Projekte
async function fetchGitHubProjects(username) {
    const grid = document.getElementById('projects-grid');
    const loader = document.getElementById('loader');
    
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6&type=owner`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API antwortete mit Status ${response.status}`);
        }
        const projects = await response.json();

        // Loader entfernen
        grid.innerHTML = ''; 

        if (projects.length === 0) {
            grid.innerHTML = '<p>Keine öffentlichen Projekte gefunden.</p>';
            return;
        }

        projects.forEach(project => {
            // Überspringe "forks" (Projekte, die von anderen kopiert wurden)
            if (project.fork) return;

            const card = document.createElement('a');
            card.href = project.html_url;
            card.target = '_blank';
            card.className = 'project-card';

            const description = project.description || 'Keine Beschreibung vorhanden.';
            const languageTag = project.language ? `<span class="project-tag">${project.language}</span>` : '';

            card.innerHTML = `
                <h3>${project.name}</h3>
                <p>${description}</p>
                <div class="tags-container">
                   ${languageTag}
                </div>
            `;
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Fehler beim Laden der GitHub-Projekte:', error);
        if(loader) loader.textContent = 'Projekte konnten nicht geladen werden. Prüfe die Browser-Konsole für Details.';
    }
}

// Ruft die Funktion mit deinem Benutzernamen auf, sobald die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects('NickN0w4k');
});
