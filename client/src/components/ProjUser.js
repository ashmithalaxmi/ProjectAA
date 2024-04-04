import React, { useState } from 'react';

function UserProject() {
  const [projData, setProjData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProj, setNewProj] = useState({
    name: '',
    skill: '',
    description: '',
    status: 'Pending' // Set default status to 'Pending'
  });

  // Function to handle adding a new skill
  const addProj = () => {
    setProjData([...projData, newProj]);
    setNewProj({
      name: '',
      skill: '',
      description: '',
      //status: 'Pending' // Reset status to 'Pending' for next entry
    });
    setShowModal(false);
  };

  // Function to handle approving a certificate
//   const approveProject = (index) => {
//     const updatedProj = [...projData];
//     updatedProj[index].status = 'Approved'; // Change status to 'Approved'
//     setProjData(updatedProj);
//   };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowModal(true)}>Add Project</button>
      {showModal && (
        // Modal for adding a new skill
        // Implementation of modal content
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;close </span>
            <input
              type="text"
              placeholder="Project Name"
              value={newProj.name}
              onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tech stack"
              value={newProj.skill}
              onChange={(e) => setNewProj({ ...newProj, skill: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProj.level}
              onChange={(e) => setNewProj({ ...newProj, level: e.target.value })}
            />
            <button onClick={addProj}>Submit</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Skill</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projData.map((skill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{skill.name}</td>
              <td>{skill.skill}</td>
              <td>{skill.description}</td>
              <td>{skill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProject;