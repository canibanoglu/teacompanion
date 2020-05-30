import React from 'react';
import NoSleep from 'nosleep.js';
import styles from './index.module.css';


export default class Countdown extends React.Component {
  state = {
    remaining: this.props.from,
    running: false,
    startTime: null,
  }

  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.sleepLock = new NoSleep();
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.handleReset()
    }
  }

  tick = () => {
    const { remaining, running } = this.state;

    if (running) {
      if (remaining > 1) {
        this.timerId = setTimeout(this.tick, 1000);
      }

      this.setState({
        remaining: remaining - 1,
        running: remaining > 1
      }, () => {
        if (this.state.remaining === 0) {
          const elapsedTime = Math.ceil(
            (Date.now() - this.state.startTime) / 1000
          );
          this.handleReset();
          this.props.onFinish(elapsedTime);
          this.audio.current.play();
        }
      })
    }
  }

  stop = (cb = () => {}) => {
    clearTimeout(this.timerId);
    this.timerId = null;
    this.sleepLock.disable();
    this.setState({
      running: false,
    }, cb)
  }

  start = () => {
    this.sleepLock.enable();
    this.setState({
      running: true,
      startTime: Date.now()
    }, this.tick);
  }

  handleStartStop = () => {
    const { running } = this.state;

    this.audio.current.play();
    this.audio.current.pause();
    this.audio.current.currentTime = 0;
    if (!running) {
      this.start();
      return;
    }
    this.stop();
  }

  handleReset = () => {
    this.stop(() => {
      this.setState({
        remaining: this.props.from,
        startTime: null,
      })
    });
  }

  get stepSize() {

  const { remaining } = this.state;
  return remaining < 30 ?
    1 : remaining < 90 ?
      5 : remaining < 120 ?
        10 : 15;
  };

  incrementRemainingTime = () => {
    this.setState({ remaining: this.state.remaining + this.stepSize });
  };

  decrementRemainingTime = () => {
    this.setState({
      remaining: (this.state.remaining - this.stepSize) || 1
    });
  };

  render() {
    const { remaining, running } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.timerText}>
          <div onMouseDown={this.decrementRemainingTime} className={styles.timerButton}>-</div>
          <div>{ remaining }  sec.</div>
          <div onMouseDown={this.incrementRemainingTime} className={styles.timerButton}>+</div>
        </div>
        <div>
          <button className={styles.button} onClick={this.handleReset}>
            Reset
          </button>
          <button className={styles.button} onClick={this.handleStartStop}>
            { running ? 'Stop' : 'Start' }
          </button>
        </div>
        <audio ref={this.audio} src="/audio/alarm.mp3" />
      </div>
    );
  }

}
