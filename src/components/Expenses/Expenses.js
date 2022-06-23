import { useState } from 'react';

import Card from '../UI/Card';
import ExpensesList from './ExpensesList';
import ExpensesFilter from './ExpensesFilter';

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
      <ExpensesList expenses={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
