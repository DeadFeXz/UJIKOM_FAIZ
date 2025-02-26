import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './components/navbar.jsx'
import Mainpage from './components/mainpage.jsx';
import Footer from './components/footer.jsx'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/> 
    <Mainpage/>
   <Footer/>
    <App />
  </React.StrictMode>
);

