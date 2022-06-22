import { ExpenseForm } from './ExpenseForm';
import './NewExpense.css';

const saveExpenseDataHandler = (onAddExpense, enteredExpenseData) => {
    const expenseData = {
        ...enteredExpenseData,
        date: new Date(enteredExpenseData.date),
        id: Math.random().toString()
    }

    onAddExpense(expenseData);
};

export const NewExpense = ({ onAddExpense }) => {
    return (
        <div className='new-expense'>
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler.bind(this, onAddExpense)} />
        </div>
    );
};
