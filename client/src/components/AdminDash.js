import React from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminDash (){
    const navigate = useNavigate();
     
      const handleLogout = () => {
        // Clear access token from sessionStorage
        sessionStorage.removeItem('accessToken');
        // Redirect to login page
        navigate('/');
    };

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
        <div className="adash">
            <center>
                <h1>Dashboard</h1>
                <br/>
                <div className="useral">
                <div className="admincard">
                    <h2>Welcome Admin! </h2>
                    What is the schedule planned for Today?
                </div>
                <div className="ButtonU">
                <br/>
                <button><Link to='/signup'>Create User</Link></button>

                <button><Link to='/approve'>Skill Approver</Link></button>
                <button><Link to='/projectapprove'>Project Approver</Link></button>
                </div>
                </div>
            </center>
        </div>
      </div>
    )
}

export default AdminDash