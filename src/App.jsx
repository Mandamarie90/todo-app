import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Todo from './Components/Todo';
import SettingsManagement from './Components/Form/index';
// import DisplaySettings from './Components/Display/DisplaySettings'; 
import { SettingsProvider } from './Context/Settings';
import LoginProvider from './Components/Auth/context'; // Correctly imported LoginProvider
import Auth from './Components/Auth/auth';
import Login from './Components/Auth/login';

const App = () => {
  return (
    <SettingsProvider>
      <LoginProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<SettingsManagement />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/display-settings" element={<DisplaySettings />} /> */}
            <Route 
              path="/authenticated" 
              element={
                <Auth>
                  <div>Any valid user can see this</div>
                </Auth>
              }
            />
            <Route 
              path="/create"
              element={
                <Auth capability="create">
                  <div>Users with create access can see this</div>
                </Auth>
              }
            />
            <Route 
              path="/update"
              element={
                <Auth capability="update">
                  <div>Users with update access can see this</div>
                </Auth>
              }
            />
            <Route 
              path="/delete"
              element={
                <Auth capability="delete">
                  <div>Users with delete access can see this</div>
                </Auth>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </LoginProvider>
    </SettingsProvider>
  );
};

export default App;
