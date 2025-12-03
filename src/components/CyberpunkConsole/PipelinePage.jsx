import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const PipelinePage = () => {
    const [pipelineStatus] = useState('running');

    const stages = [
        { name: 'Ingestion', status: 'complete', progress: 100, icon: '📥' },
        { name: 'Preprocessing', status: 'complete', progress: 100, icon: '⚙️' },
        { name: 'Training', status: 'running', progress: 87, icon: '🧠' },
        { name: 'Deployment', status: 'pending', progress: 0, icon: '🚀' }
    ];







    const getStatusBadge = (status) => {
        switch (status) {
            case 'complete': return 'bg-green-500/20 border-green-500 text-green-400';
            case 'running': return 'bg-cyan-500/20 border-cyan-500 text-cyan-400';
            case 'pending': return 'bg-gray-500/20 border-gray-500 text-gray-400';
            default: return 'bg-gray-500/20 border-gray-500 text-gray-400';
        }
    };

    return (
        <div className="max-w-7xl mx-auto w-full">
            {/* Pipeline Flowchart */}
            <div className="glass-panel hover-lift mb-6" style={{ minHeight: '200px' }}>
                <h3 className="font-semibold neon-text text-center mb-6" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>
                    Data Pipeline Flow
                </h3>

                <div className="flex items-center justify-between gap-2 px-4">
                    {stages.map((stage, index) => (
                        <React.Fragment key={stage.name}>
                            {/* Stage Card */}
                            <motion.div
                                className="flex-1 relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className={`glass-panel text-center p-4 ${stage.status === 'running' ? 'neon-glow' : ''}`}>
                                    <div className="text-2xl mb-2">{stage.icon}</div>
                                    <div className="text-xs font-semibold mb-2">{stage.name}</div>

                                    {/* Status Badge */}
                                    <div className={`inline-block px-2 py-1 rounded text-xs border ${getStatusBadge(stage.status)}`}>
                                        {stage.status === 'complete' && '✓ Complete'}
                                        {stage.status === 'running' && '⟳ Running'}
                                        {stage.status === 'pending' && '○ Pending'}
                                    </div>

                                    {/* Progress Bar */}
                                    {stage.progress > 0 && (
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-700 rounded-full h-1">
                                                <motion.div
                                                    className={`h-1 rounded-full ${stage.status === 'running' ? 'bg-cyan-400 neon-glow' : 'bg-green-400'}`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${stage.progress}%` }}
                                                    transition={{ duration: 1, delay: index * 0.2 }}
                                                />
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">{stage.progress}%</div>
                                        </div>
                                    )}
                                </div>

                                {/* Animated Pulse for Running Stage */}
                                {stage.status === 'running' && (
                                    <motion.div
                                        className="absolute inset-0 border-2 border-cyan-400 rounded-lg"
                                        animate={{ opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </motion.div>

                            {/* Connection Line */}
                            {index < stages.length - 1 && (
                                <div className="flex-shrink-0 relative" style={{ width: '40px', height: '2px' }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-purple-500/50"></div>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: stages[index].status === 'complete' ? 1 : 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        style={{ transformOrigin: 'left' }}
                                    />

                                    {/* Data Flow Animation */}
                                    {stages[index].status === 'running' && (
                                        <motion.div
                                            className="absolute top-0 w-2 h-2 bg-cyan-400 rounded-full"
                                            animate={{ x: [-10, 50], opacity: [1, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Deployment Controls - Single Section */}
            <div className="glass-panel hover-lift" style={{ minHeight: '240px' }}>
                <h3 className="font-semibold neon-text text-center mb-4" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>
                    Deployment & Monitoring
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Status Info */}
                    <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/40 rounded">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-400">Status</span>
                                <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(pipelineStatus)}`}>
                                    {pipelineStatus === 'running' ? '● Running' : '○ Stopped'}
                                </span>
                            </div>
                            <div className="space-y-1 text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Endpoint:</span>
                                    <span className="text-cyan-400">api.rag.ai/v2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Replicas:</span>
                                    <span className="text-green-400">3/3</span>
                                </div>
                            </div>
                        </div>

                        {/* Resource Monitoring */}
                        <div className="p-3 border border-cyan-500/30 rounded">
                            <div className="text-xs text-gray-400 mb-2">Resources</div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">CPU</span>
                                        <span className="neon-text">67%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1">
                                        <div className="bg-cyan-400 h-1 rounded-full" style={{ width: '67%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Memory</span>
                                        <span className="text-purple-400">82%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1">
                                        <div className="bg-purple-400 h-1 rounded-full" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="space-y-2">
                        <motion.button
                            className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded text-sm font-semibold transition-all hover:from-green-500 hover:to-green-600"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            🚀 Deploy to Production
                        </motion.button>

                        <button className="w-full px-4 py-2 bg-gray-700 rounded text-xs transition-colors hover:bg-gray-600">
                            ⏸ Pause Pipeline
                        </button>

                        <button className="w-full px-4 py-2 bg-gray-700 rounded text-xs transition-colors hover:bg-gray-600">
                            🔄 Restart Services
                        </button>

                        {/* Pipeline Throughput */}
                        <div className="mt-3 p-3 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded">
                            <div className="text-xs text-gray-400 mb-1">Throughput</div>
                            <div className="text-lg font-bold neon-text" style={{ fontFamily: "'Orbitron', monospace" }}>
                                2,847 samples/sec
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PipelinePage;
