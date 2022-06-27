import { useRef } from 'react';
import { v4 } from 'uuid';

import { handleEvent } from '../../utils';
import styles from './UserInput.module.css';

const usernameRegex = "(([ ]?[a-z])+([ ]?[a-z]?['-]?[a-z]+)*)$";

const validateUsername = (input, setErrorMessage) => {
  if (!input.value) {
    setErrorMessage({ emptyUsername: 'Username field should not be empty' });
    return false;
  }

  if (!input.value.match(new RegExp(input.dataset.regex, 'i'))) {
    setErrorMessage({
      invalidUsername: 'Username should only contain letters'
    });
    return false;
  }

  setErrorMessage(null, ['invalidUsername', 'emptyUsername']);
  return true;
};

const validateAge = (input, setErrorMessage) => {
  if (!input.value) {
    setErrorMessage({ emptyAge: 'Age field should not be empty' });
    return false;
  }

  if (isNaN(parseInt(input.value))) {
    setErrorMessage({
      NaNAge: 'Invalid age value (considered to be a number from 1 to 99 years)'
    });
    return false;
  }

  if (parseInt(input.value) <= 0 || parseInt(input.value) > 100) {
    setErrorMessage({
      invalidAge: 'Invalid age value (considered to be from 1 to 99 years)'
    });
    return false;
  }

  setErrorMessage(null, ['emptyAge', 'invalidAge']);
  return true;
};

const validateInputHandler = (input, setErrorMessage, validate) => {
  setErrorMessage(null, ['emptyFields']);
  return validate(input, setErrorMessage);
};

const submitFormHandler = (
  e,
  setShowModal,
  setErrorMessage,
  setUsers,
  refUser,
  refAge
) => {
  e.preventDefault();

  if (
    !validateInputHandler(refUser.current, setErrorMessage, validateUsername) ||
    !validateInputHandler(refAge.current, setErrorMessage, validateAge)
  ) {
    setShowModal(true);
    return;
  }

  setErrorMessage({ emptyFields: 'Fields should not be empty' });
  setUsers({
    id: v4(),
    username: refUser.current.value,
    age: parseInt(refAge.current.value)
  });

  refUser.current.value = '';
  refAge.current.value = '';
};

export const UserInput = ({ setShowModal, setErrorMessage, setUsers }) => {
  const refUser = useRef(null);
  const refAge = useRef(null);

  return (
    <form
      className={styles['user-input__form']}
      onSubmit={handleEvent(
        submitFormHandler,
        setShowModal,
        setErrorMessage,
        setUsers,
        refUser,
        refAge
      )}>
      <div className={styles['user-input__block']}>
        <label
          className={styles['user-input__label']}
          htmlFor='input__username'>
          Username
        </label>
        <input
          className={styles['user-input__input']}
          id='input__username'
          name='username'
          type='text'
          data-regex={usernameRegex}
          ref={refUser}
        />
      </div>
      <div className={styles['user-input__block']}>
        <label className={styles['user-input__label']} htmlFor='input__age'>
          Age (years)
        </label>
        <input
          className={styles['user-input__input']}
          id='input__age'
          name='age'
          type='number'
          min='1'
          max='99'
          step='1'
          ref={refAge}
        />
      </div>
      <button className={styles['user-input__button']} type='submit'>
        Add User
      </button>
    </form>
  );
};

export default UserInput;
