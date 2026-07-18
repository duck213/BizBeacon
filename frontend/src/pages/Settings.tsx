import React from 'react';
import Link from 'next/link';
import styles from './Settings.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const Settings: React.FC = () => {
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
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              <Link href="/settings" className={styles.activeLink}>Profile</Link>
              <Link href="#" className={styles.link}>Account</Link>
              <Link href="#" className={styles.link}>Integrations</Link>
              <Link href="#" className={styles.link}>Billing</Link>
            </nav>
          </aside>
          
          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.title}>Profile Settings</h1>
              <p className={styles.subtitle}>Update your personal information and preferences.</p>
            </header>

            <form className={styles.form}>
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <TextInput label="Full Name" defaultValue="John Doe" />
                <TextInput label="Email" type="email" defaultValue="john@example.com" />
                <TextInput label="Role" defaultValue="Marketing Director" />
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Preferences</h3>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="email-notif" defaultChecked />
                  <label htmlFor="email-notif">Receive daily impact summaries via email</label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="slack-notif" defaultChecked />
                  <label htmlFor="slack-notif">Enable Slack alerts for high-impact events</label>
                </div>
              </div>

              <div className={styles.actions}>
                <Button variant="primary">Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
