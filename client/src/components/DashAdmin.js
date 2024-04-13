import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    // Fetch skills data from the API
    fetch('http://localhost:8000/getskills')
      .then(response => response.json())
      .then(data => setSkillsData(data))
      .catch(error => console.error('Error fetching skills data:', error));
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  // Function to approve a certificate
  const approveCertificate = (id) => {
    // Send a request to your backend API to update the status to 'Approved'
    fetch(`http://localhost:8000/approveCertificate/${id}`, {
      method: 'PATCH', // Assuming you use PATCH method for updating
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Approved' })
    })
    .then(response => {
      if (response.ok) {
        // If the request was successful, update the status in frontend state
        const updatedSkills = skillsData.map(skill => {
          if (skill._id === id) {
            return { ...skill, status: 'Approved' };
          }
          return skill;
        });
        setSkillsData(updatedSkills);
      } else {
        throw new Error('Failed to update certificate status');
      }
    })
    .catch(error => console.error('Error approving certificate:', error));
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
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>ID</th>
            <th>Skill</th>
            <th>Level</th>
            <th>Certificate Link</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, index) => (
            <tr key={skill._id}>
              <td>{index + 1}</td>
              <td>{skill.userId}</td>
              <td>{skill.tech}</td>
              <td>{skill.proficiency}</td>
              <td><a href={skill.certificationLink} target="_blank" rel="noopener noreferrer">Certificate</a></td>
              <td>{skill.status}</td>
              <td>
                {/* Render action button conditionally based on status */}
                {skill.status === 'Pending' && (
                  <button onClick={() => approveCertificate(skill._id)}>Approve</button>
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

export default AdminDashboard;
