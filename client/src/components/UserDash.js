import React from "react";
import { Link } from "react-router-dom";

function UserDash (){

    return (
        <div className="udash">
            <center>
                <h1>Dashboard</h1>
                <br></br><br></br><br></br><br></br>
                <button><Link to='/signup'>User Profile</Link></button>
                <br></br>
                <br></br>
                <button><Link to='/skills'>Skills</Link></button>
                <br></br>
                <br></br>
                <button><Link to='/project'>Project</Link></button>
            </center>
        </div>
    )
}

export default UserDash;