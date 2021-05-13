import React, { useState } from 'react'
import './Components/css/Login.css'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import Header from './Components/Header'
import Routes from './Routes'
//begin: json-server
import { db } from './API';
//end: json-server
import logo from './resources/SE.png'

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user"))

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(db.endpoints);
    const user = { username, password };
    const userNameSearch = await db.endpoints.Teachers.getAll();
    var found = userNameSearch.data.filter(function (value) { return value.userName === user.username })
    console.log(found);
    if (found.length !== 0) {
      if (found[0].password === user.password) {
        console.log("logged in as: ", found[0].firstName);
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify(found[0]))
        // set the state of the user
        setUser(found[0])
      }
    }
  };
  // if there's a user show the message below
  if (user) {
    return (
      <div className='dom'>
        <Router>
          <Header />
          <Routes />
        </Router>
      </div>
    );
  }

  // if there's no user, show the login form
  return (
    <div class="form-login-container">
      <img className="login-logo" src={logo} alt="Logo" />
      <div class="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default App;
