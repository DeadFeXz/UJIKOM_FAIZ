import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Login = ({ onLogin }) => { // Ensure onLogin is received here
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Example credentials; replace with your authentication logic
    if (username === "admin" && password === "admin") {
      onLogin(); // Call the onLogin function to set logged-in state
      navigate(Sidebar); // Redirect to the Client page or your desired path
    } else {
      alert("Tolong diisi dengan username dan password yang valid");
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-gray-800'>
      <div className='hidden sm:block'>
        <img src="https://i.ibb.co.com/j3KLZFt/pngwing-com.png" alt="image" className='w-4/4 h-3/4 object-cover mx-auto mt-20' />
      </div>

      <div className='flex flex-col justify-center items-center bg-gray-900 p-8 rounded-lg shadow-lg shadow-gray-900/50'>
        <h2 className='text-2xl font-bold text-white mb-4'>Login Admin Joki</h2>
        <form className='max-w-[400px] w-full' onSubmit={handleLogin}>
          <div className='flex flex-col mb-4'>
            <label htmlFor="username" className='text-gray-400 mb-2'>Username</label>
            <input
              id="username"
              className='rounded-lg bg-gray-700 p-2 text-white focus:border-blue-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor="password" className='text-gray-400 mb-2'>Password</label>
            <input
              id="password"
              className='rounded-lg bg-gray-700 p-2 text-white focus:border-blue-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center'>
              <input id="remember" className='mr-2' type="checkbox" />
              <label htmlFor="remember" className='text-gray-400'>Remember Me</label>
            </div>
            <a href="/forgot-password" className='text-blue-500 hover:text-blue-700'>Forgot Password</a>
          </div>

          <button className='w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 transition-shadow duration-300'>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
