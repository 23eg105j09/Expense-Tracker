import { useState, useEffect } from 'react';
import api from '../api/api';
import TransactionForm from '../components/TransactionForm';
import { TrendingUp, TrendingDown, CreditCard, Plus } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, monthlyExpenses: 0, balance: 0, categorySpending: {} });
  const [transactions, setTransactions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [summaryRes, transactionsRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/transactions')
      ]);
      setSummary(summaryRes.data);
      setTransactions(transactionsRes.data.slice(0, 5)); // Only show last 5
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (data) => {
    try {
      await api.post('/transactions', data);
      fetchData();
    } catch (err) {
      alert('Failed to add transaction');
    }
  };

  const chartData = {
    labels: Object.keys(summary.categorySpending),
    datasets: [{
      data: Object.values(summary.categorySpending),
      backgroundColor: ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#475569'],
    }]
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
        <button className="btn-primary" onClick={() => setIsFormOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add New
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#ecfdf5', color: '#059669', borderRadius: '12px' }}><TrendingUp /></div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Income</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${(summary.totalIncome || 0).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#fef2f2', color: '#dc2626', borderRadius: '12px' }}><TrendingDown /></div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Expenses</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${(summary.totalExpenses || 0).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#fff7ed', color: '#c2410c', borderRadius: '12px' }}><CreditCard /></div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Monthly Spending</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${(summary.monthlyExpenses || 0).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#f5f3ff', color: '#4f46e5', borderRadius: '12px' }}><CreditCard /></div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Net Balance</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${(summary.balance || 0).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Spending by Category</h3>
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            {Object.keys(summary.categorySpending).length > 0 ? (
              <Pie data={chartData} />
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No data available</p>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Recent Transactions</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.75rem 0' }}>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 0' }}>{t.description}</td>
                    <td>{t.category}</td>
                    <td style={{ color: t.type === 'INCOME' ? 'var(--success)' : 'var(--danger)', fontWeight: '500' }}>{t.type}</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${(t.amount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TransactionForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onAdd={handleAddTransaction} 
      />
    </div>
  );
};

export default Dashboard;
