// DOM Elements
const name = document.getElementsByClassName('.name');
const time = document.getElementsByClassName('.time');
const focus = document.getElementsByClassName('.focus');
const date = document.getElementsByClassName('.date');
const greeting = document.getElementsByClassName('.greeting');

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
    date.innerHTML = `${weekDay}<span>,</span> ${month} ${monthDay}`;
    time.innerHTML = `${hour}<span>:</span>${minute}<span>:</span>${second}`;

    setTimeout(showTime, 1000);
}



showTime();
