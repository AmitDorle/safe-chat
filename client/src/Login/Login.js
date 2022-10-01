import React from 'react'
import {useState} from 'react'
import axios from 'axios';

import './Login.css'
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser()
  {

    const response = await axios.post('/login', {
      email: email,
      password: password})

      if(response.data.success === true)
      {
        alert("Logged in successful")
        const user = response.data.data;
        localStorage.setItem('user',JSON.stringify(user))
      }
      else
      {
        alert("login failed")
      }

    setEmail("");
    setPassword("");
  }

  return (
    <div>
    <div className="row">
    <div className="col-md-12">
    <div className="my-form">
        <h2 className="text-center">Sign In</h2>

        <div class="mb-3">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="Enter Your Email"
           value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>

        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Enter Your Password"
            value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>

        <button type="button" className="btn btn-warning w-100" onClick={loginUser}>Login</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login