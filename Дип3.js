(function() {
    'use strict';

    const clockEl = document.getElementById('live-clock');
    function updateClock() {
      const now = new Date();
      const opts = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      clockEl.innerHTML = `<i class="far fa-calendar-alt"></i> ${now.toLocaleString('kk-KZ', opts)}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    const workInput = document.getElementById('workHours');
    const studyInput = document.getElementById('studyHours');
    const restInput = document.getElementById('restHours');
    const funInput = document.getElementById('funHours');
    const otherInput = document.getElementById('otherHours');
    const resultText = document.getElementById('resultText');
    const progressFill = document.getElementById('progressFill');

    function calcProductivity() {
      const work = parseFloat(workInput.value) || 0;
      const study = parseFloat(studyInput.value) || 0;
      const rest = parseFloat(restInput.value) || 0;
      const fun = parseFloat(funInput.value) || 0;
      const other = parseFloat(otherInput.value) || 0;
      const total = work + study + rest + fun + other;
      if (total === 0) {
        resultText.innerText = 'Өнімділік: 0% (уақыт енгізіңіз)';
        progressFill.style.width = '0%';
        return;
      }
      const productive = work + study;
      const percent = Math.round((productive / total) * 100);
      resultText.innerText = `Өнімділік: ${percent}% (өнімді ${productive} сағ / барлығы ${total} сағ)`;
      progressFill.style.width = Math.min(percent, 100) + '%';
    }

    document.getElementById('calcProductivity').addEventListener('click', calcProductivity);
    
    [workInput, studyInput, restInput, funInput, otherInput].forEach(inp => inp.addEventListener('input', calcProductivity));
    calcProductivity();

    let timerInterval = null;
    let isRunning = false;
    let isPaused = false;
    let currentSeconds = 25 * 60;
    let currentMode = 'work';
    const workMinInput = document.getElementById('workMin');
    const breakMinInput = document.getElementById('breakMin');
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startPomoBtn');
    const pauseBtn = document.getElementById('pausePomoBtn');
    const resetBtn = document.getElementById('resetPomoBtn');

    function updateDisplay(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function stopTimer() {
if (timerInterval) {
clearInterval(timerInterval);
timerInterval = null;
}
isRunning = false;
isPaused = false;
}

function startTimer() {  
  if (isRunning && !isPaused) return;  
  if (isPaused) {  
    
    isPaused = false;  
    timerInterval = setInterval(tick, 1000);  
    return;  
  }  
 
  if (timerInterval) stopTimer();  
  const workMin = parseInt(workMinInput.value) || 25;  
  const breakMin = parseInt(breakMinInput.value) || 5;  
  if (currentMode === 'work') {  
    currentSeconds = workMin * 60;  
  } else {  
    currentSeconds = breakMin * 60;  
  }  
  updateDisplay(currentSeconds);  
  isRunning = true;  
  isPaused = false;  
  timerInterval = setInterval(tick, 1000);  
}  

function tick() {  
  if (currentSeconds <= 0) {  
     
    stopTimer();  
     
    try {  
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();  
      const osc = audioCtx.createOscillator();  
      const gain = audioCtx.createGain();  
      osc.connect(gain);  
      gain.connect(audioCtx.destination);  
      osc.frequency.value = 880;  
      gain.gain.value = 0.2;  
      osc.start();  
      setTimeout(() => { osc.stop(); }, 400);  
    } catch(e) {}  

    document.body.style.transition = 'background 0.3s';  
    document.body.style.background = '#fde9e9';  

 
    if (currentMode === 'work') {  
      currentMode = 'break';  
      const breakMin = parseInt(breakMinInput.value) || 5;  
      currentSeconds = breakMin * 60;  
      timerDisplay.style.color = '#0b5e4b';  
    } else {  
      currentMode = 'work';  
      const workMin = parseInt(workMinInput.value) || 25;  
      currentSeconds = workMin * 60;  
      timerDisplay.style.color = '#1e293b';  
    }  
    updateDisplay(currentSeconds);  
    isRunning = false;  
    isPaused = false;  
    
    setTimeout(() => { document.body.style.background = '#f4f7fc'; }, 800);  
    return;  
  }  
  currentSeconds--;  
  updateDisplay(currentSeconds);  
}  

function pauseTimer() {  
  if (!isRunning || isPaused) return;  
  if (timerInterval) {  
    clearInterval(timerInterval);  
    timerInterval = null;  
    isPaused = true;  
  }  
}  

function resetTimer() {  
  stopTimer();  
  const workMin = parseInt(workMinInput.value) || 25;  
  currentMode = 'work';  
  currentSeconds = workMin * 60;  
  updateDisplay(currentSeconds);  
  timerDisplay.style.color = '#1e293b';  
  document.body.style.background = '#f4f7fc';  
  isRunning = false;  
  isPaused = false;  
}  

startBtn.addEventListener('click', startTimer);  
pauseBtn.addEventListener('click', pauseTimer);  
resetBtn.addEventListener('click', resetTimer);  

(function initPomo() {  
  const workMin = parseInt(workMinInput.value) || 25;  
  currentSeconds = workMin * 60;  
  updateDisplay(currentSeconds);  
})();  

const form = document.getElementById('feedbackForm');  
const nameInput = document.getElementById('userName');  
const emailInput = document.getElementById('userEmail');  
const msgInput = document.getElementById('userMsg');  

form.addEventListener('submit', function(e) {  
  e.preventDefault();  

  const name = nameInput.value.trim();  
  const email = emailInput.value.trim();  
  const msg = msgInput.value.trim();  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  if (!name) { alert('Есіміңізді енгізіңіз.'); return; }  
  if (!email || !emailRegex.test(email)) { alert('Жарамды email енгізіңіз (мысалы: test@mail.kz).'); return; }  
  if (!msg) { alert('Хабарлама жазыңыз.'); return; }  
  alert(`Рахмет, ${name}! Хабарламаңыз қабылданды.`);  
 
  localStorage.setItem('userName', name);  
  localStorage.setItem('userEmail', email);  

});  
 
const savedName = localStorage.getItem('userName');  
const savedEmail = localStorage.getItem('userEmail');  
if (savedName) nameInput.value = savedName;  
if (savedEmail) emailInput.value = savedEmail;  

})();