import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <Wallet size={32} color="#6366f1" />
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ExpenseTracker</h1>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px' }}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/transactions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px' }}>
          <ReceiptText size={20} />
          <span>Transactions</span>
        </Link>
        <Link to="/reports" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px' }}>
          <PieChart size={20} />
          <span>Reports</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.75rem', 
            background: 'transparent',
            color: '#ef4444',
            textAlign: 'left'
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
