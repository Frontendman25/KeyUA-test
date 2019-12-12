import React, { PureComponent } from 'react'
import Buttons from '../components/Buttons'

export default class TimerBox extends PureComponent {
  state = {
    timerStarted: false,
    timerPaused: true,
    timerResume: true,
    timeSet: false,
    minutes: 0,
    seconds: 0,
    interval: 1000,
    halfway: 0,
    secondsOfEnding: 0,
    afterTimerEnd: false,
    firstEnvoke: false
  }

  componentDidUpdate() {
    if (
      this.state.seconds <= 20 &&
      this.state.seconds >= 1 &&
      !this.state.afterTimerEnd
    ) {
      this.setState({ afterTimerEnd: true })

      return
    }

    if (this.state.seconds <= 0 && this.state.afterTimerEnd) {
      this.setState({ afterTimerEnd: false })

      return
    }
  }

  timerLogic = () => {
    if (this.state.timerStarted) {
      if (this.state.seconds <= 0) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: 60
        }))
      }

      this.setState(prevState => ({ seconds: prevState.seconds - 1 }))
    }

    if (this.state.minutes < 0) {
      this.setState({
        timerStarted: false,
        timerPaused: false,
        minutes: 0,
        seconds: 0
      })

      clearInterval(this.timer)

      return
    }
  }

  setHalfway = () => {
    if (!this.state.firstEnvoke){
      let { minutes, seconds } = this.state
      this.setState({ halfway: Math.floor((minutes * 60 + seconds) / 2) })
    }
  }

  timerStart = (interval = 1000) => {
    this.setHalfway()

    clearInterval(this.timer)
    this.setState(
      { timeSet: true, timerStarted: true, timerPaused: true, firstEnvoke: true, interval },
      () => {
        let { interval } = this.state

        if (this.state.timerPaused) {
          this.timer = setInterval(() => {
            this.timerLogic()
          }, interval)
        }
      }
    )
  }

  handleChange = e => {
    this.setState({ minutes: e.target.value })
  }

  onTimerStart = () => {
    this.timerStart()
  }

  onTimerResume = () => {
    this.timerStart(this.state.interval)
  }

  onTimerPause = e => {
    this.setState({ timerStarted: false, timerPaused: true })

    clearInterval(this.timer)
  }

  onSetIntervalTime = interval => {
    this.setHalfway()

    clearInterval(this.timer)

    this.setState({
      timeSet: true,
      timerStarted: true,
      timerPaused: true,
      firstEnvoke: true,
      interval
    })

    this.timer = setInterval(() => {
      this.timerLogic()
    }, interval)
  }

  render() {
    const {
      minutes,
      seconds,
      halfway,
      timerStarted,
      timerPaused,
      timeSet,
      afterTimerEnd,
      firstEnvoke
    } = this.state

    let currentFullTime = (minutes * 60) + seconds
    let halfwayStr = ''
    let showMinutes = null

    if (currentFullTime <= halfway && !halfwayStr) {
      halfwayStr = 'More than halfway there!'
    }

    if (currentFullTime <= 0) {
      halfwayStr = 'Time’s up!'
    }

    if ((timerStarted && timerPaused && timeSet) || !timerStarted) {
      showMinutes = (
        <li className='list-group-item col-2'>
          {minutes < 10 ? '0' + minutes : minutes}
        </li>
      )
    }

    if (!timerStarted && !timeSet && !firstEnvoke) {
      showMinutes = (
        <li
          className='list-group-item col-2'
          style={{ padding: 0, position: 'relative' }}
        >
          <h6 className='minutes'>
            <label htmlFor='minutes'>Minutes</label>
          </h6>
          <input
            id='minutes'
            type='number'
            className='form-control'
            style={{
              border: 'none',
              height: '100%',
              fontSize: '16px',
              textAlign: 'center'
            }}
            min='0'
            onChange={this.handleChange}
            value={minutes}
          />
        </li>
      )
    }

    return (
      <div>
        <div className='container'>
          <h1>Countdown Timer SPA</h1>

          {halfwayStr && firstEnvoke ? (
            <div
              className={`alert alert-warning ${afterTimerEnd &&
                'clr-red blinking'}`}
            >
              {halfwayStr}
            </div>
          ) : (
            ''
          )}

          <ul className='list-group row flex-row auto d-flex justify-content-center b-30'>
            {showMinutes}
            <li className='list-group-item col-2'>
              {seconds < 10 ? '0' + seconds : seconds}
            </li>
          </ul>

          <Buttons
            handleTimerStart={this.onTimerStart}
            handleTimerPause={this.onTimerPause}
            handleTimerResume={this.onTimerResume}
            handleSetIntervalTime={this.onSetIntervalTime}
          />
        </div>
      </div>
    )
  }
}
