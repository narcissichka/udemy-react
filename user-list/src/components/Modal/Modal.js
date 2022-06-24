import styles from './Modal.module.css';

import { handleEvent } from '../../utils';

const hideModalHandler = (e, setShowModal) => {
  setShowModal(false);
};

export const Modal = ({ setShowModal, errors }) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles['modal__wrapper']} ${styles['flex']}`}>
        <h2 className={styles['modal__header']}>Invalid input</h2>
        <div className={`${styles['modal__content']} ${styles['flex']}`}>
          <div>
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key]}</p>
            ))}
          </div>
          <button
            className={styles['modal__button']}
            onClick={handleEvent(hideModalHandler, setShowModal)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
