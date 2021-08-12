export default class Pomodoro{
    constructor(duration,shortBreak,longBreak,noOfPomodoros){
        this.duration = duration;
        this.shortBreak = shortBreak;
        this.longBreak = longBreak;
        this.noOfPomodoros = noOfPomodoros;
    }

    getDuration() {
        return this.duration;
    }

    getShortBreak() {
        return this.shortBreak;
    }

    getLongBreak(){
        return this.longBreak;
    }

    getNoOfPomodoros(){
        return this.noOfPomodoros;
    }
}