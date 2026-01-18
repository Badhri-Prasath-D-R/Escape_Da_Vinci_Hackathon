import { useState, useEffect } from 'react';

type FakeNewsItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  platform: string;
  label: string;
  category: string;
  severity: string;
  realEvidence: string;
  verdictScore: number;
  timeDetected: string;
};

const OptimizedFakeNews = () => {

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const [fakeNewsData, setFakeNewsData] = useState<FakeNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

  const categories = ['all', 'Health', 'Finance', 'Environment', 'Science', 'Technology', 'Legal'];

  useEffect(() => {
    const fetchFakeNews = async () => {
      try {
        // const response = await fetch('http://localhost:8000/fake-news');
        const response = await fetch(`${API_URL}/fake-news`);
        const data = await response.json();
        if (Array.isArray(data)) setFakeNewsData(data);
      } catch (error) {
        console.error("Error fetching fake news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFakeNews();
  }, []);

  const toggleReadMore = (id: number) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return '#dc2626';
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      default: return '#64748b';
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0.8) return '#16a34a';
    if (score > 0.4) return '#f59e0b';
    return '#dc2626';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#991b1b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📡 Scanning Misinformation Database...</p>
      </div>
    );
  }

  const filteredNews = fakeNewsData.filter(n => selectedCategory === 'all' || n.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #991b1b 0%, #450a0a 100%)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', borderRadius: '24px', padding: '3rem 2rem', marginBottom: '2rem', boxShadow: '0 20px 60px rgba(220, 38, 38, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🛡️</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', margin: 0 }}>AI-Integrated Fact Monitor</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0 0 0' }}>Live tracking misinformation verified against our news intelligence.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '1rem', borderRadius: '12px' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0' }}>Claims Debunked</p>
              <p style={{ color: 'white', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>{fakeNewsData.length}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '0.5rem 1.25rem', borderRadius: '20px', border: selectedCategory === cat ? '2px solid #dc2626' : '2px solid #e2e8f0', background: selectedCategory === cat ? '#dc2626' : 'white', color: selectedCategory === cat ? 'white' : '#64748b', cursor: 'pointer', fontWeight: 'bold' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
          {filteredNews.map((news) => {
            const isExpanded = expandedIds[news.id];
            const evidence = news.realEvidence || "";
            const displayedEvidence = isExpanded ? evidence : `${evidence.substring(0, 150)}...`;

            return (
              <div key={news.id} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', border: `3px solid ${getSeverityColor(news.severity)}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={news.imageUrl} alt="Claim" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', background: getSeverityColor(news.severity), color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>{news.severity.toUpperCase()}</div>
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.5rem 1rem', background: 'rgba(220, 38, 38, 0.95)', borderRadius: '20px', fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>STATUS: {news.label.toUpperCase()}</div>
                </div>

                <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.2rem 0.8rem', background: '#fee2e2', color: '#991b1b', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '800' }}>{news.category.toUpperCase()}</div>
                    <div style={{ background: '#f1f5f9', width: '60px', height: '6px', borderRadius: '3px' }}>
                       <div style={{ width: `${news.verdictScore * 100}%`, height: '100%', background: getScoreColor(news.verdictScore), borderRadius: '3px' }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>{news.title}</h3>
                  <div style={{ background: '#fff1f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#be123c', margin: '0 0 0.5rem 0' }}>🛡️ CROSS-VERIFIED EVIDENCE:</p>
                    <p style={{ fontSize: '0.85rem', color: '#4c0519', lineHeight: '1.5', margin: 0 }}>
                      {displayedEvidence}
                      {evidence.length > 150 && (
                        <span onClick={() => toggleReadMore(news.id)} style={{ color: '#dc2626', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px' }}>
                          {isExpanded ? " Show Less" : " Read More"}
                        </span>
                      )}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Source: <b>{news.platform}</b></span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{news.timeDetected}</span>
                  </div>
                </div>
                <button onClick={() => window.open(news.sourceUrl, '_blank')} style={{ width: '100%', padding: '1rem', background: '#dc2626', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>View Debunking Report 🔗</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OptimizedFakeNews;