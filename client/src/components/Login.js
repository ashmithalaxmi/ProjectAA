import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/", {
                email,
                password
            });

            if (res.data.exist) {
                if (res.data.role === "admin") {
                    localStorage.setItem("email", email);
                    localStorage.setItem("role", "admin");
                    navigate("/admindash");
                } else {
                    localStorage.setItem("email", email);
                    localStorage.setItem("role", "user");
                    navigate("/userdash");
                }
            } else {
                alert("User has not signed up");
            }
        } catch (error) {
            console.error(error);
            alert("Please try again.");
        }
    };

    const onChangeClicked = async () => {
        axios
          .get('http://localhost:8000/update', {params: {requestingUser: email}})
          .then((res) => {
            if(res.status === 200)
              alert('Mail Sent!');
          }).catch(err => {
            console.log(err);
          });
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
        <br/>
        <br/>
        <div className="box">
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Pass: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <br></br>
                    <div className="ButtonU">
                    <button type="submit">Submit</button>
                   <br />
                    <br/>
                    <button type="submit" onClick={()=>{onChangeClicked();}}>
                       Change Pass?
                       
                    </button>
                    </div> 
                </form>
            </div>
        </div>
      </center>
      </div> 
    );
}

export default Login;