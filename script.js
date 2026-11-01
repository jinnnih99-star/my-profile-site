// ===== 프로필 데이터: 이 객체만 수정하면 사이트 내용이 바뀝니다 =====
const PROFILE = {
  name: '홍길동',
  role: '프론트엔드 개발자',
  intro: [
    '사용자 경험을 세심하게 고민하는 프론트엔드 개발자입니다.',
    '깔끔한 코드와 직관적인 인터페이스를 지향합니다.',
    '새로운 기술을 배우고 작은 프로젝트로 실험하는 것을 즐깁니다.',
  ],
  stats: [
    { label: '프로젝트', value: '3+' },
    { label: '기술 스택', value: '5' },
    { label: '경력', value: '1년' },
  ],
  skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Git'],
  projects: [
    {
      title: '개인 블로그',
      description: '마크다운으로 글을 작성하고 다크모드를 지원하는 정적 블로그입니다.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/username/blog',
    },
    {
      title: '할 일 관리 앱',
      description: '로컬 저장소에 데이터를 보관하는 간단한 할 일 관리 웹앱입니다.',
      tags: ['JavaScript', 'Tailwind CSS'],
      link: 'https://github.com/username/todo',
    },
    {
      title: '날씨 대시보드',
      description: '공개 API로 도시별 날씨를 가져와 카드 형태로 보여줍니다.',
      tags: ['JavaScript', 'REST API'],
      link: 'https://github.com/username/weather',
    },
  ],
  contact: {
    email: 'example@email.com',
    github: 'https://github.com/username',
  },
};

// ===== 헬퍼 =====
// 사용자 데이터를 innerHTML 대신 textContent로 넣기 위한 요소 생성 함수
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function linkButton(label, href, className) {
  const a = el('a', className, label);
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

// ===== 렌더링 =====
function renderHeader() {
  document.getElementById('brand').textContent = PROFILE.name;
}

function renderHero() {
  document.getElementById('hero-name').textContent = `안녕하세요, ${PROFILE.name}입니다`;
  document.getElementById('hero-role').textContent = PROFILE.role;
  document.getElementById('hero-avatar').textContent = PROFILE.name.charAt(0);

  const points = document.getElementById('hero-points');
  PROFILE.intro.forEach((text) => {
    const li = el('li', 'flex items-start gap-3 text-lg text-slate-700 dark:text-slate-300');
    const icon = el('span', 'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300');
    icon.innerHTML = '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
    li.append(icon, el('span', '', text));
    points.appendChild(li);
  });

  const stats = document.getElementById('hero-stats');
  PROFILE.stats.forEach(({ label, value }) => {
    const li = el('li', 'flex items-baseline justify-between');
    li.append(el('span', 'text-xs text-slate-500 dark:text-slate-400', label), el('span', 'text-xl font-black text-blue-600', value));
    stats.appendChild(li);
  });

  document.getElementById('badge-logo').textContent = PROFILE.name.charAt(0);
  document.getElementById('badge-name').textContent = PROFILE.name;
  document.getElementById('badge-sub').textContent = PROFILE.role;
}

function renderAbout() {
  const container = document.getElementById('about-text');
  PROFILE.intro.forEach((text) => container.appendChild(el('p', '', text)));
}

function renderSkills() {
  const list = document.getElementById('skill-list');
  PROFILE.skills.forEach((skill) => {
    list.appendChild(el('span',
      'rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300',
      skill));
  });
}

function renderProjects() {
  const list = document.getElementById('project-list');
  PROFILE.projects.forEach((project, index) => {
    const card = el('article', 'reveal flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900');

    const thumb = el('div', 'mb-5 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-300 text-4xl font-black text-white/90');
    thumb.textContent = String(index + 1).padStart(2, '0');

    const tags = el('div', 'mt-4 flex flex-wrap gap-2');
    project.tags.forEach((tag) => {
      tags.appendChild(el('span', 'rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300', tag));
    });

    const button = linkButton('자세히 보기 →', project.link,
      'mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700');

    card.append(
      thumb,
      el('h3', 'text-xl font-bold', project.title),
      el('p', 'mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400', project.description),
      tags,
      button,
    );
    list.appendChild(card);
  });
}

function renderContact() {
  document.getElementById('contact-desc').textContent = '프로젝트, 협업, 그 밖의 어떤 이야기든 편하게 연락 주세요.';

  const links = document.getElementById('contact-links');
  const mail = linkButton('이메일 보내기', `mailto:${PROFILE.contact.email}`,
    'rounded-full bg-white px-6 py-3 font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5');
  mail.removeAttribute('target');
  const github = linkButton('GitHub', PROFILE.contact.github,
    'rounded-full border border-white/60 px-6 py-3 font-bold text-white transition hover:bg-white/10');
  links.append(mail, github);
}

function renderFooter() {
  document.getElementById('footer-text').textContent = `© ${new Date().getFullYear()} ${PROFILE.name}. All rights reserved.`;
}

// ===== 인터랙션 =====
function setupTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) { /* 저장 불가 환경은 무시 */ }
  });
}

function setupMobileMenu() {
  const button = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden') === false;
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  // 메뉴 항목을 누르면 자동으로 닫힘
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach((target) => observer.observe(target));
}

function setupActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((section) => observer.observe(section));
}

// ===== 실행 =====
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  renderFooter();

  setupTheme();
  setupMobileMenu();
  setupReveal();
  setupActiveNav();
});
