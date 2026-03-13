import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Welcome back, {user?.username}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user?.username}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</p>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--background)', display: 'flex', alignItems: 'center', justify: 'center' }}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
