import { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import { handleEvent } from '../../utils';

const toggleExpenseFormHandler = (e, setVisible) =>
  setVisible((prevState) => !prevState);

export const NewExpenseContent = ({ onSaveExpenseData }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleExpenseForm = handleEvent(
    toggleExpenseFormHandler,
    setIsFormVisible
  );

  return (
    <div>
      {isFormVisible ? (
        <ExpenseForm
          onSaveExpenseData={onSaveExpenseData}
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

export default NewExpenseContent;
