import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const DEFAULT_PASSWORD = "hello123";

function Login() {
    const history=useNavigate();
    
    const [name, setName]=useState('')
    const [email,setEmail]=useState('')
    const [types,setTypes]=useState('')
    const [contact,setContact]=useState('')
    const [role,setRole]=useState('')
    //const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/signup",{
                name,email,types, password: DEFAULT_PASSWORD, contact, role
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                    alert("User created")
                    history("/",{state:{id:email}})
                }
            })
            .catch(e=>{
                console.log(e);
                alert("wrong details")
            })

        }
        catch(e){
            console.log(e);

        }

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
        <br/><br/>
        <div className="box">
        <div className="login">

            <h1>Signup</h1>

            <form onSubmit={submit}>
            <div className="form-group">
                    <label>Name: </label>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                       
                    />
                </div>
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
                    <label>Types: </label>
                    <input
                        type="types"
                        value={types}
                        onChange={(e) => setTypes(e.target.value)}
                        placeholder="Type"
                      
                    />
                </div>
                <div className="form-group">
                    <label>Phone: </label>
                    <input
                        type="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Contact"
                       
                    />
                </div>
                <div className="form-group">
                    <label>Roles: </label>
                    <input
                        type="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role"
                       
                    />
                </div>
                <br></br>
                <div className="ButtonU">
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        </div>
        </center>
        </div>
    )
}

export default Login