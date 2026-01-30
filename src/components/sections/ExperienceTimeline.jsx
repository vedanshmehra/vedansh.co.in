import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useScrollProgress';
import { useGame } from '../../context/GameContext';
import { experiences } from '../../data/experience';
import './ExperienceTimeline.css';

export default function ExperienceTimeline() {
    const { ref, hasBeenInView } = useInView({ threshold: 0.1 });
    const { visitSection } = useGame();
    const [expandedId, setExpandedId] = useState(null);
    const [visibleLogs, setVisibleLogs] = useState({});

    useEffect(() => {
        if (hasBeenInView) {
            visitSection('experience');
        }
    }, [hasBeenInView, visitSection]);

    const toggleExpand = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
            // Animate logs appearing one by one
            const exp = experiences.find(e => e.id === id);
            if (exp) {
                exp.logs.forEach((_, index) => {
                    setTimeout(() => {
                        setVisibleLogs(prev => ({
                            ...prev,
                            [id]: (prev[id] || 0) + 1
                        }));
                    }, index * 300);
                });
            }
        }
    };

    return (
        <section id="experience" className="experience-section section" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">// DEPLOYMENT HISTORY</span>
                    <h2 className="section-heading">Experience Timeline</h2>
                    <p className="section-description">
                        CI/CD Pipeline visualization of career deployments and achievements
                    </p>
                </motion.div>

                {/* Pipeline Container */}
                <div className="pipeline-container">
                    {/* Pipeline Header */}
                    <motion.div
                        className="pipeline-header"
                        initial={{ opacity: 0, x: -30 }}
                        animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="pipeline-status">
                            <span className="status-dot success"></span>
                            <span className="status-text">Pipeline Healthy</span>
                        </div>
                        <div className="pipeline-info">
                            <span className="info-item">
                                <span className="info-icon">📦</span>
                                <span className="info-value">{experiences.length} Deployments</span>
                            </span>
                            <span className="info-item">
                                <span className="info-icon">✅</span>
                                <span className="info-value">All Stages Passed</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <div className="timeline">
                        {/* Pipeline Line */}
                        <div className="timeline-line">
                            <motion.div
                                className="timeline-line-fill"
                                initial={{ height: 0 }}
                                animate={hasBeenInView ? { height: '100%' } : {}}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </div>

                        {/* Experience Items */}
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                className={`timeline-item ${expandedId === exp.id ? 'expanded' : ''}`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + index * 0.2 }}
                            >
                                {/* Stage Indicator */}
                                <div className={`stage-indicator ${exp.status}`}>
                                    <div className="stage-icon">
                                        {exp.status === 'running' ? '🟢' : '✅'}
                                    </div>
                                    <div className="stage-ring"></div>
                                </div>

                                {/* Stage Card */}
                                <motion.div
                                    className={`stage-card ${exp.status}`}
                                    onClick={() => toggleExpand(exp.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="stage-header">
                                        <div className="stage-meta">
                                            <span className={`stage-status badge badge--${exp.status === 'running' ? 'success' : 'info'}`}>
                                                {exp.status === 'running' ? '● RUNNING' : '✓ SUCCESS'}
                                            </span>
                                            <span className="stage-id">{exp.deploymentId}</span>
                                        </div>
                                        <span className="stage-period">{exp.period}</span>
                                    </div>

                                    <div className="stage-content">
                                        <h3 className="stage-title">{exp.title}</h3>
                                        <p className="stage-company">
                                            <span className="company-icon">🏢</span>
                                            {exp.company}
                                            <span className="location-badge">{exp.location}</span>
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="stage-tags">
                                        {exp.tags.slice(0, 4).map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                        {exp.tags.length > 4 && (
                                            <span className="tag tag-more">+{exp.tags.length - 4}</span>
                                        )}
                                    </div>

                                    {/* Metrics Preview */}
                                    <div className="metrics-preview">
                                        <div className="metric">
                                            <span className="metric-value">{exp.metrics.uptime}</span>
                                            <span className="metric-label">Uptime</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-value">{exp.metrics.incidentsResolved}</span>
                                            <span className="metric-label">Incidents</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-value">{exp.metrics.costSavings}</span>
                                            <span className="metric-label">Savings</span>
                                        </div>
                                    </div>

                                    {/* Expand Indicator */}
                                    <div className="expand-indicator">
                                        <span>{expandedId === exp.id ? 'Click to collapse' : 'Click to expand'}</span>
                                        <span className="expand-icon">{expandedId === exp.id ? '▲' : '▼'}</span>
                                    </div>
                                </motion.div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === exp.id && (
                                        <motion.div
                                            className="expanded-content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Achievements */}
                                            <div className="achievements-panel">
                                                <h4 className="panel-title">
                                                    <span className="title-icon">🎯</span>
                                                    Key Achievements
                                                </h4>
                                                <ul className="achievements-list">
                                                    {exp.achievements.map((achievement, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                        >
                                                            <span className="achievement-bullet">▸</span>
                                                            {achievement}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Terminal Logs */}
                                            <div className="logs-panel">
                                                <div className="logs-header">
                                                    <span className="logs-title">📋 Deployment Logs</span>
                                                    <span className="logs-status">LIVE</span>
                                                </div>
                                                <div className="logs-body">
                                                    {exp.logs.slice(0, visibleLogs[exp.id] || 0).map((log, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={`log-line ${log.includes('[SUCCESS]') ? 'success' : log.includes('[INFO]') ? 'info' : ''}`}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                        >
                                                            <span className="log-time">{`00:0${i}:00`}</span>
                                                            <span className="log-text">{log}</span>
                                                        </motion.div>
                                                    ))}
                                                    <span className="log-cursor">▋</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}

                        {/* Career Start */}
                        <motion.div
                            className="timeline-item career-start"
                            initial={{ opacity: 0 }}
                            animate={hasBeenInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.5 }}
                        >
                            <div className="stage-indicator start">
                                <div className="stage-icon">🚀</div>
                            </div>
                            <div className="start-label">
                                <span>Career Initiated</span>
                                <span className="start-date">2021</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
