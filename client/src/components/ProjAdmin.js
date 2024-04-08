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
  );
}

export default AdminProject;
