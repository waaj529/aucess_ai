import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';

/**
 * AdminDashboard - Multi-page SaaS Dashboard
 * Features: Dashboard, Analytics, Integrations, Chat pages with navigation
 */
const AdminDashboard = () => {
    const [activePage, setActivePage] = useState('dashboard');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'chat', label: 'Chat' }
    ];

    return (
        <div className="admin-dashboard-wrapper">
            <div className="admin-dashboard-container glass">
                {/* Header inside container */}
                <header className="dashboard-header">
                    <div className="header-content">
                        <div className="header-left">
                            {/* <div className="dashboard-logo gradient-text">SaaS Dashboard</div> */}
                            <nav className="dashboard-nav">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        className={`nav-tab ${activePage === item.id ? 'active' : ''}`}
                                        onClick={() => setActivePage(item.id)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="header-right">
                            <div className="system-status">
                                <div className="status-dot pulse-green"></div>
                                <span className="status-text">SYSTEM LIVE</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="dashboard-content">
                    <AnimatePresence mode="wait">
                        {activePage === 'dashboard' && <DashboardPage key="dashboard" />}
                        {activePage === 'analytics' && <AnalyticsPage key="analytics" />}
                        {activePage === 'integrations' && <IntegrationsPage key="integrations" />}
                        {activePage === 'chat' && <ChatPage key="chat" />}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

// Dashboard Page Component
const DashboardPage = () => {
    const chartRef = React.useRef(null);

    React.useEffect(() => {
        const points = [
            { x: 10, y: 85 },
            { x: 25, y: 78 },
            { x: 40, y: 70 },
            { x: 55, y: 60 },
            { x: 70, y: 45 },
            { x: 85, y: 25 },
            { x: 95, y: 15 }
        ];

        if (chartRef.current) {
            const svg = chartRef.current;
            const path = svg.querySelector('.chart-path');
            const area = svg.querySelector('.chart-area');

            let pathString = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                const xc = (points[i].x + points[i - 1].x) / 2;
                const yc = (points[i].y + points[i - 1].y) / 2;
                pathString += ` Q ${points[i - 1].x} ${points[i - 1].y} ${xc} ${yc}`;
            }
            pathString += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;

            if (path) path.setAttribute('d', pathString);
            let areaString = pathString + ` L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;
            if (area) area.setAttribute('d', areaString);
        }
    }, []);

    const metrics = [
        { value: '153', label: 'Monthly Bookings', trend: '+12.5%' },
        { value: '%25', label: 'Conversion Rate', trend: '+8.3%' },
        { value: '$12,500', label: 'Monthly Revenue', trend: '+24.7%' }
    ];

    return (
        <motion.div
            className="page-container dashboard-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Hero Section */}
            <div className="page-hero">
                <h1 className="hero-title">Launch & Analytics Dashboard</h1>
                <p className="hero-subtitle">
                    Monitor your SaaS performance in real-time with comprehensive analytics.
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Left Side - Chart and Metrics */}
                <div className="dashboard-main">
                    {/* Leads Chart */}
                    <div className="chart-card glass">
                        <div className="chart-header">
                            <h3 className="chart-title">Leads Generated</h3>
                            <div className="time-buttons">
                                <button className="time-btn active">24h</button>
                                <button className="time-btn">7d</button>
                                <button className="time-btn">30d</button>
                                <button className="time-btn">1y</button>
                            </div>
                        </div>
                        <div className="chart-body">
                            <svg ref={chartRef} className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#00FF88', stopOpacity: 0.4 }} />
                                        <stop offset="100%" style={{ stopColor: '#00FF88', stopOpacity: 0.05 }} />
                                    </linearGradient>
                                </defs>
                                <path className="chart-area" fill="url(#chartGradient)" />
                                <path className="chart-path" fill="none" stroke="#00FF88" strokeWidth="0.5" />
                            </svg>
                        </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="metrics-row">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                className="metric-card glass"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                            >
                                <div className="metric-value gradient-text">{metric.value}</div>
                                <div className="metric-label">{metric.label}</div>
                                <div className="metric-trend">
                                    <svg className="trend-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{metric.trend}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Widgets */}
                <div className="dashboard-sidebar">
                    {/* Chat Widget */}
                    <div className="widget-card glass">
                        <h4 className="widget-title">Live Chat Widget</h4>
                        <div className="chat-preview">
                            <div className="chat-header">
                                <div className="chat-avatar"></div>
                                <div className="chat-info">
                                    <div className="chat-name">Support Team</div>
                                    <div className="chat-online">Online</div>
                                </div>
                            </div>
                            <div className="chat-messages">
                                <div className="chat-message-left">
                                    <div className="message-bubble">I'd like to book a demo</div>
                                    <div className="message-time">2:35 PM</div>
                                </div>
                                <div className="chat-message-right">
                                    <div className="message-bubble">Perfect! I'd be happy to schedule a demo for you.</div>
                                    <div className="message-time">2:35 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </motion.div>
    );
};

// Analytics Page Component
const AnalyticsPage = () => {
    const kpiCards = [
        { label: 'Total Revenue', value: '$127,450', trend: '+24.7%', icon: 'up' },
        { label: 'Active Users', value: '2,847', trend: '+12.3%', icon: 'users' },
        { label: 'Conversion Rate', value: '24.7%', trend: '+8.3%', icon: 'chart' },
        { label: 'Avg. Session', value: '6m 42s', trend: '+15.2%', icon: 'time' }
    ];

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Detailed Analytics</h1>
                    <p className="page-subtitle">Comprehensive insights into your SaaS performance</p>
                </div>
                <div className="header-actions">
                    <select className="glass time-select">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last 90 days</option>
                        <option>Last year</option>
                    </select>
                    <button className="btn-primary">Export Report</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
                {kpiCards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="kpi-card glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <div className="kpi-header">
                            <span className="kpi-label">{card.label}</span>
                            <svg className="kpi-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="kpi-value gradient-text">{card.value}</div>
                        <div className="kpi-trend">{card.trend} from last month</div>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Trends Chart */}
            <div className="glass analytics-chart-card">
                <div className="chart-header">
                    <h2 className="chart-title">Revenue Trends</h2>
                    <div className="chart-type-buttons">
                        <button className="chart-type-btn active">Line</button>
                        <button className="chart-type-btn">Bar</button>
                        <button className="chart-type-btn">Area</button>
                    </div>
                </div>
                <div className="analytics-chart-placeholder">
                    <svg viewBox="0 0 100 40" className="trend-chart">
                        <path
                            d="M 0 35 Q 10 30 20 25 T 40 20 T 60 10 T 80 5 T 100 3"
                            fill="none"
                            stroke="var(--neon-green)"
                            strokeWidth="0.5"
                        />
                        <path
                            d="M 0 35 Q 10 30 20 25 T 40 20 T 60 10 T 80 5 T 100 3 L 100 40 L 0 40 Z"
                            fill="url(#analyticGradient)"
                        />
                        <defs>
                            <linearGradient id="analyticGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#00FF88', stopOpacity: 0.3 }} />
                                <stop offset="100%" style={{ stopColor: '#00FF88', stopOpacity: 0 }} />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Secondary Charts Grid */}
            <div className="secondary-charts-grid">
                <div className="glass analytics-chart-card">
                    <h3 className="chart-title">Workflow Executions</h3>
                    <div className="chart-content">
                        <svg viewBox="0 0 300 150" className="bar-chart">
                            {/* Bars */}
                            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                                <g key={i}>
                                    <rect
                                        x={30 + i * 40}
                                        y={130 - height}
                                        width="20"
                                        height={height}
                                        rx="4"
                                        fill="url(#barGradient)"
                                        className="bar-rect"
                                    />
                                    <text x={40 + i * 40} y="145" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                    </text>
                                </g>
                            ))}
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--neon-green)" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="var(--neon-green)" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className="glass analytics-chart-card">
                    <h3 className="chart-title">Task Success Rate</h3>
                    <div className="chart-content donut-container">
                        <svg viewBox="0 0 200 200" className="donut-chart">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                fill="none"
                                stroke="var(--neon-green)"
                                strokeWidth="20"
                                strokeDasharray="440" /* 2 * pi * 80 approx 502. 440 is ~87% */
                                strokeDashoffset="60"
                                strokeLinecap="round"
                                transform="rotate(-90 100 100)"
                            />
                            <text x="100" y="95" textAnchor="middle" fill="var(--text-primary)" fontSize="32" fontWeight="bold">87%</text>
                            <text x="100" y="120" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">Success</text>
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Integrations Page Component
const IntegrationsPage = () => {
    const [toggleStates, setToggleStates] = React.useState({
        wordpress: true,
        api: true,
        email: false,
        crm: true,
        slack: true,
        analytics: false
    });

    const integrations = [
        { id: 'wordpress', name: 'WordPress Plugin', status: 'Connected', color: 'blue', lastSync: '2 min ago' },
        { id: 'api', name: 'API Connection', status: 'Active', color: 'purple', responseTime: '124ms' },
        { id: 'email', name: 'Email Marketing', status: 'Pending', color: 'red', note: 'Not configured' },
        { id: 'crm', name: 'CRM Integration', status: 'Connected', color: 'blue', lastSync: '5 min ago' },
        { id: 'slack', name: 'Slack Notifications', status: 'Active', color: 'green', channel: '#saas-alerts' },
        { id: 'analytics', name: 'Analytics Tool', status: 'Disconnected', color: 'gray', note: 'Connection failed' }
    ];

    const toggleIntegration = (id) => {
        setToggleStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Integration Management</h1>
                    <p className="page-subtitle">Connect and manage your third-party services</p>
                </div>
                <button className="btn-primary">Add Integration</button>
            </div>

            {/* Integration Cards Grid */}
            <div className="integrations-grid">
                {integrations.map((integration, index) => (
                    <motion.div
                        key={integration.id}
                        className="integration-card glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <div className="integration-card-header">
                            <div className="integration-card-info">
                                <div className={`integration-card-icon bg-${integration.color}`}>
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="integration-card-name">{integration.name}</div>
                                    <div className={`integration-card-status status-${integration.status.toLowerCase()}`}>
                                        {integration.status}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`toggle-switch ${toggleStates[integration.id] ? 'active' : ''}`}
                                onClick={() => toggleIntegration(integration.id)}
                            >
                                <div className="toggle-slider"></div>
                            </div>
                        </div>
                        <p className="integration-card-description">
                            {integration.lastSync && `Last synced: ${integration.lastSync}`}
                            {integration.responseTime && `Response time: ${integration.responseTime}`}
                            {integration.channel && `Channel: ${integration.channel}`}
                            {integration.note && integration.note}
                        </p>
                        <button className="integration-configure-btn">
                            {integration.status === 'Disconnected' ? 'Reconnect' : 'Configure'}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* WordPress Plugin Section */}
            <div className="glass integration-section">
                <div className="section-header">
                    <h3 className="section-title">WordPress Plugin Setup</h3>
                    <div className="status-indicator">
                        <div className="status-dot pulse-green"></div>
                        <span className="status-label">Connected</span>
                    </div>
                </div>
                <div className="wordpress-grid">
                    <div className="wordpress-steps">
                        <h4 className="subsection-title">Installation Guide</h4>
                        <div className="step-item">
                            <div className="admin-step-number">1</div>
                            <div>
                                <div className="step-title">Download the Plugin</div>
                                <div className="step-description">Get the latest version from your dashboard</div>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="admin-step-number">2</div>
                            <div>
                                <div className="step-title">Upload to WordPress</div>
                                <div className="step-description">Install via WordPress admin or FTP</div>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="admin-step-number">3</div>
                            <div>
                                <div className="step-title">Activate & Configure</div>
                                <div className="step-description">Enter your API key and customize settings</div>
                            </div>
                        </div>
                    </div>
                    <div className="wordpress-config">
                        <h4 className="subsection-title">Configuration</h4>
                        <div className="config-field">
                            <label className="config-label">API Key</label>
                            <div className="config-input-group">
                                <input type="text" value="sk_live_••••••••••••••••" className="config-input" readOnly />
                                <button className="btn-copy">Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Management Section */}
            <div className="glass integration-section">
                <h3 className="section-title">API Management</h3>
                <div className="api-grid">
                    <div className="api-keys">
                        <h4 className="subsection-title">API Keys</h4>
                        <div className="api-key-item">
                            <div>
                                <div className="api-key-name">Production Key</div>
                                <div className="api-key-value">sk_live_••••••••••••••••</div>
                            </div>
                            <div className="api-key-actions">
                                <button className="btn-small btn-success">Copy</button>
                                <button className="btn-small btn-danger">Revoke</button>
                            </div>
                        </div>
                        <div className="api-key-item">
                            <div>
                                <div className="api-key-name">Test Key</div>
                                <div className="api-key-value">sk_test_••••••••••••••••</div>
                            </div>
                            <div className="api-key-actions">
                                <button className="btn-small btn-success">Copy</button>
                                <button className="btn-small btn-danger">Revoke</button>
                            </div>
                        </div>
                    </div>
                    <div className="api-health">
                        <h4 className="subsection-title">API Health</h4>
                        <div className="health-metric">
                            <span className="health-label">Response Time</span>
                            <span className="health-value">124ms</span>
                        </div>
                        <div className="health-metric">
                            <span className="health-label">Uptime</span>
                            <span className="health-value">99.8%</span>
                        </div>
                        <div className="health-metric">
                            <span className="health-label">Requests Today</span>
                            <span className="health-value">2,847</span>
                        </div>
                        <button className="btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                            Test API Connection
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Chat Page Component
const ChatPage = () => {
    const [conversations] = React.useState([
        { id: 1, name: 'Sarah Johnson', message: 'Booking confirmed! Thanks...', time: '2m', active: true },
        { id: 2, name: 'Mike Chen', message: 'Can I get a demo?', time: '5m', active: false },
        { id: 3, name: 'Emma Davis', message: 'Question about pricing', time: '12m', active: false },
        { id: 4, name: 'Alex Rodriguez', message: 'Technical support needed', time: '18m', active: false }
    ]);

    const [messages] = React.useState([
        { type: 'received', text: "Hi there! I'm interested in your SaaS solution", time: '2:30 PM' },
        { type: 'sent', text: "Hello Sarah! I'd be happy to help you learn more about our solution. What specific features are you most interested in?", time: '2:31 PM' },
        { type: 'received', text: "I'm looking for something that can help with lead generation and customer management", time: '2:32 PM' },
        { type: 'sent', text: "Perfect! Our platform specializes in both lead generation and customer management. Would you like to see a demo of how it works?", time: '2:33 PM' },
        { type: 'received', text: "Yes, that would be great! When can we schedule it?", time: '2:34 PM' },
        { type: 'received', text: "Perfect! Looking forward to the demo tomorrow at 2 PM. Thanks for your help!", time: '2:35 PM' }
    ]);

    return (
        <motion.div
            className="page-container chat-page-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Chat Management</h1>
                    <p className="page-subtitle">Manage customer conversations and chat widget settings</p>
                </div>
                <div className="header-actions">
                    <div className="online-agents">
                        <div className="status-dot pulse-green"></div>
                        <span className="agents-count">5 agents online</span>
                    </div>
                    <button className="btn-primary">New Conversation</button>
                </div>
            </div>

            {/* Chat Interface Grid */}
            <div className="chat-grid">
                {/* Conversations List */}
                <div className="glass chat-conversations">
                    <div className="conversations-header">
                        <h3 className="conversations-title">Conversations</h3>
                        <span className="active-count">12 active</span>
                    </div>
                    <div className="conversations-list">
                        {conversations.map(conv => (
                            <div key={conv.id} className={`conversation-item ${conv.active ? 'active' : ''}`}>
                                <div className="conversation-avatar">{conv.name.charAt(0)}</div>
                                <div className="conversation-content">
                                    <div className="conversation-name">{conv.name}</div>
                                    <div className="conversation-message">{conv.message}</div>
                                </div>
                                <div className="conversation-time">{conv.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="glass chat-window">
                    <div className="chat-window-header">
                        <div className="chat-user-info">
                            <div className="chat-user-avatar">S</div>
                            <div>
                                <div className="chat-user-name">Sarah Johnson</div>
                                <div className="chat-user-status">
                                    <div className="status-dot pulse-green"></div>
                                    <span>Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat-actions">
                            <button className="chat-action-btn">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="chat-messages-container">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.type}`}>
                                {msg.type === 'received' && <div className="message-avatar">S</div>}
                                <div className="message-content">
                                    <div className="message-bubble">{msg.text}</div>
                                    <div className="message-timestamp">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-area">
                        <input type="text" placeholder="Type a message..." className="chat-input" />
                        <button className="chat-send-btn">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>


            </div>
        </motion.div>
    );
};

export default AdminDashboard;
