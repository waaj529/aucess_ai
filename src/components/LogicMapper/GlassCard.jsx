import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

/**
 * GlassCard Component
 * Glassmorphism card with glow effects for input items
 */
const GlassCard = React.forwardRef(({ icon, label, description, textColor }, ref) => {
    return (
        <motion.div
            ref={ref}
            className="glass-card"
            whileHover={{ scale: 1.05 }}
        >
            <div className="glow-border" />
            <div className="card-content">
                <span className="card-icon">{icon}</span>
                <div className="card-text">
                    <span className="card-label" style={textColor ? { color: textColor } : {}}>{label}</span>
                    {description && <span className="card-description">{description}</span>}
                </div>
            </div>
            <div className="pulse-ring" />
        </motion.div>
    );
});

export default GlassCard;
