import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import './Navbar.css';

const navLinks = [
    { id: 'hero', label: 'Mission Control', icon: '🎯' },
    { id: 'skills', label: 'Infrastructure', icon: '🗺️' },
    { id: 'experience', label: 'Deployments', icon: '📦' },
    { id: 'projects', label: 'Instances', icon: '💻' },
    { id: 'certifications', label: 'Credentials', icon: '🛡️' },
    { id: 'tech', label: 'Inventory', icon: '📊' },
    { id: 'contact', label: 'Connect', icon: '📡' }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { region, toggleTheme } = useTheme();
    const { level, levelProgress, totalXP, visitorCount } = useGame();
    const { scrollProgress, activeSection } = useScrollProgress();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Progress bar */}
                <div className="navbar-progress">
                    <motion.div
                        className="navbar-progress-fill"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                <div className="navbar-container">
                    {/* Logo */}
                    <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
                        <span className="logo-icon">☁️</span>
                        <span className="logo-text">VEDANSH<span className="logo-accent">.</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="navbar-links">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(link.id)}
                            >
                                <span className="nav-icon">{link.icon}</span>
                                <span className="nav-label">{link.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="navbar-right">
                        {/* XP Bar */}
                        <div className="navbar-xp">
                            <span className="xp-level">LVL {level}</span>
                            <div className="xp-bar">
                                <div
                                    className="xp-fill"
                                    style={{ width: `${levelProgress * 100}%` }}
                                />
                            </div>
                            <span className="xp-amount">{totalXP} XP</span>
                        </div>

                        {/* Visitor Count */}
                        <div className="navbar-visitors">
                            <span className="visitors-icon">👥</span>
                            <span className="visitors-count">{visitorCount}</span>
                        </div>

                        {/* Region Toggle */}
                        <button
                            className="region-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme region"
                        >
                            <span className="region-icon">🌍</span>
                            <span className="region-name">{region}</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="mobile-menu-content">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.id}
                                    className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                                    onClick={() => scrollToSection(link.id)}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <span className="nav-icon">{link.icon}</span>
                                    <span className="nav-label">{link.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
