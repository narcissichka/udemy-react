import { useState, useRef } from 'react';
import { v4 } from 'uuid';

import { handleEvent } from '../../utils';

import styles from './UserInput.module.css';

const usernameRegex = "(([ ]?[a-z])+([ ]?[a-z]?['-]?[a-z]+)*)$";
const initialInputProps = {
  input__username: false,
  input__age: false,
  username: '',
  age: ''
};

const validation = (condition, input, cb) => {
  if (condition) {
    cb((prevState) => {
      return {
        ...prevState,
        [input.id]: false,
        [input.name]: input.value
      };
    });

    return false;
  }

  cb((prevState) => {
    return {
      ...prevState,
      [input.id]: true,
      [input.name]: input.value
    };
  });

  return true;
};

const validateUsername = (input, setInputProperties, setErrorMessage) => {
  if (!input.value) {
    setErrorMessage({ emptyUsername: 'Username field should not be empty' });
    return;
  }

  if (
    !validation(
      !input.value.match(new RegExp(input.dataset.regex, 'i')),
      input,
      setInputProperties
    )
  ) {
    setErrorMessage({
      invalidUsername: 'Username should only contain letters'
    });
    return;
  }

  setErrorMessage(null, ['invalidUsername', 'emptyUsername']);
};

const validateAge = (input, setInputProperties, setErrorMessage) => {
  if (!input.value) {
    setErrorMessage({ emptyAge: 'Age field should not be empty' });
    return;
  }

  if (!validation(isNaN(parseInt(input.value)), input, setInputProperties)) {
    return 'Age value should be a number';
  } else if (
    !validation(
      parseInt(input.value) <= 0 || parseInt(input.value) > 100,
      input,
      setInputProperties
    )
  ) {
    setErrorMessage({
      invalidAge: 'Invalid age value (considered to be from 1 to 99 years)'
    });
    return;
  }

  setErrorMessage(null, ['emptyAge', 'invalidAge']);
};

const validateInputHandler = (
  e,
  setInputProperties,
  setErrorMessage,
  validate
) => {
  const input = e.target;

  setErrorMessage(null, ['emptyFields']);
  validate(input, setInputProperties, setErrorMessage);
};

const submitFormHandler = (
  e,
  inputProperties,
  setShowModal,
  setErrorMessage,
  setUsers,
  setInputProperties,
  refUser,
  refAge
) => {
  e.preventDefault();


  if (!inputProperties['input__username'] || !inputProperties['input__age']) {
    setShowModal(true);
    return;
  }

  setInputProperties(initialInputProps);
  refUser.current.value = '';
  refAge.current.value = '';

  setErrorMessage({ emptyFields: 'Fields should not be empty' });
  setUsers({
    id: v4(),
    username: inputProperties.username,
    age: parseInt(inputProperties.age)
  });
};

export const UserInput = ({ setShowModal, setErrorMessage, setUsers }) => {
  const [inputProperties, setInputProperties] = useState(initialInputProps);
  const refUser = useRef(null);
  const refAge = useRef(null);

  const inputValidation = handleEvent.bind(
    this,
    validateInputHandler,
    setInputProperties,
    setErrorMessage
  );

  return (
    <form
      className={styles['user-input__form']}
      onSubmit={handleEvent(
        submitFormHandler,
        inputProperties,
        setShowModal,
        setErrorMessage,
        setUsers,
        setInputProperties,
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
          onInput={inputValidation(validateUsername)}
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
          onInput={inputValidation(validateAge)}
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
