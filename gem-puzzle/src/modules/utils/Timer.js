let timerInterval;
export default class stopWatch {
  constructor(elapsedTime = 0) {
    this.startTime = 0;
    this.elapsedTime = elapsedTime;
  }

  timeToText(time) {
    let hours = time / 3600000;
    let hh = Math.floor(hours);
    let minutes = (hours - hh) * 60;
    let mm = Math.floor(minutes);
    let seconds = (minutes - mm) * 60;
    let ss = Math.floor(seconds);
    return `${this.padTime(mm)}:${this.padTime(ss)}`;
  }


  padTime(time) {
    return time.toString().padStart(2, '0');
  }

  start(timer) {
    this.startTime = Date.now() - this.elapsedTime; 
    timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.setElapsedTime(timer, this.elapsedTime);
      //timer.innerHTML = 'Time: '+this.timeToText(this.elapsedTime);
    }, 1000);
  }

  stop() {
    clearInterval(timerInterval);
    return this.getElapsedTime();
  }

  getElapsedTime() {
    return this.elapsedTime;
  }

  setElapsedTime(timer, elapsedTime) {
    timer.innerHTML = 'Time: '+this.timeToText(elapsedTime);
  }
}
