"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { fetchApi } from '../utils/api';

interface SearchHistoryItem {
  id: string;
  keyword: string;
  date: string;
}

interface DashboardSummary {
  trendAlert: { title: string; description: string };
  competitorIntel: { title: string; description: string };
  marketSentiment: { title: string; description: string; value: string };
}

export const Dashboard: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [historyData] = await Promise.all([
          fetchApi<SearchHistoryItem[]>('/api/v1/search/history')
        ]);
        setSearchHistory(historyData);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    try {
      const result = await fetchApi<{ id: string }>('/api/v1/reports/generate', {
        method: 'POST',
        body: JSON.stringify({ keyword: searchQuery })
      });
      
      // Redirect to the analysis page with the newly generated report ID
      window.location.href = `/analysis?id=${result.id}`;
    } catch (err) {
      console.error(err);
      setError('Failed to generate AI report.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.layout}>
      <TopNav 
        logo={<Link href="/" style={{ textDecoration: 'none' }}><span className={styles.wordmark}>BizBeacon</span></Link>}
        links={[
          { label: 'Dashboard', href: '/' },
          { label: 'Market Insights', href: '/analysis' }
        ]}
      />

      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.iconContainer}>
              <span className="material-symbols-outlined text-primary">analytics</span>
            </div>
            <div>
              <h2 className={styles.sidebarTitle}>Search History</h2>
              <p className={styles.sidebarSubtitle}>Last 30 days</p>
            </div>
          </div>

          <Button variant="secondary" className={styles.newAnalysisBtn} onClick={() => { setIsSearched(false); setSearchQuery(""); }}>
            <span className="material-symbols-outlined">add</span>
            New Analysis
          </Button>

          <nav className={styles.sidebarNav}>
            {searchHistory.map((item, index) => (
              <Link href="/analysis" key={item.id} className={`${styles.sidebarLink} ${index === 0 ? styles.activeLink : ''}`}>
                <span className="material-symbols-outlined">history</span>
                {item.keyword}
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link href="/" className={styles.sidebarLink} onClick={(e) => { e.preventDefault(); alert("Archive feature coming soon!"); }}>
              <span className="material-symbols-outlined">inventory_2</span>
              Archive
            </Link>
            <Link href="/settings" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">settings</span>
              Settings
            </Link>
            <Link href="/login" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">logout</span>
              Logout
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.mainContent}>
            <header className={styles.header}>
              <h1 className={styles.pageTitle}>BizBeacon</h1>
              <p className={styles.pageSubtitle}>비즈니스 인사이트 포털</p>
            </header>

            <div className={styles.searchContainer}>
              <div className={styles.controlsRow}>
                <select className={styles.roleSelect} defaultValue="전략기획">
                  <option value="전략기획">전략기획</option>
                  <option value="연구개발">연구개발</option>
                  <option value="영업">영업</option>
                  <option value="마케팅">마케팅</option>
                  <option value="인사">인사</option>
                  <option value="재무">재무</option>
                  <option value="기획">기획</option>
                  <option value="총무">총무</option>
                  <option value="디자인">디자인</option>
                  <option value="기타">기타</option>
                </select>
                <div className={styles.impactScoreBadge}>
                  Business Impact Score: <strong>8.5</strong>
                </div>
              </div>
              <div className={styles.searchBar}>
                <span className="material-symbols-outlined">search</span>
                <input 
                  type="text" 
                  placeholder="Enter keywords, competitors, or URLs for deep analysis..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className={styles.searchAddBtn} onClick={handleSearch} disabled={isSearching}>
                  <span className="material-symbols-outlined">{isSearching ? 'hourglass_empty' : 'add'}</span>
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem', paddingLeft: '1rem' }}>
                Enter a keyword or competitor name above to generate insights.
              </p>
            </div>

            {!isSearched ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#888' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '1rem', opacity: 0.5 }}>manage_search</span>
                <h3>Ready to Analyze</h3>
              </div>
            ) : error ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : summary ? (
              <>
                <div className={styles.grid}>
                  <Card>
                    <div className={styles.cardHeader}>
                      <span className={styles.eyebrowPrimary}>Trend Alert</span>
                      <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <h3 className={styles.cardTitle}>{summary.trendAlert.title}</h3>
                    <p className={styles.cardBody}>{summary.trendAlert.description}</p>
                    <div className={styles.cardVisualPlaceholder}></div>
                  </Card>

                  <Card>
                    <div className={styles.cardHeader}>
                      <span className={styles.eyebrowTertiary}>Competitor Intel</span>
                      <span className="material-symbols-outlined">group</span>
                    </div>
                    <h3 className={styles.cardTitle}>{summary.competitorIntel.title}</h3>
                    <p className={styles.cardBody}>{summary.competitorIntel.description}</p>
                    <div className={styles.cardVisualPlaceholderBarChart}>
                      <div className={styles.bar1}></div>
                      <div className={styles.bar2}></div>
                      <div className={styles.bar3}></div>
                    </div>
                  </Card>

                  <Card>
                    <div className={styles.cardHeader}>
                      <span className={styles.eyebrowSubtle}>Market Sentiment</span>
                      <span className="material-symbols-outlined">chat_bubble</span>
                    </div>
                    <h3 className={styles.cardTitle}>{summary.marketSentiment.title}</h3>
                    <p className={styles.cardBody}>{summary.marketSentiment.description}</p>
                    <div className={styles.cardVisualPlaceholderNumber}>
                      <span>{summary.marketSentiment.value}</span>
                    </div>
                  </Card>
                </div>

                <footer className={styles.footer}>
                  <div className={styles.pagination}>
                    <button className={styles.activePage}>1</button>
                    <button>2</button>
                    <button>3</button>
                    <span>...</span>
                    <button>10</button>
                  </div>
                  <Button variant="secondary">10페이지 늘리기</Button>
                </footer>
              </>
            ) : null}

            <footer className={styles.footer} style={!isSearched ? { borderTop: 'none' } : {}}>
              <div className={styles.footerBottom} style={!isSearched ? { marginTop: 'auto' } : {}}>
                <span>© 2024 BizBeacon Intelligence. All rights reserved.</span>
                <div className={styles.footerLinks}>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">API Documentation</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
