const sectionFiles = [
  { container: 'hero-container', path: 'hero.html' },
  { container: 'highlights-container', path: 'highlights.html' },
  { container: 'counters-container', path: 'counters.html' },
  { container: 'about-container', path: 'principal.html' },
  { container: 'academics-container', path: 'academics.html' },
  { container: 'admissions-container', path: 'admissions.html' },
  { container: 'facilities-container', path: 'facilities.html' },
  { container: 'gallery-container', path: 'gallery.html' },
  { container: 'testimonials-container', path: 'testimonials.html' },
  { container: 'news-container', path: 'news.html' },
  { container: 'contact-container', path: 'contact.html' },
  { container: 'footer-container', path: 'footer.html' },
];

function loadSection(containerId, filePath) {
  return fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Unable to load ${filePath}`);
      return response.text();
    })
    .then(html => {
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = `<div style="padding:2rem; background:#fee; color:#933; border:1px solid #f5c2c7;">Error loading section: ${error.message}</div>`;
      }
    });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    window.closeMobileMenu = () => mobileMenu.classList.remove('open');
  }
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      const suffix = el.closest('.stat-item') ? (el.getAttribute('data-target') === '98' ? '%' : '+') : '+';
      el.textContent = Math.round(current) + suffix;
    }, 25);
  });
}

function initCounters() {
  const counterSection = document.querySelector('.counters');
  if (!counterSection) return;
  const counterObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0] && entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  counterObserver.observe(counterSection);
}

function filterGallery(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function initGallery() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const match = this.getAttribute('onclick')?.match(/filterGallery\('([^']+)'/);
      if (match && match[1]) {
        filterGallery(match[1], this);
      }
    });
  });
}

function handleSubmit(btn) {
  if (!btn) return;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent! We\'ll call you shortly.';
    btn.style.background = 'linear-gradient(135deg, #1D9E75, #0F6E56)';
    btn.style.color = 'white';
  }, 1500);
}

function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initPage() {
  Promise.all(sectionFiles.map(item => loadSection(item.container, item.path)))
    .then(() => {
      initReveal();
      initCounters();
      initGallery();
      initSmoothScroll();
      initNavbarScroll();
    })
    .catch(error => console.error('Error loading sections:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPage();
});
function sendToWhatsApp() {
  const parentName     = document.getElementById('parentName').value.trim();
  const phoneNumber    = document.getElementById('phoneNumber').value.trim();
  const childName      = document.getElementById('childName').value.trim();
  const childAge       = document.getElementById('childAge').value.trim();
  const classInterested = document.getElementById('classInterested').value;
  const message        = document.getElementById('message').value.trim();

  // Basic validation
  if (!parentName || !phoneNumber) {
    alert('Please fill in your name and phone number.');
    return;
  }

  // Build the WhatsApp message
  const text = `Hello Little Genius Preschool! 👋

*Parent Name:* ${parentName}
*Phone:* ${phoneNumber}
*Child's Name:* ${childName || 'Not provided'}
*Child's Age:* ${childAge ? childAge + ' years' : 'Not provided'}
*Class Interested:* ${classInterested || 'Not selected'}
*Message:* ${message || 'No additional message'}`;

  // Open WhatsApp with pre-filled message
  const encodedText = encodeURIComponent(text);
  window.open(`https://wa.me/919940382901?text=${encodedText}`, '_blank');
}
