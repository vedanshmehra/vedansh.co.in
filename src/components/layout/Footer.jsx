import './Footer.css';
import brandLogo from '../../assets/web-logo.png';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="brand-logo">
                            <img src={brandLogo} alt="Logo" className="logo-image" />
                            <span className="logo-text">VEDANSH<span className="accent"> MEHRA</span></span>
                        </div>
                        <p className="brand-tagline">
                            Cloud DevOps Engineer | AWS Solutions Architect
                        </p>
                        <div className="brand-status">
                            <span className="status-dot"></span>
                            <span className="status-text">All systems operational</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-title">Navigation</h4>
                        <ul className="footer-links">
                            <li><a href="#hero">Mission Control</a></li>
                            <li><a href="#skills">Infrastructure Map</a></li>
                            <li><a href="#experience">Deployment History</a></li>
                            <li><a href="#projects">Active Instances</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-section">
                        <h4 className="footer-title">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#certifications">Certifications</a></li>
                            <li><a href="#tech">Tech Stack</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* System Info */}
                    <div className="footer-section">
                        <h4 className="footer-title">System Info</h4>
                        <div className="system-info">
                            <div className="info-row">
                                <span className="info-label">Region:</span>
                                <span className="info-value">ap-south-1</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Version:</span>
                                <span className="info-value">v3.5.0</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Status:</span>
                                <span className="info-value status-online">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="copyright">
                        <span>© {currentYear} Vedansh Mehra - Cloud DevOps Engineer. All rights reserved.</span>
                    </div>
                    <div className="footer-meta">
                        <span className="meta-item">Deployed on Cloud</span>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="footer-decoration">
                <div className="decoration-line"></div>
            </div>
        </footer>
    );
}
