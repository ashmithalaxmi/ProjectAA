import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProject() {
  const [projData, setProjData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProj, setNewProj] = useState({
    projname: '',
    tech: '',
    description: '',
    status: 'Pending' // Set default status to 'Pending'
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getproject');
      setProjData(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to handle adding a new project
const addProj = async () => {
  try {
    // Retrieve user's email from local storage
    const userEmail = localStorage.getItem("email");

    // Check if user email exists
    if (!userEmail) {
      console.error('User email not found');
      return;
    }

    // Add email field to newProject object
    const newProjectWithUserEmail = { ...newProj, email: userEmail };

    // Send the new project data to the backend
    const response = await axios.post('http://localhost:8000/addproject', newProjectWithUserEmail);

    // If the project is successfully added on the backend, fetch projects again to update the state
    if (response.status === 200) {
      await fetchProjects(); // Fetch projects immediately after adding a new project
      setShowModal(false);
      // Reset newProject state for next entry
      setNewProj({
        projname: '',
        tech: '',
        description: '',
        status: 'Pending'
      });
    }
  } catch (error) {
    console.error('Error adding project:', error);
  }
};


  // Function to handle approving a certificate
//   const approveProject = (index) => {
//     const updatedProj = [...projData];
//     updatedProj[index].status = 'Approved'; // Change status to 'Approved'
//     setProjData(updatedProj);
//   };

  return (
    <div>
        <div className="navbar">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
        </svg> SKILL MATRIX
        </div>
    <div>
      <h1>Dashboard</h1>
      <div className='ButtonU'>
      <button onClick={() => setShowModal(true)}>Add Project</button>
      {showModal && (
        // Modal for adding a new skill
        // Implementation of modal content
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;close </span>
            <input
              type="text"
              placeholder="Project Name"
              value={newProj.projname}
              onChange={(e) => setNewProj({ ...newProj, projname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tech stack"
              value={newProj.tech}
              onChange={(e) => setNewProj({ ...newProj, tech: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProj.description}
              onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status"
              value={newProj.status}
              onChange={(e) => setNewProj({ ...newProj, status: e.target.value })}
              disabled
            />
            <button onClick={addProj}>Submit</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Project Name</th>
            <th>Tech Stack</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projData.map((proj, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{proj.projname}</td>
              <td>{proj.tech}</td>
              <td>{proj.description}</td>
              <td>{proj.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}

export default UserProject;