import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useScrollProgress';
import { useGame } from '../../context/GameContext';
import GlowButton from '../common/GlowButton';
import './ContactSection.css';

export default function ContactSection() {
    const { ref, hasBeenInView } = useInView({ threshold: 0.2 });
    const { visitSection } = useGame();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'sending', 'success', 'error'
    const [packetAnimation, setPacketAnimation] = useState(false);

    useEffect(() => {
        if (hasBeenInView) {
            visitSection('contact');
        }
    }, [hasBeenInView, visitSection]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('sending');
        setPacketAnimation(true);

        // Simulate packet transmission animation
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `\nMessage:\n${formData.message}\n` +
                `\n---\nSent from Portfolio Website`
            );

            // Open email client with pre-filled data
            window.location.href = `mailto:vedanshmehra1999@gmail.com?subject=${subject}&body=${body}`;

            setSubmitStatus('success');

            // Reset after showing success
            setTimeout(() => {
                setSubmitStatus(null);
                setPacketAnimation(false);
                setFormData({ name: '', email: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setTimeout(() => {
                setSubmitStatus(null);
                setPacketAnimation(false);
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/vedanshmehra', endpoint: '/api/linkedin' },
        { name: 'Email', icon: '📧', url: 'mailto:vedanshmehra1999@gmail.com', endpoint: '/api/email' },
        { name: 'Phone', icon: '📱', url: 'tel:+919717894739', endpoint: '/api/phone' },
        { name: 'Location', icon: '📍', url: '#', endpoint: '/api/location' }
    ];

    return (
        <section id="contact" className="contact-section section" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">// ESTABLISH CONNECTION</span>
                    <h2 className="section-heading">Contact Interface</h2>
                    <p className="section-description">
                        Initialize a handshake through the API endpoint to establish communication
                    </p>
                </motion.div>

                <div className="contact-grid">
                    {/* API Interface */}
                    <motion.div
                        className="api-interface"
                        initial={{ opacity: 0, x: -30 }}
                        animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="api-header">
                            <span className="method-badge">POST</span>
                            <span className="endpoint">/api/v1/contact</span>
                        </div>

                        <form className="api-form" onSubmit={handleSubmit}>
                            {/* Headers */}
                            <div className="form-section">
                                <span className="section-label">Headers:</span>
                                <div className="headers-display">
                                    <code>"Content-Type": "application/json"</code>
                                    <code>"X-Sender": "visitor"</code>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="form-section">
                                <span className="section-label">Body:</span>
                                <div className="body-fields">
                                    <span className="brace">{"{"}</span>

                                    <div className="field-row">
                                        <label className="field-key">"name":</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='"Your Name"'
                                            required
                                            className="field-input"
                                        />
                                        <span className="comma">,</span>
                                    </div>

                                    <div className="field-row">
                                        <label className="field-key">"email":</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='"your@email.com"'
                                            required
                                            className="field-input"
                                        />
                                        <span className="comma">,</span>
                                    </div>

                                    <div className="field-row message-row">
                                        <label className="field-key">"message":</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder='"Your message here..."'
                                            required
                                            className="field-textarea"
                                            rows={4}
                                        />
                                    </div>

                                    <span className="brace">{"}"}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="form-submit">
                                <GlowButton
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    disabled={isSubmitting}
                                    icon={isSubmitting ? '📡' : '🚀'}
                                >
                                    {isSubmitting ? 'Transmitting Packet...' : 'TRANSMIT PACKET'}
                                </GlowButton>
                            </div>

                            {/* Packet Animation */}
                            <AnimatePresence>
                                {packetAnimation && (
                                    <motion.div
                                        className="packet-animation"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.5 }}
                                    >
                                        <div className="packet-line">
                                            <motion.div
                                                className="packet"
                                                animate={{ x: ['0%', '100%'] }}
                                                transition={{ duration: 1.5, ease: 'linear' }}
                                            >
                                                📦
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Response */}
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        className="response-display success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="response-status">
                                            <span className="status-code">200 OK</span>
                                            <span className="status-icon">✅</span>
                                        </div>
                                        <pre className="response-body">
                                            {`{
  "status": "success",
  "message": "Email Client Opened! ✨",
  "action": "Click Send in your email app",
  "to": "vedanshmehra1999@gmail.com"
}`}
                                        </pre>
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        className="response-display error"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="response-status">
                                            <span className="status-code">500 ERROR</span>
                                            <span className="status-icon">❌</span>
                                        </div>
                                        <pre className="response-body">
                                            {`{
  "status": "error",
  "message": "Transmission failed. Try again!",
  "fallback": "vedanshmehra1999@gmail.com"
}`}
                                        </pre>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Service Endpoints */}
                    <motion.div
                        className="endpoints-panel"
                        initial={{ opacity: 0, x: 30 }}
                        animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="endpoints-header">
                            <span className="header-icon">📡</span>
                            <span className="header-title">Service Endpoints</span>
                        </div>

                        <div className="endpoints-list">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="endpoint-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                >
                                    <span className="endpoint-icon">{link.icon}</span>
                                    <div className="endpoint-info">
                                        <span className="endpoint-name">{link.name}</span>
                                        <code className="endpoint-url">{link.endpoint}</code>
                                    </div>
                                    <span className="endpoint-status">
                                        <span className="status-dot"></span>
                                        Online
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Connection Status */}
                        <div className="connection-status">
                            <div className="status-header">
                                <span className="status-icon">🌐</span>
                                <span className="status-title">Connection Status</span>
                            </div>
                            <div className="status-content">
                                <div className="status-row">
                                    <span className="row-label">Latency</span>
                                    <span className="row-value">{'< 24h'}</span>
                                </div>
                                <div className="status-row">
                                    <span className="row-label">Response Rate</span>
                                    <span className="row-value">100%</span>
                                </div>
                                <div className="status-row">
                                    <span className="row-label">Availability</span>
                                    <span className="row-value online">Online</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
