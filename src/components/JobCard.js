import React from 'react';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2 className="job-title">{job.profile}</h2>
      <div className="job-experience">Experience: {job.exp} years</div>
      <p className="job-description">{job.desc}</p>
      <div className="job-tech">
        <h3>Technologies:</h3>
        <div className="tech-tags">
          {job.techs && job.techs.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobCard;