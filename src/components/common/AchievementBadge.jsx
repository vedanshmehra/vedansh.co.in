import { motion } from 'framer-motion';
import './AchievementBadge.css';

export default function AchievementBadge({
    name,
    description,
    icon,
    unlocked = false,
    color = '#00D9FF',
    size = 'medium', // small, medium, large
    showTooltip = true,
    onClick
}) {
    return (
        <motion.div
            className={`achievement-badge achievement-badge--${size} ${unlocked ? 'unlocked' : 'locked'}`}
            style={{ '--badge-color': color }}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="badge-glow"></div>
            <div className="badge-inner">
                <span className="badge-icon">{icon}</span>
                {unlocked && (
                    <motion.div
                        className="badge-unlock-effect"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.5, 0] }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </div>
            {showTooltip && (
                <div className="badge-tooltip">
                    <span className="badge-name">{name}</span>
                    <span className="badge-description">{description}</span>
                </div>
            )}
        </motion.div>
    );
}

export function AchievementNotification({ achievement, onDismiss }) {
    return (
        <motion.div
            className="achievement-notification"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="notification-icon">{achievement.icon}</div>
            <div className="notification-content">
                <span className="notification-label">🏆 ACHIEVEMENT UNLOCKED</span>
                <span className="notification-name">{achievement.name}</span>
                <span className="notification-description">{achievement.description}</span>
                <span className="notification-xp">+{achievement.xp} XP</span>
            </div>
            <button className="notification-dismiss" onClick={onDismiss}>×</button>
        </motion.div>
    );
}
