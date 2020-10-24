window.onload = function() {
    //remove mobile menu and affects when screen is more than 767px
    resetClass();
    
    slider();
    
}

let pets = [];
let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
//console.log(scrollbarWidth);

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

    const request = new XMLHttpRequest();
    request.open('GET', './pets.json');
   // request.onload = () => {console.log(request.response)};
     request.onload = () => {
     pets = JSON.parse(request.response);
    console.log(pets);
     }
    fetch('./pets.json').then(res => res.json()).then(list => {
        pets = list;
        //console.log(pets);
        pets.forEach(pet => {
            //console.log(pet);
            let card = new Card(pet);
            //console.log(card.generateCard());
            cardsContaner.append(card.generateCard());
        });

        cardClickHandler();
        
    })

}

function cardClickHandler() {
    document.querySelector('.cards').addEventListener('click', (e) => {
        if (e.target.closest('.cards__card')) {
            let clickedCard = e.target.closest('.cards__card').getAttribute('data-id');
            let pet = pets[clickedCard];
            let modal = new Modal(pet);
            document.body.append(modal.generateModal());
            
            let el = document.createElement('div');
            el.classList.toggle('blackout');
            document.body.setAttribute('style', `padding-right: ${scrollbarWidth}`);
            document.body.prepend(el);
            document.body.classList.add('stop-scrolling');
        }
    });
}

function modalClickHandler() {
    let modal = document.querySelector('.modal');
    console.log(modal);
    let blackout = document.querySelector('.blackout');
    modal.addEventListener('click', (e) => {
        if (e.target.closest('.btn__arrow-modal')) {
            document.body.removeChild(modal);
           // resetClass();
        }
    })
}



class Modal {
    constructor(pet, className='modal') {
        this.id = pet.id;
        this.className = className;
        this.name = pet.name;
        this.img = pet.img;
        this.type = pet.type;
        this.breed = pet.breed;
        this.description = pet.description;
        this.age = pet.age;
        this.inoculations = pet.inoculations;
        this.diseases = pet.diseases;
        this.parasites = pet.parasites;
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

        article.innerHTML = template;
        return article;
    }
}

class Card {
    constructor(pet, className = 'cards__card') {
        this.id = pet.id;
        this.img = pet.img; 
        this.name = pet.name;
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






