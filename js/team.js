/**
 * TBP Team Page - JavaScript
 * Handles search, filtering, and team member display
 */

const TEAM_DATA = [
  { id: 'micheal', name: 'Michael Oluwafemi Alley', role: 'Principal Partner', image: '../images/team/micheal.jpg', profile: '/team/micheal.html', specialty: 'Strategic Design & Leadership', loc: 'Lagos' },
  { id: 'gbemi', name: 'Oluwagbemisola Idowu', role: 'Associate Partner', image: '../images/team/gbemi.jpg', profile: '/team/gbemi.html', specialty: 'Design Execution', loc: 'Lagos' },
  { id: 'gboyega', name: 'Olugboyega Tayo-Ojo', role: 'Associate Partner', image: '../images/team/gboyega.jpg', profile: '/team/gboyega.html', specialty: 'Technical Coordination', loc: 'Abuja' },
  { id: 'nduka', name: 'Nduka Akanu', role: 'Senior Associate', image: '../images/team/nduka.jpg', profile: '/team/nduka.html', specialty: 'Architecture', loc: 'Lagos' },
  { id: 'chyzoba', name: 'Chyzoba Onwubiko', role: 'Senior Associate', image: '../images/team/chyzoba.jpg', profile: '/team/chyzoba.html', specialty: 'Design', loc: 'Lagos' },
  { id: 'ismail', name: 'Ismail Opadokun', role: 'Senior Associate', image: '../images/team/ismail.jpg', profile: '/team/ismail.html', specialty: 'Technical Design', loc: 'Abuja' },
  { id: 'quadri', name: 'Quadri Bakare', role: 'Senior Associate', image: '../images/team/quadri.jpg', profile: '/team/quadri.html', specialty: 'Project Management', loc: 'Lagos' },
  { id: 'bode', name: 'Bode Ariyo', role: 'Senior Associate', image: '../images/team/bode.jpg', profile: '/team/bode.html', specialty: 'Design Leadership', loc: 'Lagos' },
  { id: 'kingsley', name: 'Kingsley Anyanwu', role: 'Senior Associate', image: '../images/team/kingsley.jpg', profile: '/team/kingsley.html', specialty: 'Architecture', loc: 'Lagos' },
  { id: 'mayowa', name: 'Mayowa Badejo', role: 'Associate', image: '../images/team/mayowa.jpg', profile: '../team/mayowa.html', specialty: 'Design & Detailing', loc: 'Lagos' },
  { id: 'tahir', name: 'Tahir Ahmed', role: 'Associate', image: '../images/team/tahir.jpg', profile: '../team/tahir.html', specialty: 'Project Coordination', loc: 'Abuja' },
  { id: 'esther', name: 'Esther Obi', role: 'Associate', image: '../images/team/esther.jpg', profile: '../team/esther.html', specialty: 'Architecture', loc: 'Lagos' },
  { id: 'joshua', name: 'Joshua Tunde', role: 'Junior Associate', image: '../images/team/joshua.jpg', profile: '../team/joshua.html', specialty: 'Design Development', loc: 'Lagos' },
  { id: 'azeez', name: 'Azeez Adebayo', role: 'Junior Associate', image: '../images/team/azeez.jpg', profile: '../team/azeez.html', specialty: 'CAD & Visualization', loc: 'Lagos' },
  { id: 'shola', name: 'Shola Olawale', role: 'Graduate Architect', image: '../images/team/shola.jpg', profile: '../team/shola.html', specialty: 'Design Support', loc: 'Lagos' },
  { id: 'ayelo', name: 'Ayelo Opeyemi', role: 'Graduate Engineer', image: '../images/team/ayelo.jpg', profile: '../team/ayelo.html', specialty: 'Engineering', loc: 'Lagos' },
  { id: 'ayanfe', name: 'Ayanfe Sofela', role: 'Intern', image: '../images/team/ayanfe.jpg', profile: '../team/ayanfe.html', specialty: 'Design', loc: 'Lagos' },
  { id: 'ali', name: 'Ali Hassan', role: 'Intern', image: '../images/team/ali.jpg', profile: '../team/ali.html', specialty: 'Design', loc: 'Lagos' },
  { id: 'amadi', name: 'Amadi Chinedu', role: 'Junior', image: '../images/team/amadi.jpg', profile: '../team/amadi.html', specialty: 'CAD Support', loc: 'Lagos' },
  { id: 'brenda', name: 'Brenda Anyawu', role: 'Associate', image: '../images/team/brenda.jpg', profile: '../team/brenda.html', specialty: 'Design', loc: 'Lagos' },
  { id: 'fawaz', name: 'Fawaz Olakunle', role: 'Associate', image: '../images/team/fawaz.jpg', profile: '../team/fawaz.html', specialty: 'Architecture', loc: 'Lagos' },
  { id: 'ife', name: 'Ife Babatunde', role: 'Senior', image: '../images/team/ife.jpg', profile: '../team/ife.html', specialty: 'Project Management', loc: 'Lagos' },
  { id: 'micheal2', name: 'Michael Onwuka', role: 'Senior', image: '../images/team/micheal.jpg', profile: '../team/micheal.html', specialty: 'Architecture', loc: 'Lagos' },
  { id: 'nicole', name: 'Nicole Okafor', role: 'Associate', image: '../images/team/nicole.jpg', profile: '../team/nicole.html', specialty: 'Design & Branding', loc: 'Lagos' },
  { id: 'onyedikachi', name: 'Onyedikachi Okoro', role: 'Junior', image: '../images/team/onyedikachi.jpg', profile: '../team/onyedikachi.html', specialty: 'CAD', loc: 'Lagos' },
  { id: 'ore', name: 'Ore Fasemilusi', role: 'Associate', image: '../images/team/ore.jpg', profile: '../team/ore.html', specialty: 'Design', loc: 'Lagos' },
  { id: 'somto', name: 'Somto Anyanwu', role: 'Junior', image: '../images/team/somto.jpg', profile: '../team/somto.html', specialty: 'Architecture', loc: 'Lagos' },
  { id: 'toluwase', name: 'Toluwase Adegoke', role: 'Associate', image: '../images/team/toluwase.jpg', profile: '../team/toluwase.html', specialty: 'Design Development', loc: 'Lagos' },
  { id: 'uche', name: 'Uche Nwaebere', role: 'Senior Associate', image: '../images/team/uche.jpg', profile: '../team/uche.html', specialty: 'Project Leadership', loc: 'Lagos' },
  { id: 'victor', name: 'Victor Okonkwo', role: 'Associate', image: '../images/team/victor.jpg', profile: '../team/victor.html', specialty: 'Engineering & CAD', loc: 'Lagos' },
  { id: 'wale', name: 'Wale Adeyemi', role: 'Senior', image: '../images/team/wale.jpg', profile: '../team/wale.html', specialty: 'Architecture & Design', loc: 'Lagos' },
  { id: 'yewamde', name: 'Yewamde Duku', role: 'Associate', image: '../images/team/yewamde.jpg', profile: '../team/yewamde.html', specialty: 'Design', loc: 'Lagos' }
];

