import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollProgress';
import { useGame } from '../../context/GameContext';
import { skillRegions } from '../../data/skills';
import './SkillsDashboard.css';

export default function SkillsDashboard() {
    const { ref, hasBeenInView } = useInView({ threshold: 0.2 });
    const { visitSection, unlockAchievement } = useGame();
    const [activeRegion, setActiveRegion] = useState('ap-south-1');
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        if (hasBeenInView) {
            visitSection('skills');
            unlockAchievement('devops_ninja');
        }
    }, [hasBeenInView, visitSection, unlockAchievement]);

    const regions = Object.entries(skillRegions);
    const currentRegion = skillRegions[activeRegion];

    return (
        <section id="skills" className="skills-section section" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">// INFRASTRUCTURE MAP</span>
                    <h2 className="section-heading">Skills Dashboard</h2>
                    <p className="section-description">
                        Navigate through cloud regions to explore technical expertise and proficiency levels
                    </p>
                </motion.div>

                {/* Region Tabs */}
                <motion.div
                    className="region-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {regions.map(([regionId, region]) => (
                        <button
                            key={regionId}
                            className={`region-tab ${activeRegion === regionId ? 'active' : ''}`}
                            onClick={() => setActiveRegion(regionId)}
                            style={{ '--region-color': region.color }}
                        >
                            <span className="region-indicator"></span>
                            <span className="region-id">{regionId}</span>
                            <span className="region-name">{region.name}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Skills Network */}
                <motion.div
                    className="skills-network"
                    initial={{ opacity: 0 }}
                    animate={hasBeenInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    {/* Network Visualization */}
                    <div className="network-container">
                        <svg className="network-lines" viewBox="0 0 600 400">
                            {/* Connection lines would be dynamically generated */}
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="var(--color-accent-cyan)" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Skill Nodes */}
                        <div className="skill-nodes">
                            {currentRegion.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className={`skill-node ${hoveredSkill === skill.name ? 'active' : ''}`}
                                    style={{
                                        '--skill-color': currentRegion.color,
                                        '--delay': index * 0.05
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={hasBeenInView ? { scale: 1, opacity: 1 } : {}}
                                    transition={{ delay: 0.5 + index * 0.05, type: 'spring' }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="node-glow"></div>
                                    <div className="node-content">
                                        <span className="node-name">{skill.name}</span>
                                        <div className="node-proficiency">
                                            <motion.div
                                                className="proficiency-fill"
                                                initial={{ width: 0 }}
                                                animate={hasBeenInView ? { width: `${skill.proficiency}%` } : {}}
                                                transition={{ delay: 0.8 + index * 0.05, duration: 0.8 }}
                                            />
                                        </div>
                                        <span className="node-percent">{skill.proficiency}%</span>
                                    </div>

                                    {/* Expanded Info */}
                                    {hoveredSkill === skill.name && (
                                        <motion.div
                                            className="node-tooltip"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <span className="tooltip-category">{skill.category}</span>
                                            <div className="tooltip-gauge">
                                                <span className="gauge-label">Proficiency</span>
                                                <div className="gauge-bar">
                                                    <div
                                                        className="gauge-fill"
                                                        style={{ width: `${skill.proficiency}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Resource Utilization Panel */}
                <motion.div
                    className="resource-panel"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <div className="panel-header">
                        <span className="panel-icon">📊</span>
                        <span className="panel-title">Resource Utilization</span>
                    </div>
                    <div className="resource-meters">
                        <div className="meter">
                            <div className="meter-header">
                                <span className="meter-label">AWS Services</span>
                                <span className="meter-value">95%</span>
                            </div>
                            <div className="meter-bar">
                                <motion.div
                                    className="meter-fill"
                                    style={{ background: 'var(--color-accent-orange)' }}
                                    initial={{ width: 0 }}
                                    animate={hasBeenInView ? { width: '95%' } : {}}
                                    transition={{ delay: 1, duration: 1 }}
                                />
                            </div>
                        </div>
                        <div className="meter">
                            <div className="meter-header">
                                <span className="meter-label">DevOps Tools</span>
                                <span className="meter-value">88%</span>
                            </div>
                            <div className="meter-bar">
                                <motion.div
                                    className="meter-fill"
                                    style={{ background: 'var(--color-accent-cyan)' }}
                                    initial={{ width: 0 }}
                                    animate={hasBeenInView ? { width: '88%' } : {}}
                                    transition={{ delay: 1.1, duration: 1 }}
                                />
                            </div>
                        </div>
                        <div className="meter">
                            <div className="meter-header">
                                <span className="meter-label">Development</span>
                                <span className="meter-value">85%</span>
                            </div>
                            <div className="meter-bar">
                                <motion.div
                                    className="meter-fill"
                                    style={{ background: 'var(--color-accent-green)' }}
                                    initial={{ width: 0 }}
                                    animate={hasBeenInView ? { width: '85%' } : {}}
                                    transition={{ delay: 1.2, duration: 1 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
