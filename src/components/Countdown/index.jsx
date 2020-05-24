import React from 'react';
import styles from './index.module.css';


export default class Countdown extends React.Component {
  state = {
    remaining: this.props.from,
    running: false,
  }

  constructor(props) {
    super(props);
    this.audio = React.createRef();
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
          this.handleReset();
          this.props.onFinish();
          this.audio.current.play();
        }
      })
    }
  }

  stop = (cb = () => {}) => {
    clearTimeout(this.timerId);
    this.timerId = null;
    this.setState({
      running: false,
    }, cb)
  }

  start = () => {
    this.setState({
      running: true
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
      this.setState({ remaining: this.props.from })
    });
  }

  render() {
    const { remaining, running } = this.state;

    return (
      <div className={styles.container}>
        <p className={styles.timerText}>
          { remaining }
        </p>
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
