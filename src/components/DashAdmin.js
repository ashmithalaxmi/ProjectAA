import React, { useState } from 'react';

function AdminDashboard() {
  const [skillsData, setSkillsData] = useState([
    { name: 'John', skill: 'JavaScript', level: 'Advanced', certificateLink: 'http://example.com/certificate', projectExperience: '12 months', status: 'Pending' },
    { name: 'Jane', skill: 'React', level: 'Beginner', certificateLink: 'http://example.com/certificate', projectExperience: '6 months', status: 'Pending' }
  ]);

  // Function to approve a certificate
  const approveCertificate = (index) => {
    const updatedSkills = [...skillsData];
    updatedSkills[index].status = 'Approved';
    setSkillsData(updatedSkills);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Skill</th>
            <th>Level</th>
            <th>Certificate Link</th>
            <th>Project Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{skill.name}</td>
              <td>{skill.skill}</td>
              <td>{skill.level}</td>
              <td><a href={skill.certificateLink} target="_blank" rel="noopener noreferrer">Certificate</a></td>
              <td>{skill.projectExperience}</td>
              <td>{skill.status}</td>
              <td>
                {/* Render action button conditionally based on status */}
                {skill.status === 'Pending' && (
                  <button onClick={() => approveCertificate(index)}>Approve</button>
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
