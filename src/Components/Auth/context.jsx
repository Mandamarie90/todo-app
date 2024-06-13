import { createContext, useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTUxNjIzOTAyMn0.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwidXBkYXRlIl0sImlhdCI6MTUxNjIzOTAyMn0.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiXSwiaWF0IjoxNTE2MjM5MDIyfQ.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiXSwiaWF0IjoxNTE2MjM5MDIyfQ.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Initialize user state with null
  const [error, setError] = useState(null);

  const login = (username, password) => {
    const auth = testUsers[username];

    if (auth && auth.password === password) {
      try {
        const decodedToken = jwt_decode(auth.token);
        setLoggedIn(true);
        setUser({ name: auth.name, capabilities: decodedToken.capabilities });
        setError(null);
        cookie.save('auth', auth.token);
      } catch (error) {
        setLoggedIn(false);
        setUser(null);
        setError(error.message);
        console.error('Token decode error:', error);
      }
    } else {
      setLoggedIn(false);
      setUser(null);
      setError('Invalid username or password');
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    cookie.remove('auth');
  };

  useEffect(() => {
    const token = cookie.load('auth');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setLoggedIn(true);
        setUser({ name: decodedToken.name, capabilities: decodedToken.capabilities });
      } catch (error) {
        console.error('Token decode error:', error);
        setLoggedIn(false);
        setUser(null);
        setError(error.message);
      }
    }
  }, []);

  const can = (capability) => {
    return user && user.capabilities.includes(capability);
  };

  return (
    <LoginContext.Provider value={{ loggedIn, user, error, login, logout, can }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;