import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollProgress';
import { useGame } from '../../context/GameContext';
import './TechStack.css';

// Technologies strictly from resume
const technologies = {
    'Cloud Platforms': [
        { name: 'AWS EC2', icon: '🖥️', proficiency: 95, color: '#FF9900' },
        { name: 'AWS S3', icon: '📦', proficiency: 95, color: '#FF9900' },
        { name: 'AWS RDS', icon: '🗄️', proficiency: 90, color: '#FF9900' },
        { name: 'AWS VPC', icon: '🔒', proficiency: 95, color: '#FF9900' },
        { name: 'AWS IAM', icon: '🔐', proficiency: 95, color: '#FF9900' },
        { name: 'AWS CloudWatch', icon: '📊', proficiency: 90, color: '#FF9900' },
        { name: 'AWS Lambda', icon: '⚡', proficiency: 85, color: '#FF9900' },
        { name: 'AWS ECS', icon: '🐳', proficiency: 85, color: '#FF9900' },
        { name: 'CloudFormation', icon: '📋', proficiency: 88, color: '#FF9900' },
        { name: 'CodePipeline', icon: '🔄', proficiency: 90, color: '#FF9900' },
        { name: 'GCP', icon: '🌐', proficiency: 70, color: '#4285F4' },
        { name: 'Azure', icon: '☁️', proficiency: 65, color: '#0089D6' }
    ],
    'DevOps & Automation': [
        { name: 'Jenkins', icon: '🔨', proficiency: 90, color: '#D24939' },
        { name: 'Git', icon: '📂', proficiency: 95, color: '#F05032' },
        { name: 'CI/CD', icon: '🔄', proficiency: 92, color: '#00D9FF' },
        { name: 'Infrastructure as Code', icon: '📝', proficiency: 88, color: '#7B42BC' },
        { name: 'Configuration Mgmt', icon: '⚙️', proficiency: 85, color: '#EE0000' }
    ],
    'Development': [
        { name: 'Python', icon: '🐍', proficiency: 80, color: '#3776AB' },
        { name: 'Bash Scripting', icon: '💻', proficiency: 92, color: '#4EAA25' },
        { name: 'HTML', icon: '🌐', proficiency: 90, color: '#E34F26' },
        { name: 'CSS', icon: '🎨', proficiency: 88, color: '#1572B6' },
        { name: 'JavaScript', icon: '🟨', proficiency: 85, color: '#F7DF1E' }
    ],
    'Operating Systems': [
        { name: 'Linux Ubuntu', icon: '🐧', proficiency: 95, color: '#E95420' },
        { name: 'Linux CentOS', icon: '🐧', proficiency: 90, color: '#262577' },
        { name: 'Linux RHEL', icon: '🎩', proficiency: 88, color: '#EE0000' },
        { name: 'Windows Server', icon: '🪟', proficiency: 85, color: '#0078D6' }
    ]
};

export default function TechStack() {
    const { ref, hasBeenInView } = useInView({ threshold: 0.2 });
    const { visitSection } = useGame();
    const [selectedTech, setSelectedTech] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Cloud Platforms');

    useEffect(() => {
        if (hasBeenInView) {
            visitSection('tech');
        }
    }, [hasBeenInView, visitSection]);

    return (
        <section id="tech" className="tech-section section" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">// RESOURCE INVENTORY</span>
                    <h2 className="section-heading">Technology Stack</h2>
                    <p className="section-description">
                        Interactive inventory of technologies, tools, and platforms in the cloud arsenal
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    className="category-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {Object.keys(technologies).map((category) => (
                        <button
                            key={category}
                            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Tech Carousel */}
                <motion.div
                    className="tech-carousel"
                    initial={{ opacity: 0 }}
                    animate={hasBeenInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                >
                    <div className="carousel-container">
                        {technologies[activeCategory].map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                className={`tech-card ${selectedTech === tech.name ? 'selected' : ''}`}
                                style={{
                                    '--tech-color': tech.color,
                                    '--pulse-intensity': tech.proficiency / 100
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => setSelectedTech(selectedTech === tech.name ? null : tech.name)}
                                whileHover={{ scale: 1.05, y: -10 }}
                            >
                                <div className="tech-glow"></div>
                                <div className="tech-icon-container">
                                    <span className="tech-icon">{tech.icon}</span>
                                    <div className="pulse-ring"></div>
                                </div>
                                <span className="tech-name">{tech.name}</span>

                                {/* Proficiency Bar */}
                                <div className="proficiency-bar">
                                    <motion.div
                                        className="proficiency-fill"
                                        initial={{ width: 0 }}
                                        animate={hasBeenInView ? { width: `${tech.proficiency}%` } : {}}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                    />
                                </div>
                                <span className="proficiency-text">{tech.proficiency}%</span>

                                {/* Expanded Details */}
                                {selectedTech === tech.name && (
                                    <motion.div
                                        className="tech-details"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="detail-row">
                                            <span className="detail-label">Experience</span>
                                            <span className="detail-value">
                                                {tech.proficiency >= 90 ? 'Expert' :
                                                    tech.proficiency >= 70 ? 'Advanced' :
                                                        tech.proficiency >= 50 ? 'Intermediate' : 'Learning'}
                                            </span>
                                        </div>
                                        <div className="radial-chart">
                                            <svg viewBox="0 0 100 100">
                                                <circle
                                                    className="chart-bg"
                                                    cx="50" cy="50" r="40"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.1)"
                                                    strokeWidth="8"
                                                />
                                                <motion.circle
                                                    className="chart-fill"
                                                    cx="50" cy="50" r="40"
                                                    fill="none"
                                                    stroke={tech.color}
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${2.51 * tech.proficiency} 251`}
                                                    initial={{ strokeDasharray: '0 251' }}
                                                    animate={{ strokeDasharray: `${2.51 * tech.proficiency} 251` }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                    transform="rotate(-90 50 50)"
                                                />
                                                <text
                                                    x="50" y="50"
                                                    textAnchor="middle"
                                                    dy="0.35em"
                                                    fill="currentColor"
                                                    fontSize="16"
                                                    fontFamily="var(--font-mono)"
                                                >
                                                    {tech.proficiency}%
                                                </text>
                                            </svg>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Summary */}
                <motion.div
                    className="tech-summary"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <div className="summary-card">
                        <span className="summary-icon">☁️</span>
                        <span className="summary-value">10+</span>
                        <span className="summary-label">AWS Services</span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-icon">🔧</span>
                        <span className="summary-value">5+</span>
                        <span className="summary-label">DevOps Tools</span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-icon">💻</span>
                        <span className="summary-value">5</span>
                        <span className="summary-label">Languages</span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-icon">🐧</span>
                        <span className="summary-value">4</span>
                        <span className="summary-label">OS Platforms</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
