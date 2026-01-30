import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '../../context/ThemeContext';

export default function ParticleBackground() {
    const { isDark } = useTheme();

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = useMemo(() => ({
        fullScreen: {
            enable: true,
            zIndex: -1
        },
        background: {
            color: {
                value: 'transparent'
            }
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: ['#00D9FF', '#FF9900', '#00FF41']
            },
            links: {
                color: '#00D9FF',
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
                triangles: {
                    enable: false
                }
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                outModes: {
                    default: 'bounce'
                },
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            },
            number: {
                value: 60,
                density: {
                    enable: true,
                    area: 800
                }
            },
            opacity: {
                value: { min: 0.3, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            shape: {
                type: ['circle', 'triangle']
            },
            size: {
                value: { min: 1, max: 4 },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                    sync: false
                }
            }
        },
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onHover: {
                    enable: true,
                    mode: 'grab'
                },
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 150,
                    links: {
                        opacity: 0.5,
                        color: '#FF9900'
                    }
                },
                push: {
                    quantity: 2
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        detectRetina: true
    }), [isDark]);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={options}
        />
    );
}
