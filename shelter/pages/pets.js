window.onload = function() {
    //remove mobile menu and affects when screen is more than 767px
    resetClass();
    
    slider();

    cardClickHandler();
    
}

let pets = [
    {
      "id": 0,
      "name": "Jennifer",
      "img": "/assets/images/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 1,
      "name": "Sophia",
      "img": "/assets/images/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 2,
      "name": "Woody",
      "img": "/assets/images/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "id": 3,
      "name": "Scarlett",
      "img": "/assets/images/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 4,
      "name": "Katrine",
      "img": "/assets/images/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 5,
      "name": "Timmy",
      "img": "/assets/images/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "id": 6,
      "name": "Freddie",
      "img": "/assets/images/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 7,
      "name": "Charly",
      "img": "/assets/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
];

let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';

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
    cardsContaner.innerHTML = '';
    pets.forEach(pet => {
        let card = new Card(pet);
        cardsContaner.append(card.generateCard());
    });

    

}

function cardClickHandler() {
    document.querySelector('.cards').addEventListener('click', (e) => {
        if (e.target.closest('.cards__card')) {
            let clickedCard = e.target.closest('.cards__card').getAttribute('data-id');
            let pet = pets[clickedCard];
            let modal;
            if (document.querySelector("body").offsetWidth >= 1280) {
                modal = new Modal(pet);
            } else if (document.querySelector("body").offsetWidth >= 768 
                    && document.querySelector("body").offsetWidth < 1280) {
               modal = new Modal(pet, 'modal modal-768', false, true);
            } else if (document.querySelector("body").offsetWidth < 768) {
               modal = new Modal(pet, 'modal modal-320',true, false);
            }
            document.body.append(modal.generateModal());
            
            let el = document.createElement('div');
            el.classList.toggle('blackout');
            document.body.setAttribute('style', `padding-right: ${scrollbarWidth}`);
            document.body.prepend(el);
            document.body.classList.add('stop-scrolling');

            let headerPets = document.querySelector('.header--pets');
            if (headerPets != null) {
                headerPets.setAttribute('style', 'display: none');
            }
            modalClickHandler();
        }
    });
}

function modalClickHandler() {
    let modal = document.querySelector('.modal');
    let blackout = document.querySelector('.blackout');
    modal.addEventListener('click', (e) => {
        if (e.target.closest('.btn__arrow-modal')) {
            document.body.removeChild(modal);
            document.body.removeChild(blackout);
            document.body.classList.remove('stop-scrolling');
            document.body.setAttribute('style', `padding-right: 0px`);

            let headerPets = document.querySelector('.header--pets');
            if (headerPets != null) {
                headerPets.setAttribute('style', 'display: unset');
            }
        }
    });
    blackout.addEventListener('click', (e) => {
        document.body.removeChild(modal);
        document.body.removeChild(blackout);
        document.body.classList.remove('stop-scrolling');
        document.body.setAttribute('style', `padding-right: 0px`);
        let headerPets = document.querySelector('.header--pets');
        if (headerPets != null) {
            headerPets.setAttribute('style', 'display: unset');
        }
    })

    
}

class Modal {
    constructor(pet, className='modal', modal320 = false, modal768 = false) {
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
        this.modal320 = modal320;
        this.modal768 = modal768;
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
        <div class="modal__window${this.modal320 === true ? ' modal__window-320' : ''}
                                ${this.modal768 === true ? ' modal__window-768' : ''}">
            <img class="modal__img${this.modal320 === true ? ' modal__img-320' : ''}
                                 ${this.modal768 === true ? ' modal__img-768' : ''}" src="${this.img}" alt="${this.name}">
            <div class="modal__content${this.modal320 === true ? ' modal__content-320' : ''}
                                        ${this.modal768 === true ? ' modal__content-768' : ''}">
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
    constructor(pet, className = 'cards__card cards__card--pets') {
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






