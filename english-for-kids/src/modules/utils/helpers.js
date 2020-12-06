/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import cardsArr from '../../cards';

const { body } = document;
const burger = document.getElementById('burger');
burger.line = document.querySelector('.burger__line');
const menuList = document.querySelector('.menu__list');
const switchCheckbox = document.getElementById('switch-checkbox');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const logo = document.querySelector('.header__logo');
const categoryTitleDiv = create('div', 'container__header', null, main);
const categoryTitle = create('div', 'category__title', null, categoryTitleDiv);
categoryTitle.innerText = setCategoryTitle();
const scoreDiv = create('div', 'main__score', null, categoryTitleDiv);
const audio = new Audio();
const localStorage = {
  set: (name, value) => {
    window.localStorage.setItem(name, JSON.stringify(value));
  },
  get: (name, absent = null) => {
    return JSON.parse(window.localStorage.getItem(name)) || absent;
  },
  del: (name) => {
    window.localStorage.removeItem(name);
  },
};
const cards = getCardsArray();

export {
  body,
  burger,
  menuList,
  switchCheckbox,
  main,
  footer,
  categoryTitle,
  logo,
  scoreDiv,
  cards,
  localStorage,
};

// eslint-disable-next-line import/no-mutable-exports
export let wordToPlayIndex;

export function create(el, classNames, child, parent, ...dataAttr) {
  let elem = null;
  try {
    elem = document.createElement(el);
  } catch (e) {
    throw new Error('Unable to create HTMLElemnt! Wrong data');
  }

  if (classNames) elem.classList.add(...classNames.split(' '));

  if (child && Array.isArray(child)) {
    child.forEach((childElem) => childElem && elem.appendChild(childElem));
  } else if (child && typeof child === 'object') {
    elem.appendChild(child);
  } else if (child && typeof child === 'string') {
    elem.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(elem);
  }

  if (dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        elem.setAttribute(attrName, '');
      }
      if (
        attrName.match(
          /value|id|placeholder|rows|autocorretc|spellcheck|src|alt|type|draggable|href/
        )
      ) {
        elem.setAttribute(attrName, attrValue);
      } else {
        elem.dataset[attrName] = attrValue;
      }
    });
  }
  return elem;
}

export function setCategoryTitle(category = -1) {
  if (category < 0) {
    return '';
  }
  return cards[0][category];
}

function gameOver(win, container, playButton) {
  if (win) {
    main.innerHTML = '';
    main.classList.add('main-over');
    setTimeout(() => {
      playAudio('assets/audio/success.mp3');
    }, 1000);
    create('img', 'img', null, main, ['src', 'assets/images/success.jpg'], ['alt', 'win']);
  } else {
    container.innerHTML = '';
    main.removeChild(playButton);
    setTimeout(() => {
      playAudio('assets/audio/failure.mp3');
    }, 1000);
    create('img', 'img', null, container, ['src', 'assets/images/failure.jpg'], ['alt', 'win']);
  }
  localStorage.set('cards', cards);
}

export function addStar(rightWord) {
  if (rightWord) {
    create(
      'img',
      null,
      null,
      scoreDiv,
      ['src', 'assets/images/svg/check-mark.svg'],
      ['alt', 'check mark']
    );
  } else {
    create('img', null, null, scoreDiv, ['src', 'assets/images/svg/x-mark.svg'], ['alt', 'x-mark']);
  }
}

export function generateMenuList() {
  const mainPage = {
    // domElement: create('a', 'menu__item', null, menuList, ['href', '#/']),
    domElement: create('li', 'menu__item menu__item-active', null, menuList),

    main: true,
  };
  mainPage.domElement.innerText = 'Main Page';
  mainPage.domElement.img = create(
    'img',
    null,
    null,
    mainPage.domElement,
    ['src', '/dist/assets/images/svg/star.svg'],
    ['alt', 'Main Page']
  );
  const menuListArray = [mainPage];
  for (let i = 0; i < cards[0].length; i++) {
    const category = {
      // domElement: create('a', 'menu__item', null, menuList, ['href', '#/category']),
      domElement: create('li', 'menu__item', null, menuList),
      main: false,
      categoryNumber: i,
    };
    category.domElement.innerText = cards[0][i];
    category.domElement.img = create(
      'img',
      null,
      null,
      category.domElement,
      ['src', cards[i + 1][1].image],
      ['alt', cards[0][i]]
    );
    menuListArray.push(category);
  }
  return menuListArray;
}

export function playAudio(src) {
  audio.src = src;
  audio.load();
  audio.play();
}

export function getRandomIntArray(number) {
  return [...Array(number).keys()].sort(() => Math.random() - 0.5);
}

export function nextWord(container, randomIntArray, playButton) {
  wordToPlayIndex = randomIntArray.pop();
  if (wordToPlayIndex || wordToPlayIndex === 0) {
    setTimeout(() => {
      playAudio(container.cardElements[wordToPlayIndex].cardFront.audioSrc);
    }, 1000);
  } else if (!container.errors) {
    gameOver(true);
    setTimeout(() => {
      initApp(container, playButton);
    }, 3500);
  } else {
    gameOver(false, container.cardsContainer, playButton);
    setTimeout(() => {
      initApp(container, playButton);
    }, 3500);
  }
}

export function toggleScorePanel() {
  scoreDiv.innerHTML = '';
  /*
  if (on === -1) {
    scoreDiv.classList.toggle('main__score-play');
  } else if (on) {
    scoreDiv.classList.add('main__score-play');
  } else {
    scoreDiv.classList.remove('main__score-play');
  }
  */
}

function initApp(container, playButton) {
  main.innerHTML = '';
  main.classList.remove('main-over');
  container.cardsContainer.innerHTML = '';
  container.cardCategories.forEach((elem) => {
    container.cardsContainer.appendChild(elem.card);
  });
  container.mainPage = true;
  categoryTitle.innerText = '';
  main.appendChild(categoryTitleDiv);
  scoreDiv.classList.remove('main__score-play');
  main.appendChild(container.cardsContainer);
  main.appendChild(playButton);
  playButton.clicked = false;
  playButton.innerHTML = '';
  playButton.classList.toggle('play__button-play');
  playButton.img = create(
    'img',
    null,
    null,
    playButton,
    ['src', 'assets/images/svg/play.svg'],
    ['alt', 'play']
  );
  container.errors = 0;
  scoreDiv.innerHTML = '';
}

function getCardsArray() {
  const data = localStorage.get('cards');
  if (data === null) {
    return cardsArr;
  }
  return data;
}
