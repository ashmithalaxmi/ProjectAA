import React, { useState, useEffect } from 'react';

function AdminProject() {
  const [projData, setProjData] = useState([]);

  useEffect(() => {
    // Fetch skills data from the API
    fetch('http://localhost:8000/getproject')
      .then(response => response.json())
      .then(data => setProjData(data))
      .catch(error => console.error('Error fetching project data:', error));
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  // Function to approve a certificate
  const approveProject = (id) => {
    // Send a request to your backend API to update the status to 'Approved'
    fetch(`http://localhost:8000/approveProject/${id}`, {
      method: 'PATCH', // Assuming you use PATCH method for updating
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Approved' })
    })
    .then(response => {
      if (response.ok) {
        // If the request was successful, update the status in frontend state
        const updatedProj = projData.map(proj => {
          if (proj._id === id) {
            return { ...proj, status: 'Approved' };
          }
          return proj;
        });
        setProjData(updatedProj);
      } else {
        throw new Error('Failed to update project status');
      }
    })
    .catch(error => console.error('Error approving project:', error));
  };

  return (
    <div>
    <div className="navbar">
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
    </svg> SKILL MATRIX
    </div>
   <center>
    <div>
      <h1>Project Approval</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Project Name</th>
            <th>Tech Stack</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projData.map((proj, index) => (
            <tr key={proj._id}>
              <td>{index + 1}</td>
              <td>{proj.projname}</td>
              <td>{proj.tech}</td>
              <td>{proj.description}</td>
              <td>{proj.status}</td>
              <td>
                {/* Render action button conditionally based on status */}
                {proj.status === 'Pending' && (
                  <button onClick={() => approveProject(proj._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
    </div>
  );
}

export default AdminProject;
