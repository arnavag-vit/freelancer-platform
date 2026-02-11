import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/workpage.css';

import workIcon from '../Assets/Images/homepage_org_img2.svg';
import chatIcon from '../Assets/Images/homepage_org_img3.svg';
import profileImage from '../Assets/Images/john_doe.png';
import uiUxImage from '../Assets/Images/ux-ui-design-icon-outline-illustration-vector.jpg';
import mobileAppImage from '../Assets/Images/00_Hero-21.png';
import ecommerceImage from '../Assets/Images/e-commerce-website-doodle-icon-design-illustration-ecommerce-and-shopping-symbol-on-white-background-eps-10-file-vector.jpg';
import brandIdentityImage from '../Assets/Images/brand-identity-line-icon-linear-style-sign-mobile-concept-web-design-badge-outline-vector-recognition-personality-345038010.webp';

const WorkPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const [workItems, setWorkItems] = useState([
    {
      id: 1,
      name: 'Business 1',
      description: 'Logo designing and Custom templates.',
      status: 'revision',
      dueDate: '22 March 2025'
    },
    {
      id: 2,
      name: 'Business 2',
      description: 'UI/UX design.',
      status: 'in-progress',
      dueDate: '22 March 2025'
    }
  ]);
  
  const jobListings = [
    {
      id: 1,
      title: 'UI/UX development and custom Templates',
      dueDate: '22 March 2025',
      price: '$1000',
      terms: '50% upfront, 50% on completion',
      image: uiUxImage,
      rating: 4.5,
      budget: 1000
    },
    {
      id: 2,
      title: 'Mobile App Interface Design',
      dueDate: '28 March 2025',
      price: '$1500',
      terms: '40% upfront, 60% on completion',
      image: mobileAppImage,
      rating: 4.6,
      budget: 1500
    },
    {
      id: 3,
      title: 'E-commerce Website Redesign',
      dueDate: '5 April 2025',
      price: '$2000',
      terms: '30% upfront, 70% on completion',
      image: ecommerceImage,
      rating: 4.7,
      budget: 2000
    },
    {
      id: 4,
      title: 'Brand Identity Package',
      dueDate: '10 April 2025',
      price: '$1200',
      terms: '50% upfront, 50% on completion',
      image: brandIdentityImage,
      rating: 4.4,
      budget: 1200
    }
  ];
  

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  

  const handleMessageClick = () => {
    alert('Message functionality to be implemented!');
  };
  
  const handleUpdateStatus = (id) => {
    const newStatus = prompt('Enter new status (e.g., In Progress, Completed, etc.):');
    if (newStatus) {
      setWorkItems(workItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus.toLowerCase().replace(/\s+/g, '-')
          };
        }
        return item;
      }));
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase().trim());
  };
  
  const filteredJobListings = jobListings.filter(job => {
    if (searchText === '') return true;
    return (
      job.title.toLowerCase().includes(searchText) ||
      job.dueDate.toLowerCase().includes(searchText) ||
      job.price.toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <div className="nav-content">
            <div className="nav-group">
              <div className="logo-container">
                <h1 className="logo-text">LinkLancer</h1>
              </div>
              <Link to="/homepage" className="nav-link">Home</Link>
            </div>
            <div className="nav-group">
              <img src={workIcon} alt="Work icon" className="nav-icon" />
              <Link to="/workpage" className="nav-link nav-link-active">Work</Link>
            </div>
            <div className="nav-group">
              <img src={chatIcon} alt="Chat icon" className="nav-icon-chat" />
              <Link to="/messaging_interface" className="nav-link">Chat</Link>
            </div>
          </div>
          <Link to="/detailssection">
            <img src={profileImage} alt="User profile" className="nav-profile-img" />
          </Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          {/* Ongoing Work Section */}
          <section className="ongoing-work" aria-label="Ongoing work">
            <div className="ongoing-work-container">
              <h2 className="section-title">Ongoing Work</h2>
              <div className="work-filter">
                <label htmlFor="work-status" className="filter-label">Filter by Status:</label>
                <select 
                  id="work-status" 
                  className="status-dropdown"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="all">All</option>
                  <option value="revision">Revision</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {workItems.map(item => (
                <article 
                  key={item.id}
                  className="work-item" 
                  data-status={item.status}
                  style={{ display: selectedStatus === 'all' || item.status === selectedStatus ? 'block' : 'none' }}
                >
                  <h3 className="freelancer-name">{item.name}</h3>
                  <p className="work-details">
                    {item.description}<br />
                    Status: <span className="status-text">{item.status.charAt(0).toUpperCase() + item.status.slice(1).replace(/-/g, ' ')}</span><br />
                    Due by: {item.dueDate}
                  </p>
                  <div className="work-actions">
                    <button 
                      className="action-btn message-btn" 
                      aria-label={`Message ${item.name}`}
                      onClick={handleMessageClick}
                    >
                      Message
                    </button>
                    <button 
                      className="action-btn update-btn" 
                      aria-label={`Update status for ${item.name}`}
                      onClick={() => handleUpdateStatus(item.id)}
                    >
                      Update Status
                    </button>
                  </div>
                  <hr className="divider" />
                </article>
              ))}
            </div>
          </section>

          {/* Freelance Work Section */}
          <section className="freelance-listings" aria-label="Freelance listings">
            <div className="listings-container">
              <h2 className="listings-title">Top freelance work for you</h2>
              <p className="listings-subtitle">Based on your profile, preferences, and skills</p>

              <form className="search-filters" action="#" method="GET">
                <input 
                  type="text" 
                  className="search-box" 
                  placeholder="Search for projects or skills..." 
                  aria-label="Search projects or skills"
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <button 
                  type="button" 
                  className="filters-button" 
                  aria-label="Open filters"
                  onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                >
                  Filters
                </button>
                {isFilterModalOpen && (
                  <div className="filters-modal">
                    <label><input type="checkbox" name="rating" value="4+" /> Rating 4+</label>
                    <label><input type="checkbox" name="budget" value="100-500" /> Budget $100-$500</label>
                    <button 
                      type="button" 
                      className="apply-filters" 
                      aria-label="Apply filters"
                      onClick={() => setIsFilterModalOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </form>

              <div className="listings-grid">
                {filteredJobListings.map(job => (
                  <React.Fragment key={job.id}>
                    <article className="job-card" data-rating={job.rating} data-budget={job.budget}>
                      <div className="job-image">
                        <img className="job-image-src" src={job.image} alt={`${job.title} image`} />
                      </div>
                      <div className="job-details">
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-stats">
                          Due by: {job.dueDate}<br />
                          Project Price: {job.price} ({job.terms})
                        </p>
                        <button className="hire-btn" aria-label={`Hire for ${job.title}`}>
                          Hire Now
                        </button>
                      </div>
                    </article>
                    <hr className="listing-divider" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default WorkPage;