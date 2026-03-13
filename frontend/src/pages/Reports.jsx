import { useState, useEffect } from 'react';
import api from '../api/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await api.get('/transactions');
        const transactions = res.data;

        // Group by month
        const monthlyData = transactions.reduce((acc, t) => {
          const month = t.date.substring(0, 7); // YYYY-MM
          if (!acc[month]) acc[month] = { income: 0, expense: 0 };
          if (t.type === 'INCOME') acc[month].income += t.amount;
          else acc[month].expense += t.amount;
          return acc;
        }, {});

        const sortedMonths = Object.keys(monthlyData).sort();

        setData({
          labels: sortedMonths,
          datasets: [
            {
              label: 'Income',
              data: sortedMonths.map(m => monthlyData[m].income),
              backgroundColor: '#22c55e',
            },
            {
              label: 'Expense',
              data: sortedMonths.map(m => monthlyData[m].expense),
              backgroundColor: '#ef4444',
            }
          ]
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) return <div>Loading reports...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Financial Reports</h1>
      
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Monthly Income vs Expenses</h3>
        <div style={{ height: '400px' }}>
          <Bar 
            data={data} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true }
              }
            }} 
          />
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Summary Insights</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
            This chart shows your financial trends over the months. Red bars represent spending while green bars represent earnings.
            Consistently seeing green bars higher than red bars indicates a healthy saving habit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
