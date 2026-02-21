const timer = document.getElementById("timer");
const play_pause = document.getElementById("play-pause");
const reset = document.getElementById("reset");
const sessionDisplay = document.getElementById("session");
const alarm = document.getElementById("alarm");
const rain = document.getElementById("rain");

let session_time = 25 * 60;
let playing = false;
let timerInterval = null;
let sessionCount = 0;
let breakCount = 0;

function start() {
  timerInterval = setInterval(() => {
    if (playing) {
      let minute = `${Math.floor(session_time / 60)}`;
      let sec = `${Math.floor(session_time % 60)}`;

      if (session_time / 60 < 10) {
        minute = `0${Math.floor(session_time / 60)}`;
      }
      if (session_time % 60 < 10) {
        sec = `0${Math.floor(session_time % 60)}`;
      }

      timer.innerHTML = `${minute}:${sec}`;

      session_time--;
    }
    if (session_time < 0) {
      console.log("here");
      clearInterval(timerInterval);
      sessionCount++;
      sessionDisplay.innerHTML = `Break ${breakCount + 1}`;
      if (!(sessionCount > 3)) {
        rain.pause();
        alarm.play();
        setTimeout(() => {
          smallBreak(300);
          alarm.pause();
          rain.play();
        }, 15000);
      } else {
        alarm.play();
        rain.pause();

        setTimeout(() => {
          smallBreak(1500);
          alarm.pause();
          rain.play();
        }, 15000);
      }
    }
  }, 1000);
}

function smallBreak(time) {
  let break_time = time; // 5 minutes
  timerInterval = setInterval(() => {
    if (playing) {
      let minute = `${Math.floor(break_time / 60)}`;
      let sec = `${Math.floor(break_time % 60)}`;

      if (break_time / 60 < 10) {
        minute = `0${Math.floor(break_time / 60)}`;
      }
      if (break_time % 60 < 10) {
        sec = `0${Math.floor(break_time % 60)}`;
      }

      timer.innerHTML = `${minute}:${sec}`;

      break_time--;
    }
    if (break_time < 0) {
      console.log("here");
      clearInterval(timerInterval);
      breakCount++;
      sessionDisplay.innerHTML = `Session ${sessionCount + 1}`;
      session_time = 2;
      start();
    }
  }, 1000);
}

let click_count = 0;
play_pause.addEventListener("click", () => {
  if (!playing) {
    playing = true;
    if (click_count == 0) {
      start();
      rain.play();
    }

    play_pause.children[0].classList.add("hidden");
    play_pause.children[1].classList.remove("hidden");
    click_count = 1;
  } else {
    playing = false;
    play_pause.children[1].classList.add("hidden");
    play_pause.children[0].classList.remove("hidden");
  }
});

reset.addEventListener("click", () => {
  clearInterval(timerInterval);
  click_count = 0;
  playing = false;
  timer.innerHTML = "25:00";

  play_pause.children[1].classList.add("hidden");
  play_pause.children[0].classList.remove("hidden");
});
