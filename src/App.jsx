import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useGame } from './context/GameContext';
import LoadingScreen from './components/common/LoadingScreen';
import ParticleBackground from './components/common/ParticleBackground';
import { AchievementNotification } from './components/common/AchievementBadge';
import Navbar from './components/layout/Navbar';
import CPUMonitor from './components/layout/CPUMonitor';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import SkillsDashboard from './components/sections/SkillsDashboard';
import ExperienceTimeline from './components/sections/ExperienceTimeline';
import ProjectsGrid from './components/sections/ProjectsGrid';
import Certifications from './components/sections/Certifications';
import TechStack from './components/sections/TechStack';
import ContactSection from './components/sections/ContactSection';
import './App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const { activateGodMode, notifications, unlockAchievement, dismissNotification } = useGame();

    // Konami code easter egg
    useKonamiCode(() => {
        unlockAchievement('code_breaker');
        setTimeout(() => {
            activateGodMode();
        }, 500);
    });

    // Handle terminal commands
    useEffect(() => {
        const handleInput = (e) => {
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                const value = target.value.toLowerCase().trim();
                if (value === 'help') {
                    alert(`
╔══════════════════════════════════════════╗
║     PORTFOLIO TERMINAL - HELP MENU       ║
╠══════════════════════════════════════════╣
║  Available Commands:                      ║
║  • help     - Show this menu             ║
║  • whoami   - Display profile summary    ║
║  • clear    - Clear input                ║
║  • sudo hire - Special command 😉        ║
║                                          ║
║  Easter Eggs:                            ║
║  • Try the Konami Code!                  ║
║    ↑↑↓↓←→←→BA                           ║
╚══════════════════════════════════════════╝
          `);
                    target.value = '';
                    unlockAchievement('terminal_hacker');
                } else if (value === 'whoami') {
                    alert(`
╔══════════════════════════════════════════╗
║        CLOUD DEVOPS ENGINEER PROFILE     ║
╠══════════════════════════════════════════╣
║  Name: Vedansh Mehra                     ║
║  Role: Cloud DevOps Engineer             ║
║  Experience: 3.5+ Years                  ║
║  Location: Delhi, India                  ║
║  Cert: AWS Solutions Architect           ║
║  Status: Available for Opportunities     ║
║                                          ║
║  "Building scalable cloud solutions"     ║
╚══════════════════════════════════════════╝
          `);
                    target.value = '';
                    unlockAchievement('terminal_hacker');
                } else if (value === 'sudo hire') {
                    alert(`
🎉 PERMISSION GRANTED! 🎉

Thanks for the interest! 
Let's connect and discuss how I can help 
your team build amazing cloud infrastructure.

Scroll down to the Contact section or 
click "Deploy Connection" to get started!
          `);
                    target.value = '';
                    unlockAchievement('terminal_hacker');
                } else if (value === 'clear') {
                    target.value = '';
                } else if (value === 'barrel roll' || value === 'do a barrel roll') {
                    // Barrel roll easter egg!
                    document.body.classList.add('barrel-roll');
                    target.value = '';
                    unlockAchievement('barrel_master');
                    setTimeout(() => {
                        document.body.classList.remove('barrel-roll');
                    }, 1000);
                }
            }
        };

        document.addEventListener('input', handleInput);
        return () => document.removeEventListener('input', handleInput);
    }, [unlockAchievement]);

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {/* Main Content */}
            {!isLoading && (
                <>
                    {/* Particle Background */}
                    <ParticleBackground />

                    {/* Navigation */}
                    <Navbar />

                    {/* Skip Link for Accessibility */}
                    <a href="#main-content" className="skip-link">
                        Skip to main content
                    </a>

                    {/* Main Content */}
                    <main id="main-content">
                        <HeroSection />
                        <SkillsDashboard />
                        <ExperienceTimeline />
                        <ProjectsGrid />
                        <Certifications />
                        <TechStack />
                        <ContactSection />
                    </main>

                    {/* Footer */}
                    <Footer />

                    {/* CPU Monitor Widget */}
                    <CPUMonitor />

                    {/* Achievement Notifications */}
                    <AnimatePresence>
                        {notifications.map((notification) => (
                            <AchievementNotification
                                key={notification.id}
                                achievement={notification}
                                onDismiss={() => dismissNotification(notification.id)}
                            />
                        ))}
                    </AnimatePresence>
                </>
            )}
        </>
    );
}

export default App;
