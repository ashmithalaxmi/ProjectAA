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
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default Login