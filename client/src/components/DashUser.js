import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [skillsData, setSkillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    skill: '',
    level: '',
    certificateLink: '',
    // projectExperience: '',
    status: 'Pending' // Set default status to 'Pending'
  });

  // useEffect(() => {
  //   // Fetch userID (ObjectID) from backend
  //   const fetchUserID = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/getUserID');
  //       console.log(response.data);
  //       return response.data.userID;
  //     } catch (error) {
  //       console.error('Error fetching userID:', error);
  //     }
  //   };

  //   fetchUserID()
  //     .then(userID => {
  //       // Set userID in newSkill state
  //       setNewSkill(prevState => ({
  //         ...prevState,
  //         userID
  //       }));
  //     });
  // }, []);

  // Function to handle adding a new skill
  const addSkill = async () => {
    try {
      // Send skill data along with userID to backend
      const response = await axios.post('http://localhost:8000/addSkill', newSkill);
      console.log('Skill added successfully:', response.data);
      setSkillsData([...skillsData, newSkill]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  // Function to handle approving a certificate
  // const approveCertificate = (index) => {
  //   const updatedSkills = [...skillsData];
  //   updatedSkills[index].status = 'Approved'; // Change status to 'Approved'
  //   setSkillsData(updatedSkills);
  // };
  

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
            {/* <input
              type="text"
              placeholder="Project Experience"
              value={newSkill.projectExperience}
              onChange={(e) => setNewSkill({ ...newSkill, projectExperience: e.target.value })}
            /> */}
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
            <th>Level</th>
            <th>Certificate Link</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{skill.skill}</td>
              <td>{skill.level}</td>
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
