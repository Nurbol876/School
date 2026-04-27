document.querySelector('.header__menu').addEventListener('click', () => {
    const sidebar = document.querySelector('.me');
    const mainContent = document.querySelector('.main');
    mainContent.classList.toggle('main__active');
    sidebar.classList.toggle('me__active');
});
document.querySelector('.me__x').addEventListener('click', () => {
    const sidebar = document.querySelector('.me');
    const mainContent = document.querySelector('.main');
    mainContent.classList.toggle('main__active');
    sidebar.classList.toggle('me__active');
});
document.querySelector('.reload').addEventListener('click', () => {
    location.reload();
})

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.header__link');
    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.style.color = "#39965F";
        }
    });

    const sidebarLinks = document.querySelector('.me__links');
    const headerList = document.querySelector('.header__list');
    const langButtons = Array.from(document.querySelectorAll('.header__btn')).map((btn) => btn.closest('a')).filter(Boolean);

    if (sidebarLinks && headerList) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'me__mobile-menu';

        const mobileNav = document.createElement('ul');
        mobileNav.className = 'me__mobile-nav';
        mobileNav.innerHTML = headerList.innerHTML;

        const mobileLangs = document.createElement('div');
        mobileLangs.className = 'me__mobile-langs';
        langButtons.forEach((anchor) => {
            mobileLangs.appendChild(anchor.cloneNode(true));
        });

        mobileMenu.appendChild(mobileNav);
        mobileMenu.appendChild(mobileLangs);
        sidebarLinks.appendChild(mobileMenu);
    }
});
