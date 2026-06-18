/* ============================================================
   StreamBlue OTT Landing Page — script.js
   Interactions:
   1. Scroll-triggered fade-in animation (Intersection Observer)
   2. Content card filter tabs with animation
   3. Modal popup for card/featured details
   4. Particle canvas animation (hero background)
   5. Header style change on scroll
   6. Responsive hamburger menu
   7. Toast notifications
   ============================================================ */

/* ---------- Data ------------------------------------------- */
const CONTENT_DATA = [
  {
    id: 1, title: '다크 나이트: 리부트', genre: '액션', filter: 'action',
    rating: '9.2', year: '2025', duration: '2시간 32분', age: '15세',
    img: 'https://picsum.photos/seed/darkcity/600/400',
    bg: 'g1', rank: 1, isNew: false,
    desc: '도시의 어둠 속에서 탄생한 고독한 영웅이 부패한 권력에 맞선다. 압도적인 액션과 깊은 서사가 만나다.'
  },
  {
    id: 2, title: '사랑의 계절', genre: '드라마', filter: 'drama',
    rating: '8.7', year: '2025', duration: '1시간 45분', age: '12세',
    img: 'https://picsum.photos/seed/autumn/600/400',
    bg: 'g2', rank: 2, isNew: true,
    desc: '서로 다른 계절을 사는 두 사람의 엇갈린 사랑 이야기. 감동의 물결이 넘치는 로맨스 드라마.'
  },
  {
    id: 3, title: '우주의 끝에서', genre: 'SF', filter: 'sci-fi',
    rating: '9.0', year: '2024', duration: '2시간 10분', age: '12세',
    img: 'https://picsum.photos/seed/cosmos/600/400',
    bg: 'g3', rank: 3, isNew: false,
    desc: '우주 탐험대가 블랙홀 너머에서 발견한 고대 문명. 인류의 기원을 밝힐 단서를 찾는 SF 대서사.'
  },
  {
    id: 4, title: '마지막 사무라이의 귀환', genre: '액션', filter: 'action',
    rating: '8.9', year: '2024', duration: '2시간 05분', age: '15세',
    img: 'https://picsum.photos/seed/warrior/600/400',
    bg: 'g4', rank: 4, isNew: true,
    desc: '전설의 검사가 복수를 위해 돌아왔다. 전통과 현대가 충돌하는 거대한 역사 액션 서사.'
  },
  {
    id: 5, title: '웃음 폭탄 가족', genre: '코미디', filter: 'comedy',
    rating: '8.3', year: '2025', duration: '1시간 38분', age: '전체',
    img: 'https://picsum.photos/seed/sunny/600/400',
    bg: 'g5', rank: 5, isNew: false,
    desc: '천방지축 가족이 만들어내는 웃음과 감동의 연속. 온 가족이 함께 즐길 수 있는 명랑 코미디.'
  },
  {
    id: 6, title: '공포의 저택 시즌2', genre: '호러', filter: 'drama',
    rating: '8.6', year: '2025', duration: '각 50분 × 8화', age: '18세',
    img: 'https://picsum.photos/seed/haunted/600/400',
    bg: 'g6', rank: 6, isNew: true,
    desc: '그 집에는 비밀이 있다. 더욱 강렬해진 공포와 반전이 기다리는 시즌2. 절대 혼자 보지 마세요.'
  }
];

const RECOMMENDED_DATA = [
  {
    id: 101, title: '비밀의 정원', genre: '미스터리', filter: 'drama',
    rating: '9.1', year: '2024',
    img: 'https://picsum.photos/seed/garden/400/560',
    bg: 'g7',
    desc: '아무도 모르는 비밀이 숨겨진 정원. 그 안에서 시작되는 의문스러운 사건들.'
  },
  {
    id: 102, title: '타임리프: 다시 한번', genre: 'SF', filter: 'sci-fi',
    rating: '8.8', year: '2025',
    img: 'https://picsum.photos/seed/timeloop/400/560',
    bg: 'g8',
    desc: '과거로 돌아갈 수 있다면 무엇을 바꾸겠는가? 시간 여행의 역설을 다룬 SF 걸작.'
  },
  {
    id: 103, title: '헌터즈: 시작', genre: '액션', filter: 'action',
    rating: '8.5', year: '2024',
    img: 'https://picsum.photos/seed/hunters/400/560',
    bg: 'g9',
    desc: '최강 용병팀이 결성됐다. 세계 최대 위협에 맞서는 엘리트 요원들의 활약.'
  },
  {
    id: 104, title: '블루문의 밤', genre: '로맨스', filter: 'drama',
    rating: '8.4', year: '2025',
    img: 'https://picsum.photos/seed/moonlight/400/560',
    bg: 'g10',
    desc: '12년마다 뜨는 블루문 아래서 만나는 두 사람. 운명적인 사랑의 시작.'
  }
];

