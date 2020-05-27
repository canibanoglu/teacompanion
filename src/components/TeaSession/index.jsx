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
    completedInfusions: [],
  };

  onTimerEnd = (elapsedTime) => {
    const { completedInfusions } = this.state;

    this.setState({
      completedInfusions: [...completedInfusions, elapsedTime],
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ completedInfusions: [] })
    }
  }

  render() {
    const { completedInfusions } = this.state;
    const {
      infusions,
      infusionsWestern,
      notes,
      defaultTimeIncrement,
      defaultTimeIncrementWestern,
      amount,
      amountWestern,
      waterTemp,
      name,
      westernMethod
    } = this.props;

    const currentInfusion = completedInfusions.length;
    const infusionsArray = westernMethod ? infusionsWestern : infusions;
    const defaultTimeIncrementValue = westernMethod ? defaultTimeIncrementWestern : defaultTimeIncrement;
    const amountValue = westernMethod ? amountWestern : amount;

    const infusionTime = currentInfusion < infusionsArray.length ?
      infusionsArray[currentInfusion] :
      last(infusionsArray) + (currentInfusion - infusionsArray.length + 1) * defaultTimeIncrementValue;

    return (
      <div className={styles.container}>
        <CountdownTimer
          from={infusionTime}
          onFinish={this.onTimerEnd}
        />
        <p className={styles.text}>{name}</p>
        <p className={styles.text}>Water Temperature: {waterTemp} °C</p>
        <p className={styles.text}>Amount: {amountValue} gr / 100 ml</p>
        <h3 className={styles.header}>Infusion Counter</h3>
        <div className={styles.infusions}>
          {
            infusionsArray.map((time, index) => (
              <InfusionBox
                key={index}
                time={index < currentInfusion ? completedInfusions[index] : time}
                index={index}
                done={index < currentInfusion}
              />
            ))
          }
          {
            currentInfusion >= infusionsArray.length && (
              (new Array(currentInfusion - infusionsArray.length + 1).fill(0)).map((_, i) => (
                <InfusionBox
                  key={infusionsArray.length + i}
                  time={last(infusionsArray) + (i + 1) * defaultTimeIncrementValue}
                  index={infusionsArray.length + i}
                  extra
                  done={i + infusionsArray.length !== currentInfusion}
                />
              ))

            )
          }
        </div>
      </div>
    );
  }
}

