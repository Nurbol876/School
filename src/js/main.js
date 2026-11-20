const sidebar = document.querySelector('.me');
const mainContent = document.querySelector('.main');

const setSidebar = (open) => {
    if (!sidebar || !mainContent) return;
    sidebar.classList.toggle('me__active', open);
    mainContent.classList.toggle('main__active', open);
};

document.querySelector('.header__menu')?.addEventListener('click', () => {
    setSidebar(!sidebar?.classList.contains('me__active'));
});
document.querySelector('.me__x')?.addEventListener('click', () => setSidebar(false));
document.querySelector('.reload')?.addEventListener('click', () => location.reload());

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.body.dataset.theme = savedTheme;

const headerRight = document.querySelector('.header__right');
const themeToggle = document.createElement('button');
themeToggle.type = 'button';
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Switch color theme');
themeToggle.textContent = savedTheme === 'dark' ? '☾' : '☀';

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = nextTheme;
    localStorage.setItem('portfolio-theme', nextTheme);
    themeToggle.textContent = nextTheme === 'dark' ? '☾' : '☀';
});

headerRight?.prepend(themeToggle);

// Ambient canvas wallpaper and restrained pointer lighting.
if (!document.querySelector('.ambient-wallpaper')) {
    const canvas = document.createElement('canvas');
    canvas.className = 'ambient-wallpaper';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const grid = document.createElement('div');
    grid.className = 'ambient-grid';
    grid.setAttribute('aria-hidden', 'true');
    document.body.prepend(grid);

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.prepend(glow);

    const context = canvas.getContext('2d');
    let particles = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.min(72, Math.max(28, Math.floor(width / 24)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,
            radius: Math.random() * 1.4 + 0.35,
            alpha: Math.random() * 0.28 + 0.08
        }));
    };

    const draw = () => {
        context.clearRect(0, 0, width, height);

        for (const particle of particles) {
            if (!reducedMotion) {
                particle.x += particle.vx;
                particle.y += particle.vy;
            }
            if (particle.x < -10) particle.x = width + 10;
            if (particle.x > width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = height + 10;
            if (particle.y > height + 10) particle.y = -10;

            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = `rgba(120, 235, 174, ${particle.alpha})`;
            context.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 110) {
                    context.beginPath();
                    context.moveTo(particles[i].x, particles[i].y);
                    context.lineTo(particles[j].x, particles[j].y);
                    context.strokeStyle = `rgba(100, 210, 151, ${(1 - distance / 110) * 0.055})`;
                    context.lineWidth = 1;
                    context.stroke();
                }
            }
        }

        if (!reducedMotion) frameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    window.addEventListener('pointermove', (event) => {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(frameId);
        } else if (!reducedMotion) {
            draw();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.header__link');
    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.style.color = "#39965F";
        }
    });
});
