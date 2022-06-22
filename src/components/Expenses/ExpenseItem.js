import { useState } from 'react';

import { ExpenseDate } from './ExpenseDate';
import Card from '../UI/Card';

import { handleEvent } from '../../utils';
import './ExpenseItem.css';

const clickHandler = (e, newTitle, setTitle) => {
    setTitle(newTitle);
};

export const ExpenseItem = ({ title, amount, date }) => {
    const [expenseTitle, setExpenseTitle] = useState(title);

    return (
        <Card className="expense-item">
            <ExpenseDate date={date} />
            <div className="expense-item__description">
                <h2>{expenseTitle}</h2>
                <span className="expense-item__price">${amount}</span>
            </div>
            <button onClick={handleEvent(clickHandler, 'new title', setExpenseTitle)}>Change Title</button>
        </Card>
    );
};
