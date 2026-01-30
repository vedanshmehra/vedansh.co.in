import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './CPUMonitor.css';

export default function CPUMonitor() {
    const [cpuUsage, setCpuUsage] = useState(15);
    const [ramUsage, setRamUsage] = useState(42);
    const [isExpanded, setIsExpanded] = useState(false);
    const [networkPackets, setNetworkPackets] = useState(0);

    // Simulate CPU spike on scroll
    const handleScroll = useCallback(() => {
        setCpuUsage(prev => Math.min(95, prev + Math.random() * 20));
        setTimeout(() => {
            setCpuUsage(prev => Math.max(10, prev - 15));
        }, 500);
    }, []);

    // Track network activity (clicks)
    const handleClick = useCallback(() => {
        setNetworkPackets(prev => prev + 1);
        setRamUsage(prev => Math.min(90, prev + Math.random() * 5));
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('click', handleClick);

        // Gradual RAM decrease
        const ramInterval = setInterval(() => {
            setRamUsage(prev => Math.max(35, prev - 0.5));
        }, 2000);

        // Fluctuate CPU
        const cpuInterval = setInterval(() => {
            setCpuUsage(prev => {
                const fluctuation = (Math.random() - 0.5) * 10;
                return Math.max(5, Math.min(50, prev + fluctuation));
            });
        }, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClick);
            clearInterval(ramInterval);
            clearInterval(cpuInterval);
        };
    }, [handleScroll, handleClick]);

    const getCpuColor = (usage) => {
        if (usage > 80) return 'var(--color-accent-red)';
        if (usage > 50) return 'var(--color-accent-orange)';
        return 'var(--color-accent-green)';
    };

    return (
        <motion.div
            className={`cpu-monitor ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="monitor-header">
                <span className="monitor-title">SYS_MONITOR</span>
                <span className="monitor-status" style={{ background: getCpuColor(cpuUsage) }}></span>
            </div>

            <div className="monitor-stats">
                {/* CPU */}
                <div className="stat-item">
                    <div className="stat-header">
                        <span className="stat-label">CPU</span>
                        <span className="stat-value">{Math.round(cpuUsage)}%</span>
                    </div>
                    <div className="stat-bar">
                        <motion.div
                            className="stat-fill"
                            style={{
                                width: `${cpuUsage}%`,
                                background: getCpuColor(cpuUsage)
                            }}
                            animate={{ width: `${cpuUsage}%` }}
                            transition={{ type: 'spring', stiffness: 100 }}
                        />
                    </div>
                </div>

                {/* RAM */}
                <div className="stat-item">
                    <div className="stat-header">
                        <span className="stat-label">RAM</span>
                        <span className="stat-value">{Math.round(ramUsage)}%</span>
                    </div>
                    <div className="stat-bar">
                        <motion.div
                            className="stat-fill"
                            style={{
                                width: `${ramUsage}%`,
                                background: 'var(--color-accent-cyan)'
                            }}
                            animate={{ width: `${ramUsage}%` }}
                        />
                    </div>
                </div>

                {/* Expanded Stats */}
                {isExpanded && (
                    <motion.div
                        className="expanded-stats"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        {/* Network */}
                        <div className="stat-item">
                            <div className="stat-header">
                                <span className="stat-label">NET</span>
                                <span className="stat-value">{networkPackets} pkts</span>
                            </div>
                            <div className="network-activity">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="network-bar"
                                        animate={{
                                            height: `${20 + Math.random() * 80}%`,
                                            background: i === 4 ? 'var(--color-accent-orange)' : 'var(--color-accent-cyan)'
                                        }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Uptime */}
                        <div className="stat-row">
                            <span className="stat-label">UPTIME</span>
                            <span className="stat-value uptime">3.5 YRS</span>
                        </div>

                        {/* Processes */}
                        <div className="stat-row">
                            <span className="stat-label">PROC</span>
                            <span className="stat-value">127</span>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="monitor-footer">
                <span className="footer-hint">{isExpanded ? 'Click to collapse' : 'Click for details'}</span>
            </div>
        </motion.div>
    );
}
