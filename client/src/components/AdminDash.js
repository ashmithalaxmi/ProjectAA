import React from "react";
import { Link } from "react-router-dom";

function AdminDash (){

    return (
        <div className="adash">
            <center>
                <h1>Dashboard</h1>
                <br></br><br></br><br></br><br></br>
                <button><Link to='/signup'>Create User</Link></button>
                <br></br>
                <br></br>
                <button><Link to='/approve'>Approver Desk</Link></button>
            </center>
        </div>
    )
}

export default AdminDash