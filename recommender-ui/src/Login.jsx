import { useState } from 'react';
import axios from 'axios';
import './Login.css';
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const loginUser = async () => {
      try {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
        const res = await axios.post('http://localhost:8080/login', { email, password }, {headers: headers});
        onLogin(res.data.user);
      } catch (err) {
        alert('Login failed');
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={loginUser}>Login</button>
        </div>
      </div>
    );
  };

export default Login;