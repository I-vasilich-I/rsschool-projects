window.onload = function() {
    //remove mobile menu and affects when screen is more than 767px
    resetClass();
}


function onClickMenu() {
    let mainBurger = document.getElementById('burger-1');
    if (mainBurger!=null) {
        mainBurger.classList.toggle('burger-menu');
    }
    let petsBurger = document.getElementById('burger-2');
    if (petsBurger != null) {
        petsBurger.classList.toggle('burger-menu');
        petsBurger.classList.toggle('burger-pets');
    }
    document.querySelector('.mobile__menu').classList.toggle('mobile__menu-toggled');
    document.querySelector('.blackout').classList.toggle('blackout-active');
    document.querySelector('.header__logo').classList.toggle('header__logo-toggled');
    document.querySelector('.header--pets').classList.toggle('header--pets-toggled');
    document.getElementById('burger__line').classList.toggle('burger__line-pets');
}

function resetClass() {
    window.addEventListener("resize", () => {
        if(window.innerWidth > 767) {
            let mainBurger = document.getElementById('burger-1');
            if (mainBurger!=null) {
                mainBurger.classList.remove('burger-menu');
            }
            let petsBurger = document.getElementById('burger-2');
            if (petsBurger != null) {
                petsBurger.classList.remove('burger-menu');
                petsBurger.classList.add('burger-pets');
            }
            document.querySelector('.mobile__menu').classList.remove('mobile__menu-toggled');
            document.querySelector('.blackout').classList.remove('blackout-active');
            document.querySelector('.header__logo').classList.remove('header__logo-toggled'); 
            document.querySelector('.header--pets').classList.remove('header--pets-toggled');
            document.getElementById('burger__line').classList.add('burger__line-pets')
        }
    })
}

