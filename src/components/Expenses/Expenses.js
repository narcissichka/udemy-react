import { useState } from 'react';

import { ExpenseItem } from './ExpenseItem';
import { ExpensesFilter } from './ExpensesFilter';
import Card from '../UI/Card';

import './Expenses.css';

const selectYear = (setYear, value) => {
  setYear(value);
};

export const Expenses = ({ expenses }) => {
  const [yearToFilter, setYearToFilter] = useState('2022');
  const filteredExpenses = expenses.filter(
    (expense) => expense.date.getFullYear() === parseInt(yearToFilter)
  );

  return (
    <Card className='expenses'>
      <ExpensesFilter
        selected={yearToFilter}
        onSelectYear={selectYear.bind(this, setYearToFilter)}
      />
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
};