/* ---------- DOM ready -------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  buildContentGrid();
  buildRecommendedGrid();
  initScrollAnimations();
  initHeader();
  initHamburger();
  initFilterTabs();
  initModal();
  initParticleCanvas();
  initHeroButtons();
  initAuthState();
  initScrollIndicator();
  initMockupCards();
});

/* ---------- Build Content Grid ----------------------------- */
function buildContentGrid() {
  const grid = document.getElementById('contentGrid');
  grid.innerHTML = CONTENT_DATA.map(c => `
    <div class="content-card animate-on-scroll" data-filter="${c.filter}" data-id="${c.id}">
      <div class="card-poster">
        <img class="card-poster-bg" src="${c.img}" alt="${c.title}" loading="lazy" />
        <div class="card-rank">#${c.rank}</div>
        ${c.isNew ? '<div class="card-new-badge">NEW</div>' : ''}
        <div class="card-overlay">
          <div class="card-play card-play-inner">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><polygon points="4,2 15,9 4,16" fill="#fff"/></svg>
          </div>
        </div>
      </div>
      <div class="card-info">
        <div class="card-genre">${c.genre}</div>
        <div class="card-title">${c.title}</div>
        <div class="card-meta">
          <span class="card-rating">⭐ ${c.rating}</span>
          <span class="card-year">${c.year}</span>
          <span class="card-duration">${c.duration}</span>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = CONTENT_DATA.find(c => c.id === Number(card.dataset.id));
      if (data) openModal(data);
    });
  });
}

/* ---------- Build Recommended Grid ------------------------- */
function buildRecommendedGrid() {
  const grid = document.getElementById('recommendedGrid');
  grid.innerHTML = RECOMMENDED_DATA.map(r => `
    <div class="rec-card animate-on-scroll" data-id="${r.id}">
      <div class="rec-poster">
        <img class="rec-poster-bg" src="${r.img}" alt="${r.title}" loading="lazy" />
        <div class="rec-overlay">
          <div class="rec-play">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polygon points="3,1 14,8 3,15" fill="#fff"/></svg>
          </div>
        </div>
      </div>
      <div class="rec-info">
        <div class="rec-genre">${r.genre}</div>
        <div class="rec-title">${r.title}</div>
        <div class="rec-meta">
          <span class="rec-rating">⭐ ${r.rating}</span>
          <span class="rec-year">${r.year}</span>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.rec-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = RECOMMENDED_DATA.find(r => r.id === Number(card.dataset.id));
      if (data) openModal(data);
    });
  });
}

/* ---------- Scroll Animations (Interaction #1) ------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.closest('.content-grid, .recommended-grid')
          ? Array.from(entry.target.parentNode.children).indexOf(entry.target) * 80
          : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ---------- Header scroll style ---------------------------- */
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ---------- Hamburger menu --------------------------------- */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
    });
  });
}

/* ---------- Filter Tabs (Interaction #2) ------------------- */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = () => document.querySelectorAll('.content-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards().forEach(card => {
        const match = filter === 'all' || card.dataset.filter === filter;
        card.style.transition = 'opacity .25s ease, transform .25s ease';
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(.95)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(.95)';
          setTimeout(() => card.classList.add('hidden'), 260);
        }
      });
    });
  });
}

/* ---------- Modal (Interaction #3) ------------------------- */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Hero watch button
  document.getElementById('heroWatchBtn').addEventListener('click', () => {
    openModal(CONTENT_DATA[0]);
  });

  // Featured section buttons
  document.getElementById('featuredPlayBtn').addEventListener('click', () => {
    openModal(CONTENT_DATA[0]);
  });
  document.getElementById('featuredWatchBtn').addEventListener('click', () => {
    openModal(CONTENT_DATA[0]);
  });
  document.getElementById('featuredAddBtn').addEventListener('click', () => {
    showToast('✓ 내 목록에 추가되었습니다');
  });

  // Other nav buttons
  document.getElementById('loginBtn').addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  document.getElementById('trialBtn').addEventListener('click', () => showToast('🎉 30일 무료 체험을 시작합니다!'));
  document.getElementById('originalsBtn').addEventListener('click', () => showToast('오리지널 콘텐츠 목록을 불러옵니다'));

  document.querySelector('.modal-watch-btn').addEventListener('click', () => {
    closeModal();
    showToast('▶ 재생을 시작합니다...');
  });
  document.querySelector('.modal-add-btn').addEventListener('click', () => {
    showToast('✓ 내 목록에 추가되었습니다');
  });
}

/* ---------- Auth State ------------------------------------- */
async function initAuthState() {
  const guest   = document.getElementById('navGuest');
  const userEl  = document.getElementById('navUser');
  const welcome = document.getElementById('navWelcome');

  function applyUser(user) {
    const nickname = user.user_metadata?.nickname || user.email.split('@')[0];
    guest.style.display  = 'none';
    userEl.style.display = 'flex';
    welcome.textContent  = `환영합니다! ${nickname}`;
  }

  function applyGuest() {
    guest.style.display  = 'flex';
    userEl.style.display = 'none';
  }

  const { data: { session } } = await _supabase.auth.getSession();
  session?.user ? applyUser(session.user) : applyGuest();

  _supabase.auth.onAuthStateChange((_event, session) => {
    session?.user ? applyUser(session.user) : applyGuest();
  });

  /* 드롭다운 토글 */
  const iconBtn  = document.getElementById('userIconBtn');
  const dropdown = document.getElementById('userDropdown');
  if (iconBtn) {
    iconBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }

  /* 로그아웃 */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await _supabase.auth.signOut();
      showToast('로그아웃 되었습니다');
      setTimeout(() => location.reload(), 900);
    });
  }
}

