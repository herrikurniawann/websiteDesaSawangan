import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState('Dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const SidebarLink = ({ label, href = '#' }) => (
    <li className="nav-item">
      <a 
        href={href} 
        className={`nav-link ${activeLink === label ? 'active bg-secondary' : ''}`}
        onClick={() => setActiveLink(label)}
      >
        {label}
      </a>
    </li>
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div 
        className={`sidebar bg-dark text-white ${isSidebarOpen ? 'open' : 'closed'}`}
      >
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          {isSidebarOpen && <h4 className="mb-0">Admin Panel</h4>}
          <button 
            className="btn btn-link text-white p-0 toggle-btn"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {isSidebarOpen && (
          <ul className="nav flex-column mt-3">
            <SidebarLink label="Dashboard" />
            <SidebarLink label="Profile" />
            <SidebarLink label="Settings" />
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className={`main-content flex-grow-1 ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">
              {activeLink}
            </span>
            <div className="ms-auto">
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-3">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-danger">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarAdmin;