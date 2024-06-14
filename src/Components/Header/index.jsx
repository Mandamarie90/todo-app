import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', marginBottom: '20px', textAlign: 'center' }}>
    <h1>To Do Application</h1>
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/settings">Settings</Link> | 
      <Link to="/login">Login</Link>
    </nav>
  </header>
);

export default Header;
