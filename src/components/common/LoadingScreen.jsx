import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const awsServices = [
    { name: 'IAM', icon: '🔐', delay: 0 },
    { name: 'VPC', icon: '🌐', delay: 0.2 },
    { name: 'EC2', icon: '💻', delay: 0.4 },
    { name: 'S3', icon: '📦', delay: 0.6 },
    { name: 'RDS', icon: '🗄️', delay: 0.8 },
    { name: 'Lambda', icon: '⚡', delay: 1.0 },
    { name: 'CloudWatch', icon: '📊', delay: 1.2 },
    { name: 'Route53', icon: '🌍', delay: 1.4 }
];

const bootMessages = [
    { text: '[BOOT] Initializing Cloud Infrastructure Command Center...', delay: 0 },
    { text: '[INFO] Loading AWS SDK modules...', delay: 0.3 },
    { text: '[OK] Security protocols verified', delay: 0.6 },
    { text: '[OK] Network connectivity established', delay: 0.9 },
    { text: '[INFO] Authenticating cloud services...', delay: 1.2 },
    { text: '[OK] All systems operational', delay: 1.5 },
    { text: '[SUCCESS] Command Center ready', delay: 1.8 }
];

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [activeServices, setActiveServices] = useState([]);
    const [logs, setLogs] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Animate services lighting up
        awsServices.forEach((service, index) => {
            setTimeout(() => {
                setActiveServices(prev => [...prev, service.name]);
            }, service.delay * 1000 + 200);
        });

        // Animate log messages
        bootMessages.forEach((msg, index) => {
            setTimeout(() => {
                setLogs(prev => [...prev, msg.text]);
            }, msg.delay * 1000 + 300);
        });

        // Complete loading
        const completeTimeout = setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
                onComplete?.();
            }, 500);
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(completeTimeout);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="loading-content">
                        {/* Logo */}
                        <motion.div
                            className="loading-logo"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                        >
                            <div className="logo-cloud">
                                <span className="logo-icon">☁️</span>
                                <div className="logo-pulse"></div>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="loading-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="title-text">VEDANSH MEHRA</span>
                            <span className="title-accent">Cloud DevOps Engineer</span>
                        </motion.h1>

                        {/* AWS Services Grid */}
                        <div className="services-grid">
                            {awsServices.map((service) => (
                                <motion.div
                                    key={service.name}
                                    className={`service-item ${activeServices.includes(service.name) ? 'active' : ''}`}
                                    initial={{ opacity: 0.3 }}
                                    animate={{
                                        opacity: activeServices.includes(service.name) ? 1 : 0.3,
                                        scale: activeServices.includes(service.name) ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="service-icon">{service.icon}</span>
                                    <span className="service-name">{service.name}</span>
                                    <span className={`service-status ${activeServices.includes(service.name) ? 'online' : ''}`}></span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="loading-progress">
                            <div className="progress-header">
                                <span>SYSTEM INITIALIZATION</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="progress-track">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                                <div className="progress-glow"></div>
                            </div>
                        </div>

                        {/* Terminal Logs */}
                        <div className="loading-terminal">
                            <div className="terminal-header">
                                <span className="terminal-dot red"></span>
                                <span className="terminal-dot yellow"></span>
                                <span className="terminal-dot green"></span>
                                <span className="terminal-title">system.boot.log</span>
                            </div>
                            <div className="terminal-body">
                                {logs.map((log, index) => (
                                    <motion.div
                                        key={index}
                                        className={`log-line ${log.includes('[OK]') ? 'success' : log.includes('[SUCCESS]') ? 'complete' : ''}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                                <span className="cursor">▋</span>
                            </div>
                        </div>
                    </div>

                    {/* Background Effects */}
                    <div className="loading-bg">
                        <div className="grid-lines"></div>
                        <div className="scan-line"></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
