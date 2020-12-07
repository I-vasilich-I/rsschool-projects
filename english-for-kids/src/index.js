/* eslint-disable no-param-reassign */
import CardsContainer from './modules/CardsContainer';
import * as helpers from './modules/utils/helpers';

let randomIntArray;
const menuListArray = helpers.generateMenuList();
const container = new CardsContainer();
container.init();
helpers.main.appendChild(container.cardsContainer);
const playButton = helpers.create('button', 'play__button', null, helpers.main);
playButton.clicked = false;
playButton.img = helpers.create(
  'img',
  null,
  null,
  playButton,
  ['src', 'assets/images/svg/play.svg'],
  ['alt', 'play']
);
function togglePlayButton() {
  if (!container.mainPage && !helpers.switchCheckbox.checked) {
    playButton.classList.add('play__button-start');
    playButton.img.src = 'assets/images/svg/play.svg';
    playButton.clicked = false;
  } else {
    playButton.classList.remove('play__button-play');
    playButton.classList.remove('play__button-start');
  }
}

function eventHandler(elem, repeat = false) {
  elem.cardFront.button.onclick = () => {
    elem.cardDiv.classList.add('flipped');
  };

  elem.cardDiv.onclick = (e) => {
    if (
      e.target === elem.cardFront.button ||
      e.target === elem.cardFront.buttonImg ||
      elem.cardDiv.classList.contains('flipped')
    )
      return;
    if (elem.disabled) return;
    let indexOfElem = container.cardElements.indexOf(elem);
    const statisticElement = helpers.cards[elem.cardFront.categoryNumber + 1];
    if (repeat) {
      indexOfElem = statisticElement.findIndex((el) => el.word === elem.cardFront.front);
    }
    if (helpers.switchCheckbox.checked) {
      helpers.playAudio(elem.cardFront.audioSrc);
      statisticElement[indexOfElem].inTrainClicked =
        (statisticElement[indexOfElem].inTrainClicked || 0) + 1;
    } else {
      if (!playButton.clicked) return;
      indexOfElem = container.cardElements.indexOf(elem);
      if (indexOfElem === helpers.wordToPlayIndex) {
        if (repeat) {
          indexOfElem = statisticElement.findIndex((el) => el.word === elem.cardFront.front);
        }
        statisticElement[indexOfElem].correct = (statisticElement[indexOfElem].correct || 0) + 1;
        statisticElement[indexOfElem].incorrect = statisticElement[indexOfElem].incorrect || 0;
        elem.cardFront.card.classList.add('disabled');
        elem.disabled = true;
        helpers.playAudio('./assets/audio/correct2.mp3');
        helpers.addStar(true);
        helpers.nextWord(container, randomIntArray, playButton);
      } else {
        statisticElement[helpers.wordToPlayIndex].incorrect =
          (statisticElement[helpers.wordToPlayIndex].incorrect || 0) + 1;
        statisticElement[helpers.wordToPlayIndex].correct =
          statisticElement[helpers.wordToPlayIndex].correct || 0;
        helpers.addStar(false);
        helpers.playAudio('./assets/audio/error2.mp3');
        container.errors = container.errors + 1 || 1;
      }
    }
    helpers.localStorage.set('word-cards', helpers.cards);
  };

  elem.cardDiv.onmouseleave = () => {
    elem.cardDiv.classList.remove('flipped');
  };
}

function generateWordCards(categoryNumber) {
  container.mainPage = false;
  helpers.categoryTitle.innerText = helpers.setCategoryTitle(categoryNumber);
  togglePlayButton();
  if (!helpers.switchCheckbox.checked) {
    helpers.toggleScorePanel(-1);
  }
  container.cardsContainer.innerHTML = '';
  container.init(categoryNumber);
  container.cardElements.forEach((elem) => {
    elem.cardDiv.onmouseenter = eventHandler(elem);
  });
}

function toggleMenu() {
  let blackout = document.querySelector('.blackout');
  if (blackout) {
    helpers.body.removeChild(blackout);
    helpers.body.classList.toggle('stop-scrolling');
  } else {
    blackout = helpers.create('div', 'blackout');
    helpers.body.prepend(blackout);
    helpers.body.classList.toggle('stop-scrolling');
    blackout.addEventListener('click', () => {
      toggleMenu();
    });
  }
  if (helpers.switchCheckbox.checked) {
    helpers.menuList.classList.remove('menu__list-play');
  } else {
    helpers.burger.classList.toggle('burger-play');
    helpers.burger.line.classList.toggle('burger__line-play');
    helpers.menuList.classList.add('menu__list-play');
  }
  helpers.burger.classList.toggle('burger-menu');
  helpers.burger.line.classList.toggle('burger__line-menu');
  helpers.menuList.classList.toggle('menu__list-menu');
}

