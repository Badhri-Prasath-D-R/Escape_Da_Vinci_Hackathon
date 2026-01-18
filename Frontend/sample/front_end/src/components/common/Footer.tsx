import { useState, useEffect } from 'react';
import { Shield, Mail, Github, Twitter, Linkedin, Heart, ChevronUp, ExternalLink } from 'lucide-react';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thanks for subscribing to our newsletter!');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '/' },
      { name: 'Fake News Detection', href: '/fake-news' },
      { name: 'Real News Verification', href: '/real-news' },
      { name: 'AI Chatbot', href: '/chatbot' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Mission', href: '#' },
      { name: 'Team', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Research Papers', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Data Protection', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: Github, href: '#', label: 'GitHub', color: '#333333' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Mail, href: '#', label: 'Email', color: '#EA4335' },
  ];

  const stats = [
    { value: '1M+', label: 'News Analyzed' },
    { value: '500K+', label: 'Fake News Detected' },
    { value: '96.8%', label: 'Accuracy Rate' },
    { value: '150+', label: 'Countries Served' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
      color: '#e5e7eb',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        opacity: 0.03,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
        pointerEvents: 'none'
      }}></div>

      {/* Stats Section */}
      <div style={{
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        padding: '3rem 1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: 'rgba(148, 163, 184, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(148, 163, 184, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
              }}>
                <Shield size={28} color="white" />
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#ffffff',
                margin: 0
              }}>
                CrisisTruth AI
              </h2>
            </div>
            
            <p style={{
              color: '#94a3b8',
              fontSize: '0.9rem',
              lineHeight: '1.7',
              marginBottom: '1.5rem'
            }}>
              Fighting misinformation with cutting-edge AI technology during crises. 
              Empowering truth and transparency in the digital age.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(148, 163, 184, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <social.icon size={18} color="#94a3b8" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#22c55e',
                width: 'fit-content'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#22c55e',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
                AI-Powered Verification
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem'
              }}>
                {category}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#3b82f6';
                        e.currentTarget.style.paddingLeft = '0.5rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      {link.name}
                      <ExternalLink size={12} style={{ opacity: 0.5 }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem'
            }}>
              Stay Updated
            </h3>
            <p style={{
              color: '#94a3b8',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              lineHeight: '1.6'
            }}>
              Subscribe to our newsletter for the latest updates on misinformation detection.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    background: 'rgba(148, 163, 184, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '10px',
                    color: '#e5e7eb',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#64748b'
          }}>
            <span>© {currentYear} CrisisTruth AI. All rights reserved.</span>
            <span>•</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Made with <Heart size={14} color="#ef4444" fill="#ef4444" /> for Truth
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '6px',
              color: '#22c55e',
              fontWeight: '600'
            }}>
              v2.0
            </span>
            <a href="#" style={{
              color: '#64748b',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
              Status
            </a>
            <a href="#" style={{
              color: '#64748b',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
              Changelog
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} color="white" />
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @media (max-width: 768px) {
          footer > div:nth-child(2) > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div:nth-child(2) > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default EnhancedFooter;