function openModal(data) {
  const overlay = document.getElementById('modalOverlay');
  const visual = document.getElementById('modalVisual');
  visual.className = 'modal-visual';
  visual.innerHTML = data.img
    ? `<img src="${data.img}" alt="${data.title}" style="width:100%;height:100%;object-fit:cover;display:block;" />`
    : '';
  document.getElementById('modalBadge').textContent = data.genre || '';
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalMeta').innerHTML = [
    data.rating ? `<span class="meta-chip">⭐ ${data.rating}</span>` : '',
    data.year    ? `<span class="meta-chip">${data.year}</span>` : '',
    data.duration? `<span class="meta-chip">${data.duration}</span>` : '',
    data.age     ? `<span class="meta-chip">${data.age}</span>` : ''
  ].join('');
  document.getElementById('modalDesc').textContent = data.desc || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Toast notification ----------------------------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ---------- Hero buttons ----------------------------------- */
function initHeroButtons() {
  document.getElementById('heroExploreBtn').addEventListener('click', () => {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- Scroll indicator ------------------------------- */
function initScrollIndicator() {
  document.getElementById('scrollIndicator').addEventListener('click', () => {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- Mockup Cards random position + content --------- */
function initMockupCards() {
  const mockup = document.querySelector('.hero-mockup');
  const c1     = document.querySelector('.mockup-card.c1');
  const c2     = document.querySelector('.mockup-card.c2');
  if (!c1 || !c2 || !mockup) return;

  const CW = 130, CH = 114, PAD = 6;
  const ROTS = [-11, -8, -6, -5, 5, 6, 8, 11];

  function getSlots() {
    const mw = mockup.offsetWidth, mh = mockup.offsetHeight;
    return [
      { top: PAD,               left: PAD },
      { top: PAD,               left: mw - CW - PAD },
      { top: (mh - CH) / 2,    left: PAD },
      { top: (mh - CH) / 2,    left: mw - CW - PAD },
      { top: mh - CH - PAD,    left: PAD },
      { top: mh - CH - PAD,    left: mw - CW - PAD },
    ];
  }

  const state = [
    { el: c1, img: c1.querySelector('.mc-img'), span: c1.querySelector('.mc-info span'), rot: -8 },
    { el: c2, img: c2.querySelector('.mc-img'), span: c2.querySelector('.mc-info span'), rot: 7 },
  ];

  /* 호버 시 현재 rotation 유지하며 scale */
  state.forEach(s => {
    s.el.addEventListener('mouseenter', () => {
      s.el.style.transform = `rotate(${s.rot}deg) scale(1.1)`;
    });
    s.el.addEventListener('mouseleave', () => {
      s.el.style.transform = `rotate(${s.rot}deg)`;
    });
  });

  function applyPos(s, pos, rot) {
    s.rot = rot;
    s.el.style.top       = pos.top  + 'px';
    s.el.style.left      = pos.left + 'px';
    s.el.style.transform = `rotate(${rot}deg)`;
  }

  function applyContent(s, data) {
    s.el.style.opacity = '0';
    setTimeout(() => {
      s.img.src          = data.img;
      s.img.alt          = data.title;
      s.span.textContent = data.title;
      s.el.style.opacity = '1';
    }, 460);
  }

  function randomize(withContent) {
    const slots = [...getSlots()].sort(() => Math.random() - .5);
    const rots  = [...ROTS].sort(() => Math.random() - .5);
    const data  = [...CONTENT_DATA].sort(() => Math.random() - .5);
    state.forEach((s, i) => {
      applyPos(s, slots[i], rots[i]);
      if (withContent) setTimeout(() => applyContent(s, data[i]), i * 180);
    });
  }

  /* 초기 배치: 트랜지션 없이 즉시 위치 설정 */
  state.forEach(s => { s.el.style.transition = 'none'; s.el.style.opacity = '0'; });
  randomize(false);
  const initData = [...CONTENT_DATA].sort(() => Math.random() - .5);
  state.forEach((s, i) => {
    s.img.src = initData[i].img; s.img.alt = initData[i].title;
    s.span.textContent = initData[i].title;
  });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    state.forEach(s => { s.el.style.transition = ''; s.el.style.opacity = '1'; });
  }));

  setInterval(() => randomize(true), 5000);
}

/* ---------- Particle Canvas (Interaction #4) --------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - .5) * .35,
    vy: (Math.random() - .5) * .35,
    a: Math.random()
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      p.a = .3 + .5 * Math.abs(Math.sin(Date.now() * .0005 + p.x));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100,181,246,${p.a})`;
      ctx.fill();
    });

    // Lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(30,144,255,${.12 * (1 - dist / 120)})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
