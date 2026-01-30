import { motion } from 'framer-motion';
import './GlowButton.css';

export default function GlowButton({
    children,
    variant = 'primary', // primary, secondary, outline
    size = 'medium', // small, medium, large
    icon,
    onClick,
    href,
    disabled = false,
    className = '',
    ...props
}) {
    const Component = href ? motion.a : motion.button;

    return (
        <Component
            className={`glow-button glow-button--${variant} glow-button--${size} ${className}`}
            onClick={onClick}
            href={href}
            disabled={disabled}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...props}
        >
            {icon && <span className="glow-button-icon">{icon}</span>}
            <span className="glow-button-text">{children}</span>
            <span className="glow-button-glow"></span>
            <span className="glow-button-shine"></span>
        </Component>
    );
}
