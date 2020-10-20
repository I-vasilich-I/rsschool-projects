window.onload = function() {
    //remove mobile menu and affects when screen is more than 767px
    resetClass();
    
}

// runs on both pages: main & pets
function onClickMenu() {
    let blackout = document.querySelector('.blackout');
    if (blackout!=null) {
       document.body.removeChild(blackout);
    } else {
        let el = document.createElement('div');
        el.classList.toggle('blackout');
        document.body.prepend(el);
    }

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
    document.querySelector('.header__logo').classList.toggle('header__logo-toggled');
    let headerPets = document.querySelector('.header--pets');
    if (headerPets != null) {
        headerPets.classList.toggle('header--pets-toggled');
    }

    let burgerLine = document.getElementById('burger__line');
    if (burgerLine != null) {
        burgerLine.classList.toggle('burger__line-pets');
    }
}

// runs on both pages: main & pets
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
            let blackout = document.querySelector('.blackout');
            if (blackout!=null) {
               document.body.removeChild(blackout);
            }

            document.querySelector('.header__logo').classList.remove('header__logo-toggled'); 
            let headerPets = document.querySelector('.header--pets');
            if (headerPets != null) {
                headerPets.classList.remove('header--pets-toggled');
            }
            
            let burgerLine = document.getElementById('burger__line');
            if (burgerLine != null) {
                burgerLine.classList.add('burger__line-pets');
            }
        }
    })
}
