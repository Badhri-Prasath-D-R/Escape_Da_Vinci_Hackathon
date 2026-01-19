import React, { useState, useEffect } from 'react';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#64748b' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #3b82f6', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '0 auto 10px' }} />
        <p>LOADING GLOBAL INTEL...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#0f172a' }}>
              CrisisTruth <span style={{ color: '#3b82f6' }}>AI</span>
            </h1>
            <p style={{ color: '#94a3b8', fontWeight: '600', fontSize: '11px', letterSpacing: '0.1em', marginTop: '4px' }}>INTELLIGENCE DASHBOARD v4.2</p>
          </div>
          <div style={{ background: 'white', padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', margin: 0 }}>THREAT LEVEL</p>
            <p style={{ fontSize: '16px', fontWeight: '800', color: data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981', margin: 0 }}>
              ● {data.stats.threatLevel.toUpperCase()}
            </p>
          </div>
        </header>

        {/* STATS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {[
            { label: 'Scanned Nodes', val: data.stats.totalScraped, icon: '🌐', color: '#3b82f6' },
            { label: 'Deceptions', val: data.stats.fakeDetected, icon: '🚨', color: '#ef4444' },
            { label: 'Verified Real', val: data.stats.realVerified, icon: '✅', color: '#10b981' }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{stat.icon}</div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', margin: 0 }}>{stat.label}</p>
              <p style={{ fontSize: '32px', fontWeight: '800', margin: '4px 0 0 0' }}>{stat.val.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* SIMPLE CSS BAR CHART (Replaces Recharts) */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px' }}>📊 Topic Analysis</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '200px', paddingBottom: '20px' }}>
            {data.categoryDistribution.map((item: any, i: number) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '100%', 
                  background: '#3b82f6', 
                  height: `${(item.value / 100) * 200}px`, 
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.8
                }} />
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textAlign: 'center' }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NEWS FEED */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* FAKE NEWS */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444', marginBottom: '20px' }}>🔥 RECENT DECEPTIONS</h2>
            {data.trendingFake.map((news: any) => (
              <div key={news.id} style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #fee2e2', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#ef4444' }}>{news.fakeScore}% FAKE</span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>{news.title}</h4>
                <button onClick={() => window.open(news.url, '_blank')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>Analyze Source →</button>
              </div>
            ))}
          </div>

          {/* REAL NEWS */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#10b981', marginBottom: '20px' }}>🛡️ VERIFIED INTEL</h2>
            {data.trendingReal.map((news: any) => (
              <div key={news.id} style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #dcfce7', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#10b981' }}>VERIFIED</span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>{news.title}</h4>
                <button onClick={() => window.open(news.url, '_blank')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>View Report →</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;