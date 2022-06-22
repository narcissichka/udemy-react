import { useState } from 'react';

import { handleEvent } from '../../utils';
import './ExpenseForm.css';

const inputChangeHandler = (e, setValue, key) => {
  setValue((prevState) => {
    return {
      ...prevState,
      [key]: e.target.value
    };
  });
};

const submitHandler = (e, userInput, setUserInput, onSaveData) => {
  e.preventDefault();

  onSaveData(userInput);
  setUserInput({
    title: '',
    amount: '',
    date: ''
  });
};

export const ExpenseForm = ({ onSaveExpenseData }) => {
  const [userInput, setUserInput] = useState({
    title: '',
    amount: '',
    date: ''
  });

  //presetting arguments
  const userInputHandler = handleEvent.bind(
    this,
    inputChangeHandler,
    setUserInput
  );

  return (
    <form onSubmit={handleEvent(submitHandler, userInput, setUserInput, onSaveExpenseData)}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={userInput.title}
            onChange={userInputHandler('title')}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            value={userInput.amount}
            min='0.01'
            step='0.01'
            onChange={userInputHandler('amount')}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            value={userInput.date}
            min='2019-01-01'
            max='2022-12-31'
            onChange={userInputHandler('date')}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};
