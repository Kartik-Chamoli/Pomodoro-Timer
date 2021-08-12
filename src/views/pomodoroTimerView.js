import elements from "./base.js";

export function resetTimer(refreshInterval) {
	clearInterval(refreshInterval);
	elements.pomodoroTime.textContent = "00:00";
}

export function showRemainingTime(minutes, refreshInterval) {
	let progressInterval = (minutes * 60000) / 100;

	refreshInterval = timer(minutes);

	return [refreshInterval, progressInterval];
}

export function triggerAnimations(minutes, flag) {
	switch (flag) {
		case "active":
			console.log("active");
			elements.leftProgress.style.backgroundImage =
				"linear-gradient(180deg, #044266 0%, #0ddfff 100%)";
			elements.rightProgress.style.backgroundImage =
				"linear-gradient(180deg, #044266 0%, #0ddfff 100%)";
			break;
		case "shortBreak":
			console.log("short");
			elements.leftProgress.style.backgroundImage =
				"linear-gradient(90deg, #9ebd13 0%, #008552 100%)";
			elements.rightProgress.style.backgroundImage =
				"linear-gradient(90deg, #9ebd13 0%, #008552 100%)";
			break;
		case "longBreak":
      console.log("long");
			elements.leftProgress.style.backgroundImage =
				"linear-gradient(143deg, rgba(199,199,19,1) 0%, rgba(172,207,16,1) 48%, rgba(244,255,29,1) 100%);";
			elements.rightProgress.style.backgroundImage =
				"linear-gradient(143deg, rgba(199,199,19,1) 0%, rgba(172,207,16,1) 48%, rgba(244,255,29,1) 100%);";
			break;
		default:
			break;
	}
	elements.leftProgress.style.animationDuration = `${(minutes * 100) / 2}ms`;
	elements.leftProgress.style.animationPlayState = "running";

	elements.rightProgress.style.animationDelay = `${(minutes * 100) / 2}ms`;
	elements.rightProgress.style.animationDuration = `${(minutes * 100) / 2}ms`;
	elements.rightProgress.style.animationPlayState = "running";
}

export function resetAnimation(leftProgress, rightProgress) {
	leftProgress.classList.remove("progress");
	leftProgress.offsetWidth;
	leftProgress.classList.add("progress");

	rightProgress.classList.remove("progress");
	rightProgress.offsetWidth;
	rightProgress.classList.add("progress");
}

export function timer(minutes) {
	minutes--;
	let seconds = 59;
	let interval = setInterval(() => {
		if (minutes < 10 && seconds < 10) {
			elements.pomodoroTime.textContent = "0" + minutes + ":" + "0" + seconds;
		} else if (minutes < 10) {
			elements.pomodoroTime.textContent = "0" + minutes + ":" + seconds;
		} else if (seconds < 10) {
			elements.pomodoroTime.textContent = minutes + ":" + "0" + seconds;
		} else {
			elements.pomodoroTime.textContent = minutes + ":" + seconds;
		}

		seconds--;
		if (minutes === 0 && seconds === -1) {
			clearInterval(interval);
		} else if (seconds === -1) {
			seconds = 59;
			if (minutes !== 0) {
				minutes--;
			}
		}
	}, 1000);

	return interval;
}

export function schedulePomodoros(
	pomodoroDuration,
	longBreakDuration,
	shortBreakDuration,
	pomodorosBeforeLongBreak,
	callbackfn
) {
	for (let i = 0; i < pomodorosBeforeLongBreak; i++) {
		if (i === 0) {
			setTimeout(function () {
				callbackfn(pomodoroDuration, "active");
			}, 0);
		} else {
			setTimeout(function () {
				console.log("WOWOWO");
				callbackfn(shortBreakDuration, "shortBreak");
			}, pomodoroDuration * i * 60000 + shortBreakDuration * (i - 1) * 60000);

			setTimeout(function () {
				callbackfn(pomodoroDuration, "active");
			}, pomodoroDuration * 60000 * i + shortBreakDuration * 60000 * i);
		}
	}
	setTimeout(function () {
		callbackfn(longBreakDuration, "longBreak");
	}, pomodoroDuration * 60000 * pomodorosBeforeLongBreak +
		shortBreakDuration * 60000 * (pomodorosBeforeLongBreak - 1));
}
