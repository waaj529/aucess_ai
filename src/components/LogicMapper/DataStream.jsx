import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

/**
 * DataStream Component
 * Animated SVG path showing data flow between components
 */
const DataStream = ({ start, end, color }) => {
    // Create a curved path between two points
    const path = `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${start.y - 50} ${end.x} ${end.y}`;

    const colorMap = {
        cyan: '#00F5FF',
        emerald: '#00FF88',
        magenta: '#FF00FF',
        violet: '#8A2BE2',
    };

    const strokeColor = colorMap[color] || '#00F5FF';

    return (
        <svg className="data-stream">
            <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0" />
                    <stop offset="50%" stopColor={strokeColor} stopOpacity="1" />
                    <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                </linearGradient>
                <filter id={`glow-${color}`}>
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            <motion.path
                d={path}
                stroke={`url(#gradient-${color})`}
                strokeWidth="2"
                fill="none"
                filter={`url(#glow-${color})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    );
};

export default DataStream;
