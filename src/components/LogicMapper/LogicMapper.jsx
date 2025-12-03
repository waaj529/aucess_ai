import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import GlassCard from './GlassCard';
import OutputIcon from './OutputIcon';
import NeuralCore from './NeuralCore';
import DataStream from './DataStream';
import './LogicMapper.css';

const inputCards = [
    { id: 1, icon: '🌐', label: 'Website & URLs', description: 'Structural data from web sources' },
    { id: 2, icon: '📄', label: 'PDFs & Knowledge Base', description: 'Document analysis and extraction' },
    { id: 3, icon: '💬', label: 'Sales Scripts & Logs', description: 'Conversation patterns and insights' },
];

const outputIcons = [
    { id: 1, icon: '📅', label: 'Automated Booking', description: 'Smart scheduling and appointment management' },
    { id: 2, icon: '🛒', label: 'Sales & Transactions', description: 'Automated sales processing and tracking' },
    { id: 3, icon: '🎧', label: 'L1 Customer Support', description: 'Intelligent customer query resolution' },
];

/**
 * LogicMapper Component
 * Main dashboard showing the flow from Business Inputs → Logic Engine → AI Actions
 */
const LogicMapper = () => {
    const [connections, setConnections] = React.useState([]);
    const containerRef = React.useRef(null);
    const coreRef = React.useRef(null);
    const inputRefs = React.useRef([]);
    const outputRefs = React.useRef([]);

    const updateConnections = React.useCallback(() => {
        if (!containerRef.current || !coreRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const coreRect = coreRef.current.getBoundingClientRect();

        const coreCenter = {
            x: coreRect.left - containerRect.left + coreRect.width / 2,
            y: coreRect.top - containerRect.top + coreRect.height / 2
        };

        const newConnections = [];

        // Connect inputs to core
        inputCards.forEach((_, index) => {
            const cardEl = inputRefs.current[index];
            if (cardEl) {
                const rect = cardEl.getBoundingClientRect();
                const start = {
                    x: rect.right - containerRect.left,
                    y: rect.top - containerRect.top + rect.height / 2
                };
                newConnections.push({
                    id: `in-${index}`,
                    start,
                    end: coreCenter,
                    color: 'magenta'
                });
            }
        });

        // Connect core to outputs
        outputIcons.forEach((_, index) => {
            const iconEl = outputRefs.current[index];
            if (iconEl) {
                const rect = iconEl.getBoundingClientRect();
                const end = {
                    x: rect.left - containerRect.left,
                    y: rect.top - containerRect.top + rect.height / 2
                };
                newConnections.push({
                    id: `out-${index}`,
                    start: coreCenter,
                    end,
                    color: 'emerald'
                });
            }
        });

        setConnections(newConnections);
    }, []);

    React.useEffect(() => {
        updateConnections();
        window.addEventListener('resize', updateConnections);
        // Update after a small delay to ensure layout is settled
        const timer = setTimeout(updateConnections, 500);

        return () => {
            window.removeEventListener('resize', updateConnections);
            clearTimeout(timer);
        };
    }, [updateConnections]);

    return (
        <motion.div
            ref={containerRef}
            className="logic-mapper-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* Circuit board background */}
            <div className="circuit-bg" />

            {/* Data Streams */}
            {connections.map(conn => (
                <DataStream
                    key={conn.id}
                    start={conn.start}
                    end={conn.end}
                    color={conn.color}
                />
            ))}

            {/* Three.js scene background */}
            <div className="scene-container">
                <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} color="#00F5FF" intensity={1} />
                    <pointLight position={[-10, -10, 10]} color="#00FF88" intensity={1} />
                    <NeuralCore />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            {/* Main layout */}
            <div className="mapper-layout">
                {/* Left Column - Inputs */}
                <div className="mapper-column mapper-column-left">
                    <h3 className="mapper-column-title">Business Inputs</h3>
                    {inputCards.map((card, index) => (
                        <GlassCard
                            key={card.id}
                            ref={el => inputRefs.current[index] = el}
                            icon={card.icon}
                            label={card.label}
                            description={card.description}
                            delay={0.2 + index * 0.1}
                        />
                    ))}
                </div>

                {/* Center Core */}
                <div className="core-container" ref={coreRef}>
                    <div className="core-visual core-pulse">
                        <div className="core-ring" />
                        <div className="core-icon">🧠</div>
                    </div>
                    <h3 className="core-title">Logic Mapping & Analysis Engine</h3>
                </div>

                {/* Right Column - Outputs */}
                <div className="mapper-column mapper-column-right">
                    <h3 className="mapper-column-title">AI Action Blueprint</h3>
                    {outputIcons.map((item, index) => (
                        <OutputIcon
                            key={item.id}
                            ref={el => outputRefs.current[index] = el}
                            icon={item.icon}
                            label={item.label}
                            description={item.description}
                            delay={0.5 + index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default LogicMapper;
