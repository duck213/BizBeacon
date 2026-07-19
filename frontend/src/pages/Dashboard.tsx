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

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [historyData, summaryData] = await Promise.all([
          fetchApi<SearchHistoryItem[]>('/api/v1/search/history'),
          fetchApi<DashboardSummary>('/api/v1/dashboard/summary')
        ]);
        setSearchHistory(historyData);
        setSummary(summaryData);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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

          <Button variant="secondary" className={styles.newAnalysisBtn}>
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
            <Link href="#" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">inventory_2</span>
              Archive
            </Link>
            <Link href="/settings" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">help</span>
              Help
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
                />
                <button className={styles.searchAddBtn}>
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {isLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading dashboard data...</div>
            ) : error ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : summary ? (
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
            ) : null}

            <footer className={styles.footer}>
              <div className={styles.pagination}>
                <button>1</button>
                <button className={styles.activePage}>2</button>
                <button>3</button>
                <span>...</span>
                <button>10</button>
              </div>
              <Button variant="secondary">10페이지 늘리기</Button>
              <div className={styles.footerBottom}>
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
