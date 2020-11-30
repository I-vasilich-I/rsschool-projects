const audio = new Audio();
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

export function playAudio(src) {
  audio.src = src;
  audio.load();
  audio.play();
}

export function getRandomIntArray(number) {
  return [...Array(number).keys()].sort(() => Math.random() - 0.5);
}

export function nextWord(container, randomIntArray) {
  wordToPlayIndex = randomIntArray.pop();
  if (wordToPlayIndex || wordToPlayIndex === 0) {
    playAudio(container.cardElements[wordToPlayIndex].cardFront.audioSrc);
  } else {
    
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