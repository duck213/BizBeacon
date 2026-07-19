"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Settings.module.css';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');

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
              <a href="#" className={activeTab === 'Profile' ? styles.activeLink : styles.link} onClick={(e) => { e.preventDefault(); setActiveTab('Profile'); }}>Profile</a>
              <a href="#" className={activeTab === 'Billing' ? styles.activeLink : styles.link} onClick={(e) => { e.preventDefault(); setActiveTab('Billing'); }}>Billing & AI Models</a>
              <a href="#" className={activeTab === 'Integrations' ? styles.activeLink : styles.link} onClick={(e) => { e.preventDefault(); setActiveTab('Integrations'); }}>Integrations</a>
            </nav>
          </aside>
          
          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.title}>{activeTab} Settings</h1>
              <p className={styles.subtitle}>
                {activeTab === 'Profile' && "Update your personal information and preferences."}
                {activeTab === 'Billing' && "Manage your subscription and select your preferred AI model."}
                {activeTab === 'Integrations' && "Connect BizBeacon with your favorite tools."}
              </p>
            </header>

            {activeTab === 'Profile' && (
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
            )}

            {activeTab === 'Billing' && (
              <div className={styles.form}>
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Current Plan</h3>
                  <div style={{ padding: '1rem', border: '1px solid #eaeaea', borderRadius: '8px', marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Free Tier</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>You are currently on the free plan.</p>
                  </div>
                  <Button variant="secondary">Upgrade Plan</Button>
                </div>

                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>AI Model Selection</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>Choose the OpenAI model used for generating insights.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="ai-model" value="gpt-4o" defaultChecked />
                      <span style={{ fontWeight: 500 }}>GPT-4o</span>
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>(Recommended for deep analysis)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="radio" name="ai-model" value="gpt-3.5-turbo" />
                      <span style={{ fontWeight: 500 }}>GPT-3.5-Turbo</span>
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>(Faster, lower cost)</span>
                    </label>
                  </div>
                </div>
                
                <div className={styles.actions}>
                  <Button variant="primary" onClick={() => alert("Model preferences saved!")}>Save Model</Button>
                </div>
              </div>
            )}

            {activeTab === 'Integrations' && (
              <div className={styles.form}>
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Available Integrations</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Connect external tools to supercharge your workflow.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Slack */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          Slack 
                          <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '4px' }}>Connected</span>
                        </h4>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>Receive threat alerts directly in your team channel.</p>
                      </div>
                      <Button variant="secondary" onClick={() => alert("Settings opened")}>Configure</Button>
                    </div>

                    {/* Salesforce */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0' }}>Salesforce</h4>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>Sync competitor intelligence to CRM leads.</p>
                      </div>
                      <Button variant="primary" onClick={() => alert("Redirecting to Salesforce Auth...")}>Connect</Button>
                    </div>

                    {/* Notion */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0' }}>Notion</h4>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>Auto-export analysis reports to your Knowledge Base.</p>
                      </div>
                      <Button variant="primary" onClick={() => alert("Redirecting to Notion Auth...")}>Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
