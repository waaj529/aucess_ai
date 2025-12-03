import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './CyberpunkConsole.css';
import ConfigurationPage from './ConfigurationPage';
import AnalyticsPage from './AnalyticsPage';
import PipelinePage from './PipelinePage';

const CyberpunkConsole = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isTraining, setIsTraining] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState(87);
    const [gpuUsage, setGpuUsage] = useState(78);
    const [memoryUsage, setMemoryUsage] = useState(77);

    useEffect(() => {
        let interval;
        if (isTraining) {
            interval = setInterval(() => {
                setTrainingProgress(prev => {
                    const next = prev + Math.random() * 2;
                    return next >= 100 ? 100 : next;
                });
                setGpuUsage(70 + Math.random() * 20);
                setMemoryUsage(75 + Math.random() * 15);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isTraining]);

    useEffect(() => {
        if (trainingProgress >= 100) {
            setIsTraining(false); // eslint-disable-line react-hooks/set-state-in-effect
        }
    }, [trainingProgress]);

    const startTraining = () => {
        setIsTraining(true);
    };

    const pauseTraining = () => {
        setIsTraining(false);
    };

    const stopTraining = () => {
        setIsTraining(false);
        setTrainingProgress(0);
    };

    return (
        <div className="cyberpunk-console-container cyberpunk-bg text-white">
            {/* Navigation Bar */}
            <nav className="glass-panel nav-panel flex flex-col items-center justify-center relative overflow-hidden w-full" style={{ marginTop: 'clamp(0.5rem, 2vw, 1rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                <div className="flex flex-col items-center w-full" style={{ marginBottom: 'clamp(0.5rem, 2vw, 1rem)' }}>
                    <h1 className="font-bold neon-text tracking-wider text-center w-full" style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}>AI DEV CONSOLE</h1>
                </div>

                <div className="flex border-t border-gray-800 w-full justify-center" style={{ gap: 'clamp(0.5rem, 3vw, 2rem)', paddingTop: 'clamp(0.5rem, 2vw, 0.75rem)', flexWrap: 'wrap' }}>
                    <span
                        className={`nav-tab hover:text-cyan-400 transition-colors ${activeTab === 'Dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Dashboard')}
                    >
                        Dashboard
                    </span>
                    <span
                        className={`nav-tab hover:text-cyan-400 transition-colors ${activeTab === 'Configuration' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Configuration')}
                    >
                        Configuration
                    </span>
                    <span
                        className={`nav-tab hover:text-cyan-400 transition-colors ${activeTab === 'Analytics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Analytics')}
                    >
                        Analytics
                    </span>
                    <span
                        className={`nav-tab hover:text-cyan-400 transition-colors ${activeTab === 'Pipeline' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Pipeline')}
                    >
                        Pipeline
                    </span>
                </div>
            </nav>

            {/* Main Content */}
            <motion.div
                className="max-w-7xl mx-auto w-full"
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === 'Dashboard' && (
                    <>
                        {/* Main Interface */}
                        <div className="console-grid mb-6">
                            {/* Left Panel - Code Editor */}
                            <div className="glass-panel hover-lift flex flex-col" style={{ height: '360px' }}>
                                <div className="flex items-center justify-center" style={{ marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)', minHeight: 'clamp(1.5rem, 5vw, 2rem)' }}>
                                    <h3 className="font-semibold neon-text m-0 text-center" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Python Code Editor</h3>
                                </div>

                                <div className="code-editor relative flex-grow">
                                    <div className="overflow-x-auto" style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', textAlign: 'left', display: 'block' }}>
                                        {[
                                            { line: 1, content: <span><span className="python-keyword">import</span> <span className="python-variable">torch</span></span> },
                                            { line: 2, content: <span><span className="python-keyword">from</span> <span className="python-variable">transformers</span> <span className="python-keyword">import</span> <span className="python-variable">AutoModel</span>, <span className="python-variable">AutoTokenizer</span></span> },
                                            { line: 3, content: <span><span className="python-keyword">from</span> <span className="python-variable">faiss</span> <span className="python-keyword">import</span> <span className="python-variable">IndexFlatIP</span></span> },
                                            { line: 4, content: <span></span> },
                                            { line: 5, content: <span><span className="python-keyword">class</span> <span className="python-function">RAGModel</span>:</span> },
                                            { line: 6, content: <span>    <span className="python-keyword">def</span> <span className="python-function">__init__</span>(<span className="python-variable">self</span>, <span className="python-variable">model_name</span>):</span> },
                                            { line: 7, content: <span>        <span className="python-variable">self</span>.<span className="python-variable">tokenizer</span> = <span className="python-function">AutoTokenizer</span>.<span className="python-function">from_pretrained</span>(<span className="python-variable">model_name</span>)</span> },
                                            { line: 8, content: <span>        <span className="python-variable">self</span>.<span className="python-variable">model</span> = <span className="python-function">AutoModel</span>.<span className="python-function">from_pretrained</span>(<span className="python-variable">model_name</span>)</span> },
                                            { line: 9, content: <span>        <span className="python-variable">self</span>.<span className="python-variable">vector_db</span> = <span className="python-function">IndexFlatIP</span>(<span className="python-string">'768'</span>)</span> },
                                            { line: 10, content: <span className="typing-animation">        <span className="python-comment"># Initialize vector database for RAG</span></span> }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="code-line flex"
                                                animate={{ backgroundColor: ['rgba(0,0,0,0)', 'rgba(0, 255, 255, 0.1)', 'rgba(0,0,0,0)'] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 1.5, repeatDelay: 5 }}
                                            >
                                                <span className="line-number">{item.line}</span>
                                                {item.content}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="python-logo text-2xl opacity-30">🐍</div>
                                </div>
                            </div>

                            {/* Right Panel - Neural Visualization */}
                            <div className="glass-panel hover-lift flex flex-col relative" style={{ height: '360px' }}>
                                <div className="flex items-center justify-center" style={{ marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)', minHeight: 'clamp(1.5rem, 5vw, 2rem)' }}>
                                    <h3 className="font-semibold neon-text m-0 text-center" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Neural Training Pipeline</h3>
                                </div>

                                <div className="neural-viz relative flex-grow">
                                    {/* Vector Database Cylinder */}
                                    <div className="absolute bottom-16 left-6 w-12 h-16 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-full opacity-80 neon-glow">
                                        <div className="w-full h-full rounded-full bg-gradient-to-t from-transparent via-cyan-300 to-transparent opacity-50"></div>
                                    </div>

                                    {/* AI Brain Chip */}
                                    <div className="absolute top-12 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg transform rotate-45 neon-glow">
                                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 opacity-70"></div>
                                    </div>

                                    {/* Neural Nodes */}
                                    {[
                                        { top: '30%', left: '20%' },
                                        { top: '45%', left: '40%' },
                                        { top: '60%', left: '25%' },
                                        { top: '35%', left: '60%' },
                                        { top: '55%', left: '70%' }
                                    ].map((pos, i) => (
                                        <motion.div
                                            key={i}
                                            className="neural-node"
                                            style={pos}
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                        />
                                    ))}

                                    {/* Data Flow Lines */}
                                    {[
                                        { top: '35%', left: '25%', width: '40%' },
                                        { top: '50%', left: '30%', width: '35%' },
                                        { top: '65%', left: '35%', width: '30%' }
                                    ].map((style, i) => (
                                        <motion.div
                                            key={i}
                                            className="data-flow"
                                            style={style}
                                            animate={{ x: ['-100%', '100%'], opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                                        />
                                    ))}

                                    {/* Floating Particles */}
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="particle"
                                            style={{
                                                top: `${20 + i * 10}%`,
                                                left: `${30 + i * 10}%`
                                            }}
                                            animate={{ y: [0, -30, 0], scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                                        />
                                    ))}

                                    {/* Training Progress */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-400">Training Progress</span>
                                            <span className="text-xs neon-text">{Math.round(trainingProgress)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                                            <motion.div
                                                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1.5 rounded-full neon-glow"
                                                style={{ width: `${trainingProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control Panel */}
                        <div className="control-grid">
                            {/* System Metrics */}
                            <div className="glass-panel hover-lift" style={{ height: '160px' }}>
                                <h4 className="font-semibold neon-text text-center" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)' }}>System Metrics</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400">GPU Usage</span>
                                        <span className="text-xs neon-text">{Math.round(gpuUsage)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1">
                                        <motion.div
                                            className="bg-cyan-400 h-1 rounded-full"
                                            animate={{ width: `${gpuUsage}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-400">Memory</span>
                                        <span className="text-xs neon-text">{Math.round(memoryUsage / 100 * 16 * 10) / 10}/16 GB</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1">
                                        <motion.div
                                            className="bg-purple-400 h-1 rounded-full"
                                            animate={{ width: `${memoryUsage}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Training Controls */}
                            <div className="glass-panel hover-lift" style={{ height: '160px' }}>
                                <h4 className="font-semibold neon-text text-center" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)' }}>Training Controls</h4>
                                <div className="flex justify-center h-full items-center" style={{ gap: 'clamp(0.25rem, 1.5vw, 0.5rem)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
                                    <button onClick={startTraining} className="px-3 py-1.5 rounded text-xs transition-colors text-white flex items-center" style={{ backgroundColor: '#16a34a', border: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#22c55e'} onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}>
                                        <span className="mr-1">▶</span> Start
                                    </button>
                                    <button onClick={pauseTraining} className="px-3 py-1.5 rounded text-xs transition-colors text-white flex items-center" style={{ backgroundColor: '#ca8a04', border: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#eab308'} onMouseLeave={(e) => e.target.style.backgroundColor = '#ca8a04'}>
                                        <span className="mr-1">⏸</span> Pause
                                    </button>
                                    <button onClick={stopTraining} className="px-3 py-1.5 rounded text-xs transition-colors text-white flex items-center" style={{ backgroundColor: '#dc2626', border: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ef4444'} onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}>
                                        <span className="mr-1">⏹</span> Stop
                                    </button>
                                </div>
                            </div>

                            {/* Model Info */}
                            <div className="glass-panel hover-lift" style={{ height: '160px' }}>
                                <h4 className="font-semibold neon-text text-center" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)' }}>Model Information</h4>
                                <div className="space-y-2" style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Architecture:</span>
                                        <span>RAG-v2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Parameters:</span>
                                        <span>7.8B</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Dataset:</span>
                                        <span>Wikipedia-2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Configuration' && <ConfigurationPage />}
                {activeTab === 'Analytics' && <AnalyticsPage />}
                {activeTab === 'Pipeline' && <PipelinePage />}
            </motion.div>
        </div>
    );
};

export default CyberpunkConsole;
