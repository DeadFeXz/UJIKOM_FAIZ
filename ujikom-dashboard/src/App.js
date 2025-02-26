import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Client from './components/client/client';
import Worker from './components/worker/worker';
import Sidebar from './components/Sidebar';
import Transaksi from './components/transaksi/transaksi';
import TanggalMasuk from './components/tanggalmasuk/tanggalmasuk';
import TanggalKeluar from './components/tanggalkeluar/tanggalkeluar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged-out state
  };

  return (
    <Router>
      <div className='flex'>
        {isLoggedIn && <Sidebar onLogout={handleLogout} />} {/* Pass handleLogout to Sidebar */}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/Client" element={<Client />} />
              <Route path="/Worker" element={<Worker />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/tanggalmasuk" element={<TanggalMasuk />} />
              <Route path="/tanggalkeluar" element={<TanggalKeluar />} />
              <Route path="*" element={<Navigate to="/Client" />} />
            </>
          ) : (
            <>
              <Route path="/Login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/Login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
