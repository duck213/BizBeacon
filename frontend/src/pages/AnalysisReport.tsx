import React from 'react';
import Link from 'next/link';
import styles from './AnalysisReport.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

export const AnalysisReport: React.FC = () => {
  return (
    <div className={styles.layout}>
      <TopNav 
        logo={<Link href="/" style={{ textDecoration: 'none' }}><span className={styles.wordmark}>BizBeacon</span></Link>}
        links={[
          { label: 'Dashboard', href: '/' },
          { label: 'Market Insights', href: '/analysis' }
        ]}
      />

      <main className={styles.main}>
        <div className={styles.headerArea}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Dashboard</Link>
            <span>/</span>
            <span>Analysis Report</span>
          </div>
          <div className={styles.headerActions}>
            <Button variant="secondary">
              <span className="material-symbols-outlined text-sm">download</span> Export
            </Button>
            <Button variant="primary">Share Report</Button>
          </div>
        </div>

        <div className={styles.reportHeader}>
          <h1 className={styles.reportTitle}>Q1 Retail AI Adoption</h1>
          <p className={styles.reportSubtitle}>Comprehensive breakdown of automated inventory management across mid-market retailers.</p>
          <div className={styles.tags}>
            <Badge>Retail</Badge>
            <Badge>AI & Automation</Badge>
            <Badge variant="status">Impact Score: 9.2</Badge>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Main Insights */}
          <div className={styles.primaryContent}>
            <Card className={styles.chartCard}>
              <h3 className={styles.sectionTitle}>Adoption Rate Over Time</h3>
              <div className={styles.chartPlaceholder}>
                <div className={styles.lineChart}></div>
              </div>
            </Card>

            <Card className={styles.textCard}>
              <h3 className={styles.sectionTitle}>Executive Summary</h3>
              <p className={styles.paragraph}>
                The landscape of mid-market retail is experiencing a rapid shift towards AI-driven automation. 
                Our analysis indicates a 45% surge in adoption over the last quarter, primarily driven by the 
                need to optimize supply chain inefficiencies and counter rising labor costs.
              </p>
              <p className={styles.paragraph}>
                Key players such as Acme Corp and Globex have successfully integrated these solutions, 
                resulting in a 15% reduction in stockouts and a 20% improvement in forecasting accuracy.
              </p>
            </Card>
          </div>

          {/* Sidebar Insights */}
          <div className={styles.secondaryContent}>
            <Card>
              <h3 className={styles.sectionTitle}>Key Drivers</h3>
              <ul className={styles.list}>
                <li>Supply chain volatility</li>
                <li>Labor shortages</li>
                <li>E-commerce competition</li>
              </ul>
            </Card>

            <Card>
              <h3 className={styles.sectionTitle}>Top Competitors</h3>
              <div className={styles.competitorList}>
                <div className={styles.competitorItem}>
                  <div className={styles.compAvatar}>A</div>
                  <div className={styles.compInfo}>
                    <span className={styles.compName}>Acme Corp</span>
                    <span className={styles.compScore}>High Threat</span>
                  </div>
                </div>
                <div className={styles.competitorItem}>
                  <div className={styles.compAvatar}>G</div>
                  <div className={styles.compInfo}>
                    <span className={styles.compName}>Globex</span>
                    <span className={styles.compScore}>Medium Threat</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
