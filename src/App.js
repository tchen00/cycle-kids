
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';

import Routes from "./routes/Routes";

const App = () => {
  return (
    // <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
    // </AuthProvider>
  );
};

export default App;