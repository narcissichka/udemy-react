import ExpenseItem from './ExpenseItem';
import './Expenses.css';

export default function Expenses({ expenses }) {
    let expensesList = [];
    expenses.forEach((item) => {
        expensesList.push(<ExpenseItem title={item.title} amount={item.amount} date={item.date} />);
    });

    return (
        <div className='expenses'>
            {expensesList}
        </div>
    );
}