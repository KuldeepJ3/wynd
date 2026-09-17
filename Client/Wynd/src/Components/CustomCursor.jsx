import { useEffect, useState } from 'react';

function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateCursor);
        return () => window.removeEventListener('mousemove', updateCursor);
    }, []);

    useEffect(() => {
        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'A' || 
                e.target.closest('button') || 
                e.target.closest('a') ||
                e.target.getAttribute('role') === 'button'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, []);

    return (
        <div 
            className={`fixed pointer-events-none z-[9999] rounded-full bg-amber-400 mix-blend-difference hidden sm:block transition-transform duration-75 ease-out ${
                isHovered ? 'w-10 h-10 scale-110 opacity-90' : 'w-4 h-4 opacity-80'
            }`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
            }}
        />
    );
}

export default CustomCursor;