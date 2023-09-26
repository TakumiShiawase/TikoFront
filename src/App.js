import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Logo from './a.svg'
import Home from './icon-home.svg'
import Library from './icon-library.svg'
import History from './icon-history.svg'
import Book from './icon-book.svg'
import Drop from './drop.svg'
import Setting from './icon-setting.svg'
import Help from './icon-help.svg'
import Avatar from './avatart.svg'
import Search from './seach.svg'
import Google from './google.svg'
import Face from './face.svg'


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
    </Router>
  )
}


function Login () {
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    axios.get('http://127.0.0.1:8000/users/api/login/')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });
const data = { key: 'value' };
axios.post('http://127.0.0.1:8000/users/api/login/', data)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/users/api/login/', { email, password })
            .then(response => {
              setLoggedIn(true);
              history.push('/');
            })
    }

  return (
      <div className='formContainer'>
          <div className='formWrapper'>
          <Link to='/'><span className='logo-register'><img src={Logo}></img></span></Link>
              <span className='google'><div className='google_button'><a className='google-button'><img className='google_icon' src={Google}></img>Sign in via Google</a></div></span>
              <span className='google'><div className='face_button'><a className='face-button'><img className='face_icon' src={Face}></img>Sign in via Facebook</a></div></span>
              <hr className='login_hr'></hr>
              <form className='log-form'>
                  <input type="email" placeholder='email' className='em-log' value={email} onChange={e => setEmail(e.target.value)}/>
                  <input type="password" placeholder='password' className='pas-log' value={password} onChange={e => setPassword(e.target.value)}/>
                  <span ><a className='forgot-log'>Forgot Password?</a></span>
                  <Link to='/register'><a className='create-log'>Create Account</a></Link>
                  {loggedIn ? (<p>Вы вошли в систему! Перенаправление...</p>
      ) : (<button className='button-log' onClick={handleLogin}>Sign in</button>)}
              </form>
          </div>
      </div>
  )
}


export default App;
