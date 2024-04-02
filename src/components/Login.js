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

            if (res.data === "exist") {
                // Check if the provided credentials match the admin credentials
                if (email === "abc@gmail.com" && password === "hello123") {
                    navigate("/signup");
                } else {
                    alert("Invalid credentials. Only admin can access the signup page.");
                }
            } else if (res.data === "notexist") {
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
                    <button type="submit">Submit</button>
                    <br />
                    <p>Don't have an account?</p>
                    <Link to="/signup">Signup Page</Link>
                    <br />
                    <br/>
                    <button type="submit" onClick={()=>{onChangeClicked();}}>
                       Change password
                       
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
