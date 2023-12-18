import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Video from './pages/video';
import Profile from './pages/profile';
import Upload from './pages/upload';

import Fallback from './pages/fallback';

function App() {
  const [user, setUser] = useState(null);
  const appId = '658098d3a7748fcc4079';
  const token = Cookies.get('token');

  useEffect(() => {
    const checkUser = async () => {
      const response = await axios.get('https://yt-api.hcklikk.com/auth', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user'))
        }
      }, { withCredentials: true });
      if(response.data) {
        setUser(response.data);
      }
    };
    if(localStorage.getItem('user')) {
      if(JSON.parse(localStorage.getItem('ttl')) < new Date().getTime()) {
        localStorage.removeItem('user');
        localStorage.removeItem('ttl');
      } else {
        checkUser();
      }
    }
    if (token) {
      if (!user) {
        const getUser = async () => {
          const res = await axios.get('https://auth-api.hcklikk.com/auth', {
            headers: {
              jwt_token: token
            }
          });
          if (res.data.jwt) {
            Cookies.set('token', res.data.jwt, { expires: 7 });
          }
          setUser(res.data);
        }
        getUser();
      }
    } else {
      if (window.location.pathname.startsWith('/fallback')) {
        return;
      } else if (localStorage.getItem('autoLogin')) {
        window.location.href = 'https://auth-dev.hcklikk.com/auth/' + appId;
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile/:id" element={<Profile user={user} />} />
          <Route path="/upload" element={<Upload user={user} />} />
          <Route path="/video/:id" element={<Video user={user} />} />
          <Route path="/fallback/:jwt" element={<Fallback />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
