import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthorizationContext } from './contexts/auth-context';

function App() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: '', email: '', nickname: '' });

  return (
    <AuthorizationContext.Provider value={{
      nav: navigate,
      setUserData: setUserData,
      userData: userData
    }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthorizationContext.Provider>
  );
}

export default App;
