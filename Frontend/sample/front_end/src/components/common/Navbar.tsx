import { useState, useEffect } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Bell, 
  User,
  Settings,
  LogOut,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

type NavLink = {
  name: string;
  path: string;
  icon: any;
  badge?: number;
};

const EnhancedNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const navLinks: NavLink[] = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'Fake News', path: '/fake-news', icon: AlertTriangle, badge: 12 },
    { name: 'Real News', path: '/real-news', icon: CheckCircle2 },
    { name: 'Chatbot', path: '/chatbot', icon: MessageSquare },
  ];

  const userMenuItems = [
    { name: 'Profile', icon: User, action: () => console.log('Profile') },
    { name: 'Settings', icon: Settings, action: () => console.log('Settings') },
    { name: 'Logout', icon: LogOut, action: () => console.log('Logout') },
  ];

  const toggleDropdown = (dropdown: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: isScrolled
            ? 'rgba(15, 23, 42, 0.95)'
            : 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${isScrolled ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.1)'}`,
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '64px' : '72px',
              transition: 'height 0.3s ease',
            }}
          >
            {/* Logo Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
              }}
              onClick={() => (window.location.href = '/')}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) rotate(5deg)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                }}
              >
                <Shield size={24} color="white" />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  CrisisTruth AI
                </h1>
                <p
                  style={{
                    fontSize: '0.625rem',
                    color: '#94a3b8',
                    margin: 0,
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  News Verification
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = window.location.pathname === link.path;
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#cbd5e1';
                      }
                    }}
                  >
                    <Icon size={16} />
                    {link.name}
                    {link.badge && link.badge > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '18px',
                          height: '18px',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          borderRadius: '999px',
                          fontSize: '0.625rem',
                          fontWeight: '700',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Section - Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: isSearchOpen ? 'rgba(59, 130, 246, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                  border: isSearchOpen ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSearchOpen) {
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSearchOpen) {
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                  }
                }}
                className="desktop-only"
              >
                <Search size={18} color="#cbd5e1" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(148, 163, 184, 0.1)',
                  border: '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(148, 163, 184, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                }}
                className="desktop-only"
              >
                {isDarkMode ? <Sun size={18} color="#cbd5e1" /> : <Moon size={18} color="#cbd5e1" />}
              </button>

              {/* Notifications */}
              <button
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(148, 163, 184, 0.1)',
                  border: '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(148, 163, 184, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                }}
                className="desktop-only"
              >
                <Bell size={18} color="#cbd5e1" />
                {notifications > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '16px',
                      height: '16px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      borderRadius: '999px',
                      fontSize: '0.625rem',
                      fontWeight: '700',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                    }}
                  >
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div style={{ position: 'relative' }} className="desktop-only">
                <button
                  onClick={(e) => toggleDropdown('user', e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '10px',
                    background: activeDropdown === 'user' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                    border: activeDropdown === 'user' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeDropdown !== 'user') {
                      e.currentTarget.style.background = 'rgba(148, 163, 184, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeDropdown !== 'user') {
                      e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                    }
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User size={18} color="white" />
                  </div>
                  <ChevronDown
                    size={16}
                    color="#cbd5e1"
                    style={{
                      transform: activeDropdown === 'user' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>

                {/* User Dropdown */}
                {activeDropdown === 'user' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      minWidth: '200px',
                      background: 'rgba(15, 23, 42, 0.98)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                      padding: '0.5rem',
                      animation: 'slideDown 0.2s ease',
                    }}
                  >
                    {userMenuItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={index}
                          onClick={item.action}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#cbd5e1',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'left',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#cbd5e1';
                          }}
                        >
                          <Icon size={16} />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: isMobileMenuOpen ? 'rgba(59, 130, 246, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                  border: isMobileMenuOpen ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="mobile-only"
              >
                {isMobileMenuOpen ? <X size={20} color="#cbd5e1" /> : <Menu size={20} color="#cbd5e1" />}
              </button>
            </div>
          </div>

          {/* Search Bar Expand */}
          {isSearchOpen && (
            <div
              style={{
                padding: '0 0 1rem 0',
                animation: 'slideDown 0.2s ease',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Search
                  size={18}
                  color="#64748b"
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search news, articles, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    background: 'rgba(148, 163, 184, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#e5e7eb',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
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
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: isScrolled ? '64px' : '72px',
            left: 0,
            right: 0,
            background: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
            padding: '1rem 1.5rem',
            zIndex: 999,
            animation: 'slideDown 0.3s ease',
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = window.location.pathname === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '0.5rem',
                  background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  {link.name}
                </div>
                {link.badge && link.badge > 0 && (
                  <span
                    style={{
                      padding: '0.25rem 0.5rem',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      borderRadius: '999px',
                      fontSize: '0.625rem',
                      fontWeight: '700',
                      color: 'white',
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div style={{ height: isScrolled ? '64px' : '72px' }}></div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }

        @media (min-width: 1025px) {
          .desktop-only {
            display: flex !important;
          }
          .mobile-only {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedNavbar;