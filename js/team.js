/*=================================
  Team Page JavaScript - iOS Style
===================================*/

'use strict';

// Team member data
const teamMembers = {
  1: {
    id: 1,
    name: 'David Mitchell',
    position: 'Principal Architect & CEO',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    email: 'david.mitchell@arcadia.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    years: '15+',
    projects: '150+',
    awards: '25+',
    bio: `David Mitchell is the visionary founder and Principal Architect of Arcadia Architecture Studio. With over 15 years of experience in the field, David has established himself as a leading voice in sustainable architecture and urban design. His innovative approach combines cutting-edge technology with timeless design principles, resulting in structures that are both beautiful and environmentally responsible.

    David's portfolio includes award-winning residential, commercial, and institutional projects across North America and Europe. His work has been featured in prestigious publications including Architectural Digest, Dezeen, and ArchDaily. He is particularly known for his ability to transform challenging sites into stunning architectural statements that enhance their surrounding communities.

    Before founding Arcadia, David served as Senior Designer at renowned firms in London and New York, where he honed his skills on high-profile international projects. He holds a Master's degree in Architecture from MIT and is a registered architect in multiple states. David is also a frequent speaker at industry conferences and a passionate advocate for sustainable building practices.`,
    skills: ['Sustainable Design', 'Urban Planning', 'Project Management', 'BIM/Revit', '3D Visualization', 'LEED Certification'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:david.mitchell@arcadia.com'
    }
  },
  2: {
    id: 2,
    name: 'Emma Thompson',
    position: 'Design Director & Co-Founder',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    email: 'emma.thompson@arcadia.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    years: '12+',
    projects: '200+',
    awards: '18+',
    bio: `Emma Thompson is the creative powerhouse behind Arcadia's most innovative residential designs. As Design Director and Co-Founder, she brings a unique perspective that seamlessly blends contemporary aesthetics with functional living spaces. Her designs have been celebrated internationally for their innovative use of space, light, and materials.

    Emma's approach to architecture is deeply rooted in understanding how people live and interact with their environments. She specializes in creating homes that are not just visually stunning but also enhance the daily lives of their inhabitants. Her portfolio showcases a diverse range of projects, from minimalist urban apartments to expansive countryside estates, each reflecting her signature style of elegant simplicity.

    With a background in both architecture and interior design, Emma brings a holistic perspective to every project. She graduated with honors from the Rhode Island School of Design and has studied under renowned architects in Copenhagen and Tokyo. Her work has been featured in numerous design publications, and she has received multiple AIA awards for residential excellence. Emma is also committed to mentoring young designers and regularly lectures at design schools.`,
    skills: ['Residential Design', 'Interior Architecture', 'Space Planning', 'Material Selection', 'Sustainable Materials', 'Design Leadership'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:emma.thompson@arcadia.com'
    }
  },
  3: {
    id: 3,
    name: 'James Rodriguez',
    position: 'Senior Architect',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    email: 'james.rodriguez@arcadia.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    years: '10+',
    projects: '120+',
    awards: '12+',
    bio: `James Rodriguez is a Senior Architect at Arcadia with extensive experience in commercial architecture and sustainable building practices. His expertise in creating innovative, energy-efficient commercial spaces has made him an invaluable member of the Arcadia team. James is known for his meticulous attention to detail and his ability to balance aesthetic vision with practical construction realities.

    Throughout his career, James has led the design and execution of numerous award-winning commercial projects, including office buildings, retail centers, and mixed-use developments. His approach emphasizes sustainability without compromising on design quality, incorporating green building technologies and passive design strategies that reduce environmental impact while creating inspiring work environments.

    James earned his Bachelor of Architecture from the University of Texas at Austin and holds LEED AP BD+C certification. He has worked on projects across North America and has a particular interest in adaptive reuse projects that give new life to historic structures. His technical expertise in building systems and construction methodologies makes him a go-to resource for complex architectural challenges. James is also passionate about community engagement and has volunteered his design services for several non-profit organizations.`,
    skills: ['Commercial Architecture', 'Sustainable Design', 'LEED Certification', 'Building Systems', 'Adaptive Reuse', 'Construction Documentation'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:james.rodriguez@arcadia.com'
    }
  },
  4: {
    id: 4,
    name: 'Sophia Chen',
    position: 'Interior Design Specialist',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    email: 'sophia.chen@arcadia.com',
    phone: '+1 (555) 456-7890',
    location: 'San Francisco, CA',
    years: '8+',
    projects: '180+',
    awards: '15+',
    bio: `Sophia Chen is Arcadia's Interior Design Specialist, bringing a refined aesthetic sensibility and deep understanding of spatial design to every project. Her expertise in color theory, material selection, and space planning has transformed countless interiors into stunning, functional works of art. Sophia's designs are characterized by their sophisticated elegance and attention to how people experience and move through spaces.

    With a background in both architecture and fine arts, Sophia brings a unique perspective to interior design. She excels at creating cohesive design narratives that flow seamlessly from exterior architecture to interior details. Her portfolio spans luxury residences, boutique hotels, high-end retail spaces, and corporate offices, each showcasing her ability to create environments that are both beautiful and purposeful.

    Sophia graduated from Parsons School of Design with a degree in Interior Design and has completed additional studies in sustainable materials and biophilic design. Her work has been featured in Elle Decor, Interior Design Magazine, and Architectural Digest. She is particularly passionate about incorporating natural elements and sustainable materials into her designs, creating spaces that promote wellness and environmental responsibility. Sophia also maintains a popular design blog where she shares insights on contemporary interior trends.`,
    skills: ['Interior Design', 'Space Planning', 'Color Theory', 'Material Selection', 'FF&E Specification', 'Biophilic Design'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:sophia.chen@arcadia.com'
    }
  },
  5: {
    id: 5,
    name: 'Michael Anderson',
    position: 'Urban Planning Architect',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    email: 'michael.anderson@arcadia.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    years: '11+',
    projects: '95+',
    awards: '10+',
    bio: `Michael Anderson is Arcadia's specialist in urban planning and large-scale development projects. His expertise in creating livable, sustainable communities has shaped numerous successful urban development initiatives. Michael's approach to urban design focuses on creating spaces that foster community interaction, promote walkability, and integrate seamlessly with existing urban fabric.

    With over a decade of experience in urban planning and architecture, Michael has worked on master plans for residential neighborhoods, mixed-use developments, and smart city initiatives. His projects demonstrate a deep understanding of how urban design impacts quality of life, emphasizing public spaces, green infrastructure, and sustainable transportation solutions. He is particularly interested in how technology can enhance urban living while maintaining human-scale design principles.

    Michael holds a Master's degree in Urban Design from Columbia University and a Bachelor of Architecture from the University of Washington. He is a member of the American Planning Association and has contributed to several urban design guidelines adopted by major cities. His work has been recognized with awards from the Urban Land Institute and the American Institute of Architects. Michael regularly collaborates with city planners, developers, and community organizations to create developments that truly serve their communities.`,
    skills: ['Urban Planning', 'Master Planning', 'Smart Cities', 'Public Space Design', 'Transportation Planning', 'Community Engagement'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:michael.anderson@arcadia.com'
    }
  },
  6: {
    id: 6,
    name: 'Sarah Williams',
    position: 'Structural Engineer',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    email: 'sarah.williams@arcadia.com',
    phone: '+1 (555) 678-9012',
    location: 'Boston, MA',
    years: '9+',
    projects: '110+',
    awards: '8+',
    bio: `Sarah Williams is Arcadia's lead Structural Engineer, bringing engineering excellence and innovative problem-solving to every project. Her expertise in structural systems enables the studio's most ambitious architectural visions to become reality. Sarah's work ensures that beauty and structural integrity go hand in hand, creating buildings that are as sound as they are stunning.

    With a strong background in both traditional and cutting-edge structural systems, Sarah has successfully engineered a wide range of projects, from high-rise buildings to long-span structures. She is particularly skilled in optimizing structural solutions to minimize material use while maximizing performance, contributing to the sustainability goals of each project. Her ability to collaborate closely with architects ensures that structural elements enhance rather than constrain design creativity.

    Sarah earned her Master's degree in Structural Engineering from Stanford University and is a licensed Professional Engineer in multiple states. She has expertise in advanced analysis software, parametric design, and performance-based design approaches. Her innovative work has been recognized with awards from the Structural Engineers Association and the American Society of Civil Engineers. Sarah is also committed to advancing the role of women in engineering and actively mentors young engineers entering the field.`,
    skills: ['Structural Engineering', 'Structural Analysis', 'Advanced Materials', 'Seismic Design', 'Parametric Design', 'Building Performance'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:sarah.williams@arcadia.com'
    }
  }
};

