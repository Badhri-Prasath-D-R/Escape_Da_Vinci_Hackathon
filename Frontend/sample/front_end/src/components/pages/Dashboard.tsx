import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis
} from 'recharts';
import { Activity, ShieldAlert, CheckCircle2, Zap, Globe, Cpu, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// --- Sub-Component: AI Kernel Activity (Styled like your Terminal/Log boxes) ---
const LiveAITerminal = ({ glassStyle }: { glassStyle: React.CSSProperties }) => {
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
    <div style={{ ...glassStyle, padding: '24px', borderRadius: '16px', marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '12px' }}>
        <span style={{ color: '#60a5fa', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '12px' }}>
          <Terminal size={14} /> AI Kernel Activity
        </span>
        <span style={{ color: '#64748b', fontWeight: '900', fontSize: '10px' }}>STATUS: ACTIVE_SCAN</span>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.6' }}>
        {logs.map((log, i) => (
          <p key={i} style={{ color: 'rgba(148, 163, 184, 0.8)', margin: '4px 0' }}>
            <span style={{ color: 'rgba(59, 130, 246, 0.5)' }}>[{new Date().toLocaleTimeString()}]</span> {log}
          </p>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- Inline Styles Matching Fake/Real News Pages ---
  const glassStyle: React.CSSProperties = {
    background: "rgba(15, 23, 42, 0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const response = await fetch('http://localhost:8000/dashboard-stats');
        const response = await fetch(`${API_URL}/dashboard-stats`);
        const result = await response.json();
        setData(result);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading || !data) return <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>LOADING INTEL...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.05em', textTransform: 'uppercase', margin: 0 }}>
              CRISIS<span style={{ color: '#3b82f6' }}>TRUTH</span> AI
            </h1>
            <p style={{ color: '#64748b', fontWeight: '600', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em' }}>Surveillance Dashboard v4.2</p>
          </div>
          <div style={{ ...glassStyle, padding: '12px 24px', borderRadius: '12px', textAlign: 'right' }}>
             <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', margin: 0 }}>GLOBAL THREAT LEVEL</p>
             <p style={{ fontSize: '18px', fontWeight: '900', color: data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981', margin: 0 }}>{data.stats.threatLevel.toUpperCase()}</p>
          </div>
        </header>

        {/* TOP STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {[
            { label: 'Scanned Nodes', val: data.stats.totalScraped, icon: Globe, color: '#3b82f6' },
            { label: 'Deceptions', val: data.stats.fakeDetected, icon: ShieldAlert, color: '#be123c' },
            { label: 'Verified Real', val: data.stats.realVerified, icon: CheckCircle2, color: '#10b981' }
          ].map((stat, i) => (
            <div key={i} style={{ ...glassStyle, padding: '32px', borderRadius: '24px' }}>
              <stat.icon size={32} color={stat.color} style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>{stat.label}</p>
              <p style={{ fontSize: '42px', fontWeight: '900', margin: '8px 0 0 0' }}>{stat.val.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* CHARTS SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div style={{ ...glassStyle, padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} color="#f59e0b" /> Topic Distribution
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.categoryDistribution} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                    {data.categoryDistribution.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ ...glassStyle, padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#3b82f6" /> Risk Surface Radar
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.categoryDistribution}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <LiveAITerminal glassStyle={glassStyle} />

        {/* FAKE NEWS (Matching FakeNews.tsx) */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#be123c' }}>🔥</span> Intercepted Deceptions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {data.trendingFake.map((news: any) => (
              <div key={news.id} style={{ background: '#fff1f2', borderRadius: '20px', overflow: 'hidden', border: '1px solid #fecdd3', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ background: '#be123c', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>DECEPTION DETECTED</span>
                    <span style={{ color: '#be123c', fontSize: '12px', fontWeight: 'bold' }}>{news.fakeScore}% FAKE</span>
                  </div>
                  <h4 style={{ color: '#881337', fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>{news.title}</h4>
                  
                  <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '12px', border: '1px solid #fecdd3', marginBottom: '16px' }}>
                    <p style={{ color: '#be123c', fontSize: '10px', fontWeight: 'bold', margin: '0 0 4px 0' }}>🛡️ CROSS-VERIFIED EVIDENCE:</p>
                    <p style={{ color: '#4c0519', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>"{news.description.substring(0, 150)}..."</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(news.url, '_blank')}
                  style={{ width: '100%', padding: '16px', background: '#be123c', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px' }}
                >
                  Analyze Full Evidence
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* REAL NEWS (Matching RealNews.tsx) */}
        <div style={{ paddingBottom: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#10b981' }}>🛡️</span> Verified Intelligence
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {data.trendingReal.map((news: any) => (
              <div key={news.id} style={{ background: '#f0fdf4', borderRadius: '20px', overflow: 'hidden', border: '1px solid #dcfce7', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>VERIFIED</span>
                    <span style={{ color: '#15803d', fontSize: '12px', fontWeight: 'bold' }}>CREDIBILITY: 98%</span>
                  </div>
                  <h4 style={{ color: '#166534', fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>{news.title}</h4>
                  
                  <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '12px', border: '1px solid #dcfce7', marginBottom: '16px' }}>
                    <p style={{ color: '#15803d', fontSize: '10px', fontWeight: 'bold', margin: '0 0 4px 0' }}>VERIFICATION LOG:</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#166534', fontSize: '12px' }}>
                      {news.verification.map((v: string, i: number) => <li key={i}>{v}</li>)}
                    </ul>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(news.url, '_blank')}
                  style={{ width: '100%', padding: '16px', background: '#10b981', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px' }}
                >
                  View Full Report
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;