container.cardCategories.forEach((elem) => {
  elem.card.addEventListener('click', () => {
    menuListArray[0].domElement.classList.remove('menu__item-active');
    menuListArray[elem.categoryNumber + 1].domElement.classList.add('menu__item-active');
    generateWordCards(elem.categoryNumber);
  });
});

// Switch mode
helpers.switchCheckbox.addEventListener('click', () => {
  helpers.menuList.classList.toggle('menu__list-play');
  helpers.body.classList.toggle('body-play');
  helpers.footer.classList.toggle('footer-play');
  helpers.burger.classList.toggle('burger-play');
  helpers.burger.line.classList.toggle('burger__line-play');
  togglePlayButton();
  if (!container.mainPage) {
    helpers.toggleScorePanel(-1);
  }
  container.cardElements.forEach((elem) => {
    elem.cardFront.card.classList.toggle('word__card-play');
    elem.disabled = false;
    elem.cardFront.card.classList.remove('disabled');
  });
  container.cardCategories.forEach((elem) => {
    elem.card.classList.toggle('category__card-play');
  });
});

// Logo
helpers.logo.addEventListener('click', () => {
  helpers.initApp(container, playButton);
  /*
  container.mainPage = true;
  togglePlayButton();
  helpers.categoryTitle.innerText = '';
  container.cardsContainer.innerHTML = '';
  container.cardCategories.forEach((elem) => {
    container.cardsContainer.appendChild(elem.card);
  });
  helpers.scoreDiv.innerHTML = '';
  */
});

// Menu
helpers.burger.addEventListener('click', toggleMenu);

// Activate links
menuListArray.forEach((elem) => {
  elem.domElement.addEventListener('click', () => {
    menuListArray.forEach((el) => {
      el.domElement.classList.remove('menu__item-active');
    });
    elem.domElement.classList.add('menu__item-active');
    if (!elem.main && !elem.statPage) {
      helpers.initApp(container, playButton);
      generateWordCards(elem.categoryNumber);
    } else if (elem.main) {
      helpers.initApp(container, playButton);
      helpers.toggleScorePanel(false);
      container.mainPage = true;
      togglePlayButton();
      helpers.categoryTitle.innerText = '';
      container.cardsContainer.innerHTML = '';
      container.cardCategories.forEach((element) => {
        container.cardsContainer.appendChild(element.card);
      });
    } else if (elem.statPage) {
      helpers.toggleScorePanel(false);
      container.mainPage = false;
      togglePlayButton();
      helpers.main.innerHTML = '';
      helpers.createStatisticPage();
      helpers.statRepeat.addEventListener('click', () => {
        helpers.main.innerHTML = '';
        const arrWordsToRepeat = helpers.generaterWordsToRepeat(
          helpers.sortStatTable('errors', -1)
        );
        helpers.initApp(container, playButton);
        container.cardsContainer.innerHTML = '';
        container.generateWordsToRepeat(arrWordsToRepeat);
        container.cardElements.forEach((el) => {
          el.cardDiv.onmouseenter = eventHandler(el, true);
        });
      });
    }
    toggleMenu();
    if (!helpers.switchCheckbox.checked && !elem.main) {
      helpers.toggleScorePanel(true);
    }
  });
});

// Play button
playButton.addEventListener('click', () => {
  if (!playButton.clicked) {
    playButton.img.src = 'assets/images/svg/replay.svg';
    playButton.clicked = true;
    playButton.classList.remove('play__button-start');
    playButton.classList.add('play__button-play');
    randomIntArray = helpers.getRandomIntArray(container.cardElements.length);
    helpers.nextWord(container, randomIntArray, playButton);
  } else if (helpers.wordToPlayIndex || helpers.wordToPlayIndex === 0) {
    setTimeout(() => {
      helpers.playAudio(container.cardElements[helpers.wordToPlayIndex].cardFront.audioSrc);
    }, 1000);
  }
});
