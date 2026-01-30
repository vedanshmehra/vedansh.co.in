import { useState, useEffect, useRef } from 'react';

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(progress, 100));

            // Determine active section based on scroll position
            const sections = ['hero', 'skills', 'experience', 'projects', 'certifications', 'tech', 'contact'];
            for (const sectionId of sections.reverse()) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollProgress, activeSection };
}

export function useInView(options = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
            if (entry.isIntersecting) {
                setHasBeenInView(true);
            }
        }, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px',
            ...options
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return { ref, isInView, hasBeenInView };
}
