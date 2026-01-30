import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollProgress';
import { useGame } from '../../context/GameContext';
import { certifications, achievementBadges } from '../../data/achievements';
import './Certifications.css';

export default function Certifications() {
    const { ref, hasBeenInView } = useInView({ threshold: 0.2 });
    const { visitSection, unlockAchievement } = useGame();

    useEffect(() => {
        if (hasBeenInView) {
            visitSection('certifications');
            unlockAchievement('aws_certified');
            unlockAchievement('backup_guardian');
            unlockAchievement('cost_optimizer');
        }
    }, [hasBeenInView, visitSection, unlockAchievement]);

    return (
        <section id="certifications" className="certifications-section section" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">// SECURITY CREDENTIALS</span>
                    <h2 className="section-heading">Certifications & Achievements</h2>
                    <p className="section-description">
                        IAM Roles, Policies, and Security Credentials that validate cloud expertise
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <motion.div
                    className="certs-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <div className="certs-header">
                        <span className="header-icon">🛡️</span>
                        <span className="header-title">Professional Certifications</span>
                        <span className="header-count">{certifications.length} Active</span>
                    </div>

                    <div className="certs-grid">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                className="cert-card"
                                style={{ '--cert-color': cert.color }}
                                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                                animate={hasBeenInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="cert-glow"></div>
                                <div className="cert-shield">
                                    <span className="shield-icon">{cert.icon}</span>
                                    {cert.verified && (
                                        <motion.div
                                            className="verified-badge"
                                            initial={{ scale: 0 }}
                                            animate={hasBeenInView ? { scale: 1 } : {}}
                                            transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </div>
                                <div className="cert-content">
                                    <h3 className="cert-name">{cert.name}</h3>
                                    <p className="cert-issuer">{cert.issuer}</p>
                                    <div className="cert-meta">
                                        <span className="cert-date">
                                            <span className="meta-icon">📅</span>
                                            {cert.date}
                                        </span>
                                        <span className="cert-id">
                                            <span className="meta-icon">🔑</span>
                                            {cert.credentialId}
                                        </span>
                                    </div>
                                    <p className="cert-description">{cert.description}</p>
                                    <a
                                        href="/certifications/AWS Certified Solutions Architect - Associate certificate.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-cert-btn"
                                    >
                                        <span className="btn-icon">📜</span>
                                        <span>View Certificate</span>
                                    </a>
                                </div>
                                {cert.verified && (
                                    <div className="verified-stamp">
                                        <span>VERIFIED</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Achievement Badges */}
                <motion.div
                    className="badges-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <div className="badges-header">
                        <span className="header-icon">🏆</span>
                        <span className="header-title">Achievement Badges</span>
                        <span className="header-count">{achievementBadges.filter(b => b.earned).length} Unlocked</span>
                    </div>

                    <div className="badges-grid">
                        {achievementBadges.map((badge, index) => (
                            <motion.div
                                key={badge.id}
                                className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                                style={{ '--badge-color': badge.color }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={hasBeenInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{
                                    delay: 0.6 + index * 0.08,
                                    type: 'spring',
                                    stiffness: 200
                                }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="badge-glow"></div>
                                <div className="badge-icon">
                                    {badge.icon}
                                </div>
                                <span className="badge-name">{badge.name}</span>
                                <span className="badge-description">{badge.description}</span>
                                {badge.earned && (
                                    <motion.div
                                        className="unlock-effect"
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ delay: 0.8 + index * 0.08, duration: 0.5 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CloudFormation Template */}
                <motion.div
                    className="template-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <div className="template-header">
                        <span className="header-icon">📄</span>
                        <span className="header-title">Export Configuration</span>
                    </div>
                    <div className="template-content">
                        <div className="template-preview">
                            <pre className="template-code">
                                {`AWSTemplateFormatVersion: '2010-09-09'
Description: Cloud DevOps Engineer Profile Export

Resources:
  ProfileConfiguration:
    Type: AWS::CloudFormation::Stack
    Properties:
      Name: CloudDevOpsEngineer-VedanshMehra
      Version: "3.5+"
      Certifications:
        - AWS-Solutions-Architect-Associate
      Experience: 3.5+ Years
      Location: Delhi, India
      Status: Available`}
                            </pre>
                        </div>
                        <motion.a
                            href="/Vedansh-Cloud DevOps Engineer Resume.pdf"
                            download="Vedansh_Mehra_Cloud_DevOps_Engineer_Resume.pdf"
                            className="download-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="btn-icon">⬇️</span>
                            <span className="btn-text">Download Resume (PDF)</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
