import React, { useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [skillsData, setSkillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    tech: '',
    proficiency: '',
    certificateLink: '',
    // projectExperience: '',
    status: 'Pending' // Set default status to 'Pending'
  });

  // Function to handle adding a new skill
  const addSkill = async () => {
    try {
      // Retrieve user's email from local storage
      const userEmail = localStorage.getItem("email");
  
      // Check if user email exists
      if (!userEmail) {
        console.error('User email not found');
        return;
      }
  
      // Add email field to newSkill object
    const newSkillWithUserEmail = { ...newSkill, email: userEmail };
      // Send the new skill data to the backend
      const response = await axios.post('http://localhost:8000/addskill', newSkillWithUserEmail);
      console.log(response.data)
      // If the skill is successfully added on the backend, update the frontend state
      if (response.status === 200) {
        setSkillsData([...skillsData, newSkill]);
        setShowModal(false);
        // Reset newSkill state for next entry
        setNewSkill({
          tech: '',
          proficiency: '',
          certificateLink: '',
          status: 'Pending' // Reset status to 'Pending' for next entry
        });
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
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
              placeholder="Skill"
              value={newSkill.skill}
              onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
            />
            <input
              type="text"
              placeholder="proficiency"
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
            />
            <input
              type="text"
              placeholder="Certificate Link"
              value={newSkill.certificateLink}
              onChange={(e) => setNewSkill({ ...newSkill, certificateLink: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status"
              value={newSkill.status}
              onChange={(e) => setNewSkill({ ...newSkill, status: e.target.value })}
              disabled
            />
            <button onClick={addSkill}>Submit</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Skill</th>
            <th>proficiency</th>
            <th>Certificate Link</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{skill.skill}</td>
              <td>{skill.proficiency}</td>
              <td><a href={skill.certificateLink} target="_blank" rel="noopener noreferrer">Certificate</a></td>
              <td>{skill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;