const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
    
        });
    }

showMenu('nav-toggler', 'nav-menu');

const dropdownItems = document.querySelectorAll('.dropdown_item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const dropdownMenu = item.querySelector('.dropdown_menu');
        if (dropdownMenu) {
            dropdownMenu.classList.toggle('show-dropdown');
        }
    });
});

const dropdownSubItems = document.querySelectorAll('.dropdown_subitem');
dropdownSubItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation();
        item.classList.toggle('active');
        const dropdownSubmenu = item.querySelector('.dropdown_submenu');
        if (dropdownSubmenu) {
            dropdownSubmenu.classList.toggle('show-dropdown');
        }
    });
})



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
