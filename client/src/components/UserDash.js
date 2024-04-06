// import React from "react";
// import { Link } from "react-router-dom";

// function UserDash (){

//     return (
//         <div className="udash">
//             <center>
//                 <h1>Dashboard</h1>
//                 <br></br><br></br><br></br><br></br>
//                 <button><Link to='/signup'>User Profile</Link></button>
//                 <br></br>
//                 <br></br>
//                 <button><Link to='/skills'>Skills</Link></button>
//                 <br></br>
//                 <br></br>
//                 <button><Link to='/project'>Project</Link></button>
//             </center>
//         </div>
//     )
// }

// export default UserDash;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserDash() {
    const [userProfile, setUserProfile] = useState(null);


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
        <div className="udash">
            { console.log(userProfile)}
            <center>
                <h1>Dashboard</h1>
                <br /><br /><br /><br /><br />
                <div>
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
                <br />
                <button><Link to='/skills'>Skills</Link></button>
                <br />
                <br />
                <button><Link to='/project'>Project</Link></button>
            </center>
        </div>
    );
}

export default UserDash;
