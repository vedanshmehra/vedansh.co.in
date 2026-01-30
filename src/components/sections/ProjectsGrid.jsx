import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useScrollProgress';
import { useGame } from '../../context/GameContext';
import { projects, projectCategories } from '../../data/projects';
import './ProjectsGrid.css';

export default function ProjectsGrid() {
    const { ref, hasBeenInView } = useInView({ threshold: 0.1 });
    const { visitSection, unlockAchievement } = useGame();
    const [filter, setFilter] = useState('all');
    const [flippedCard, setFlippedCard] = useState(null);

    useEffect(() => {
        if (hasBeenInView) {
            visitSection('projects');
            unlockAchievement('migration_master');
        }
    }, [hasBeenInView, visitSection, unlockAchievement]);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="projects-section section" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">// ACTIVE INSTANCES</span>
                    <h2 className="section-heading">Projects Portfolio</h2>
                    <p className="section-description">
                        Explore running instances of cloud infrastructure projects and their metrics
                    </p>
                </motion.div>

                {/* Instance Console Header */}
                <motion.div
                    className="instance-console"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <div className="console-header">
                        <div className="console-title">
                            <span className="console-icon">💻</span>
                            <span>EC2 Instance Manager</span>
                        </div>
                        <div className="console-stats">
                            <span className="stat">
                                <span className="stat-icon">🟢</span>
                                <span className="stat-value">{projects.length}</span>
                                <span className="stat-label">Running</span>
                            </span>
                            <span className="stat">
                                <span className="stat-icon">📦</span>
                                <span className="stat-value">0</span>
                                <span className="stat-label">Stopped</span>
                            </span>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        <button
                            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Instances
                        </button>
                        {Object.entries(projectCategories).map(([key, cat]) => (
                            <button
                                key={key}
                                className={`filter-tab ${filter === key ? 'active' : ''}`}
                                onClick={() => setFilter(key)}
                                style={{ '--cat-color': cat.color }}
                            >
                                <span className="tab-icon">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.instanceId}
                                className={`project-card ${flippedCard === project.instanceId ? 'flipped' : ''}`}
                                style={{ '--project-color': projectCategories[project.category].color }}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setFlippedCard(
                                    flippedCard === project.instanceId ? null : project.instanceId
                                )}
                            >
                                <div className="card-inner">
                                    {/* Front Side */}
                                    <div className="card-front">
                                        {/* Instance Header */}
                                        <div className="instance-header">
                                            <div className="instance-status">
                                                <span className="status-indicator"></span>
                                                <span className="status-text">{project.status}</span>
                                            </div>
                                            <span className="instance-type">{project.instanceType}</span>
                                        </div>

                                        {/* Instance ID */}
                                        <div className="instance-id">
                                            <span className="id-label">Instance ID</span>
                                            <span className="id-value">{project.instanceId}</span>
                                        </div>

                                        {/* Project Name */}
                                        <h3 className="project-name">{project.name}</h3>

                                        {/* Launch Time */}
                                        <div className="launch-time">
                                            <span className="time-label">Launch Time:</span>
                                            <span className="time-value">{project.launchTime}</span>
                                        </div>

                                        {/* Tags */}
                                        <div className="project-tags">
                                            {project.technologies.slice(0, 3).map(tech => (
                                                <span key={tech} className="tech-tag">{tech}</span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="tech-tag more">+{project.technologies.length - 3}</span>
                                            )}
                                        </div>

                                        {/* Category Badge */}
                                        <div className="category-badge" style={{ background: projectCategories[project.category].color }}>
                                            {projectCategories[project.category].icon} {projectCategories[project.category].label}
                                        </div>

                                        {/* Flip Hint */}
                                        <div className="flip-hint">
                                            <span>Click to view details</span>
                                            <span className="flip-icon">↻</span>
                                        </div>
                                    </div>

                                    {/* Back Side */}
                                    <div className="card-back">
                                        <div className="back-header">
                                            <h4 className="back-title">{project.name}</h4>
                                            <span className="back-category">{projectCategories[project.category].icon}</span>
                                        </div>

                                        <p className="project-description">{project.description}</p>

                                        {/* Metrics */}
                                        <div className="project-metrics">
                                            {Object.entries(project.metrics).map(([key, value]) => (
                                                <div key={key} className="metric-item">
                                                    <span className="metric-value">{value}</span>
                                                    <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Highlights */}
                                        <div className="project-highlights">
                                            {project.highlights.map((highlight, i) => (
                                                <div key={i} className="highlight-item">
                                                    <span className="highlight-bullet">▸</span>
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="back-tags">
                                            {project.technologies.map(tech => (
                                                <span key={tech} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>

                                        <div className="flip-hint">
                                            <span>Click to flip back</span>
                                            <span className="flip-icon">↻</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
