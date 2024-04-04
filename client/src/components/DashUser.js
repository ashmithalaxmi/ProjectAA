import React, { useState } from 'react';

function UserDashboard() {
  const [skillsData, setSkillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    skill: '',
    level: '',
    certificateLink: '',
    projectExperience: '',
    status: 'Pending' // Set default status to 'Pending'
  });

  // Function to handle adding a new skill
  const addSkill = () => {
    setSkillsData([...skillsData, newSkill]);
    setNewSkill({
      name: '',
      skill: '',
      level: '',
      certificateLink: '',
      projectExperience: '',
      status: 'Pending' // Reset status to 'Pending' for next entry
    });
    setShowModal(false);
  };

  // Function to handle approving a certificate
  const approveCertificate = (index) => {
    const updatedSkills = [...skillsData];
    updatedSkills[index].status = 'Approved'; // Change status to 'Approved'
    setSkillsData(updatedSkills);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowModal(true)}>Add Skill</button>
      {showModal && (
        // Modal for adding a new skill
        // Implementation of modal content
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;close </span>
            <input
              type="text"
              placeholder="Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skill"
              value={newSkill.skill}
              onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
            />
            <input
              type="text"
              placeholder="Level"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            />
            <input
              type="text"
              placeholder="Certificate Link"
              value={newSkill.certificateLink}
              onChange={(e) => setNewSkill({ ...newSkill, certificateLink: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Experience"
              value={newSkill.projectExperience}
              onChange={(e) => setNewSkill({ ...newSkill, projectExperience: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status"
              value={newSkill.status}
              onChange={(e) => setNewSkill({ ...newSkill, status: e.target.value })}
            />
            <button onClick={addSkill}>Submit</button>
          </div>
        </div>
      )}
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
            <th>Action</th> {/* New column for action */}
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

export default UserDashboard;
