import React from 'react'
import PropTypes from 'prop-types'

const Buttons = (props) => {
  return (
    <React.Fragment>
      <div className='btns'>
        <button
          onClick={props.handleTimerStart}
          type='button'
          className='btn btn-success'
        >
          Start
        </button>
        <button
          onClick={props.handleTimerPause}
          type='button'
          className='btn btn-warning'
        >
          Pause
        </button>
        <button
          onClick={props.handleTimerResume}
          type='button'
          className='btn btn-primary'
        >
          Resume
        </button>
      </div>
      <div className='btns'>
        <button
          onClick={() => {
            props.handleSetIntervalTime(1000)
          }}
          type='button'
          className='btn btn-light'
        >
          1.0X
        </button>
        <button
          onClick={() => {
            props.handleSetIntervalTime(750)
          }}
          type='button'
          className='btn btn-light'
        >
          1.5X
        </button>
        <button
          onClick={() => {
            props.handleSetIntervalTime(500)
          }}
          type='button'
          className='btn btn-light'
        >
          2.0X
        </button>
      </div>
    </React.Fragment>
  )
}

Buttons.propTypes = {
  handleTimerStart: PropTypes.func,
  handleTimerPause: PropTypes.func,
  handleTimerResume: PropTypes.func,
  setIntervalTime: PropTypes.func,
}

export default Buttons