/*=================================
  Initialize AOS
===================================*/
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: true,
      offset: 100
    });
  }
  
  initializeTeamPage();
});

/*=================================
  Initialize Team Page
===================================*/
function initializeTeamPage() {
  initializeFilters();
  initializeModals();
  initializeScrollAnimations();
  addRippleEffect();
}

/*=================================
  Team Filtering
===================================*/
function initializeFilters() {
  const filterBtns = document.querySelectorAll('.team-filter-btn');
  const teamCards = document.querySelectorAll('.team-member-col');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter team members
      teamCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
      
      // Refresh AOS
      if (typeof AOS !== 'undefined') {
        setTimeout(() => {
          AOS.refresh();
        }, 500);
      }
    });
  });
}

/*=================================
  Modal Functionality
===================================*/
function initializeModals() {
  const modal = document.getElementById('teamModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const viewMoreBtns = document.querySelectorAll('.btn-view-more');
  
  // Open modal
  viewMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const memberId = this.getAttribute('data-member-id');
      openModal(memberId);
    });
  });
  
  // Close modal
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  function openModal(memberId) {
    const member = teamMembers[memberId];
    if (!member) return;
    
    modalContent.innerHTML = generateModalContent(member);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    setTimeout(() => {
      modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 10);
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      modalContent.innerHTML = '';
    }, 400);
  }
}

