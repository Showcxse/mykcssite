const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu')
        toggle.classList.toggle('show-icon')
    })
}
showMenu('nav-toggler', 'nav-menu');


const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip_card')
    })
})

