// DonutChart.jsx
const colors = {
  Expense: '#b54d68',
  Investment: '#e89d68',
  Savings: '#433355',
  Income: '#2ecc71'
};

const DonutChart = ({ transactions, totalBalance }) => {
  // Calculate totals per category
  const totals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  // Remove income from the chart if you only want to show the breakdown of outgoing?
  // Actually, let's include all of them in the chart. We can take absolute values to show proportion of activity.
  const chartData = Object.keys(totals).map(key => ({
    category: key,
    amount: Math.abs(totals[key])
  })).filter(d => d.amount > 0);

  const totalAmount = chartData.reduce((sum, d) => sum + d.amount, 0);

  // SVG parameters
  const size = 250;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="chart-container">
      <div className="svg-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {totalAmount === 0 ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth={strokeWidth}
            />
          ) : (
            chartData.map((data) => {
              const dashLength = (data.amount / totalAmount) * circumference;
              const gap = 5; // gap between segments
              const adjustedDashLength = Math.max(0, dashLength - gap);

              const strokeDasharray = `${adjustedDashLength} ${circumference}`;
              const strokeDashoffset = -currentOffset;

              currentOffset += dashLength;

              return (
                <circle
                  key={data.category}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={colors[data.category] || '#ccc'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              );
            })
          )}
        </svg>
        <div className="total-balance">
          <h3>Total Balance</h3>
          <p className="amount">₹{totalBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="legend">
        {chartData.map(data => {
          const percentage = Math.round((data.amount / totalAmount) * 100);
          return (
            <div className="legend-item" key={data.category}>
              <div className="legend-color-name">
                <div
                  className="color-box"
                  style={{ backgroundColor: colors[data.category] || '#ccc' }}
                />
                <span>{data.category}</span>
              </div>
              <span>{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutChart;