/*=================================
  Generate Modal Content
===================================*/
function generateModalContent(member) {
  return `
    <div class="modal-header">
      <img src="${member.image}" alt="${member.name}" class="modal-member-image">
      <h2 class="modal-member-name">${member.name}</h2>
      <p class="modal-member-position">${member.position}</p>
      <div class="modal-stats">
        <div class="modal-stat">
          <span class="modal-stat-number">${member.years}</span>
          <span class="modal-stat-label">Years Experience</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-number">${member.projects}</span>
          <span class="modal-stat-label">Projects</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-number">${member.awards}</span>
          <span class="modal-stat-label">Awards</span>
        </div>
      </div>
    </div>
    
    <div class="modal-body">
      <div class="modal-section">
        <h3 class="modal-section-title">
          <i class="bx bx-user-circle"></i>
          About ${member.name.split(' ')[0]}
        </h3>
        <div class="modal-bio">${member.bio.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}</div>
      </div>
      
      <div class="modal-section">
        <h3 class="modal-section-title">
          <i class="bx bx-code-alt"></i>
          Core Expertise
        </h3>
        <div class="modal-skills">
          ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
      
      <div class="modal-section">
        <h3 class="modal-section-title">
          <i class="bx bx-phone"></i>
          Contact Information
        </h3>
        <div class="modal-contact-info">
          <div class="contact-item">
            <i class="bx bx-envelope"></i>
            <span>${member.email}</span>
          </div>
          <div class="contact-item">
            <i class="bx bx-phone"></i>
            <span>${member.phone}</span>
          </div>
          <div class="contact-item">
            <i class="bx bx-map"></i>
            <span>${member.location}</span>
          </div>
        </div>
      </div>
      
      <div class="modal-section">
        <h3 class="modal-section-title">
          <i class="bx bx-link"></i>
          Connect
        </h3>
        <div class="modal-social-links">
          <a href="${member.social.linkedin}" class="modal-social-link" target="_blank" aria-label="LinkedIn">
            <i class="bx bxl-linkedin"></i>
          </a>
          <a href="${member.social.twitter}" class="modal-social-link" target="_blank" aria-label="Twitter">
            <i class="bx bxl-twitter"></i>
          </a>
          <a href="${member.social.email}" class="modal-social-link" aria-label="Email">
            <i class="bx bx-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

/*=================================
  Scroll Animations
===================================*/
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  scrollElements.forEach(el => observer.observe(el));
}

/*=================================
  Ripple Effect for Buttons
===================================*/
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn-view-more, .team-filter-btn, .btn-cta');
  
  buttons.forEach(button => {
    button.classList.add('ripple-effect');
  });
}

/*=================================
  Smooth Scroll
===================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/*=================================
  Performance Optimization
===================================*/
// Debounce function
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Console branding
console.log(
  '%c👥 Arcadia Team Page',
  'font-size: 20px; font-weight: bold; color: #007AFF;'
);
console.log(
  '%cBuilt with care by Arcadia Architecture Studio',
  'font-size: 14px; color: #666;'
);