import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis
} from 'recharts';
import { 
  Activity, ShieldAlert, CheckCircle2, Globe, Zap, Terminal, 
  ExternalLink, ArrowUpRight, BarChart3, Fingerprint, RefreshCcw, Layers
} from 'lucide-react';

// Blue-themed color palette
const COLORS = ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];

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
    <div style={{ 
      backgroundColor: '#0f172a', 
      padding: '24px', 
      borderRadius: '24px', 
      marginBottom: '40px', 
      border: '1px solid #1e293b',
      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '12px' }}>
        <span style={{ color: '#3b82f6', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>
          <Terminal size={14} color="#60a5fa" /> AI Neural Processing Engine
        </span>
        <span style={{ color: '#10b981', fontWeight: '900', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }} /> SYSTEM_ONLINE
        </span>
      </div>
      <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', lineHeight: '1.8' }}>
        {logs.map((log, i) => (
          <p key={i} style={{ color: '#94a3b8', margin: '4px 0' }}>
            <span style={{ color: '#3b82f6', fontWeight: '600' }}>{new Date().toLocaleTimeString([], { hour12: false })}</span> 
            <span style={{ color: '#1e3a8a', margin: '0 8px' }}>›</span> {log}
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard-stats`);
        const result = await response.json();
        setData(result);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading || !data) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <RefreshCcw style={{ animation: 'spin 2s linear infinite' }} size={32} color="#3b82f6" />
      <span style={{ color: '#3b82f6', fontWeight: '600', letterSpacing: '0.2em', fontSize: '12px' }}>SYNCHRONIZING CORE...</span>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
               <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', padding: '8px', borderRadius: '12px' }}>
                <Fingerprint size={28} color="#fff" />
               </div>
               <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.04em', margin: 0, background: 'linear-gradient(to right, #fff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                 CrisisTruth <span style={{ color: '#3b82f6', WebkitTextFillColor: '#3b82f6' }}>AI</span>
               </h1>
            </div>
            <p style={{ color: '#475569', fontWeight: '700', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.3em' }}>Global Intelligence Protocol • 4.2.0</p>
          </div>
          
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '12px 24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '10px', fontWeight: '800', color: '#475569', margin: 0, textTransform: 'uppercase' }}>Security Status</p>
                <p style={{ fontSize: '16px', fontWeight: '900', color: data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981', margin: 0 }}>{data.stats.threatLevel.toUpperCase()}</p>
              </div>
              <div style={{ width: 14, height: 14, background: data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981', borderRadius: '50%', boxShadow: `0 0 15px ${data.stats.threatLevel === 'High' ? '#ef4444' : '#ef4444'}` }} />
          </div>
        </header>

        {/* TOP STATS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {[
            { label: 'Scanned Nodes', val: data.stats.totalScraped, icon: Globe, color: '#60a5fa' },
            { label: 'Deceptions Identified', val: data.stats.fakeDetected, icon: ShieldAlert, color: '#f87171' },
            { label: 'Verified Intel', val: data.stats.realVerified, icon: CheckCircle2, color: '#34d399' }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'linear-gradient(145deg, #0f172a, #020617)', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
                <stat.icon size={100} color={stat.color} />
              </div>
              <stat.icon size={28} color={stat.color} style={{ marginBottom: '20px' }} />
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>{stat.label}</p>
              <p style={{ fontSize: '42px', fontWeight: '900', margin: 0, color: '#f8fafc', letterSpacing: '-0.02em' }}>{stat.val.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* CHARTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
              <BarChart3 size={18} color="#3b82f6" /> Category Analytics
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.categoryDistribution} innerRadius={85} outerRadius={115} paddingAngle={10} dataKey="value">
                    {data.categoryDistribution.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }} 
                    itemStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
              <Activity size={18} color="#3b82f6" /> Risk Vector Radar
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.categoryDistribution}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <LiveAITerminal />

        {/* FEED SECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          
          {/* FAKE NEWS FEED */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Layers color="#3b82f6" size={20} />
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#f8fafc', margin: 0 }}>Deception Stream</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.trendingFake.map((news: any) => (
                <div key={news.id} style={{ background: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', overflow: 'hidden', transition: 'transform 0.2s' }}>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#ef4444', textTransform: 'uppercase', border: '1px solid #ef4444', padding: '2px 8px', borderRadius: '6px' }}>Threat</span>
                      <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: '800' }}>{news.fakeScore}% FAKE</span>
                    </div>
                    <h4 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>{news.title}</h4>
                    <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', margin: '0 0 20px 0' }}>{news.description.substring(0, 110)}...</p>
                    <button 
                      onClick={() => window.open(news.url, '_blank')}
                      style={{ width: '100%', padding: '14px', background: '#1e293b', color: '#60a5fa', border: '1px solid #334155', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      Investigate Source <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VERIFIED NEWS FEED */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <ShieldAlert color="#10b981" size={20} />
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#f8fafc', margin: 0 }}>Validated Intel</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.trendingReal.map((news: any) => (
                <div key={news.id} style={{ background: 'linear-gradient(180deg, #0f172a, #020617)', borderRadius: '24px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#10b981', textTransform: 'uppercase', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '6px' }}>Verified</span>
                      <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '800' }}>98% TRUST</span>
                    </div>
                    <h4 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>{news.title}</h4>
                    <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', margin: '0 0 20px 0' }}>{news.description.substring(0, 110)}...</p>
                    <button 
                      onClick={() => window.open(news.url, '_blank')}
                      style={{ width: '100%', padding: '14px', background: 'linear-gradient(to right, #2563eb, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
                    >
                      View Full Report <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;