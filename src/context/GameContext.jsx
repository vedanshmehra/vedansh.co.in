import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const GameContext = createContext();

const initialAchievements = [
    { id: 'first_visit', name: 'First Connection', description: 'Established initial connection to the command center', icon: '🌐', unlocked: true, xp: 100 },
    { id: 'aws_certified', name: 'AWS Certified', description: 'Viewed AWS certifications', icon: '🛡️', unlocked: false, xp: 200 },
    { id: 'migration_master', name: 'Migration Master', description: 'Explored cloud migration projects', icon: '🚀', unlocked: false, xp: 250 },
    { id: 'backup_guardian', name: 'Backup Guardian', description: 'Discovered backup and disaster recovery expertise', icon: '💾', unlocked: false, xp: 200 },
    { id: 'devops_ninja', name: 'DevOps Ninja', description: 'Found CI/CD and automation skills', icon: '🥷', unlocked: false, xp: 250 },
    { id: 'cost_optimizer', name: 'Cost Optimizer', description: 'Viewed cost optimization achievements', icon: '💰', unlocked: false, xp: 200 },
    { id: 'infrastructure_explorer', name: 'Infrastructure Explorer', description: 'Visited all sections of the command center', icon: '🗺️', unlocked: false, xp: 500 },
    { id: 'code_breaker', name: 'Code Breaker', description: 'Discovered the Konami code easter egg', icon: '🎮', unlocked: false, xp: 1000 },
    { id: 'terminal_hacker', name: 'Terminal Hacker', description: 'Used hidden terminal commands', icon: '💻', unlocked: false, xp: 300 },
    { id: 'night_owl', name: 'Night Owl', description: 'Visited during nighttime hours', icon: '🦉', unlocked: false, xp: 150 },
    { id: 'barrel_master', name: 'Barrel Master', description: 'Made the page do a barrel roll!', icon: '🛢️', unlocked: false, xp: 400 },
    { id: 'god_mode', name: 'God Mode Activated', description: 'Unlocked the ultimate easter egg', icon: '⚡', unlocked: false, xp: 2000 },
];

const calculateLevel = (xp) => {
    // Level calculation: each level requires more XP
    // Level 1: 0-500, Level 2: 500-1500, Level 3: 1500-3000, etc.
    if (xp < 500) return { level: 1, progress: xp / 500 };
    if (xp < 1500) return { level: 2, progress: (xp - 500) / 1000 };
    if (xp < 3000) return { level: 3, progress: (xp - 1500) / 1500 };
    if (xp < 5000) return { level: 4, progress: (xp - 3000) / 2000 };
    return { level: 5, progress: 1 };
};

export function GameProvider({ children }) {
    const [achievements, setAchievements] = useState(initialAchievements);
    const [totalXP, setTotalXP] = useState(100); // Start with 100 XP for first visit
    const [sectionsVisited, setSectionsVisited] = useState(new Set(['hero']));
    const [godMode, setGodMode] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [visitorCount, setVisitorCount] = useState(1337); // Simulated visitor count

    const { level, progress } = calculateLevel(totalXP);

    const addNotification = useCallback((achievement) => {
        // Use achievement ID to prevent duplicates
        const id = achievement.id;

        setNotifications(prev => {
            // Prevent duplicate notifications for the same achievement
            if (prev.some(n => n.id === id)) return prev;
            return [...prev, { ...achievement, id }];
        });

        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    const dismissNotification = useCallback((notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }, []);

    const unlockAchievement = useCallback((achievementId) => {
        // Check current state to see if already unlocked
        // Note: We need 'achievements' in dependency array for this to work correctly
        const achievement = achievements.find(a => a.id === achievementId);

        if (!achievement || achievement.unlocked) return;

        // Add XP
        setTotalXP(prevTotal => prevTotal + achievement.xp);

        // Show notification
        addNotification(achievement);

        // Update achievement state
        setAchievements(prev =>
            prev.map(a =>
                a.id === achievementId ? { ...a, unlocked: true } : a
            )
        );
    }, [achievements, addNotification]);

    const visitSection = useCallback((sectionId) => {
        setSectionsVisited(prev => {
            const newSet = new Set(prev);
            newSet.add(sectionId);

            // Check if all main sections visited
            const allSections = ['hero', 'skills', 'experience', 'projects', 'certifications', 'tech', 'contact'];
            if (allSections.every(s => newSet.has(s))) {
                unlockAchievement('infrastructure_explorer');
            }

            return newSet;
        });
    }, [unlockAchievement]);

    const activateGodMode = useCallback(() => {
        setGodMode(true);
        setTotalXP(9999);
        setAchievements(prev => prev.map(a => ({ ...a, unlocked: true })));
        unlockAchievement('god_mode');
    }, [unlockAchievement]);

    // Check for night owl achievement
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 6) {
            unlockAchievement('night_owl');
        }
    }, [unlockAchievement]);

    const value = {
        achievements,
        totalXP,
        level,
        levelProgress: progress,
        sectionsVisited,
        godMode,
        notifications,
        visitorCount,
        unlockAchievement,
        visitSection,
        activateGodMode,
        dismissNotification,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
