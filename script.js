let timerRunning = false;
let intervalId;
let minutes = 12;
let seconds = 0;
let team1Score = 0;
let team2Score = 0;
let team1Fouls = 0;
let team2Fouls = 0;
let currentTeam = "Team L"; // Start with Team L having possession

// DOM elements
const team1ScoreElement = document.getElementById("team1-score");
const team2ScoreElement = document.getElementById("team2-score");
const team1FoulsDisplay = document.getElementById("team1-fouls");
const team2FoulsDisplay = document.getElementById("team2-fouls");
const possessionDisplay = document.getElementById("currentPossession");
const basketSound = document.getElementById("basket_Sound"); // Use the correct ID here

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        toggleTimer();
    } else if (event.keyCode === 37) { // Left Arrow Key (Team 1)
        updateScore(1, 1);
        playSound(basketSound);
    } else if (event.keyCode === 39) { // Right Arrow Key (Team 2)
        updateScore(2, 1);
        playSound(basketSound);
    }
});

function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

function toggleTimer() {
    if (timerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (!timerRunning) {
        intervalId = setInterval(updateTimer, 10);
        timerRunning = true;
    }
}

function pauseTimer() {
    if (timerRunning) {
        clearInterval(intervalId);
        timerRunning = false;
    }
}

function resetTimer() {
    pauseTimer();
    minutes = 12;
    seconds = 0;
    updateTimerDisplay();
    team1Fouls = 0;
    team2Fouls = 0;
    updateFoulsDisplay();
}

function updateTimer() {
  seconds -= 0.01;
  if (seconds < 0) {
      seconds = 59.99;
      minutes--;

      if (minutes < 0) {
          seconds = 0;
          minutes = 0;
          pauseTimer();
          playSound(document.getElementById("buzzerAudio"));
      }
  }

  updateTimerDisplay();
}

function addSeconds(amount) {
    seconds += amount;
    if (seconds >= 60) {
        seconds -= 60;
        minutes++;
    }
    updateTimerDisplay();
}

function removeSeconds(amount) {
    seconds -= amount;
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    document.getElementById('seconds').textContent = seconds.toFixed(2);
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
}

function updateScore(teamNumber, points) {
    if (teamNumber === 1) {
        team1Score += points;
        team1ScoreElement.textContent = team1Score;
    } else if (teamNumber === 2) {
        team2Score += points;
        team2ScoreElement.textContent = team2Score;
    }
}

function removeScore(teamNumber, points) {
  if (!timerRunning) {
      if (teamNumber === 1 && team1Score >= points) {
          team1Score -= points;
          team1ScoreElement.textContent = team1Score;
      } else if (teamNumber === 2 && team2Score >= points) {
          team2Score -= points;
          team2ScoreElement.textContent = team2Score;
      }
  }
}

function updateFoulsDisplay() {
    team1FoulsDisplay.textContent = `Fouls: ${team1Fouls}`;
    team2FoulsDisplay.textContent = `Fouls: ${team2Fouls}`;
}

function recordFoul(teamNumber) {
    if (!timerRunning) {
        if (teamNumber === 1) {
            team1Fouls++;
        } else if (teamNumber === 2) {
            team2Fouls++;
        }
        updateFoulsDisplay();
    }
}

function removeFoul(teamNumber) {
    if (!timerRunning) {
        if (teamNumber === 1 && team1Fouls > 0) {
            team1Fouls--;
        } else if (teamNumber === 2 && team2Fouls > 0) {
            team2Fouls--;
        }
        updateFoulsDisplay();
    }
}

function togglePossession() {
    if (!timerRunning) {
        currentTeam = (currentTeam === "Team L") ? "Team R" : "Team L";
        possessionDisplay.textContent = currentTeam;
    }
}

function playSound(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
}

// Call updateTimerDisplay initially to display the starting time
updateTimerDisplay();
