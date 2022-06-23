import ChartBar from './ChartBar';
import './Chart.css';

export const Chart = ({ dataPoints }) => {
  const dataPointValues = dataPoints.map((datapoint) => datapoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className='chart'>
      {dataPoints.map((datapoint) => (
        <ChartBar
          key={datapoint.label}
          value={datapoint.value}
          maxValue={totalMaximum}
          label={datapoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
