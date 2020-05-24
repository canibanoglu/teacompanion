import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

const Switch = ({ value, onChange }) => (
  <label className={styles.switch}>
    <input type="checkbox" onChange={onChange} checked={value} />
    <span className={styles.slider} />
  </label>
);

export default Switch;
