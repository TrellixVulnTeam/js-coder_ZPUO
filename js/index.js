const containerMenu = document.getElementById('nav-menu-container');


function showMenu(objt) {
    if (containerMenu.style.display == "flex") {
        containerMenu.style.display = 'none';
    } else {
        containerMenu.style.display = 'flex';
    }
};

function closeMenu(objt) {
    containerMenu.style.display = 'none';
};

