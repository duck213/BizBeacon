import React from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Dashboard: React.FC = () => {
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
            <Link href="/analysis" className={`${styles.sidebarLink} ${styles.activeLink}`}>
              <span className="material-symbols-outlined">history</span>
              Q1 Tech Trends
            </Link>
            <Link href="#" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">history</span>
              Retail Growth
            </Link>
            <Link href="#" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">history</span>
              SaaS Analysis
            </Link>
            <Link href="#" className={styles.sidebarLink}>
              <span className="material-symbols-outlined">history</span>
              Logistics AI
            </Link>
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

            <div className={styles.grid}>
              <Card>
                <div className={styles.cardHeader}>
                  <span className={styles.eyebrowPrimary}>Trend Alert</span>
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <h3 className={styles.cardTitle}>AI Adoption in Retail</h3>
                <p className={styles.cardBody}>Analysis indicates a 45% surge in automated inventory management solutions within mid-market retail sectors over the last quarter.</p>
                <div className={styles.cardVisualPlaceholder}></div>
              </Card>

              <Card>
                <div className={styles.cardHeader}>
                  <span className={styles.eyebrowTertiary}>Competitor Intel</span>
                  <span className="material-symbols-outlined">group</span>
                </div>
                <h3 className={styles.cardTitle}>Acme Corp Shift</h3>
                <p className={styles.cardBody}>Recent job postings suggest Acme Corp is pivoting towards decentralized cloud infrastructure, potentially signaling a new product launch.</p>
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
                <h3 className={styles.cardTitle}>Consumer Confidence</h3>
                <p className={styles.cardBody}>Sentiment analysis across B2B SaaS platforms shows a cautious but optimistic outlook for Q3 IT spending.</p>
                <div className={styles.cardVisualPlaceholderNumber}>
                  <span>68%</span>
                </div>
              </Card>
            </div>

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
