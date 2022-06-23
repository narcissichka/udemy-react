import { handleEvent } from '../../utils';
import './ExpensesFilter.css';

const selectYearHandler = (e, setYear) => {
  setYear(e.target.value);
};

export const ExpensesFilter = ({ selected, onSelectYear }) => {
  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select
          value={selected}
          onChange={handleEvent(selectYearHandler, onSelectYear)}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
