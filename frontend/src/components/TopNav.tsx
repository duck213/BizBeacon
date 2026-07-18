import React from 'react';
import Link from 'next/link';
import styles from './TopNav.module.css';
import { Button } from './Button';

interface TopNavProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string }[];
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ logo, links, onSignIn, onGetStarted }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        {logo || <span className={styles.wordmark}>BizBeacon</span>}
      </div>
      
      {links && (
        <div className={styles.links}>
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <Link href="/notifications" className={styles.iconButton}>
          <span className="material-symbols-outlined">notifications</span>
        </Link>
        <Link href="/settings" className={styles.iconButton}>
          <span className="material-symbols-outlined">settings</span>
        </Link>
      </div>
    </nav>
  );
};
