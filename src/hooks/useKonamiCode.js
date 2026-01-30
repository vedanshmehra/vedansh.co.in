import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

export function useKonamiCode(callback) {
    const [inputSequence, setInputSequence] = useState([]);
    const [isActivated, setIsActivated] = useState(false);

    const handleKeyDown = useCallback((event) => {
        const key = event.code;

        setInputSequence(prev => {
            const newSequence = [...prev, key].slice(-KONAMI_CODE.length);

            // Check if sequence matches
            if (newSequence.length === KONAMI_CODE.length) {
                const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);
                if (isMatch && !isActivated) {
                    setIsActivated(true);
                    callback?.();
                }
            }

            return newSequence;
        });
    }, [callback, isActivated]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return { isActivated, inputSequence };
}
