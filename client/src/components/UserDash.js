import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css'
import { useNavigate} from "react-router-dom";

function UserDash() {
    const [userProfile, setUserProfile] = useState(null);
    
    const navigate = useNavigate();
     
      const handleLogout = () => {
        // Clear access token from sessionStorage
        sessionStorage.removeItem('accessToken');
        // Redirect to login page
        navigate('/');
    };

    useEffect(() => {
        // Fetch user details from MongoDB
        const userEmail = localStorage.getItem("email"); // Get email from local storage

        axios.get("http://localhost:8000/getuserdetail", {
            params: {
                email: userEmail
            }
        })
        .then(response => {
            console.log(response)
            setUserProfile(response.data.user);
           
        })
        .catch(error => {
            console.error("Error fetching user profile:", error);
        });
    }, []);

    return (
        <div>
        <div className="navbar">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
        </svg> SKILL MATRIX
        <div className="logout">
        <button onClick={handleLogout} className="text-gray-300 hover:text-white" style={{padding:"6px"}}>Logout</button>
        </div>
        </div>
       <center>
        <div className="udash">
            { console.log(userProfile)}
            <center>
                <h1>Dashboard</h1>
                <div className="useral">
                <div className="usercard">
                    {/* Display user profile */}
                    {userProfile && (
                        <>
                            <p>Name: {userProfile.name}</p>
                            <p>Email: {userProfile.email}</p>
                            <p>Type: {userProfile.types}</p>
                            <p>Contact: {userProfile.contact}</p>
                            <p>Role: {userProfile.role}</p>
                        </>
                    )}
                </div>
                <div className="ButtonU" >
                <button><Link to='/skills'>Skills</Link></button>
                <button><Link to='/project'>Project</Link></button>
                </div>
                </div>
            </center>
        </div>
        </center>
        </div>
    );
}

export default UserDash;
