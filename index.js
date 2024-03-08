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

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((elements, observer) => {
        elements.forEach((element) => {
            if (element.isIntersecting) {
                console.log("its working");
                element.target.classList.add('visible');
                observer.unobserve(element.target);
            }
        });
    }, {threshold: 0.4});

    const elementsToAnimate = document.querySelectorAll('[animated="true"]');
    elementsToAnimate.forEach((element) => {
        observer.observe(element);
    });
});
