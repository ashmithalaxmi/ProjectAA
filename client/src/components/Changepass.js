import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const Changepass = () => {
    const navigate = useNavigate();
    const email = new URLSearchParams(useLocation().search).get('email');
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        axios.post('http://localhost:8000/update', {email, newpassword: password})
            .then((res) => {
              console.log(res);
                if(res.status === 200) {
                    alert('Updated Password');
                    navigate("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

  return (
    <div>
        <div className="navbar">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
        </svg> SKILL MATRIX
        </div>
       <center>
    <div className='box'>
     <div className='login'>
        <h1>Reset Password</h1>
        <br/>
      <form className="login-form" onSubmit={(e)=>{
          e.preventDefault();
          handleSubmit();
        }}>
          <div className="form-group">
           <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit">Update Password</button>
      </form>
     </div> 
    </div>
    </center>
    </div>
  )
}

export default Changepass