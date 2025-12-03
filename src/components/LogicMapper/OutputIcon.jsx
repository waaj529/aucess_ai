import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

/**
 * OutputIcon Component
 * Similar to GlassCard but styled for output/action items
 */
const OutputIcon = React.forwardRef(({ icon, label, description, delay }, ref) => {
    return (
        <motion.div
            ref={ref}
            className="output-icon"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="output-glow" />
            <div className="output-content">
                <span className="card-icon">{icon}</span>
                <div className="card-text">
                    <span className="card-label">{label}</span>
                    {description && <span className="card-description">{description}</span>}
                </div>
            </div>
        </motion.div>
    );
});

export default OutputIcon;
