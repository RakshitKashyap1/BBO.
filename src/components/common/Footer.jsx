/**
 * @file Footer.jsx
 * @description Renders the global footer component for the application.
 * It uses a combination of inline styles and CSS variables to maintain the Neo-Brutalist look.
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer: Functional component that displays company info, links, and contact details.
 */
export default function Footer() {
  return (
    <footer style={{
      borderTop: 'var(--border-width) solid var(--border)',
      backgroundColor: 'var(--accent)', // High contrast yellow background
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        {/* Main Footer Content Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-8" style={{ paddingBottom: '2rem', borderBottom: 'var(--border-width) solid var(--border)' }}>
          
          {/* Brand/About Section */}
          <div className="md:col-span-1">
            <Link to="/" className="navbar-brand" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
              BBO.
            </Link>
            <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              The ultimate medium for brands to find the perfect billboard and for owners to list their space.
            </p>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: 'none' }}>Company</h3>
            <ul className="flex-col gap-2">
              <li><Link to="/" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">About Us</Link></li>
              <li><Link to="/" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">Careers</Link></li>
              <li><Link to="/" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">Blog</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: 'none' }}>Legal</h3>
            <ul className="flex-col gap-2">
              <li><Link to="/" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">Privacy Policy</Link></li>
              <li><Link to="/" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">Terms of Service</Link></li>
              <li><Link to="/" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">Cookie Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: 'none' }}>Connect</h3>
            <ul className="flex-col gap-2">
              <li><a href="mailto:hello@bbo.com" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">hello@bbo.com</a></li>
              <li><a href="tel:+1234567890" style={{ fontWeight: 600, display: 'inline-block', borderBottom: '2px solid transparent' }} className="hover-border">+91 6201621893</a></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom Bar: Copyright and minor links */}
        <div className="flex justify-between items-center" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
          <div>&copy; 2026 Billboard Organiser. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/" className="hover-border" style={{ borderBottom: '2px solid transparent' }}>Sitemap</Link>
            <Link to="/" className="hover-border" style={{ borderBottom: '2px solid transparent' }}>Security</Link>
          </div>
        </div>
      </div>
      
      {/* Dynamic styles for footer hover effects */}
      <style>{`
        .hover-border:hover { border-bottom-color: var(--border) !important; }
      `}</style>
    </footer>
  );
}

