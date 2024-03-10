const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
    
        });
    }

showMenu('nav-toggler', 'nav-menu');

// Stupid fucking events for stupid fucking mobile users
const toggleDropdown = (item, dropdownClass, arrowClass) => {
    item.classList.toggle('active');
    const dropdownElement = item.querySelector(`.${dropdownClass}`);
    if (dropdownElement) {
        dropdownElement.classList.toggle('show-dropdown');
        const arrowIcon = item.querySelector(`.${arrowClass}`);
        if (arrowIcon) {
            arrowIcon.classList.toggle('rotate-arrow');
        }
    }
};

const dropdownItems = document.querySelectorAll('.dropdown_item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleDropdown(item, 'dropdown_menu', 'dropdown_arrow');
    });
});

const dropdownSubItems = document.querySelectorAll('.dropdown_subitem');
dropdownSubItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDropdown(item, 'dropdown_submenu', 'dropdown_arrow');
    });
});

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip_card')
    });
})

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((elements, observer) => {
        elements.forEach((element) => {
            if (element.isIntersecting) {
                console.log("it's working delete me if you see this");
                element.target.classList.add('visible');
                observer.unobserve(element.target);
            }
        });
    }, {threshold: 0.35});

    const elementsToAnimate = document.querySelectorAll('[animated="true"]');
    elementsToAnimate.forEach((element) => {
        observer.observe(element);
    });
});
