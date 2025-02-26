import { useState } from "react";

import raps from "../assets/raps.png";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, stayLoggedIn });
  };

  return (
    <div>
      <nav className="container-navbar">
        <div className="navbar-text">
          <img src={raps} alt="Logo" className="logo" />
          <ul>
            <li><a href="#">Beranda</a></li>
          </ul>
          <ul>
            <li><a href="#">Our Story</a></li>
          </ul>
          <ul>
            <li><a href="#">Contact Us</a></li>
          </ul>
          <button className="button" onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Close" : "Login"}
          </button>
          <button className="button" onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? "Close" : "Register"}
          </button>
        </div>
      </nav>
      {showLogin && (
        <div className="container">
          <div className="card">
            <h2>Selamat Datang</h2>
            <h3>Masukan Username dan Password Anda</h3>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={stayLoggedIn}
                  onChange={() => setStayLoggedIn(!stayLoggedIn)}
                />
                <span className="checkbox-text">Stay logged in</span>
                <span className="checkbox-text">
                  <a href="#">Buat Akun?</a>
                  </span>
              </label>
              <button type="submit" className="button-login">Login</button>
            </form>
          </div>
        </div>
      )}
      {showRegister && (
        <div className="container">
          <div className="card">
            <h2>Selamat Datang</h2>
            <h3>Masukan Username dan Password Anda</h3>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Masukan Username Baru"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
              <input
                type="password"
                placeholder="Masukan Password Baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            
              <button type="submit" className="button-login">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
