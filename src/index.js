import "../style.css";
import elements from "./views/base.js";
import Pomodoro from "./models/PomodoroTimer.js";
import * as pomodoroTimerView from "./views/pomodoroTimerView.js";

let refreshInterval;
let pomodoroTimer;

function scheduleTimers(minutes,flag) {
	let progressInterval;

	[refreshInterval, progressInterval] = pomodoroTimerView.showRemainingTime(
		minutes,
		refreshInterval
	);

	pomodoroTimerView.triggerAnimations(progressInterval,flag);

	pomodoroTimerView.resetAnimation(
		elements.leftProgress,
		elements.rightProgress
	);
}

function runTimers(pomodoroDuration){

	pomodoroTimerView.resetTimer(refreshInterval);
	pomodoroTimer = new Pomodoro(
		pomodoroDuration,
		elements.shortBreakDuration.value,
		elements.longBreakDuration.value,
		elements.noOfPomodoros.value,
	);

	pomodoroTimerView.schedulePomodoros(
		pomodoroTimer.getDuration(),
		pomodoroTimer.getLongBreak(),
		pomodoroTimer.getShortBreak(),
		pomodoroTimer.getNoOfPomodoros(),
		scheduleTimers,
	);
}

elements.durationButtons.addEventListener("click", (event) => {
	elements.timeDurations.forEach((item) => item.classList.remove("active"));
	event.target.classList.add("active");
	runTimers(event.target.textContent.split(":")[0]);
});

elements.startOrStopButton.addEventListener('click',(event)=>{
	if(event.target.classList.contains('active')){
		pomodoroTimerView.resetTimer(refreshInterval);
		pomodoroTimerView.resetAnimation(
			elements.leftProgress,
			elements.rightProgress
		);
		event.target.textContent="START";
		event.target.classList.toggle('active');
	}
	else{
		event.target.textContent="STOP";
		event.target.classList.toggle('active');
		runTimers(elements.customTimerDuration.value);
	}
})


elements.settingsToggle.addEventListener("click", (event) => {
	if (event.target.classList.contains("active")) {
		event.target.classList.remove("active");
		elements.settingsModal.style.opacity = "0";
		elements.settingsModal.style.zIndex = "-2";
	} else {
		event.target.classList.add("active");
		elements.settingsModal.style.opacity = "1";
		elements.settingsModal.style.zIndex = "10";
	}
});

elements.saveButton.addEventListener("click", (event) => {
	event.preventDefault();
});
