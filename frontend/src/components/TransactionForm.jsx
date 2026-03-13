import { useState } from 'react';
import { X } from 'lucide-react';

const TransactionForm = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'EXPENSE',
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Salary', 'Entertainment', 'Healthcare', 'Others'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, amount: parseFloat(formData.amount) });
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      type: 'EXPENSE',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add Transaction</h3>
          <button onClick={onClose} style={{ background: 'none' }}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Amount</label>
              <input 
                type="number" 
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
