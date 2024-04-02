import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  )
}

export default Changepass