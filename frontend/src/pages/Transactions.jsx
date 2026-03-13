import { useState, useEffect } from 'react';
import api from '../api/api';
import { Search, Filter, Edit2, Trash2, Calendar } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Salary', 'Entertainment', 'Healthcare', 'Others'];

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
      setFilteredTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let result = transactions;
    if (searchTerm) {
      result = result.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter !== 'All') {
      result = result.filter(t => t.category === categoryFilter);
    }
    if (dateFilter) {
      result = result.filter(t => t.date === dateFilter);
    }
    setFilteredTransactions(result);
  }, [searchTerm, categoryFilter, dateFilter, transactions]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.delete(`/transactions/${id}`);
        fetchTransactions();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Transactions</h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Search size={16} /> Search</label>
            <input 
              type="text" 
              placeholder="Search description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Filter size={16} /> Category</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Date</label>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem' }}>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>{t.date}</td>
                  <td>{t.description}</td>
                  <td><span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: '#f1f5f9', fontSize: '0.875rem' }}>{t.category}</span></td>
                  <td style={{ color: t.type === 'INCOME' ? 'var(--success)' : 'var(--danger)', fontWeight: '500' }}>{t.type}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${t.amount.toFixed(2)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      <button style={{ background: 'none', color: 'var(--secondary)' }}><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(t.id)} style={{ background: 'none', color: 'var(--danger)' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No transactions found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
