import React from "react";

const MovieFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Movies</h4>
          <ul>
            <li>Now Showing</li>
            <li>Upcoming Movies</li>
            <li>Top Rated</li>
            <li>Genres</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Streaming Platforms</h4>
          <ul>
            <li>Netflix</li>
            <li>Disney+</li>
            <li>Amazon Prime</li>
            <li>HBO Max</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
      <hr></hr>
      <div className="footer-bottom">
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} MovieFlix. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default MovieFooter;