import React, { useState } from 'react';

function AddJobForm({ onAddJob }) {
  const [formData, setFormData] = useState({
    profile: '',
    desc: '',
    exp: '',
    techs: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert experience to number and technologies to array
    const jobData = {
      ...formData,
      exp: parseInt(formData.exp),
      techs: formData.techs.split(',').map(tech => tech.trim()),
    };
    
    onAddJob(jobData);
  };
  
  return (
    <div className="add-job-form-container">
      <h2>Add New Job Listing</h2>
      <form className="add-job-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profile">Job Profile</label>
          <input
            type="text"
            id="profile"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="desc">Job Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="exp">Experience Required (years)</label>
          <input
            type="number"
            id="exp"
            name="exp"
            min="0"
            value={formData.exp}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="techs">Technologies (comma-separated)</label>
          <input
            type="text"
            id="techs"
            name="techs"
            placeholder="Java, Spring, MongoDB, React"
            value={formData.techs}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">Add Job</button>
      </form>
    </div>
  );
}

export default AddJobForm;