const loadHTML = (divID, fileName, callback) => {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById(divID).innerHTML = data;
            if (callback) {
                callback();
            }
        })
        .catch(error => console.error("HTML loading fucked up", error));
}

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
        });
    }
}

const initDropdowns = () => {
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
}

const initCards = () => {
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip_card')
    });
});
}

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
}

window.addEventListener('DOMContentLoaded', (event) => {
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('adminlogin.html') || window.location.pathname.endsWith('admindashboard.html');
    const navBarFile = isHomePage ? './pages/nav-home.html' : 'nav-pages.html';
    const footerFile = isHomePage ? './pages/footer-home.html' : 'footer-pages.html';


    loadHTML('navbar', navBarFile, () => {
        showMenu('nav-toggler', 'nav-menu');
        initDropdowns();
        initCards();
    });
    loadHTML('footer', footerFile);
});

//Functions to animated elements and to make sure they only fire when they are on screen
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


