import React from 'react';
import Modal from 'react-modal';
import styles from './CustomTeaSessionModal.module.scss';

export default class CustomTeaSessionModal extends React.Component {
  state = {
    name: '',
    waterTemp: 70,
    amount: '',
    infusions: [],
    infusionsText: '',
    defaultTimeIncrement: 0,
    persist: false,
  }

  handleSaveClick = () => {
    const { onSave, onClose } = this.props;
    onSave(this.state);
    onClose();
  }

  handleChange = (stateKey, value) => {
    this.setState({
      [stateKey]: value
    });
  };

  handleNameChange = e => {
    this.handleChange('name', e.target.value)
  };

  handleWaterTempChange = e => {
    this.handleChange('waterTemp', e.target.value)
  };

  handleAmountChange = e => {
    this.handleChange('amount', e.target.value)
  };

  handleDefaultTimeIncrementChange = e => {
    this.handleChange('defaultTimeIncrement', e.target.value)
  };

  handleInfusionsChange = e => {
    this.handleChange('infusions',
      e.target.value
        .split(' ')
        .map(t => parseInt(t))
    );

    this.handleChange('infusionsText', e.target.value);
  };

  handlePersistChange = e => {
    this.handleChange('persist', e.target.checked)
  };

  render() {
    const { isOpen, onClose } = this.props;
    const {
      name,
      waterTemp,
      amount,
      infusionsText,
      defaultTimeIncrement,
      persist,
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={onClose}
        contentLabel="Add a custom tea session"
      >
        <h2 className={styles.title}>Create a tea session</h2>
        <form onSubmit={this.handleSaveClick} className={styles.form}>
          <div className={styles.formRow}>
            <label htmlFor="name" title="Tea Name">Name</label>
            <input name="name" value={name} onChange={this.handleNameChange} />
          </div>
          <div className={styles.formRow}>
            <label
              title="Brewing temperature (in °C)"
              htmlFor="waterTemp">Water Temperature</label>
            <input
              name="waterTemp"
              type="number"
              min="50"
              value={waterTemp}
              onChange={this.handleWaterTempChange} />
          </div>
          <div className={styles.formRow}>
            <label
              title="Amount of tea to use (in grams/100ml)"
              htmlFor="amount">Amount</label>
            <input
              name="amount"
              value={amount}
              onChange={this.handleAmountChange} />
          </div>
          <div className={styles.formRow}>
            <label
              title="The amount by which to increase infusion time for extra infusions (in seconds.)"
              htmlFor="defaultTimeIncrement">Default Time Increment</label>
            <input
              name="defaultTimeIncrement"
              type="number"
              min="0"
              value={defaultTimeIncrement}
              onChange={this.handleDefaultTimeIncrementChange} />
          </div>
          <div className={styles.formRow}>
            <label
              htmlFor="infusions"
              title="Infusion times, each number separated by a space (in seconds)."
            >
              Infusion Times
            </label>
            <input
              name="infusions"
              value={infusionsText}
              onChange={this.handleInfusionsChange}
            />
          </div>
          <div className={styles.formRow}>
            <label
              htmlFor="persist"
              title="If you select this, this session will be save so you can use it later (on your device)"
            >
              Save for later
            </label>
            <input
              name="persist"
              type="checkbox"
              checked={persist}
              onChange={this.handlePersistChange}
            />
          </div>
        </form>

        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>Cancel</button>
          <button className={styles.button} onClick={this.handleSaveClick}>Create</button>
        </div>
      </Modal>
    );
  }
}
