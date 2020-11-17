"use strict";

//===========Elements======================================
const millisecondsDisplay = document.querySelector('#mseconds');
const secondsDisplay = document.querySelector('#seconds');
const minutesDisplay = document.querySelector('#minutes');
const hoursDisplay = document.querySelector('#hours');
const displayLapTime = document.querySelector('#lap-time');
const displayLap = document.querySelector('#display-lap');
const lapDiv = document.querySelector('.lap-body');

//==========Buttons================================
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const lapButton = document.querySelector('#lap');

//=========initialize time=======================
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let time = {};

//==========initialize laptime===================
let lapMilliseconds = 0;
let lapSeconds = 0;
let lapMinutes = 0;
let lap = {};

//==============start watch================================
const startWatch = () => {
    //disables the start button.
    start.classList.add('disabled');
    
    //starts the timer i.e: mainTime
    const startCounting = () => {
        mainTimer();

        hoursDisplay.textContent = time.hours;
        minutesDisplay.textContent = time.minutes;
        secondsDisplay.textContent = time.seconds;
        millisecondsDisplay.textContent = time.milliseconds;
    }

    //temporary pauses the timer
    const stopCounting = () => {
        clearInterval(counting);
        clearInterval(lapping);
        if (start.classList.contains("disabled")) {
            start.textContent = "Resume";
            start.classList.remove('disabled');
        }
    }

    //resets the entire watch
    const resetWatch = () => {
        clearInterval(counting);
        clearInterval(lapping);
        start.classList.remove('disabled');
        start.textContent = "Start";

        millisecondsDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        minutesDisplay.textContent = '00';
        hoursDisplay.textContent = "00";
        
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        time = {};
        
        lapMilliseconds = 0;
        lapSeconds = 0;
        lapMinutes = 0;
        lap = {};

        displayLapTime.textContent = '';
        displayLap.innerHTML = '';
        lapDiv.style.display = 'none';
    }

    //intervals
    let counting = setInterval(startCounting, 10);
    let lapping = setInterval(lapCounting, 10);

    //listening for click events on lap, stop and reset
    lapButton.addEventListener('click', createLap);
    stopButton.addEventListener('click', stopCounting);
    resetButton.addEventListener('click', resetWatch);     
}

//=================Create Timer==============================
const mainTimer = () => {
    milliseconds++;

    if (milliseconds > 99) {
       milliseconds = 0;
       seconds++   
    } 

    if (seconds > 59) {
        seconds = 0;
        minutes++   
    }

    if (minutes > 59) {
        minutes = 0;
        hours++   
    }

    time.milliseconds = concateZero(milliseconds);
    time.seconds = concateZero(seconds);
    time.minutes = concateZero(minutes);
    time.hours = concateZero(hours);
}

//=====================Start LapTime===============================
const lapCounting = () => {
    lapTimer();
    displayLapTime.textContent = `${lap.minutes}:${lap.seconds}:${lap.milliseconds}`;
}

//=====================create LapTime==============================
const createLap = () => {
    if (lapMilliseconds > 0) {
        const currentLapTime = `${lap.minutes}:${lap.seconds}:${lap.milliseconds}`;
        const laplist = document.createElement('li');
        laplist.textContent = currentLapTime;
        displayLap.appendChild(laplist);
        lapDiv.style.display = 'block';    
    }
   
    lapMilliseconds = 0;
    lapSeconds = 0;
    lapMinutes = 0;
}

//=================Create laptimer=======================================
const lapTimer = () => {
    lapMilliseconds++;

    if (lapMilliseconds > 99) {
       lapMilliseconds = 0;
       lapSeconds++   
    } 

    if (lapSeconds > 59) {
        lapSeconds = 0;
        lapMinutes++   
    }

    lap.milliseconds = concateZero(lapMilliseconds);
    lap.seconds = concateZero(lapSeconds);
    lap.minutes = concateZero(lapMinutes);
}

//adds zero before number 0 to 9
const concateZero = (value) => {
    return value < 10 ? `0${value}` : value;
}

startButton.addEventListener('click', startWatch);



