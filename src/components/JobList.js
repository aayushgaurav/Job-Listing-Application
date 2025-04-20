import React from 'react';
import JobCard from './JobCard';

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return <div className="no-jobs">No jobs found. Try a different search.</div>;
  }
  
  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
}

export default JobList;