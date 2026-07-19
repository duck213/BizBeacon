"use client";
import React from 'react';
import Link from 'next/link';
import styles from './Settings.module.css'; // Reusing similar form styles
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const Login: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', margin: '0 0 0.5rem 0' }}>Welcome back</h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Sign in to your BizBeacon account</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); window.location.href = '/'; }}>
          <TextInput label="Email Address" type="email" placeholder="you@example.com" />
          <TextInput label="Password" type="password" placeholder="••••••••" />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={{ color: '#0369a1', textDecoration: 'none' }}>Forgot password?</a>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Button variant="primary" style={{ width: '100%' }}>Sign In</Button>
          </div>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
          Don't have an account? <Link href="/register" style={{ color: '#0369a1', fontWeight: 500, textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
