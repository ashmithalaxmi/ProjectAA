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
      <h1>Dashboard</h1>
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
  );
}

export default UserProject;