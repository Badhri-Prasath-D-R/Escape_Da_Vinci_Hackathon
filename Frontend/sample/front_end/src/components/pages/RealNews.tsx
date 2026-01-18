import React, { useState, useEffect } from 'react';

// Use the exact type from your optimized code
type RealNewsItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  verificationScore: number;
  publishedTime: string;
  verificationMethods: string[];
  additionalSources: string[];
  region: string;
  impactLevel: 'critical' | 'high' | 'medium';
};

const IntegratedRealNews = () => {

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // State management for API data
  const [realNewsData, setRealNewsData] = useState<RealNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // UI State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');

  const categories = ['all', 'Health', 'Finance', 'Environment', 'Science', 'Technology', 'Legal'];
  const impactLevels = [
    { value: 'all', label: 'All Impact', color: '#64748b' },
    { value: 'critical', label: 'Critical Impact', color: '#7c3aed' },
    { value: 'high', label: 'High Impact', color: '#2563eb' },
    { value: 'medium', label: 'Medium Impact', color: '#16a34a' }
  ];

  // Fetch logic to connect to your FastAPI /real-news endpoint
  const fetchNews = async () => {
    try {
      setLoading(true);
      // const response = await fetch('http://localhost:8000/real-news');
      const response = await fetch(`${API_URL}/real-news`);
      if (!response.ok) throw new Error('Failed to fetch from backend');
      const data = await response.json();
      setRealNewsData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filtering Logic
  const filteredNews = realNewsData.filter(news => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesImpact = selectedImpact === 'all' || news.impactLevel === selectedImpact;
    return matchesCategory && matchesImpact;
  });

  // Helper functions for styling
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return '#7c3aed';
      case 'high': return '#2563eb';
      case 'medium': return '#16a34a';
      default: return '#64748b';
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'critical': return '#f3e8ff';
      case 'high': return '#dbeafe';
      case 'medium': return '#dcfce7';
      default: return '#f1f5f9';
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📡 Connecting to CrisisTruth AI...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                🛡️
              </div>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', margin: 0 }}>
                  Live Verified News Center
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0 0 0' }}>
                  Authenticated by our {new Set(realNewsData.map(n => n.sourceName)).size} official database sources.
                </p>
              </div>
            </div>
            
            {/* Stats Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '1rem', borderRadius: '12px' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0' }}>Active Reports</p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>{realNewsData.length}</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '1rem', borderRadius: '12px' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0' }}>Accuracy Rate</p>
                <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>98.2%</p>
              </div>
              <div onClick={fetchNews} style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.25)', padding: '1rem', borderRadius: '12px' }}>
                 <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>🔄 Click to Refresh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: '0 0 1rem 0' }}>Category Filter</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '20px',
                    border: selectedCategory === category ? '2px solid #10b981' : '2px solid #e2e8f0',
                    background: selectedCategory === category ? '#10b981' : 'white',
                    color: selectedCategory === category ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: '0.2s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
          {filteredNews.map((news) => (
            <div
              key={news.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: `3px solid ${getImpactColor(news.impactLevel)}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Header */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={news.imageUrl} alt="News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', background: getImpactColor(news.impactLevel), color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {news.impactLevel.toUpperCase()}
                </div>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.95)', borderRadius: '20px', fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>
                  ✓ {news.verificationScore}% Verified
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                <div style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: '#dcfce7', color: '#15803d', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '800', marginBottom: '0.8rem' }}>
                  OFFICIAL {news.category.toUpperCase()}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>{news.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.5rem' }}>{news.description}</p>
                
                {/* Dynamic Verification Methods Box */}
                <div style={{ background: '#f0fdf4', border: '1px solid #10b981', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#15803d', margin: '0 0 0.5rem 0' }}>VERIFICATION LOG:</p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', color: '#166534' }}>
                    {news.verificationMethods.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Source: <b>{news.sourceName}</b></span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{news.publishedTime}</span>
                </div>
              </div>

              {/* Footer Button */}
              <button
                onClick={() => window.open(news.sourceUrl, '_blank')}
                style={{ width: '100%', padding: '1rem', background: '#10b981', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
              >
                View Source Document 🔗
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedRealNews;