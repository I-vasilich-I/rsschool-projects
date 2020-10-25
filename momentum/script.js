// DOM Elements
const name = document.querySelector('.name');
const time = document.querySelector('.time');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const timeOfDay = document.querySelector('.time-of-day');
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

let day = new Date();
let h = day.getHours();

const images = [];

// Months&Days
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'];
async function generateImgMassive() {
    for (let i=0; i<24; i++) {
        if(i < 6) {
            let path = './assets/images/night/';
            await getImg(path);
            images.push();
        }
    }
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

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}

function setBackgroundAndGreeting() {
    let today = new Date();
    let hour = today.getHours();
    setImgAndGreeting(hour);
}

async function setBackgroundAndGreetingOnClick() {
    //delay(2000)

    await setImgAndGreeting(h, false);
    if (h == 23) {
        h = 0;
    } else {
        h++;
    }
   
}

async function resalt(img){
    document.body.style.backgroundImage = `url(${img.url})`;
    //return `url(${img.url})`;
    //delay(2000)
};

async function getImg(path) {
    const img = await fetch(`${path}${addZero(getRandomInt(19)+1)}.jpg`);
    //console.log(img.url);
    await resalt(img);
}

const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
}

async function setImgAndGreeting(hour, greet = true) {
    if (hour < 6) {
        let path = './assets/images/night/';
       await getImg(path);
       // document.body.style.backgroundImage = `url(${path}${addZero(getRandomInt(19)+1)}.jpg)`;
        timeOfDay.innerHTML = 'Night';
        document.body.style.color = 'white';
        document.body.classList.add('text-shadow');
        if (greet === true) {
            greeting.textContent = 'Good Night, ';
        }
    } else if (hour < 12) {
        let path = './assets/images/morning/';
        await getImg(path)
        timeOfDay.innerHTML = 'Morning';
        document.body.style.color = 'black';
        document.body.classList.remove('text-shadow');
        //document.body.style.backgroundImage = `url(${path}${addZero(getRandomInt(19)+1)}.jpg)`;
        if (greet === true) {
            greeting.textContent = 'Good Morning, ';
        }
    } else if (hour < 18) {
        let path = './assets/images/day/';
        await getImg(path)
        //document.body.style.backgroundImage = `url(${path}${addZero(getRandomInt(19)+1)}.jpg)`;
        timeOfDay.innerHTML = 'Afternoon';
        document.body.style.color = 'black';
        document.body.classList.remove('text-shadow');
        if (greet === true) {
            
            greeting.textContent = 'Good Afternoon, ';
        }      
    } else {
        let path = './assets/images/evening/';
        await getImg(path)
        //document.body.style.backgroundImage = `url(${path}${addZero(getRandomInt(19)+1)}.jpg)`;
        timeOfDay.innerHTML = 'Evening';
        document.body.style.color = 'white';
        document.body.classList.add('text-shadow');
        //document.body.setAttribute('style', 'text-shadow: 1px 1px 2px black');
       // document.body.style.text-shadow = '1px 1px 2px black';
        if (greet === true) {
            
            greeting.textContent = 'Good Evening, ';
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

async function getWeather() {
    if (city.textContent.trim()=='' || city.textContent === '[Enter city]' || localStorage.getItem('city') === null) return;
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&appid=992291178e115bbb3c6d8042a432bf78&units=metric`;
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
        city.textContent = '[Enter city]';
        localStorage.removeItem('city');
        alert('Wrong city name!');
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

//Run
showTime();
setBackgroundAndGreeting();
getName();
getFocus();
getCity();