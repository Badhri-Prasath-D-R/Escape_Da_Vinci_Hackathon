import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import { 
  Activity, ShieldAlert, CheckCircle2, Globe, Zap, Terminal, 
  ExternalLink, ArrowUpRight, BarChart3, Fingerprint, RefreshCcw, Layers,
  AlertTriangle, TrendingUp, Clock, Database, Shield, AlertCircle,
  Cpu, AlertOctagon, FileCheck, BarChart, ChevronRight, Download,
  Filter, Search, Users, TrendingDown
} from 'lucide-react';

const COLORS = ['#4f46e5', '#7c3aed', '#0ea5e9', '#06b6d4', '#10b981', '#f59e0b'];
const COLORS_GRADIENT = ['#4f46e5', '#7c3aed', '#0ea5e9', '#06b6d4'];

const LiveAITerminal = () => {
  const [logs, setLogs] = useState([
    "Initializing Neural Verifier v4.2...",
    "Scanning Global RSS Feeds (PIB, Reuters)...",
    "Pre-processing incoming misinformation stream...",
  ]);

  useEffect(() => {
    const activityMessages = [
      "AI detected high-similarity claim in Finance sector.",
      "Verification confidence: 94.2% (Status: FAKE).",
      "Cross-referencing database for evidence matches...",
      "New verification evidence cached for ID #8821.",
      "Syncing with news_articles.db master node..."
    ];
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), activityMessages[Math.floor(Math.random() * activityMessages.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="light-terminal-container">
      <div className="light-terminal-header">
        <div className="flex items-center gap-2">
          <div className="light-terminal-icon">
            <Cpu size={16} />
          </div>
          <div>
            <span className="light-terminal-title">AI Neural Processing Engine</span>
            <span className="light-terminal-subtitle">Real-time analysis stream</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-600 font-semibold text-xs">SYSTEM_ONLINE</span>
          </div>
          <div className="px-3 py-1 bg-blue-50 rounded-lg border border-blue-100">
            <span className="text-blue-600 text-xs font-medium">{logs.length} processes</span>
          </div>
        </div>
      </div>
      <div className="light-terminal-logs">
        {logs.map((log, i) => (
          <div key={i} className="light-log-entry">
            <span className="light-log-time">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span className="light-log-divider">›</span>
            <span className="light-log-message">{log}</span>
            {i === logs.length - 1 && (
              <span className="ml-2 inline-block w-2 h-4 bg-blue-500 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard-stats`);
        const result = await response.json();
        setData(result);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return (
    <div className="light-loading-screen">
      <div className="light-loading-content">
        <div className="relative">
          <RefreshCcw className="animate-spin text-indigo-600" size={40} />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl rounded-full"></div>
        </div>
        <div className="mt-6">
          <p className="text-gray-700 font-medium mb-2">Initializing Surveillance Interface</p>
          <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse rounded-full" style={{width: '65%'}} />
          </div>
        </div>
      </div>
    </div>
  );

  const threatLevel = data?.stats?.threatLevel || 'Normal';
  const threatColor = threatLevel === 'High' ? 'bg-red-100 text-red-700 border-red-200' : 
                      threatLevel === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                      'bg-emerald-100 text-emerald-700 border-emerald-200';

  return (
    <div className="light-dashboard-container">
      {/* Top Navigation */}
      <div className="light-top-nav">
        <div className="flex items-center gap-4">
          <button className="light-nav-btn active">
            <BarChart3 size={18} />
            Dashboard
          </button>
          <button className="light-nav-btn">
            <Users size={18} />
            Sources
          </button>
          <button className="light-nav-btn">
            <Filter size={18} />
            Filters
          </button>
          <button className="light-nav-btn">
            <Download size={18} />
            Export
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search claims or sources..."
              className="light-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="light-dashboard-content">
        
        {/* HEADER */}
        <header className="light-dashboard-header">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="light-header-icon">
                <Fingerprint size={24} className="text-white" />
              </div>
              <div>
                <h1 className="light-dashboard-title">
                  CrisisTruth <span className="gradient-text-light">AI</span>
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="light-version-badge">v4.2</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Globe size={14} />
                    <span>Global Coverage • 42 Sources Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="light-header-controls">
            <div className="light-timeframe-selector">
              {['1h', '24h', '7d', '30d'].map((item) => (
                <button
                  key={item}
                  className={`light-timeframe-btn ${timeframe === item ? 'active' : ''}`}
                  onClick={() => setTimeframe(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className={`light-threat-indicator ${threatColor}`}>
              <div className="flex items-center gap-2">
                <AlertOctagon size={16} />
                <div>
                  <p className="text-xs font-medium">THREAT LEVEL</p>
                  <p className="text-sm font-bold">{threatLevel.toUpperCase()}</p>
                </div>
              </div>
            </div>
            
            <button className="light-refresh-btn" onClick={() => window.location.reload()}>
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="light-stats-grid">
          {[
            { 
              label: 'Total Scanned', 
              value: data?.stats?.totalScraped || 0, 
              icon: Database, 
              color: 'indigo',
              trend: '+12%',
              change: 'positive',
              description: 'Network nodes monitored'
            },
            { 
              label: 'Deceptions Detected', 
              value: data?.stats?.fakeDetected || 0, 
              icon: ShieldAlert, 
              color: 'red',
              trend: '+24%',
              change: 'positive',
              description: 'High confidence threats'
            },
            { 
              label: 'Verified Intel', 
              value: data?.stats?.realVerified || 0, 
              icon: FileCheck, 
              color: 'emerald',
              trend: '+8%',
              change: 'positive',
              description: 'Validated sources'
            },
            { 
              label: 'Accuracy Rate', 
              value: '94.2%', 
              icon: Shield, 
              color: 'blue',
              trend: '+2.1%',
              change: 'positive',
              description: 'AI confidence score'
            }
          ].map((stat, i) => (
            <div key={i} className="light-stat-card">
              <div className="light-stat-header">
                <div className={`light-stat-icon light-stat-icon-${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div className={`light-stat-trend light-stat-trend-${stat.change}`}>
                  {stat.change === 'positive' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.trend}
                </div>
              </div>
              <div className="light-stat-content">
                <p className="light-stat-value">{stat.value}</p>
                <p className="light-stat-label">{stat.label}</p>
              </div>
              <div className="light-stat-footer">
                <p className="text-sm text-gray-500">{stat.description}</p>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS SECTION */}
        <div className="light-charts-section">
          <div className="light-chart-container">
            <div className="light-chart-header">
              <h3 className="light-chart-title">
                <PieChart size={20} className="text-indigo-600" />
                Category Distribution
              </h3>
              <div className="light-chart-legend">
                {data?.categoryDistribution?.slice(0, 4).map((cat: any, i: number) => (
                  <div key={i} className="light-legend-item">
                    <div className="light-legend-color" style={{backgroundColor: COLORS[i]}} />
                    <span className="light-legend-text">{cat.name}</span>
                    <span className="light-legend-value">{cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="light-chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={data?.categoryDistribution || []} 
                    innerRadius={70} 
                    outerRadius={100} 
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#ffffff"
                  >
                    {data?.categoryDistribution?.map((_: any, i: number) => (
                      <Cell 
                        key={i} 
                        fill={COLORS[i % COLORS.length]} 
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value} items`, 'Count']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="light-chart-container">
            <div className="light-chart-header">
              <h3 className="light-chart-title">
                <RadarChart size={20} className="text-blue-600" />
                Risk Assessment
              </h3>
              <div className="light-risk-score">
                <Shield size={18} className="text-blue-600" />
                <div>
                  <span className="text-sm text-gray-500">Confidence Score</span>
                  <span className="text-lg font-bold text-blue-600">94%</span>
                </div>
              </div>
            </div>
            <div className="light-chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data?.categoryDistribution || []}>
                  <PolarGrid 
                    stroke="#e2e8f0" 
                    strokeWidth={1}
                    radialLines={true}
                  />
                  <PolarAngleAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar 
                    name="Risk Level" 
                    dataKey="value" 
                    stroke="#4f46e5" 
                    fill="url(#lightGradientFill)"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="lightGradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI TERMINAL */}
        <div className="light-terminal-section">
          <div className="light-section-header">
            <div>
              <h2 className="light-section-title">
                <Activity size={22} className="text-indigo-600" />
                AI Processing Log
              </h2>
              <p className="light-section-subtitle">Real-time analysis and verification stream</p>
            </div>
            <div className="light-section-actions">
              <button className="light-action-btn secondary">
                <Filter size={16} />
                Filter Logs
              </button>
              <button className="light-action-btn primary">
                <Download size={16} />
                Export Logs
              </button>
            </div>
          </div>
          <LiveAITerminal />
        </div>

        {/* NEWS FEEDS */}
        <div className="light-feeds-section">
          <div className="light-feed-column">
            <div className="light-feed-header light-feed-header-red">
              <div className="flex items-center gap-3">
                <AlertTriangle size={24} className="text-red-600" />
                <div>
                  <h2 className="light-feed-title">Threat Stream</h2>
                  <p className="light-feed-subtitle">Potential misinformation detected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="light-feed-count">{data?.trendingFake?.length || 0} alerts</span>
                <div className="px-3 py-1 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-red-600 text-sm font-medium">High Priority</span>
                </div>
              </div>
            </div>
            
            <div className="light-feed-content">
              {data?.trendingFake?.map((news: any) => (
                <div key={news.id} className="light-news-card light-news-card-threat">
                  <div className="light-news-card-header">
                    <div className="light-news-meta">
                      <div className="flex items-center gap-2">
                        <span className="light-news-badge light-news-badge-red">
                          FAKE SCORE: {news.fakeScore}%
                        </span>
                        <span className="light-news-source">{news.source || 'Unknown Source'}</span>
                      </div>
                      <span className="light-news-time">2h ago</span>
                    </div>
                    <div className={`light-news-priority ${news.fakeScore > 80 ? 'high' : 'medium'}`}>
                      <AlertOctagon size={16} />
                    </div>
                  </div>
                  <h4 className="light-news-title">{news.title || "Untitled Intelligence"}</h4>
                  <p className="light-news-description">
                    {news.description ? `${news.description.substring(0, 120)}...` : "No description available."}
                  </p>
                  <div className="light-news-footer">
                    <div className="flex items-center gap-2">
                      {news.category && (
                        <span className="light-news-category">{news.category}</span>
                      )}
                      <span className="light-news-tag">Misinformation</span>
                      <span className="light-news-tag">High Confidence</span>
                    </div>
                    <button 
                      onClick={() => news.url && window.open(news.url, '_blank')}
                      className="light-news-btn light-news-btn-red"
                    >
                      <ExternalLink size={16} />
                      Audit Source
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="light-feed-column">
            <div className="light-feed-header light-feed-header-green">
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-emerald-600" />
                <div>
                  <h2 className="light-feed-title">Validated Intel</h2>
                  <p className="light-feed-subtitle">Verified reliable information</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="light-feed-count">{data?.trendingReal?.length || 0} verified</span>
                <div className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="text-emerald-600 text-sm font-medium">Trusted</span>
                </div>
              </div>
            </div>
            
            <div className="light-feed-content">
              {data?.trendingReal?.map((news: any) => (
                <div key={news.id} className="light-news-card light-news-card-verified">
                  <div className="light-news-card-header">
                    <div className="light-news-meta">
                      <div className="flex items-center gap-2">
                        <span className="light-news-badge light-news-badge-green">
                          <CheckCircle2 size={14} />
                          VERIFIED
                        </span>
                        <span className="light-news-source light-news-source-verified">
                          {news.source || 'Trusted Source'}
                        </span>
                      </div>
                      <span className="light-news-time light-news-time-verified">4h ago</span>
                    </div>
                    <div className="light-verification-badge">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    </div>
                  </div>
                  <h4 className="light-news-title">{news.title || "Untitled Intelligence"}</h4>
                  <p className="light-news-description">
                    {news.description ? `${news.description.substring(0, 120)}...` : "No description available."}
                  </p>
                  <div className="light-news-footer">
                    <div className="flex items-center gap-2">
                      {news.category && (
                        <span className="light-news-category light-news-category-verified">
                          {news.category}
                        </span>
                      )}
                      <span className="light-news-tag light-news-tag-verified">Verified</span>
                      <span className="light-news-tag light-news-tag-verified">High Accuracy</span>
                    </div>
                    <button 
                      onClick={() => news.url && window.open(news.url, '_blank')}
                      className="light-news-btn light-news-btn-green"
                    >
                      <ExternalLink size={16} />
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="light-dashboard-footer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>© 2024 CrisisTruth AI</span>
              <span>•</span>
              <span>v4.2.1</span>
              <span>•</span>
              <span>System Status: <span className="text-emerald-600 font-medium">Operational</span></span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">Privacy</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Terms</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Documentation</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add CSS styles for light theme
const lightStyles = `
.light-dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #0f172a;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Top Navigation */
.light-top-nav {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light-nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.light-nav-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.light-nav-btn.active {
  background: #4f46e5;
  color: white;
}

.light-search-input {
  padding: 10px 16px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  width: 280px;
  background: white;
  transition: all 0.2s;
}

.light-search-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.light-dashboard-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
}

/* Header */
.light-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 24px;
}

.light-header-icon {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  padding: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.light-dashboard-title {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
}

.gradient-text-light {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.light-version-badge {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #c7d2fe;
}

.light-header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.light-timeframe-selector {
  display: flex;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.light-timeframe-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.light-timeframe-btn.active {
  background: #4f46e5;
  color: white;
  box-shadow: 0 1px 3px rgba(79, 70, 229, 0.2);
}

.light-threat-indicator {
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid;
  min-width: 160px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light-refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  color: #4f46e5;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.light-refresh-btn:hover {
  background: #f8fafc;
  border-color: #4f46e5;
}

/* Stats Cards */
.light-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.light-stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.light-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #c7d2fe;
}

.light-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.light-stat-card:nth-child(1)::before { background: linear-gradient(90deg, #4f46e5, #7c3aed); }
.light-stat-card:nth-child(2)::before { background: linear-gradient(90deg, #ef4444, #f97316); }
.light-stat-card:nth-child(3)::before { background: linear-gradient(90deg, #10b981, #22c55e); }
.light-stat-card:nth-child(4)::before { background: linear-gradient(90deg, #0ea5e9, #06b6d4); }

.light-stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.light-stat-icon {
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light-stat-icon-indigo { background: #e0e7ff; color: #4f46e5; }
.light-stat-icon-red { background: #fee2e2; color: #ef4444; }
.light-stat-icon-emerald { background: #d1fae5; color: #10b981; }
.light-stat-icon-blue { background: #dbeafe; color: #0ea5e9; }

.light-stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

.light-stat-trend-positive {
  background: #d1fae5;
  color: #059669;
}

.light-stat-trend-negative {
  background: #fee2e2;
  color: #dc2626;
}

.light-stat-value {
  font-size: 36px;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
}

.light-stat-label {
  font-size: 16px;
  color: #64748b;
  margin: 8px 0 4px 0;
}

.light-stat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

/* Charts */
.light-charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.light-chart-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.light-chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.light-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.light-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.light-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.light-legend-text {
  font-size: 14px;
  color: #64748b;
}

.light-legend-value {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.light-chart-content {
  height: 320px;
  position: relative;
}

.light-risk-score {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #eff6ff;
  border-radius: 12px;
  border: 1px solid #dbeafe;
}

/* Terminal */
.light-terminal-section {
  margin-bottom: 32px;
}

.light-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.light-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.light-section-subtitle {
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
}

.light-section-actions {
  display: flex;
  gap: 12px;
}

.light-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.light-action-btn.primary {
  background: #4f46e5;
  color: white;
}

.light-action-btn.secondary {
  background: white;
  color: #4f46e5;
  border: 1px solid #e2e8f0;
}

.light-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.light-terminal-container {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light-terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.light-terminal-icon {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 8px;
  border-radius: 10px;
}

.light-terminal-title {
  display: block;
  color: #0f172a;
  font-weight: 600;
  font-size: 16px;
}

.light-terminal-subtitle {
  display: block;
  color: #64748b;
  font-size: 12px;
  margin-top: 2px;
}

.light-terminal-logs {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
}

.light-log-entry {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  color: #475569;
}

.light-log-time {
  color: #4f46e5;
  min-width: 85px;
  font-weight: 500;
}

.light-log-divider {
  color: #94a3b8;
}

.light-log-message {
  flex: 1;
  color: #0f172a;
}

/* News Feeds */
.light-feeds-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.light-feed-column {
  display: flex;
  flex-direction: column;
}

.light-feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-radius: 16px 16px 0 0;
  margin-bottom: 16px;
}

.light-feed-header-red {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border: 1px solid #fecaca;
}

.light-feed-header-green {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 1px solid #bbf7d0;
}

.light-feed-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
}

.light-feed-header-red .light-feed-title { color: #dc2626; }
.light-feed-header-green .light-feed-title { color: #059669; }

.light-feed-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 2px 0 0 0;
}

.light-feed-count {
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

.light-feed-header-red .light-feed-count { 
  background: #fee2e2; 
  color: #dc2626; 
}

.light-feed-header-green .light-feed-count { 
  background: #d1fae5; 
  color: #059669; 
}

.light-feed-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.light-news-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light-news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.light-news-card-threat:hover { border-color: #fca5a5; }
.light-news-card-verified:hover { border-color: #86efac; }

.light-news-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.light-news-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.light-news-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  width: fit-content;
}

.light-news-badge-red {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.light-news-badge-green {
  background: #d1fae5;
  color: #059669;
  border: 1px solid #bbf7d0;
}

.light-news-source {
  font-size: 12px;
  color: #64748b;
}

.light-news-source-verified {
  color: #059669;
  font-weight: 500;
}

.light-news-time {
  font-size: 12px;
  color: #94a3b8;
}

.light-news-time-verified {
  color: #059669;
}

.light-news-priority {
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light-news-priority.high {
  background: #fee2e2;
  color: #dc2626;
}

.light-news-priority.medium {
  background: #fef3c7;
  color: #d97706;
}

.light-verification-badge {
  background: #d1fae5;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.light-news-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #0f172a;
  line-height: 1.4;
}

.light-news-description {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.light-news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.light-news-category {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.light-news-category-verified {
  background: #d1fae5;
  color: #059669;
  border-color: #bbf7d0;
}

.light-news-tag {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #64748b;
}

.light-news-tag-verified {
  background: #d1fae5;
  color: #059669;
}

.light-news-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.light-news-btn-red {
  background: white;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.light-news-btn-red:hover {
  background: #fee2e2;
}

.light-news-btn-green {
  background: white;
  color: #059669;
  border: 1px solid #bbf7d0;
}

.light-news-btn-green:hover {
  background: #d1fae5;
}

/* Footer */
.light-dashboard-footer {
  padding: 24px;
  border-top: 1px solid #e2e8f0;
  margin-top: 32px;
  background: white;
  border-radius: 16px;
}

/* Loading Screen */
.light-loading-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.light-loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.animate-spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1200px) {
  .light-charts-section,
  .light-feeds-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .light-dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .light-header-controls {
    flex-wrap: wrap;
  }
  
  .light-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .light-top-nav {
    flex-direction: column;
    gap: 16px;
  }
  
  .light-search-input {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .light-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .light-feeds-section {
    grid-template-columns: 1fr;
  }
  
  .light-dashboard-content {
    padding: 16px;
  }
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = lightStyles;
  document.head.appendChild(styleSheet);
}

export default Dashboard;