class TeamApp {
  constructor() {
    this.viewMode = 'grid';
    this.searchQuery = '';
    this.filteredData = [...TEAM_DATA];
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.renderTeam();
  }

  cacheElements() {
    this.elements = {
      searchInput: document.getElementById('teamSearch'),
      viewToggleBtns: document.querySelectorAll('.view-toggle button'),
      teamGrid: document.getElementById('teamGrid')
    };
  }

  attachEventListeners() {
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterTeam();
        this.renderTeam();
      });
    }

    this.elements.viewToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.elements.viewToggleBtns.forEach(b => b.classList.remove('active'));
        e.target.closest('button').classList.add('active');
        this.viewMode = e.target.closest('button').dataset.view;
        this.renderTeam();
      });
    });
  }

  filterTeam() {
    this.filteredData = TEAM_DATA.filter(member => {
      const q = this.searchQuery;
      return member.name.toLowerCase().includes(q) ||
             member.role.toLowerCase().includes(q) ||
             member.specialty.toLowerCase().includes(q);
    });
  }

  renderTeam() {
    const grid = this.elements.teamGrid;

    if (this.filteredData.length === 0) {
      grid.innerHTML = `
        <div class="team-card empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3 class="empty-state-title">No Members Found</h3>
          <p class="empty-state-text">Try different search terms</p>
        </div>
      `;
      return;
    }

    grid.classList.toggle('list-view', this.viewMode === 'list');

    // Build HTML for all team members first
    const html = this.filteredData.map((m, i) => `
      <div class="team-card fade-in-up" style="animation-delay: ${i * 50}ms">
        <div class="card-image">
          <img src="${m.image}" alt="${m.name}" 
            onerror="this.src='https://via.placeholder.com/280?text=${encodeURIComponent(m.name)}&bg=dbeafe&fg=1e3a8a'" />
        </div>
        <div class="card-content">
          <h3 class="card-name">${m.name}</h3>
          <p class="card-role">${m.role}</p>
          <div class="card-tags">
            <span class="tag">${m.specialty}</span>
            <span class="tag">${m.loc}</span>
          </div>
          <p class="card-description">${m.name} brings expertise in ${m.specialty.toLowerCase()} to The Building Practice.</p>
          <div class="card-footer">
            <a href="${m.profile}" class="profile-btn">View Profile →</a>
            <button class="action-btn" onclick="window.app.shareProfile('${m.name}')">📤</button>
          </div>
        </div>
      </div>
    `).join('');

    // Clear grid and add new content with proper visibility
    grid.innerHTML = html;
    
    // Force visibility on grid and all children
    grid.style.opacity = '1';
    grid.style.visibility = 'visible';
    grid.style.pointerEvents = 'auto';
  }

  shareProfile(name) {
    if (navigator.share) {
      navigator.share({
        title: `${name} - The Building Practice`,
        text: `Discover ${name}'s profile`,
        url: window.location.href
      });
    } else {
      alert(`Share ${name}'s profile!`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Create app instance
  window.app = new TeamApp();
  
  // Initialize app
  window.app.init();
  
  // Ensure visibility of team grid
  const teamGrid = document.getElementById('teamGrid');
  if (teamGrid) {
    teamGrid.style.opacity = '1';
    teamGrid.style.visibility = 'visible';
    teamGrid.style.pointerEvents = 'auto';
  }
  
  // Slight delay to ensure DOM is fully painted
  setTimeout(() => {
    if (teamGrid) {
      teamGrid.style.opacity = '1';
      teamGrid.style.visibility = 'visible';
    }
  }, 100);
});
