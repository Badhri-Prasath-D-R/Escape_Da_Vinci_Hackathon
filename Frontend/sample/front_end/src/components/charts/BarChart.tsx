import { useState } from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  LabelList,
} from "recharts";

type BarChartData = {
  name: string;
  value: number;
  fake?: number;
  real?: number;
  color?: string;
  category?: string;
};

type BarChartProps = {
  data: BarChartData[];
  barColor?: string;
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  animationDuration?: number;
  height?: number;
  variant?: 'single' | 'stacked' | 'grouped' | 'comparison';
  gradientColors?: [string, string];
  showValues?: boolean;
  customTooltip?: boolean;
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{
          margin: '0 0 8px 0',
          fontWeight: '700',
          fontSize: '14px',
          color: '#1e293b',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '6px'
        }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '6px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              background: entry.color
            }}></div>
            <span style={{
              fontSize: '13px',
              color: '#64748b',
              fontWeight: '600'
            }}>
              {entry.name}:
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const EnhancedBarChart = ({
  data,
  barColor = "#3b82f6",
  title = "Analytics Overview",
  subtitle,
  showLegend = true,
  showGrid = true,
  animationDuration = 800,
  height = 400,
  variant = 'single',
  gradientColors = ['#3b82f6', '#8b5cf6'],
  showValues = false,
  customTooltip = true
}: BarChartProps) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Calculate totals for stats
  const totalValue = data.reduce((sum, item) => sum + (item.value || 0), 0);
  const totalFake = data.reduce((sum, item) => sum + (item.fake || 0), 0);
  const totalReal = data.reduce((sum, item) => sum + (item.real || 0), 0);
  const maxValue = Math.max(...data.map(item =>
    variant === 'comparison' ? Math.max(item.fake || 0, item.real || 0) : item.value || 0
  ));

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f1f5f9'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '8px',
                height: '24px',
                background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                borderRadius: '4px'
              }}></span>
              {title}
            </h3>
            {subtitle && (
              <p style={{
                margin: '4px 0 0 32px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            {variant === 'comparison' ? (
              <>
                <div style={{
                  textAlign: 'right',
                  padding: '8px 16px',
                  background: '#fef2f2',
                  borderRadius: '10px',
                  border: '1px solid #fecaca'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '11px',
                    color: '#991b1b',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Total Fake
                  </p>
                  <p style={{
                    margin: '2px 0 0 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#dc2626'
                  }}>
                    {totalFake.toLocaleString()}
                  </p>
                </div>
                <div style={{
                  textAlign: 'right',
                  padding: '8px 16px',
                  background: '#f0fdf4',
                  borderRadius: '10px',
                  border: '1px solid #bbf7d0'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '11px',
                    color: '#14532d',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Total Real
                  </p>
                  <p style={{
                    margin: '2px 0 0 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#16a34a'
                  }}>
                    {totalReal.toLocaleString()}
                  </p>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'right',
                padding: '8px 16px',
                background: `linear-gradient(135deg, ${gradientColors[0]}15, ${gradientColors[1]}15)`,
                borderRadius: '10px',
                border: `1px solid ${gradientColors[0]}40`
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '11px',
                  color: '#475569',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Total
                </p>
                <p style={{
                  margin: '2px 0 0 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b'
                }}>
                  {totalValue.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{
        width: '100%',
        height: `${height}px`,
        position: 'relative'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.9} />
                <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="fakeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="realGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
              </linearGradient>
            </defs>

            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e2e8f0"
                vertical={false}
              />
            )}

            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />

            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />

            {customTooltip ? (
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            ) : (
              <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            )}

            {showLegend && variant === 'comparison' && (
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
                iconType="circle"
              />
            )}

            {variant === 'single' && (
              <Bar 
                dataKey="value" 
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                animationDuration={animationDuration}
                onMouseEnter={(_, index) => setHoveredBar(index)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={hoveredBar === index ? gradientColors[0] : 'url(#barGradient)'}
                    style={{
                      filter: hoveredBar === index ? 'brightness(1.1)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
                {showValues && (
                  <LabelList 
                    dataKey="value" 
                    position="top" 
                    style={{ 
                      fill: '#1e293b', 
                      fontSize: '12px', 
                      fontWeight: '700' 
                    }} 
                  />
                )}
              </Bar>
            )}

            {variant === 'comparison' && (
              <>
                <Bar 
                  dataKey="fake" 
                  fill="url(#fakeGradient)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={animationDuration}
                  name="Fake News"
                >
                  {showValues && (
                    <LabelList 
                      dataKey="fake" 
                      position="top" 
                      style={{ 
                        fill: '#dc2626', 
                        fontSize: '11px', 
                        fontWeight: '700' 
                      }} 
                    />
                  )}
                </Bar>
                <Bar 
                  dataKey="real" 
                  fill="url(#realGradient)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={animationDuration}
                  name="Real News"
                >
                  {showValues && (
                    <LabelList 
                      dataKey="real" 
                      position="top" 
                      style={{ 
                        fill: '#16a34a', 
                        fontSize: '11px', 
                        fontWeight: '700' 
                      }} 
                    />
                  )}
                </Bar>
              </>
            )}
          </ReBarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#64748b',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Categories
            </p>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              {data.length}
            </p>
          </div>
          <div style={{
            width: '2px',
            height: '30px',
            background: '#e2e8f0'
          }}></div>
          <div>
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#64748b',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Highest
            </p>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              {maxValue.toLocaleString()}
            </p>
          </div>
          <div style={{
            width: '2px',
            height: '30px',
            background: '#e2e8f0'
          }}></div>
          <div>
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#64748b',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Average
            </p>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              {variant === 'comparison' 
                ? Math.round((totalFake + totalReal) / data.length).toLocaleString()
                : Math.round(totalValue / data.length).toLocaleString()
              }
            </p>
          </div>
        </div>

        <div style={{
          padding: '8px 16px',
          background: 'white',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#64748b',
          fontWeight: '600',
          border: '1px solid #e2e8f0'
        }}>
          📊 Live Data
        </div>
      </div>
    </div>
  );
};

// Demo Component with Examples
const BarChartDemo = () => {
  const singleData = [
    { name: 'Health', value: 3240 },
    { name: 'Politics', value: 2890 },
    { name: 'Finance', value: 2150 },
    { name: 'Technology', value: 1450 },
    { name: 'Entertainment', value: 1890 },
    { name: 'Science', value: 980 },
  ];

  const comparisonData = [
    { name: 'Health', fake: 3240, real: 1850 },
    { name: 'Politics', fake: 2890, real: 2340 },
    { name: 'Finance', fake: 2150, real: 1980 },
    { name: 'Technology', fake: 1450, real: 2890 },
    { name: 'Entertainment', fake: 1890, real: 1560 },
    { name: 'Science', fake: 980, real: 2450 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            margin: '0 0 12px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            📊 Enhanced BarChart Component
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            margin: 0
          }}>
            Professional-grade data visualization for CrisisTruth AI
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          <EnhancedBarChart
            data={singleData}
            title="News Categories Distribution"
            subtitle="Total detected fake news by category"
            variant="single"
            gradientColors={['#3b82f6', '#8b5cf6']}
            showValues={true}
            height={400}
          />

          <EnhancedBarChart
            data={comparisonData}
            title="Fake vs Real News Comparison"
            subtitle="Side-by-side comparison across categories"
            variant="comparison"
            showValues={false}
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChartDemo;