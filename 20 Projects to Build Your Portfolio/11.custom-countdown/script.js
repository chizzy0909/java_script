// page 1
const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

// page 2
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// page3
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set Date Input Min & Value with Today's Date
// const today = new Date().toISOString();  // 2021-11-09T23:29:28.141Z
const today = new Date(Date.now() + 9 * 3600000).toISOString().replace(/\..*/, '+09:00').split('T')[0];
// console.log(today);  // 2021-11-10T08:34:07(+09:00)  =>   2021-11-10
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {

    // setTimeout(function, milliseconds) 在等待指定的毫秒数后执行函数。
    // setInterval(function, milliseconds) 与 setTimeout( )相同，但不断重复执行函数。
    countdownActive = setInterval(() => {

        const now = new Date().getTime();
        const distance = countdownValue - now;
        // console.log(distance);   // 35335661178

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // console.log(days, hours, minutes, seconds);  // 408 23 21 30

        // Hide Input
        inputContainer.hidden = true;
        // If the countdown has ended, show final state
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // else, show the countdown in progress

            // Populate CountDown  （给文件）增添数据，输入数据
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;

            // Show Countdown
            countdownEl.hidden = false;
        }
    }, second);
}


// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    // console.log(e);  //submit { target: form#countdownForm.form, … }
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // console.log(countdownTitle, countdownDate); // UIhi 2022-12-24

    // * 
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    // console.log(savedCountdown);  // Object { title: "UIhi", date: "2021-11-11" }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // Check if no date entered
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        // console.log(countdownValue);  // 1671840000000
        updateDOM();
    }
}

// Readt All Values
function reset() {
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset the value
    countdownTitle = '';
    countdownDate = '';

    // *
    localStorage.removeItem('countdown');
}

// *
function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage *
restorePreviousCountdown();