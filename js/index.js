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

//=========create time============================
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

    if (milliseconds < 10) {
        time.milliseconds = `0${milliseconds}`;
    } else {
        time.milliseconds = milliseconds;
    }

    if (seconds < 10) {
        time.seconds = `0${seconds}`;
    } else {
        time.seconds = seconds;
    }

    if (minutes < 10) {
        time.minutes =`0${minutes}`
    } else {
        time.minutes = minutes;
    }
    
    if (hours < 10) {
        time.hours = `0${hours}`;
    } else {
        time.hours = hours;
    }
}

//==============start watch================================
const startWatch = () => {
    start.classList.add('disabled');
    
    const startCounting = () => {
        mainTimer();

        hoursDisplay.textContent = time.hours;
        minutesDisplay.textContent = time.minutes;
        secondsDisplay.textContent = time.seconds;
        millisecondsDisplay.textContent = time.milliseconds;
    }

    const stopCounting = () => {
        clearInterval(counting);
        clearInterval(lapping);
        if (start.classList.contains("disabled")) {
            start.textContent = "Resume";
            start.classList.remove('disabled');
        }
    }

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
        lapHours = 0;
        lap = {};

        displayLapTime.textContent = '';
        displayLap.innerHTML = '';
        lapDiv.style.display = 'none';
    }

    let counting = setInterval(startCounting, 10);
    let lapping = setInterval(lapCounting, 10);

    lapButton.addEventListener('click', createLap);
    stopButton.addEventListener('click', stopCounting);
    resetButton.addEventListener('click', resetWatch);     
}



let lapMilliseconds = 0;
let lapSeconds = 0;
let lapMinutes = 0;
let lapHours = 0;
let lap = {};

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

    if (lapMinutes > 59) {
        lapMinutes = 0;
        lapHours++   
    }

    if (lapMilliseconds < 10) {
        lap.milliseconds = `0${lapMilliseconds}`;
    } else {
        lap.milliseconds = lapMilliseconds;
    }

    if (lapSeconds < 10) {
        lap.seconds = `0${lapSeconds}`;
    } else {
        lap.seconds = lapSeconds;
    }

    if (lapMinutes < 10) {
        lap.minutes =`0${lapMinutes}`
    } else {
        lap.minutes = lapMinutes;
    }
    
    if (lapHours < 10) {
        lap.hours = `0${lapHours}`;
    } else {
        lap.hours = lapHours;
    }
}

const lapCounting = () => {
    lapTimer();
    displayLapTime.textContent = `${lap.hours}:${lap.minutes}:${lap.seconds}:${lap.milliseconds}`;
}

const createLap = () => {
    if (lapMilliseconds > 0) {
        const currentLapTime = `${lap.hours}:${lap.minutes}:${lap.seconds}:${lap.milliseconds}`;
        const laplist = document.createElement('li');
        laplist.textContent = currentLapTime;
        displayLap.appendChild(laplist);
        lapDiv.style.display = 'block';    
    }
   
    lapMilliseconds = 0;
    lapSeconds = 0;
    lapMinutes = 0;
    lapHours = 0;
}

startButton.addEventListener('click', startWatch);



