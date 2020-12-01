import cards from '../../cards';




const audio = new Audio();
const statisticArray = deepCopyFunction(cards.slice(1));
export let wordToPlayIndex;

export function addStar(rightWord, parent) {
  if (rightWord) {
    create(
      'img', 
      null, 
      null, 
      parent, 
      ['src', 'assets/images/svg/check-mark.svg'], 
      ['alt', 'check mark']
    );
  } else {
    create(
      'img', 
      null, 
      null, 
      parent, 
      ['src', 'assets/images/svg/x-mark.svg'], 
      ['alt', 'x-mark']
    );
  }
}

export function generateMenuList(menuList) {
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

export function playAudio(src) {
  audio.src = src;
  audio.load();
  audio.play();
}

export function getRandomIntArray(number) {
  return [...Array(number).keys()].sort(() => Math.random() - 0.5);
}

export function nextWord(container, randomIntArray, main, playButton, scoreDiv) {
  wordToPlayIndex = randomIntArray.pop();
  if (wordToPlayIndex || wordToPlayIndex === 0) {
    setTimeout(() => {
      playAudio(container.cardElements[wordToPlayIndex].cardFront.audioSrc);
    }, 1000)
    
  } else {
    if (!container.errors) {
      gameOver(true, main);
      setTimeout(() => {
        initApp(container, main, playButton, scoreDiv);
      }, 5000);
    } else {
      gameOver(false, main, container.cardsContainer, playButton);
      setTimeout(() => {
        initApp(container, main, playButton, scoreDiv);
      }, 5000);
    }

  }
}

export function toggleScorePanel(scoreDiv, on) {
  scoreDiv.innerHTML = '';
  if (on === -1) {
    scoreDiv.classList.toggle('main__score-play');
  } else if (on) {
    scoreDiv.classList.add('main__score-play');
  } else {
    scoreDiv.classList.remove('main__score-play');
  }
}

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
    dataAttr.forEach(([ attrName, attrValue ]) => {
      if (attrValue === '') {
        elem.setAttribute(attrName, '');
      } 
      if (attrName.match(/value|id|placeholder|rows|autocorretc|spellcheck|src|alt|type|draggable|href/)) {
        elem.setAttribute(attrName, attrValue);
      } else {
        elem.dataset[attrName] = attrValue;
      }
    });
  }
  return elem;
}

export function headerTitle(category = -1) {
  const title = document.querySelector('.header__logo');
  if (category < 0) {
    return ''
  } else {
    return cards[0][category];
  }
  
}

function initApp(container, main, playButton, scoreDiv) {
  main.innerHTML = '';
  main.classList.remove('main-over');
  container.cardsContainer.innerHTML = '';
  container.cardCategories.forEach((elem) => {
    container.cardsContainer.appendChild(elem.card);
  })
  container.mainPage = true;
  main.appendChild(scoreDiv);
  scoreDiv.classList.remove('main__score-play');
  main.appendChild(container.cardsContainer);
  main.appendChild(playButton);
  playButton.clicked = false;
  playButton.innerHTML = '';
  playButton.classList.toggle('play__button-play');
  playButton.img = create('img', null, null, playButton, ['src', 'assets/images/svg/play.svg'], ['alt', 'play']);
  container.cardCategories.forEach((elem) => {
    elem.card.addEventListener('click', () => {
      generateWordCards(elem.categoryNumber)
    });
  })
}

function gameOver(win, main, container, playButton) {
  if (win) {
    main.innerHTML = '';
    main.classList.add('main-over');
    setTimeout(() => {
      playAudio('assets/audio/success.mp3');
    }, 1000);
    create(
      'img', 
      'img', 
      null, 
      main, 
      ['src', 'assets/images/success.jpg'], 
      ['alt', 'win']
    );
  } else {
    container.innerHTML = '';
    main.removeChild(playButton);
    setTimeout(() => {
      playAudio('assets/audio/failure.mp3');
    }, 1000);
    create(
      'img', 
      'img', 
      null, 
      container, 
      ['src', 'assets/images/failure.jpg'], 
      ['alt', 'win']
    );
  }
}

//https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
function deepCopyFunction(inObject) {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {  
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
} 