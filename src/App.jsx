import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Todo from './Components/Todo';
import SettingsManagement from './Components/Form/index';
// import DisplaySettings from './Components//Display/DisplaySettings'; 
import { SettingsProvider } from './Context/Settings';

const App = () => {
  return (
    <SettingsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/settings" element={<SettingsManagement />} />
          {/* <Route path="/display-settings" element={<DisplaySettings />} /> */}
        </Routes>
        <Footer />
      </Router>
    </SettingsProvider>
  );
};

export default App;
