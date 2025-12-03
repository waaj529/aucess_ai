import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const ConfigurationPage = () => {
    const [modelArchitecture, setModelArchitecture] = useState('RAG-v2');
    const [modelSize, setModelSize] = useState('7.8B');
    const [learningRate, setLearningRate] = useState(0.001);
    const [batchSize, setBatchSize] = useState(32);
    const [epochs, setEpochs] = useState(50);
    const [temperature, setTemperature] = useState(0.7);
    const [gradientCheckpointing, setGradientCheckpointing] = useState(true);
    const [mixedPrecision, setMixedPrecision] = useState(true);
    const [distributedTraining, setDistributedTraining] = useState(false);

    const architectures = ['RAG-v2', 'RAG-v3', 'T5-RAG', 'BERT-RAG', 'GPT-RAG'];
    const sizes = ['1.5B', '3.7B', '7.8B', '13B', '30B'];

    return (
        <div className="max-w-7xl mx-auto w-full">
            {/* Model Settings & Hyperparameters Grid */}
            <div className="console-grid mb-6">
                {/* Model Settings Panel */}
                <div className="glass-panel hover-lift flex flex-col" style={{ minHeight: '360px' }}>
                    <h3 className="font-semibold neon-text text-center mb-4" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>
                        Model Configuration
                    </h3>

                    <div className="space-y-4 flex-grow">
                        {/* Architecture Selector */}
                        <div>
                            <label className="block text-xs text-gray-400 mb-2">Model Architecture</label>
                            <select
                                value={modelArchitecture}
                                onChange={(e) => setModelArchitecture(e.target.value)}
                                className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                style={{ fontFamily: "'Fira Code', monospace" }}
                            >
                                {architectures.map(arch => (
                                    <option key={arch} value={arch}>{arch}</option>
                                ))}
                            </select>
                        </div>

                        {/* Model Size Selector */}
                        <div>
                            <label className="block text-xs text-gray-400 mb-2">Model Size</label>
                            <select
                                value={modelSize}
                                onChange={(e) => setModelSize(e.target.value)}
                                className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                style={{ fontFamily: "'Fira Code', monospace" }}
                            >
                                {sizes.map(size => (
                                    <option key={size} value={size}>{size} Parameters</option>
                                ))}
                            </select>
                        </div>

                        {/* Pretrained Weights */}
                        <div>
                            <label className="block text-xs text-gray-400 mb-2">Pretrained Weights</label>
                            <div className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-sm">
                                <span className="text-purple-400" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    huggingface/rag-token-base
                                </span>
                            </div>
                        </div>

                        {/* Current Config Display */}
                        <motion.div
                            className="mt-4 p-3 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded"
                            animate={{ borderColor: ['rgba(0,255,255,0.3)', 'rgba(138,43,226,0.3)', 'rgba(0,255,255,0.3)'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <div className="text-xs space-y-1" style={{ fontFamily: "'Fira Code', monospace" }}>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Active Model:</span>
                                    <span className="neon-text">{modelArchitecture}-{modelSize}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className="text-green-400">● Ready</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Hyperparameter Controls */}
                <div className="glass-panel hover-lift flex flex-col" style={{ minHeight: '360px' }}>
                    <h3 className="font-semibold neon-text text-center mb-4" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>
                        Hyperparameters
                    </h3>

                    <div className="space-y-4 flex-grow">
                        {/* Learning Rate Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs text-gray-400">Learning Rate</label>
                                <span className="text-xs neon-text" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    {learningRate.toFixed(4)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.0001"
                                max="0.01"
                                step="0.0001"
                                value={learningRate}
                                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                                className="w-full cyber-slider"
                            />
                        </div>

                        {/* Batch Size Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs text-gray-400">Batch Size</label>
                                <span className="text-xs neon-text" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    {batchSize}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="128"
                                step="8"
                                value={batchSize}
                                onChange={(e) => setBatchSize(parseInt(e.target.value))}
                                className="w-full cyber-slider"
                            />
                        </div>

                        {/* Epochs Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs text-gray-400">Training Epochs</label>
                                <span className="text-xs neon-text" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    {epochs}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="200"
                                step="10"
                                value={epochs}
                                onChange={(e) => setEpochs(parseInt(e.target.value))}
                                className="w-full cyber-slider"
                            />
                        </div>

                        {/* Temperature Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs text-gray-400">Temperature</label>
                                <span className="text-xs neon-text" style={{ fontFamily: "'Fira Code', monospace" }}>
                                    {temperature.toFixed(2)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="2.0"
                                step="0.1"
                                value={temperature}
                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                className="w-full cyber-slider"
                            />
                        </div>

                        {/* Visual Feedback */}
                        <motion.div
                            className="flex items-center justify-center gap-2 mt-4"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-2 h-2 rounded-full bg-cyan-400 neon-glow"></div>
                            <span className="text-xs text-gray-400">Parameters Updated</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Dataset Management & Advanced Options */}
            <div className="control-grid">
                {/* Dataset Management */}
                <div className="glass-panel hover-lift" style={{ minHeight: '180px' }}>
                    <h4 className="font-semibold neon-text text-center mb-3" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>
                        Dataset Management
                    </h4>

                    <div className="space-y-3">
                        <div className="text-xs space-y-1" style={{ fontFamily: "'Fira Code', monospace" }}>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Current Dataset:</span>
                                <span className="text-cyan-400">Wikipedia-2024</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Samples:</span>
                                <span>2.4M</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Size:</span>
                                <span>47.3 GB</span>
                            </div>
                        </div>

                        <button className="w-full px-3 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded text-xs transition-all hover:from-cyan-500 hover:to-cyan-600 neon-glow">
                            📁 Upload New Dataset
                        </button>
                    </div>
                </div>

                {/* Advanced Options */}
                <div className="glass-panel hover-lift" style={{ minHeight: '180px' }}>
                    <h4 className="font-semibold neon-text text-center mb-3" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>
                        Advanced Options
                    </h4>

                    <div className="space-y-3">
                        {/* Toggle Switches */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Gradient Checkpointing</span>
                            <label className="cyber-toggle">
                                <input
                                    type="checkbox"
                                    checked={gradientCheckpointing}
                                    onChange={(e) => setGradientCheckpointing(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Mixed Precision (FP16)</span>
                            <label className="cyber-toggle">
                                <input
                                    type="checkbox"
                                    checked={mixedPrecision}
                                    onChange={(e) => setMixedPrecision(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Distributed Training</span>
                            <label className="cyber-toggle">
                                <input
                                    type="checkbox"
                                    checked={distributedTraining}
                                    onChange={(e) => setDistributedTraining(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Configuration */}
                <div className="glass-panel hover-lift flex flex-col items-center justify-center" style={{ minHeight: '180px' }}>
                    <h4 className="font-semibold neon-text text-center mb-3" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>
                        Actions
                    </h4>

                    <div className="space-y-2 w-full">
                        <motion.button
                            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded text-sm font-semibold transition-all hover:from-purple-500 hover:to-purple-600"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            💾 Save Configuration
                        </motion.button>

                        <button className="w-full px-4 py-2 bg-gray-700 rounded text-xs transition-colors hover:bg-gray-600">
                            ↺ Reset to Defaults
                        </button>

                        <button className="w-full px-4 py-2 bg-gray-700 rounded text-xs transition-colors hover:bg-gray-600">
                            📋 Export as JSON
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigurationPage;
