import React from 'react';
import PropTypes from 'prop-types';
import CountdownTimer from '../Countdown';
import InfusionBox from '../InfusionBox';

import styles from './index.module.scss';

function last(arr) {
  return arr[arr.length - 1];
}

export default class TeaSession extends React.Component {
  static propTypes = {
    infusions: PropTypes.arrayOf(PropTypes.number).isRequired,
    amount: PropTypes.string.isRequired, // g per 100 ml
    waterTemp: PropTypes.number.isRequired, // in degrees Celsius
    defaultTimeIncrement: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    notes: PropTypes.string
  }

  static defaultProps = {
    infusions: [],
    amount: '',
    waterTemp: 80,
    defaultTimeIncrement: 1
  };

  state = {
    currentInfusion: 0,
  };

  onTimerEnd = () => {
    const { currentInfusion } = this.state;

    this.setState({
      currentInfusion: currentInfusion + 1
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ currentInfusion: 0 })
    }
  }

  render() {
    const { currentInfusion } = this.state;
    const { infusions,
      notes,
      defaultTimeIncrement,
      amount,
      waterTemp,
      name
    } = this.props;

    const infusionTime = currentInfusion < infusions.length ?
      infusions[currentInfusion] :
      last(infusions) + (currentInfusion - infusions.length + 1) * defaultTimeIncrement;

    return (
      <div className={styles.container}>
        <CountdownTimer
          from={infusionTime}
          onFinish={this.onTimerEnd}
        />
        <p className={styles.text}>{name}</p>
        <p className={styles.text}>Water Temperature: {waterTemp} °C</p>
        <p className={styles.text}>Amount: {amount} gr / 100 ml</p>
        <div className={styles.infusions}>
          {
            infusions.map((time, index) => (
              <InfusionBox
                key={index}
                time={time}
                index={index}
                done={index < currentInfusion}
              />
            ))
          }
          {
            currentInfusion >= infusions.length && (
              (new Array(currentInfusion - infusions.length + 1).fill(0)).map((_, i) => (
                <InfusionBox
                  key={infusions.length + i}
                  time={last(infusions) + (i + 1) * defaultTimeIncrement}
                  index={infusions.length + i}
                  extra
                  done={i + infusions.length !== currentInfusion}
                />
              ))

            )
          }
        </div>
      </div>
    );
  }
}

