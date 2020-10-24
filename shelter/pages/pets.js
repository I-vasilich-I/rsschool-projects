window.onload = function() {
    //remove mobile menu and affects when screen is more than 767px
    resetClass();
    
    
}

let pets = [];

// runs on both pages: main & pets
function onClickMenu() {
    let blackout = document.querySelector('.blackout');
    
    if (blackout!=null) {
       document.body.removeChild(blackout);
       document.body.classList.remove('stop-scrolling');
       document.body.setAttribute('style', `padding-right: 0px`);
    } else {
        let el = document.createElement('div');
        
        el.classList.toggle('blackout');
        document.body.setAttribute('style', `padding-right: ${scrollbarWidth}`);
        el.setAttribute('onclick', 'onClickMenu()');
        document.body.prepend(el);
        
        document.body.classList.add('stop-scrolling');
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
            document.body.classList.remove('stop-scrolling');
            document.body.setAttribute('style', `padding-right: 0px`);
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


function slider() {
    let cardsContaner = document.querySelector('.cards');
    //let cards = document.querySelectorAll('.cards__card');
    
    //cardsContaner.removeChild(cards[0]);
    cardsContaner.innerHTML = '';
    fetch('./pets.json').then(res => res.json()).then(list => {
        pets = list;

        //console.log(pets);
        pets.forEach(pet => {
            //console.log(pet);
            let card = new Card(pet.id, pet.img, pet.name);
            //console.log(card.generateCard());
            cardsContaner.append(card.generateCard());

        });
        
        let cards = document.querySelectorAll('.cards__card');
        cards.forEach(element => {
            element.addEventListener('click', (e) => {
                console.log(e);
            })
        });
    });

}

slider();

let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
//console.log(scrollbarWidth);

class Modal {
    constructor(id, className, name, img, type, breed, description, age, inoculations, diseases, parasites) {
        this.id = id;
        this.className = className;
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    generateModal() {
        let template = '';
        let article = document.createElement('article');
        article.className = this.className;
        article.setAttribute('data-id', this.id);
        template += 
        `
        <button class="btn__arrow btn__arrow-modal">
            <img src="/assets/icons/cross-on-button.svg" alt="close">
        </button>
        <div class="modal__window">
            <img class="modal__img" src="${this.img}" alt="${this.name}">
            <div class="modal__content">
                <h3>${this.name}</h3>
                <h4>${this.type} ${this.breed}</h4>
                <h5>${this.description}</h5>
                <ul>
                    <li><strong>Age:</strong> <span>${this.age}</span></li>
                    <li><strong>Inoculations:</strong> <span>${this.inoculations}</span></li>
                    <li><strong>Diseases:</strong> <span>${this.diseases}</span></li>
                    <li><strong>Parasites:</strong> <span>${this.parasites}</span></li>
                </ul>
            </div>
        </div>
        `;
    }
}

class Card {
    constructor(id, img, name, className = 'cards__card cards__card--pets') {
        this.id = id;
        this.img = img; 
        this.name = name;
        this.className = className;
    }

    generateCard() {
        let template = '';
        let card = document.createElement('div');
        card.className = this.className;
        card.setAttribute('data-id', this.id);
        template += 
        `
        <div class="card__img">
            <img src="${this.img}" alt="${this.name}">
        </div>
        <p>${this.name}</p>
        <button class="button__secondary">Learn more</button>
        `;

        card.innerHTML = template;
        return card;
    }
}






