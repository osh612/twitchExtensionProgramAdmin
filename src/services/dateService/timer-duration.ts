export default class TimerDuration {
  duration: number
  constructor(duration: number) {
    this.duration = duration
  }

  setValue(duration: number) {
    this.duration = duration
    this.validate()
  }

  getValue() {
    return Math.round(this.duration)
  }

  minus(duration: number) {
    this.setValue(this.duration - duration)
  }

  validate() {
    if (this.duration < 0) {
      // console.log(this.duration)
      this.duration = 0
      // console.log(this.duration)
    }
  }
}
