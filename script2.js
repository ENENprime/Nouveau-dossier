let totalSeconds = 0;
let intervalId = null; 
let isPaused = false;  

const display = document.getElementById('display');
const btnStart = document.getElementById('Start');
const btnPause = document.getElementById('Pause');
const btnReset = document.getElementById('Reset');
const alarm = document.getElementById('alarm');

const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const addsButtons = document.querySelectorAll('.btn-fast'); // Removed space after dot

function formatNumber(value){
    return value < 10 ? `0${value}` : value; 
}

function updateDisplay(){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display.textContent = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`; // Fixed 'testContent' to 'textContent'
}

function readInputsInSeconds(){
    const h = parseInt(inputHours.value) || 0;
    const m = parseInt(inputMinutes.value) || 0; 
    const s = parseInt(inputSeconds.value) || 0;
    return (h * 3600) + (m * 60) + s;
}

function writeSecondsToInputs(totalSecs){
    const h = Math.floor(totalSecs / 3600); o
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    inputHours.value = h > 0 ? h : '';
    inputMinutes.value = m > 0 ? m : '';
    inputSeconds.value = s > 0 ? s : '';
}

function decreaseTime(){
    if (totalSeconds <= 0){
        clearInterval(intervalId);
        intervalId = null;
        isPaused = false;
        display.textContent = "00:00:00";

        alarm.play().catch(e => console.log("Audio play blocked by browser settings:", e));

        setTimeout(() => alert("BRO END HERE !!"), 100);
        return;
    }

    totalSeconds--; // Removed space before decrement
    updateDisplay();
}

addsButtons.forEach(button => {
    button.addEventListener('click', () => { 
        if (intervalId !== null) return;

        const secondsToAdd = parseInt(button.getAttribute('data-time'));
        let currentTimerTime = readInputsInSeconds();

        currentTimerTime += secondsToAdd;
        writeSecondsToInputs(currentTimerTime);

        totalSeconds = currentTimerTime;
        updateDisplay();
    });
});

btnStart.addEventListener('click', () => {
    if (intervalId !== null) return;

    if(!isPaused) {
        totalSeconds = readInputsInSeconds(); 
    }

    if (totalSeconds <= 0) {
        alert("BRO PLS VALID AMOUNT OF TIME");
        return;
    }

    updateDisplay();
    intervalId = setInterval(decreaseTime, 1000);
});

btnPause.addEventListener('click', () => {
    if (intervalId !== null){
        clearInterval(intervalId);
        intervalId = null;
        isPaused = true;
    }
});

btnReset.addEventListener('click', () =>{
    clearInterval(intervalId);
    intervalId = null;
    totalSeconds = 0;
    isPaused = false;

    alarm.pause();
    alarm.currentTime = 0;

    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = ''; 

    display.textContent = "00:00:00";
});
