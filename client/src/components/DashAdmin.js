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
  );
}

export default AdminDashboard;
