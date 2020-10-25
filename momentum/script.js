// DOM Elements
const name = document.querySelector('.name');
const time = document.querySelector('.time');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
//const timeOfDay = document.querySelector('.time-of-day');
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const button = document.querySelector('#bckgr');
const quote = document.querySelector('.quote');
const quotebtn = document.querySelector('#qbtn');

let day = new Date();
let h = day.getHours()+1;

const images = [];

// Months&Days
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'];
async function generateImgMassive() {
    for (let i=0; i<24; i++) {
        let path;
        let src;
        if(i < 6) {
            path = './assets/images/night/'; 
        } else if (i < 12) {
            path = './assets/images/morning/';
        } else if (i < 18) {
            path = './assets/images/day/';
        } else {
            path = './assets/images/evening/';
        }
        src = checkSrc(path);
    }
}

function checkSrc(path) {
    let src = getImg(path);
    if(hasSrc(src)) {
        checkSrc(path);
    } else {
        images.push(src);
        return;
    }
}

function hasSrc(src) {
    for (let i=0; i<images.length; i++) {
        if (images[i] === src) {
            return true;
        }
    }
    return false;
}

// Show Time
function showTime() {
    let today = new Date();
    let weekDay = weekDays[today.getDay()];
    let monthDay = today.getDate();
    let month = months[today.getMonth()];
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();

    // Output Time
    date.innerHTML = `${weekDay}<span>, </span>${month} ${monthDay}`;
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(minute)}<span>:</span>${addZero(second)}`;
    
    setTimeout(showTime, 1000);

    if (minute == 0 && second == 0) {
        setBackgroundAndGreeting();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}

async function setBackgroundAndGreeting() {
    await generateImgMassive();
    let today = new Date();
    let hour = today.getHours();
    await setImgAndGreeting(hour);
}

async function setBackgroundAndOnClick() {
    await setImgAndGreeting(h, false);
    if (h == 23) {
        h = 0;
    } else {
        h++;
    }
    button.disabled = true;
    setTimeout(function() { button.disabled = false }, 1000);
}

function resalt(img){
   // let src = fetch(img);
    const body = document.querySelector('body');
    const image = document.createElement('img');
    image.src = img;
    image.onload = () => {    
    body.style.backgroundImage = `url(${img})`;
    
  }; 
    //document.body.style.backgroundImage = `url(${src.url})`;
    console.log(img);
};

function getImg(path) {
    let random = getRandomInt(19)+1;
    return `${path}${addZero(random)}.jpg`;
}

async function setImgAndGreeting(hour, greet = true) {
    if (hour < 6) {
        //timeOfDay.innerHTML = 'Night';
        document.body.style.color = 'white';
        document.body.classList.add('text-shadow');
        if (greet === true) {
            greeting.textContent = 'Good Night, ';
        }
    } else if (hour < 12) {
       // timeOfDay.innerHTML = 'Morning';
        document.body.style.color = 'black';
        document.body.classList.remove('text-shadow');
        if (greet === true) {
            greeting.textContent = 'Good Morning, ';
        }
    } else if (hour < 18) {
        //timeOfDay.innerHTML = 'Afternoon';
        document.body.style.color = 'black';
        document.body.classList.remove('text-shadow');
        if (greet === true) {
            greeting.textContent = 'Good Afternoon, ';
        }      
    } else {
        //timeOfDay.innerHTML = 'Evening';
        document.body.style.color = 'white';
        document.body.classList.add('text-shadow');
        if (greet === true) {
            greeting.textContent = 'Good Evening, ';
        }
    }
    resalt(images[hour]); 
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText.trim()=='') {
                getName();
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    } else {
        if (e.target.innerText.trim()=='') {
            getName();
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText.trim()=='') {
                getFocus();
            } else {
            localStorage.setItem('focus', e.target.innerText);
            }
            focus.blur();
        }
    } else {
        if (e.target.innerText.trim()=='') {
            getFocus();
        } else {
            localStorage.setItem('focus', e.target.innerText);
        } 
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText.trim()=='') {
                getCity();
            } else {
                localStorage.setItem('city', e.target.innerText);
                getWeather();
            }
            city.blur();
        }
    } else {
        if (e.target.innerText.trim()=='') {
            getCity();
        } else {
            localStorage.setItem('city', e.target.innerText);
            getWeather();
        }
    }
}

function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter city]';
    } else {
        city.textContent = localStorage.getItem('city');
        getWeather();
    }
}

async function getWeather() {
    if (city.textContent.trim()=='' || city.textContent === '[Enter city]' || localStorage.getItem('city') === null) return;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&appid=992291178e115bbb3c6d8042a432bf78&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherIcon.textContent = ' ' + data.weather[0].description;
        temp.textContent = `Temperature: ${data.main.temp.toFixed(0)} °C`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    } catch (e) {
        console.error(e);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.textContent = '';
        temp.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
        city.textContent = '[Wrong city name. Please enter existing city]';
        localStorage.removeItem('city');
        //alert('Wrong city name!');
    }
}

async function getQuote() {
    try {
        const url = 'https://api.adviceslip.com/advice';
        const res = await fetch(url);
        const data = await res.json();
        quote.textContent = `Quote of the day: ${data.slip.advice}`;
        console.log(data.slip.advice)
    } catch(e) {
        console.error(e);
    }
}

async function changeQute() {
    await getQuote();
    quotebtn.disabled = true;
    setTimeout(() => {
        quotebtn.disabled = false;
    }, 1000);
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', () => {
    name.textContent = '';
});
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', () => {
    focus.textContent = '';
})
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', () => {
    city.textContent = '';
})
button.addEventListener('click', setBackgroundAndOnClick);
quotebtn.addEventListener('click', changeQute);
//Run
showTime();
setBackgroundAndGreeting();
getName();
getFocus();
getCity();
getQuote();