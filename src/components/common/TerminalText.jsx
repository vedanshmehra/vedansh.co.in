import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './TerminalText.css';

export default function TerminalText({
    text,
    typingSpeed = 50,
    startDelay = 0,
    className = '',
    showCursor = true,
    onComplete
}) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            const intervalId = setInterval(() => {
                if (indexRef.current < text.length) {
                    setDisplayedText(text.slice(0, indexRef.current + 1));
                    indexRef.current++;
                } else {
                    clearInterval(intervalId);
                    setIsComplete(true);
                    onComplete?.();
                }
            }, typingSpeed);

            return () => clearInterval(intervalId);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [text, typingSpeed, startDelay, onComplete]);

    return (
        <span className={`terminal-text ${className}`}>
            {displayedText}
            {showCursor && !isComplete && (
                <motion.span
                    className="terminal-cursor"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                    ▋
                </motion.span>
            )}
        </span>
    );
}

export function TerminalWindow({
    title = 'terminal',
    children,
    className = ''
}) {
    return (
        <div className={`terminal-window ${className}`}>
            <div className="terminal-window-header">
                <div className="terminal-window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <span className="terminal-window-title">{title}</span>
                <div className="terminal-window-spacer"></div>
            </div>
            <div className="terminal-window-body">
                {children}
            </div>
        </div>
    );
}

export function TerminalLine({
    prompt = '>',
    children,
    type = 'default' // default, success, error, info
}) {
    return (
        <div className={`terminal-line terminal-line--${type}`}>
            <span className="terminal-prompt">{prompt}</span>
            <span className="terminal-content">{children}</span>
        </div>
    );
}
