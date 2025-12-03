import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
    const [accuracy, setAccuracy] = useState(94.3);
    const [loss, setLoss] = useState(0.187);
    const [f1Score, setF1Score] = useState(0.923);
    const [perplexity, setPerplexity] = useState(12.4);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setAccuracy(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 0.1));
            setLoss(prev => Math.max(0.001, prev + (Math.random() - 0.5) * 0.01));
            setF1Score(prev => Math.min(0.999, prev + (Math.random() - 0.5) * 0.005));
            setPerplexity(prev => Math.max(1, prev + (Math.random() - 0.5) * 0.3));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const trainingHistory = [
        { epoch: 10, loss: 0.45, accuracy: 87.2 },
        { epoch: 20, loss: 0.32, accuracy: 90.5 },
        { epoch: 30, loss: 0.24, accuracy: 92.8 },
        { epoch: 40, loss: 0.19, accuracy: 94.1 },
        { epoch: 50, loss: 0.187, accuracy: 94.3 }
    ];

    const modelComparison = [
        { name: 'RAG-v2-7.8B', accuracy: 94.3, loss: 0.187, f1: 0.923, time: '4.2h' },
        { name: 'RAG-v2-3.7B', accuracy: 91.7, loss: 0.243, f1: 0.897, time: '2.1h' },
        { name: 'T5-RAG-7B', accuracy: 92.8, loss: 0.216, f1: 0.912, time: '3.8h' }
    ];

    return (
        <div className="max-w-7xl mx-auto w-full">
            {/* Performance Metrics Grid */}
            <div className="control-grid mb-6">
                {/* Accuracy Card */}
                <motion.div
                    className="glass-panel hover-lift"
                    style={{ minHeight: '140px' }}
                    animate={{ borderColor: ['rgba(0,255,255,0.3)', 'rgba(0,255,255,0.6)', 'rgba(0,255,255,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-xs text-gray-400 mb-2">Accuracy</div>
                        <motion.div
                            className="text-3xl font-bold neon-text mb-1"
                            style={{ fontFamily: "'Orbitron', monospace" }}
                            key={accuracy}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {accuracy.toFixed(1)}%
                        </motion.div>
                        <div className="flex items-center gap-1 text-xs text-green-400">
                            <span>▲</span>
                            <span>+2.3%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Loss Card */}
                <motion.div
                    className="glass-panel hover-lift"
                    style={{ minHeight: '140px' }}
                    animate={{ borderColor: ['rgba(138,43,226,0.3)', 'rgba(138,43,226,0.6)', 'rgba(138,43,226,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-xs text-gray-400 mb-2">Loss</div>
                        <motion.div
                            className="text-3xl font-bold text-purple-400 mb-1"
                            style={{ fontFamily: "'Orbitron', monospace" }}
                            key={loss}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {loss.toFixed(3)}
                        </motion.div>
                        <div className="flex items-center gap-1 text-xs text-green-400">
                            <span>▼</span>
                            <span>-0.04</span>
                        </div>
                    </div>
                </motion.div>

                {/* F1 Score Card */}
                <motion.div
                    className="glass-panel hover-lift"
                    style={{ minHeight: '140px' }}
                    animate={{ borderColor: ['rgba(0,255,255,0.3)', 'rgba(138,43,226,0.3)', 'rgba(0,255,255,0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-xs text-gray-400 mb-2">F1 Score</div>
                        <motion.div
                            className="text-3xl font-bold neon-text mb-1"
                            style={{ fontFamily: "'Orbitron', monospace" }}
                            key={f1Score}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {f1Score.toFixed(3)}
                        </motion.div>
                        <div className="flex items-center gap-1 text-xs text-green-400">
                            <span>▲</span>
                            <span>+0.015</span>
                        </div>
                    </div>
                </motion.div>

                {/* Perplexity Card */}
                <motion.div
                    className="glass-panel hover-lift"
                    style={{ minHeight: '140px' }}
                    animate={{ borderColor: ['rgba(138,43,226,0.3)', 'rgba(0,255,255,0.3)', 'rgba(138,43,226,0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-xs text-gray-400 mb-2">Perplexity</div>
                        <motion.div
                            className="text-3xl font-bold text-purple-400 mb-1"
                            style={{ fontFamily: "'Orbitron', monospace" }}
                            key={perplexity}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {perplexity.toFixed(1)}
                        </motion.div>
                        <div className="flex items-center gap-1 text-xs text-green-400">
                            <span>▼</span>
                            <span>-1.2</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Training History & Model Comparison */}
            <div className="console-grid mb-6">
                {/* Training History Chart */}
                <div className="glass-panel hover-lift flex flex-col" style={{ minHeight: '360px' }}>
                    <h3 className="font-semibold neon-text text-center mb-4" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>
                        Training History
                    </h3>

                    <div className="flex-grow relative">
                        {/* Chart visualization */}
                        <div className="h-full flex flex-col justify-end gap-2 p-4">
                            {trainingHistory.map((data, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="text-xs text-gray-400 w-16" style={{ fontFamily: "'Fira Code', monospace" }}>
                                        Epoch {data.epoch}
                                    </span>

                                    {/* Loss Bar */}
                                    <div className="flex-1">
                                        <div className="text-xs text-purple-400 mb-1">Loss: {data.loss.toFixed(2)}</div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(1 - data.loss) * 100}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Accuracy Bar */}
                                    <div className="flex-1">
                                        <div className="text-xs text-cyan-400 mb-1">Acc: {data.accuracy}%</div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-2 rounded-full neon-glow"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${data.accuracy}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Animated Data Points */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="particle"
                                style={{
                                    top: `${20 + i * 10}%`,
                                    left: `${10 + i * 11}%`
                                }}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Model Comparison Table */}
                <div className="glass-panel hover-lift flex flex-col" style={{ minHeight: '360px' }}>
                    <h3 className="font-semibold neon-text text-center mb-4" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>
                        Model Comparison
                    </h3>

                    <div className="flex-grow overflow-auto">
                        <table className="w-full text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
                            <thead>
                                <tr className="border-b border-cyan-500/30">
                                    <th className="text-left py-2 text-gray-400">Model</th>
                                    <th className="text-right py-2 text-gray-400">Acc</th>
                                    <th className="text-right py-2 text-gray-400">Loss</th>
                                    <th className="text-right py-2 text-gray-400">F1</th>
                                    <th className="text-right py-2 text-gray-400">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelComparison.map((model, index) => (
                                    <motion.tr
                                        key={index}
                                        className="border-b border-gray-700/50 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,255,255,0.1)' }}
                                    >
                                        <td className="py-3">
                                            <div className="flex items-center gap-2">
                                                {index === 0 && <span className="text-cyan-400">●</span>}
                                                <span className={index === 0 ? 'neon-text' : ''}>{model.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-right py-3 text-cyan-400">{model.accuracy}%</td>
                                        <td className="text-right py-3 text-purple-400">{model.loss}</td>
                                        <td className="text-right py-3">{model.f1}</td>
                                        <td className="text-right py-3 text-gray-400">{model.time}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Export Button */}
                        <button className="w-full mt-4 px-3 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded text-xs transition-all hover:from-cyan-500 hover:to-cyan-600">
                            📊 Export Report (JSON)
                        </button>
                    </div>
                </div>
            </div>

            {/* Real-time Statistics */}
            <div className="glass-panel hover-lift" style={{ minHeight: '120px' }}>
                <h4 className="font-semibold neon-text text-center mb-3" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>
                    Real-time Statistics
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
                    <div className="flex flex-col items-center">
                        <motion.div
                            className="w-3 h-3 rounded-full bg-green-400 mb-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400">Active</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Samples/sec</span>
                        <span className="neon-text text-lg">2,847</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">GPU Temp</span>
                        <span className="text-orange-400 text-lg">68°C</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Uptime</span>
                        <span className="text-lg">4h 23m</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
