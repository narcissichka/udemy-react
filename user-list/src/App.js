import React, { useState } from 'react';
import { v4 } from 'uuid';

import Card from './components/UI/Card';
import Modal from './components/Modal/Modal';
import UserInput from './components/UserInput/UserInput';
import UserList from './components/UserList/UserList';

import styles from './App.module.css';

const toggleModal = (setShowModal, value) => {
  setShowModal(value);
};

const changeErrorMessage = (setErrorMessage, error, keysToDelete) => {
  if (error) {
    setErrorMessage((prevState) => {
      return { ...prevState, ...error };
    });
    return;
  }

  keysToDelete.forEach((key) => {
    setErrorMessage((prevState) => {
      const copy = { ...prevState };

      delete copy[key];
      return copy;
    });
  });
};

const postUserOnSubmit = (setUsers, user) => {
  setUsers((prevState) => [...prevState, user]);
};

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    emptyFields: 'Fields should not be empty'
  });
  const [users, setUsers] = useState([{ id: v4(), username: 'Max', age: 31 }]);

  return (
    <div>
      {showModal && (
        <Modal
          errors={errorMessage}
          setShowModal={toggleModal.bind(this, setShowModal)}></Modal>
      )}
      <Card className={styles['user-input']}>
        <UserInput
          setShowModal={toggleModal.bind(this, setShowModal)}
          setErrorMessage={changeErrorMessage.bind(this, setErrorMessage)}
          setUsers={postUserOnSubmit.bind(this, setUsers)}></UserInput>
      </Card>
      <Card className={styles['user-list']}>
        <UserList users={users}></UserList>
      </Card>
    </div>
  );
};

export default App;
