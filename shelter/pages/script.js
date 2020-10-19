function onClickMenu() {
    document.getElementById('burger-1').classList.toggle('burger-menu');
    document.querySelector('.mobile__menu').classList.toggle('mobile__menu-toggled');
    document.querySelector('.blackout').classList.toggle('blackout-active');
    document.querySelector('.header__logo').classList.toggle('header__logo-toggled');

}

function removeClass() {
    window.addEventListener("resize", () => {
        if(window.innerWidth > 767) {
            document.getElementById('burger-1').classList.remove('burger-menu');
            document.querySelector('.mobile__menu').classList.remove('mobile__menu-toggled');
            document.querySelector('.blackout').classList.remove('blackout-active');
            document.querySelector('.header__logo').classList.remove('header__logo-toggled'); 
        }
    })
}

removeClass();