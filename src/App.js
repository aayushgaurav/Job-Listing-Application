import React, { useState, useEffect } from 'react';
import './App.css';
import JobList from './components/JobList';
import SearchBar from './components/SearchBar';
import AddJobForm from './components/AddJobForm';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pageView, setPageView] = useState('landing'); // 'landing', 'jobSeeker', 'employer'
  
  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      setIsSearchActive(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const searchJobs = async (text) => {
    if (!text.trim()) {
      fetchJobs();
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/posts/${text}`);
      if (!response.ok) {
        throw new Error('Failed to search jobs');
      }
      const data = await response.json();
      setJobs(data);
      setIsSearchActive(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addJob = async (jobData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add job');
      }
      
      // Refresh jobs list after adding a new job
      fetchJobs();
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (pageView === 'jobSeeker' || pageView === 'employer') {
      fetchJobs();
    }
  }, [pageView]);
  
  const renderContent = () => {
    switch (pageView) {
      case 'landing':
        return <LandingPage onSelectOption={setPageView} />;
        
      case 'jobSeeker':
        return (
          <>
            <div className="actions">
              <SearchBar onSearch={searchJobs} />
              <button 
                className="back-to-home-button" 
                onClick={() => setPageView('landing')}
              >
                Back to Home
              </button>
            </div>
            
            {isSearchActive && (
              <div className="back-button-container">
                <button className="back-button" onClick={fetchJobs}>
                  ← Back to All Jobs
                </button>
              </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
            
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <JobList jobs={jobs} />
            )}
          </>
        );
        
      case 'employer':
        return (
          <>
            <div className="actions employer-actions">
              <h2>Employer Dashboard</h2>
              <button 
                className="add-job-button" 
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add Job'}
              </button>
              <button 
                className="back-to-home-button" 
                onClick={() => setPageView('landing')}
              >
                Back to Home
              </button>
            </div>
            
            {showAddForm && <AddJobForm onAddJob={addJob} />}
            
            <div className="employer-job-list">
              <h3>Your Current Job Listings</h3>
              {error && <div className="error-message">{error}</div>}
              
              {isLoading ? (
                <div className="loading">Loading...</div>
              ) : (
                <JobList jobs={jobs} />
              )}
            </div>
          </>
        );
        
      default:
        return <LandingPage onSelectOption={setPageView} />;
    }
  };
  
  return (
    <div className="App">
      <Header />
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;