let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
let itemsPerPage = 3;

const rightbtn = document.querySelector('#right');
const leftbtn = document.querySelector('#left');
let cards;
let currentCard = 0;
let isEnabled = true;
let fullPetsList = [];
let clicked;

window.onload = function() {
    //remove mobile menu and affects when screen is more than 767px
    resetClass();
}

fetch('./pets.json').then(res => res.json()).then(list => {
    pets = list;
  
    fullPetsList = (() => {
      let tempArr = [];
  
      for (let i = 0; i < 6; i++) {
        const newPets = pets;
  
        for (let j = pets.length; j > 0; j--) {
          let randInd = Math.floor(Math.random() * j);
          const randElem = newPets.splice(randInd, 1)[0];
          newPets.push(randElem);
        }
  
        tempArr = [...tempArr, ...newPets];
      }
      return tempArr;
    })();
  
    fullPetsList = sort863(fullPetsList);
  
    slider();
    cards = document.querySelectorAll('.cards');
    clicked = document.querySelector('.cards.active');
});

const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
      const uniqueStepList = [];
      for (j = 0; j < list.length; j++) {
        if (uniqueStepList.length >= 8) {
          break;
        }
        const isUnique = !uniqueStepList.some((item) => {
          return item.name === list[j].name;
        });
        if (isUnique) {
          uniqueStepList.push(list[j]);
          list.splice(j, 1);
          j--;
        }
      }
      unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;
  
  
    list = sort6recursively(list);
  
    return list;
  }

  const sort6recursively = (list) => {
    const length = list.length;
  
    for (let i = 0; i < (length / 6); i++) {
      const stepList = list.slice(i * 6, (i * 6) + 6);
  
      for (let j = 0; j < 6; j++) {
        const duplicatedItem = stepList.find((item, ind) => {
          return item.name === stepList[j].name && (ind !== j);
        });
  
        if (duplicatedItem !== undefined) {
          const ind = (i * 6) + j;
          const which8OfList = Math.trunc(ind / 8);
  
          list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);
  
          sort6recursively(list);
        }
      }
    }
  
    return list;
  }

function onClickMenu() {
    let blackout = document.querySelector('.blackout');
    scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
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

    document.querySelector('.mobile__menu').classList.toggle('mobile__menu-toggled');
    document.querySelector('.header__logo').classList.toggle('header__logo-toggled');
}

function resetClass() {
    window.addEventListener("resize", () => {
        slider();
        cards = document.querySelectorAll('.cards');
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

function changeCurrentCard(n) {
    currentCard = (n + cards.length) % cards.length;
}

function hideCard(direction) {
    isEnabled = false;
    cards[currentCard].classList.add(direction);
    cards[currentCard].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showCard(direction) {
    cards[currentCard].classList.add('next', direction);
    cards[currentCard].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        cardClickHandler();
        isEnabled = true;
    });
}

function nextCard(n) {
    hideCard('to-left');
    changeCurrentCard(n + 1);
    showCard('from-right');
}

function previousCard(n) {
    hideCard('to-right');
    changeCurrentCard(n - 1);
    showCard('from-left');
}


rightbtn.addEventListener('click', function() {
    if (isEnabled) {
        nextCard(currentCard);
    }
});

leftbtn.addEventListener('click', function() {
    if (isEnabled) {
        previousCard(currentCard);
    }
    
})




function slider() {
    setItemsPerPage();
    currentCard = 0;
    let petsPerPage = itemsPerPage;
    let cardsContaner = document.querySelector('.cards__container');
    cardsContaner.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        let cards = document.createElement('div');
        
        if (i == 0) {
            cards.className = 'cards active';
        } else {
            cards.className = 'cards';
        }
        for (let j = 0; j < petsPerPage; j++) {
            let card = new Card(fullPetsList[i*petsPerPage+j]);
            cards.append(card.generateCard()); 
        }
        cardsContaner.append(cards);
    }

    cardClickHandler();
}

function setItemsPerPage() {
    if (document.body.offsetWidth < 1280 && document.body.offsetWidth >= 768) {
        itemsPerPage = 2;
    } else if (document.body.offsetWidth < 768) {
        itemsPerPage = 1;
    } else if (document.body.offsetWidth >= 1280) {
        itemsPerPage = 3;
    }
}



function cardClickHandler() {
    clicked = document.querySelector('.cards.active');
    clicked.addEventListener('click', (e) => {
        if (e.target.closest('.cards__card')) {
            let clickedCard = e.target.closest('.cards__card').getAttribute('data-id');
            let pet;
            let modal;
            pets.forEach(elem => {
                if (elem.id == clickedCard) {
                    pet = elem;
                }
            });
            
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
            scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
            document.body.setAttribute('style', `padding-right: ${scrollbarWidth}`);
            document.body.prepend(el);
            document.body.classList.add('stop-scrolling');
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
        }
    });
    blackout.addEventListener('click', (e) => {
        document.body.removeChild(modal);
        document.body.removeChild(blackout);
        document.body.classList.remove('stop-scrolling');
        document.body.setAttribute('style', `padding-right: 0px`);
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
            <img src="../assets/icons/cross-on-button.svg" alt="close">
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






