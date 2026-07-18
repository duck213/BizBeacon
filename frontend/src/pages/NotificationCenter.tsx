import React from 'react';
import Link from 'next/link';
import styles from './NotificationCenter.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';

export const NotificationCenter: React.FC = () => {
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
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Notifications</h1>
            <Button variant="secondary">Mark all as read</Button>
          </header>

          <div className={styles.list}>
            <div className={`${styles.notifItem} ${styles.unread}`}>
              <div className={styles.iconContainer}>
                <span className="material-symbols-outlined" style={{color: 'var(--color-primary)'}}>trending_up</span>
              </div>
              <div className={styles.content}>
                <p className={styles.text}><strong>Acme Corp</strong>'s impact score increased by 0.5 points.</p>
                <span className={styles.time}>10 minutes ago</span>
              </div>
            </div>

            <div className={styles.notifItem}>
              <div className={styles.iconContainer}>
                <span className="material-symbols-outlined" style={{color: 'var(--color-semantic-success)'}}>check_circle</span>
              </div>
              <div className={styles.content}>
                <p className={styles.text}>Your Q2 Market Analysis report is ready to download.</p>
                <span className={styles.time}>2 hours ago</span>
              </div>
            </div>

            <div className={styles.notifItem}>
              <div className={styles.iconContainer}>
                <span className="material-symbols-outlined" style={{color: 'var(--color-ink-muted)'}}>info</span>
              </div>
              <div className={styles.content}>
                <p className={styles.text}>System maintenance scheduled for Sunday 2 AM.</p>
                <span className={styles.time}>Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
