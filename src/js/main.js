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
});
