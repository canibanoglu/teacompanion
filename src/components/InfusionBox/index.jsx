import React from 'react';
import styles from './index.module.css';
import cx from 'classnames';

const InfusionCard = ({
  time,
  index,
  done,
  extra = false,
}) => {
  const frontCardClassName = cx(styles.cardFront, {
    [styles.done]: done
  });

  return (
    <div className={styles.infusionCard}>
      <div className={styles.cardInner}>
        <div className={frontCardClassName}>
          { index + 1 }{ extra ? '*' : null }
        </div>
        <div className={styles.cardBack}>
          { `${time} secs.` }
        </div>
      </div>
    </div>
  );
}

export default InfusionCard;
