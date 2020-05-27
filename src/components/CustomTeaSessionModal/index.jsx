import React from 'react';
import Modal from 'react-modal';
import styles from './CustomTeaSessionModal.module.scss';
import Switch from '../Switch';

export default class CustomTeaSessionModal extends React.Component {
  state = {
    name: this.props.name || '',
    waterTemp: this.props.waterTemp || 70,
    amount: this.props.amount || '',
    amountWestern: this.props.amountWestern || '',
    infusions: this.props.infusions || [],
    infusionsWestern: this.props.infusionsWestern || [],
    infusionsText: this.props.infusions ? this.props.infusions.join(' ') : '',
    infusionsWesternText: this.props.infusionsWestern ? this.props.infusions.join(' ') : '',
    defaultTimeIncrement: this.props.defaultTimeIncrement || 0,
    defaultTimeIncrementWestern: this.props.defaultTimeIncrementWestern || 0,
    persist: this.props.editing || false,
  }

  handleSaveClick = () => {
    const { onSave, onClose } = this.props;

    if (this.state.persist) {
      if (
        this.isEmptyValue(this.state.name) ||
        this.isEmptyValue(this.state.infusionsText) ||
        this.isEmptyValue(this.state.infusionsWesternText) ||
        !this.validateInfusionTimes(this.state.infusionsText) ||
        !this.validateInfusionTimes(this.state.infusionsWesternText)
      ) {
        return;
      }
    }
    onSave({
      name: this.state.name,
      waterTemp: this.state.waterTemp,
      amount: this.state.amount,
      amountWestern: this.state.amountWestern,
      infusions: this.state.infusions,
      infusionsWestern: this.state.infusionsWestern,
      defaultTimeIncrement: this.state.defaultTimeIncrement,
      defaultTimeIncrementWestern: this.state.defaultTimeIncrementWestern,
    }, this.state.persist);
    onClose();
  }

  validateInfusionTimes = textValue => {
    return textValue.split(' ')
      .map(x => x.trim())
      .reduce((acc, curr) => acc && !isNaN(curr), true);
  }

  isEmptyValue = (value) => {
    if (Array.isArray(value)) {
      return value.length < 1;
    }

    return !value;
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
    this.handleChange('waterTemp', parseInt(e.target.value))
  };

  handleAmountChange = e => {
    this.handleChange('amount', e.target.value)
  };

  handleAmountWesternChange = e => {
    this.handleChange('amountWestern', e.target.value)
  };

  handleDefaultTimeIncrementChange = e => {
    this.handleChange('defaultTimeIncrement', parseInt(e.target.value))
  };

  handleDefaultTimeIncrementWesternChange = e => {
    this.handleChange('defaultTimeIncrementWestern', parseInt(e.target.value))
  };

  handleInfusionsChange = e => {
    this.handleChange('infusions',
      e.target.value
        .split(' ')
        .map(t => parseInt(t))
    );

    this.handleChange('infusionsText', e.target.value);
  };

  handleInfusionsWesternChange = e => {
    this.handleChange('infusionsWestern',
      e.target.value
        .split(' ')
        .map(t => parseInt(t))
    );

    this.handleChange('infusionsWesternText', e.target.value);
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
      amountWestern,
      infusionsText,
      infusionsWesternText,
      defaultTimeIncrement,
      defaultTimeIncrementWestern,
      persist,
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={onClose}
        contentLabel={this.props.editing ? `Edit ${this.props.name}` : "Create a new tea session"}
      >
        <h2 className={styles.title}>
          {
            this.props.editing ?
              `Edit ${this.props.name}` :
              'Create a new tea session'
          }
        </h2>
        <form onSubmit={this.handleSaveClick} className={styles.form}>
          <div className={styles.formRow}>
            <label htmlFor="name" title="Tea Name">Name *</label>
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
              title="Amount of tea to use (in grams/100ml) (Gong Fu / Western)"
              htmlFor="amount">Amount</label>
            <div className={styles.splitInputContainer}>
              <input
                name="amount"
                title="Gong Fu"
                value={amount}
                onChange={this.handleAmountChange} />
              <input
                name="amountWestern"
                title="Western"
                value={amountWestern}
                onChange={this.handleAmountWesternChange} />
            </div>
          </div>
          <div className={styles.formRow}>
            <label
              title="The amount by which to increase infusion time for extra infusions (in seconds.)"
              htmlFor="defaultTimeIncrement">Default Time Increment</label>
            <div className={styles.splitInputContainer}>
              <input
                name="defaultTimeIncrement"
                type="number"
                title="Gong Fu"
                min="0"
                value={defaultTimeIncrement}
                onChange={this.handleDefaultTimeIncrementChange} />
              <input
                name="defaultTimeIncrementWestern"
                title="Western"
                type="number"
                min="0"
                value={defaultTimeIncrementWestern}
                onChange={this.handleDefaultTimeIncrementWesternChange} />

            </div>
          </div>
          <div className={styles.formRow}>
            <label
              htmlFor="infusions"
              title="Infusion times, each number separated by a space (in seconds)."
            >
              Infusion Times (Gong Fu) *
            </label>
            <input
              name="infusions"
              value={infusionsText}
              onChange={this.handleInfusionsChange}
            />
          </div>

          <div className={styles.formRow}>
            <label
              htmlFor="infusionsWestern"
              title="Infusion times, each number separated by a space (in seconds)."
            >
              Infusion Times (Western) *
            </label>
            <input
              name="infusionsWestern"
              value={infusionsWesternText}
              onChange={this.handleInfusionsWesternChange}
            />
          </div>
          {
            !this.props.editing && <div className={styles.formRow}>
            <label
              htmlFor="persist"
              title="If you select this, this session will be save so you can use it later (on your device)"
            >
              Save for later
            </label>
            <div className={styles.switchContainer}>
              No &nbsp;<Switch onChange={this.handlePersistChange} value={persist} /> Yes
            </div>
          </div>
          }
        </form>

        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>Cancel</button>
          <button className={styles.button} onClick={this.handleSaveClick}>
            { this.props.editing ? 'Save' : 'Create' }
          </button>
        </div>
      </Modal>
    );
  }
}
