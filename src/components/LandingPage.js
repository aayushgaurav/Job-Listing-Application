import React from 'react';

function LandingPage({ onSelectOption }) {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <h1>Welcome to the Job Portal</h1>
        <p>Find your next opportunity or hire great talent</p>
      </div>
      
      <div className="option-cards">
        <div className="option-card" onClick={() => onSelectOption('jobSeeker')}>
          <div className="option-icon">👨‍💼</div>
          <h2>Get a Job</h2>
          <p>Browse job listings and find your next career opportunity</p>
          <button className="option-button">Find Jobs</button>
        </div>
        
        <div className="option-card" onClick={() => onSelectOption('employer')}>
          <div className="option-icon">🏢</div>
          <h2>Hire for a Job</h2>
          <p>Post job openings and find the perfect candidates</p>
          <button className="option-button">Post Jobs</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;