import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [skillsData, setSkillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    tech: '',
    proficiency: '',
    certification: '',
    status: 'Pending' // Set default status to 'Pending'
  });

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getskills');
      setSkillsData(response.data);
    } catch (error) {
      console.error('Error fetching Skills:', error);
    }
  };

  // Fetch projects when component mounts
  useEffect(() => {
    fetchSkills();
  }, []);

  // Function to handle adding a new skill
  // const addSkill = async () => {
  //   try {
  //     // Retrieve user's email from local storage
  //     const userEmail = localStorage.getItem("email");
  
  //     // Check if user email exists
  //     if (!userEmail) {
  //       console.error('User email not found');
  //       return;
  //     }

  //     // Add email field to newSkill object
  //     const newSkillWithUserEmail = { ...newSkill, email: userEmail };

  //     // Send the new skill data to the backend
  //     const response = await axios.post('http://localhost:8000/addskill', newSkillWithUserEmail);

  //     // If the skill is successfully added on the backend, update the frontend state
  //     if (response.status === 200) {
  //       // Update state with the new skill data returned from the backend
  //       setSkillsData([...skillsData, response.data]); // Assuming response.data contains the newly added skill
  //       setShowModal(false);
  //       // Reset newSkill state for next entry
  //       setNewSkill({
  //         tech: '',
  //         proficiency: '',
  //         certification: '',
  //         status: 'Pending' // Reset status to 'Pending' for next entry
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error adding skill:', error);
  //   }
  // };

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
  
      // If the skill is successfully added on the backend, update the frontend state
      if (response.status === 200) {
        // Fetch updated skills after adding a new skill
        await fetchSkills();
        
        setShowModal(false);
        // Reset newSkill state for next entry
        setNewSkill({
          tech: '',
          proficiency: '',
          certification: '',
          status: 'Pending' // Reset status to 'Pending' for next entry
        });
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowModal(true)}>Add Skill</button>
      {showModal && (
        // Modal for adding a new skill
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times; Close</span>
            <input
              type="text"
              placeholder="Tech"
              value={newSkill.tech}
              onChange={(e) => setNewSkill({ ...newSkill, tech: e.target.value })}
            />
            <input
              type="text"
              placeholder="Proficiency"
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
            />
            <input
              type="text"
              placeholder="Certificate Link"
              value={newSkill.certification}
              onChange={(e) => setNewSkill({ ...newSkill, certification: e.target.value })}
            />
            {/* Status is disabled as it's set automatically */}
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
            <th>Tech</th>
            <th>Proficiency</th>
            <th>Certificate Link</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{skill.tech}</td>
              <td>{skill.proficiency}</td>
              <td><a href={skill.certification} target="_blank" rel="noopener noreferrer">Certificate</a></td>
              <td>{skill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
