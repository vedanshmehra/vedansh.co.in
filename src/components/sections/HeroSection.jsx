import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import TerminalText, { TerminalWindow } from '../common/TerminalText';
import GlowButton from '../common/GlowButton';
import './HeroSection.css';

export default function HeroSection() {
    const { visitSection, level, levelProgress, totalXP } = useGame();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        visitSection('hero');
        const timer = setTimeout(() => setShowContent(true), 500);
        return () => clearTimeout(timer);
    }, [visitSection]);

    const statusItems = [
        { label: 'STATUS', value: 'Available for Opportunities', color: 'var(--color-accent-green)', icon: '🟢' },
        { label: 'UPTIME', value: '3.5 Years', color: 'var(--color-accent-cyan)', icon: '⏱️' },
        { label: 'SUCCESS RATE', value: '99.9%', color: 'var(--color-accent-orange)', icon: '📊' }
    ];

    return (
        <section id="hero" className="hero-section">
            <div className="hero-background">
                <div className="grid-overlay"></div>
                <div className="radial-gradient"></div>
            </div>

            <div className="hero-container">
                {/* Terminal Window */}
                <motion.div
                    className="hero-terminal"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <TerminalWindow title="cloud-engineer-profile.sh">
                        <div className="terminal-content">
                            <div className="terminal-line">
                                <span className="prompt">$</span>
                                {showContent && (
                                    <TerminalText
                                        text="./initialize-cloud-engineer-profile.sh"
                                        typingSpeed={40}
                                    />
                                )}
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                            >
                                <div className="terminal-output">
                                    <span className="output-success">[SUCCESS]</span> Profile loaded successfully
                                </div>
                                <div className="terminal-output">
                                    <span className="output-info">[INFO]</span> Cloud DevOps Engineer v3.5+ - AWS Certified - Ready for deployment
                                </div>
                            </motion.div>
                        </div>
                    </TerminalWindow>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {/* XP Bar */}
                    <motion.div
                        className="hero-xp-bar"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="xp-level">☁️ Cloud Engineer Level {level}</span>
                        <div className="xp-progress">
                            <motion.div
                                className="xp-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${levelProgress * 100}%` }}
                                transition={{ delay: 1, duration: 1 }}
                            />
                        </div>
                        <span className="xp-text">{totalXP} / {level * 1000 + 500} XP</span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="hero-title">
                        <span className="title-line">
                            <span className="title-prefix">&gt;</span>
                            <span className="title-text">VEDANSH MEHRA</span>
                        </span>
                        <span className="title-role text-gradient">
                            CLOUD DEVOPS ENGINEER
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle">
                        AWS Solutions Architect • Cloud Migrations & DevOps • CI/CD Pipeline Automation •
                        Disaster Recovery & High Availability • 3.5+ Years Experience
                    </p>

                    {/* 3D Cloud Logo */}
                    <motion.div
                        className="hero-cloud-logo"
                        animate={{
                            rotateY: [0, 360],
                            rotateX: [0, 10, 0, -10, 0]
                        }}
                        transition={{
                            rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
                            rotateX: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                        }}
                    >
                        <div className="cloud-3d">
                            <span className="cloud-icon">☁️</span>
                            <div className="cloud-ring ring-1"></div>
                            <div className="cloud-ring ring-2"></div>
                            <div className="cloud-ring ring-3"></div>
                        </div>
                    </motion.div>

                    {/* Status Indicators */}
                    <motion.div
                        className="hero-status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {statusItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                className="status-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <span className="status-icon">{item.icon}</span>
                                <span className="status-label">{item.label}</span>
                                <span className="status-value" style={{ color: item.color }}>
                                    {item.value}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <GlowButton
                            variant="primary"
                            size="large"
                            icon="🚀"
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Deploy Connection
                        </GlowButton>
                        <GlowButton
                            variant="outline"
                            size="large"
                            icon="📄"
                            onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Launch Interview Protocol
                        </GlowButton>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                    <span className="scroll-text">Scroll to explore</span>
                </motion.div>
            </div>
        </section>
    );
}
