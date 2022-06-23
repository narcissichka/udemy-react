import { useState } from 'react';

import ExpenseForm from './ExpenseForm';

import { handleEvent } from '../../utils';
import './NewExpense.css';

const saveExpenseDataHandler = (onAddExpense, enteredExpenseData) => {
  const expenseData = {
    ...enteredExpenseData,
    date: new Date(enteredExpenseData.date),
    id: Math.random().toString()
  };

  onAddExpense(expenseData);
};

const toggleExpenseFormHandler = (e, setVisible) =>
  setVisible((prevState) => !prevState);

export const NewExpense = ({ onAddExpense }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleExpenseForm = handleEvent(
    toggleExpenseFormHandler,
    setIsFormVisible
  );

  return (
    <div className='new-expense'>
      {isFormVisible ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler.bind(this, onAddExpense)}
          toggleExpenseFormHandler={toggleExpenseForm}
        />
      ) : (
        <button type='button' onClick={toggleExpenseForm}>
          Add New Expense
        </button>
      )}
    </div>
  );
};

export default NewExpense;
