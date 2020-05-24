import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

const Switch = (value) => (
  <label className={styles.switch}>
    <input type="checkbox" />
    <span className={styles.slider} />
  </label>
);

export default Switch;
