"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './AnalysisReport.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { fetchApi } from '../utils/api';

interface ReportDetails {
  title: string;
  impactScore: number;
  summary: string;
  chartData: number[];
  competitors: string[];
}

export const AnalysisReport: React.FC = () => {
  const searchParams = useSearchParams();
  const reportId = searchParams?.get('id') || '1'; // Default to 1 if no id provided
  
  const [report, setReport] = useState<ReportDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        setIsLoading(true);
        const data = await fetchApi<ReportDetails>(`/api/v1/reports/${reportId}`);
        setReport(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load report details');
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [reportId]);

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

        {isLoading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading report details...</div>
        ) : error ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>
        ) : report ? (
          <>
            <div className={styles.reportHeader}>
              <h1 className={styles.reportTitle}>{report.title}</h1>
              <p className={styles.reportSubtitle}>Comprehensive breakdown based on the latest AI generation model.</p>
              <div className={styles.tags}>
                <Badge>Retail</Badge>
                <Badge>AI & Automation</Badge>
                <Badge variant="status">Impact Score: {report.impactScore}</Badge>
              </div>
            </div>

            <div className={styles.contentGrid}>
              {/* Main Insights */}
              <div className={styles.primaryContent}>
                <Card className={styles.chartCard}>
                  <h3 className={styles.sectionTitle}>Trend Analysis Over Time</h3>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.lineChart}></div>
                  </div>
                </Card>

                <Card className={styles.textCard}>
                  <h3 className={styles.sectionTitle}>Executive Summary</h3>
                  <p className={styles.paragraph}>
                    {report.summary}
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
                    {report.competitors.map((comp, idx) => (
                      <div className={styles.competitorItem} key={idx}>
                        <div className={styles.compAvatar}>{comp[0]}</div>
                        <div className={styles.compInfo}>
                          <span className={styles.compName}>{comp}</span>
                          <span className={styles.compScore}>{idx === 0 ? 'High Threat' : 'Medium Threat'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default AnalysisReport;
