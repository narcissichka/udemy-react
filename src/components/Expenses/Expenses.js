import { useState } from 'react';

import { ExpenseItem } from './ExpenseItem';
import { ExpensesFilter } from './ExpensesFilter';
import Card from '../UI/Card';

import './Expenses.css';

const selectYear = (setYear, value) => {
    setYear(value);
}

export const Expenses = ({ expenses }) => {
    const [yearToFilter, setYearToFilter] = useState('');
    const expensesList = [];

    console.log(yearToFilter);

    expenses.forEach((item) => {
        expensesList.push(<ExpenseItem key={item.id} title={item.title} amount={item.amount} date={item.date} />);
    });

    return (
        <div>
            <ExpensesFilter onSelectYear={selectYear.bind(this, setYearToFilter)}/>
            <Card className='expenses'>
                {expensesList}
            </Card>
        </div>
    );
}