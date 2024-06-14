import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios'; // Assuming axios is set up for HTTP requests


const AuthContext = createContext({
  user: null, // Ensure all properties are initialized
  login: () => {},
  logout: () => {},
  hasCapability: () => false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = cookie.get('auth_token');
    return token ? { isLoggedIn: true, token } : null;
  });

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('https://auth-server-2eag.onrender.com/auth/signin', { username, password });
      const { token, userData } = response.data;
      cookie.set('auth_token', token, { expires: 1 }); // Store token in a cookie, expires in 1 day
      setUser({ ...userData, isLoggedIn: true, token });
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to handle it in UI components if needed
    }
  }, []);

  const logout = useCallback(() => {
    cookie.remove('auth_token');
    setUser(null);
  }, []);

  const hasCapability = useCallback((capability) => {
    return user?.capabilities?.includes(capability) ?? false;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasCapability }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from "jwt-decode";
// import axios from 'axios';

// import Auth from '../../Components/Auth/auth';

// export const AuthContext = React.createContext();

// const API = import.meta.env.VITE_API;

// function AuthProvider(props) {

//   const [loggedIn, setLoggedIn] = useState(false);
//   const [user, setUser] = useState({});

//   // can('delete') should return true or false
//   function can(permission) {
//     return user.capabilities && user.capabilities.includes(permission);
//   }

  // Pretending to login
  // Really ... we should be calling the API to validate the user
  // The API would return a token
//   async function login(username, password) {

//     const request = {
//       method: 'post',
//       baseURL: API,
//       url: '/auth/signin',
//       auth: {
//         username: username,
//         password: password
//       }
//     }

//     const response = await axios(request);

//     validateToken(response.data);

//   }

//   function logOut() {
//     setLoggedIn(false);
//     setUser({});
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }

//   function validateToken(data) {
//     try {
//       let validUser = jwtDecode(data.token);
//       setUser(data.user);
//       setLoggedIn(true);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//     } catch (e) {
//       console.warn('Token Validation Error', e);
//       setUser({});
//       setLoggedIn(false);
//     }
//   }

//   useEffect(() => {
//     let token = localStorage.getItem('token');
//     let user = localStorage.getItem('user');
//     if (token) {
//       user = JSON.parse(user);
//       let data = { token, user };
//       validateToken(data);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loggedIn, user, login, logOut, can }}>
//       {props.children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider;