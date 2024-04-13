import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'

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
        <div className="navbar">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
        </svg> SKILL MATRIX
        </div>
    <div>
      <h1>Dashboard</h1>
      <div className='ButtonU'>
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
      <center>
      <br/>
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
      </center>
     </div>
     </div>
    </div>
  );
}

export default UserDashboard;
