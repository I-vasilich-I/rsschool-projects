// DOM Elements
const name = document.querySelector('.name');
const time = document.querySelector('.time');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

// Months&Days
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
        setBackground();
    }
}

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}

function setBackground() {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 6) {
        let path = './assets/images/night';
        document.body.style.backgroundImage = `url(${path}/${addZero(getRandomInt(20)+1)}.jpg)`;
        greeting.textContent = 'Good Night, ';
    } else if (hour < 12) {
        let path = './assets/images/morning';
        document.body.style.backgroundImage = `url(${path}/${addZero(getRandomInt(20)+1)}.jpg)`;
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        let path = './assets/images/day';
        document.body.style.backgroundImage = `url(${path}/${addZero(getRandomInt(20)+1)}.jpg)`;
        document.body.style.color = 'black';
        greeting.textContent = 'Good Afternoon, ';
    } else {
        let path = './assets/images/evening';
        document.body.style.backgroundImage = `url(${path}/${addZero(getRandomInt(20)+1)}.jpg)`;
        document.body.style.color = 'white';
        greeting.textContent = 'Good Evening, ';
    }
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

showTime();
setBackground();