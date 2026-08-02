import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, ListTodo, Flame, Award, FileCheck, Languages, Shield } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, unlockedBadgesCount = 5, streakDays = 5 }) => {
  const { lang, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard size={20} /> },
    { id: 'tasks', label: t('tasksList'), icon: <ListTodo size={20} /> },
    { id: 'streaks', label: t('streaks'), icon: <Flame size={20} className="streak-fire-icon" /> },
    { id: 'badges', label: t('badges'), icon: <Award size={20} />, badgeCount: unlockedBadgesCount },
    { id: 'certificate', label: t('certificateGen'), icon: <FileCheck size={20} /> }
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo-container">
          <div className="brand-logo-ring" />
          <div className="brand-logo-inner-ring" />
          <div className="brand-logo-icon-wrapper">
            <span className="brand-logo-letter">K</span>
          </div>
          <Shield size={12} className="brand-logo-accent" />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">{t('appName')}</h1>
          <p className="brand-subtitle">
            {t('sidebarBrandSubtitle')}
          </p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={'nav-link-btn ' + (activeTab === item.id ? 'active' : '')}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badgeCount !== undefined && (
              <span className="nav-counter-pill">{item.badgeCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-streak-widget">
        <div className="widget-header">
          <Flame size={18} className="fire-icon-animated" />
          <span className="widget-title">{t('currentStreak')}</span>
        </div>
        <div className="widget-value">{streakDays} {t('daysStreak')}</div>
        <div className="widget-subtitle">
          {t('sidebarStreakSubtitle')}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="language-toggle-btn" onClick={toggleLanguage}>
          <Languages size={18} />
          <span>{lang === 'en' ? t('switchToHindi') : t('switchToEnglish')}</span>
        </button>
        <div className="sidebar-patriotic-motto">
          <span>KARTAVYA</span>
        </div>
      </div>
    </aside>
  );
};
