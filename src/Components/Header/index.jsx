import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>To Do Application</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/settings">Settings</Link>
    </nav>
  </header>
);

export default Header;