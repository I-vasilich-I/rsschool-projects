import CardsContainer from './modules/CardsContainer';
import create from './modules/utils/create';
import cards from './cards';

const body = document.body;
const burger = document.getElementById('burger');
const burgerLine = document.querySelector('.burger__line');
const menuList = document.querySelector('.menu__list');
const switchCheckbox = document.getElementById('switch-checkbox');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const audio = new Audio();

const container = new CardsContainer();
container.init();
main.appendChild(container.cardsContainer);

container.cardCategories.forEach((elem) => {
  elem.card.addEventListener('click', () => {
    generateWordCards(elem.categoryNumber)
  });
})

function generateWordCards(categoryNumber) {
  container.cardsContainer.innerHTML = '';
  container.init(categoryNumber);
  container.cardElements.forEach((elem) => {
    elem.cardDiv.onmouseenter = eventHandler(elem);
  });
}

function eventHandler(elem) {
  elem.cardFront.button.onclick = () => {
    elem.cardDiv.classList.add('flipped');
  }

  elem.cardDiv.onclick = (e) => {
    if (e.target===elem.cardFront.button || e.target === elem.cardFront.buttonImg || elem.cardDiv.classList.contains('flipped')) return
    audio.src = elem.cardFront.audioSrc;
    audio.load();
    if (switchCheckbox.checked === true) {
      audio.play();
    } else {

    }
  }

  elem.cardDiv.onmouseleave = () => {
    elem.cardDiv.classList.remove('flipped');
  }
}

// Switch mode

switchCheckbox.addEventListener('click', () => {
  if (switchCheckbox.checked === true) {
    
  } else {
    
  }
  body.classList.toggle('body-play');
  footer.classList.toggle('footer-play');
  burger.classList.toggle('burger-play');
  burgerLine.classList.toggle('burger__line-play');
  container.cardElements.forEach((elem) => {
    elem.cardFront.card.classList.toggle('word__card-play');
  });
  container.cardCategories.forEach((elem) => {
    elem.card.classList.toggle('category__card-play');
  });
})

// Menu
burger.addEventListener('click', toggleMenu);

function generateMenuList() {
  const mainPage = {
    domElement: create('a', 'menu__item', null, menuList, ['href', '#/']),
    main: true,
  }
  mainPage.domElement.innerText = 'Main Page';
  let menuListArray = [mainPage];
  for(let i = 0; i < cards[0].length; i++) {
    const category = {
      domElement: create('a', 'menu__item', null, menuList, ['href', '#/category']),
      main: false,
      categoryNumber: i,
    };
    category.domElement.innerText = cards[0][i];
    menuListArray.push(category);
  }
  return menuListArray;
}

// Activate links
let menuListArray = generateMenuList();
menuListArray.forEach((elem) => {
  elem.domElement.addEventListener('click', () => {
    if(!elem.main) {
      generateWordCards(elem.categoryNumber);
    } else {
      container.cardsContainer.innerHTML = '';
      container.cardCategories.forEach((elem) => {
        container.cardsContainer.appendChild(elem.card);
      })
    }
    toggleMenu()
  })
});

function toggleMenu() {
  let blackout = document.querySelector('.blackout');
  if (blackout) {
    body.removeChild(blackout);
    body.classList.toggle('stop-scrolling');
  } else {
    blackout = create('div', 'blackout');
    body.prepend(blackout);
    body.classList.toggle('stop-scrolling');
    blackout.addEventListener('click', () => {
      toggleMenu();
    })
  }
  if (switchCheckbox.checked) {
    menuList.classList.remove('menu__list-play');
  } else {
    burger.classList.toggle('burger-play');
    burgerLine.classList.toggle('burger__line-play');
    menuList.classList.add('menu__list-play');
  }
  burger.classList.toggle('burger-menu');
  burgerLine.classList.toggle('burger__line-menu');
  menuList.classList.toggle('menu__list-menu');
 
}