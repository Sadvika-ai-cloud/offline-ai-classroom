import React from 'react';
import { Target, Zap, Award, Flame } from 'lucide-react';

export default function Gamification() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Progress</h1>
        <p>Track your learning journey totally offline.</p>
      </div>

      <div className="stats-grid">
        {/* Stat Card 1 */}
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.1))' }}>
          <div className="stat-icon" style={{ color: '#6366f1', background: 'rgba(99, 102, 241, 0.15)' }}>
            <Zap size={28} />
          </div>
          <div>
            <div className="stat-label">Questions Asked</div>
            <div className="stat-value">124</div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(217, 70, 239, 0.1))' }}>
          <div className="stat-icon" style={{ color: '#d946ef', background: 'rgba(217, 70, 239, 0.15)' }}>
            <Award size={28} />
          </div>
          <div>
            <div className="stat-label">Quizzes Passed</div>
            <div className="stat-value">42</div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.1))' }}>
          <div className="stat-icon" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.15)' }}>
            <Flame size={28} />
          </div>
          <div>
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">8 Days</div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1.5rem', color: 'var(--text-primary)' }}>
          <Award style={{ color: '#f59e0b' }} />
          Earned Badges
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <Target size={32} />
            </div>
            <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Physics Pro</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem', textTransform: 'uppercase', fontWeight: 600 }}>10/10 Quiz</p>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5, filter: 'grayscale(1)' }}>
            <div style={{ background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <Award size={32} />
            </div>
            <h4 style={{ fontWeight: '600', color: 'var(--text-secondary)', margin: 0 }}>Math Wizard</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem', textTransform: 'uppercase', fontWeight: 600 }}>Locked</p>
          </div>
        </div>
      </div>
    </div>
  );
}
