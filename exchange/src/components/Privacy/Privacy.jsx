import React from 'react';
import './privacy.css'; 

function Privacy() {
  return (
    <div className="container mt-5">
      <div className="privacy-section">
        <h1 className="privacy-header">Privacy Policy</h1>
        <p>Your privacy is important to us. This privacy statement explains the personal data we collect, how we process it, and for what purposes.</p>
      </div>
      <div className="privacy-section">
        <h2 className="privacy-header" >Information We Collect</h2>
        <p>We collect information to provide better services to our users. We collect information in the following ways:</p>
        <ul>
          <li>Information you give us directly.</li>
          <li>Information we get from your use of our services.</li>
        </ul>
      </div>
      <div className="privacy-section">
        <h2 className="privacy-header">How We Use Information</h2>
        <p>We use the information we collect to provide, maintain, protect, and improve our services, to develop new ones, and to protect our users.</p>
      </div>
      <div className="privacy-section">
        <h2 className="privacy-header">Information Sharing</h2>
        <p>We do not share personal information with companies, organizations, and individuals outside of our company unless one of the following circumstances applies:</p>
        <ul>
          <li>With your consent.</li>
          <li>For legal reasons.</li>
        </ul>
      </div>
      <div className="privacy-section">
        <h2 className="privacy-header">Changes to This Privacy Policy</h2>
        <p>Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page.</p>
      </div>
    </div>
  );
}

export default Privacy;
