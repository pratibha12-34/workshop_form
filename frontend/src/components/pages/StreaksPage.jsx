import { useLanguage } from '../../context/LanguageContext';
import { Flame, Trophy, CheckCircle2, Lock } from 'lucide-react';

export const StreaksPage = ({ stats }) => {
  const { lang, t } = useLanguage();

  const currentStreak = stats.currentStreak || 5;
  const longestStreak = stats.longestStreak || 12;

  const milestones = [
    {
      days: 3,
      badge: "✨ Rani Lakshmibai Badge",
      virtueEn: "Determination",
      virtueHi: "अडिग संकल्प",
      heroEn: "Rani Lakshmibai of Jhansi",
      heroHi: "झांसी की रानी लक्ष्मीबाई",
      rewardEn: "3 Days Freedom Flame",
      rewardHi: "3 दिन की स्वतंत्रता ज्वाला",
      icon: "✨"
    },
    {
      days: 7,
      badge: "⭐ Subhas Chandra Bose Badge",
      virtueEn: "Leadership",
      virtueHi: "दूरदर्शी नेतृत्व",
      heroEn: "Netaji Subhas Chandra Bose",
      heroHi: "नेताजी सुभाष चंद्र बोस",
      rewardEn: "7 Days Leadership Crown",
      rewardHi: "7 दिन का नेतृत्व मुकुट",
      icon: "⭐"
    },
    {
      days: 15,
      badge: "🏆 Chandrashekhar Azad Badge",
      virtueEn: "Bravery & Valor",
      virtueHi: "वीरता और साहस",
      heroEn: "Chandrashekhar Azad",
      heroHi: "चंद्रशेखर आजाद",
      rewardEn: "15 Days Valor Shield",
      rewardHi: "15 दिन का वीरता ढाल",
      icon: "🏆"
    },
    {
      days: 30,
      badge: "👑 Gandhi Ji Gold Badge",
      virtueEn: "Mastery & Perseverance",
      virtueHi: "महारत और दृढ़ता",
      heroEn: "Mahatma Gandhi",
      heroHi: "महात्मा गांधी",
      rewardEn: "30 Days Golden Visionary",
      rewardHi: "30 दिन का स्वर्णिम विज़नरी",
      icon: "👑"
    },
    {
      days: 100,
      badge: "💎 Legend of Duty Badge",
      virtueEn: "Unstoppable Patriotism",
      virtueHi: "अजेय देशभक्ति",
      heroEn: "Legend of Freedom",
      heroHi: "स्वतंत्रता का लेजेंड",
      rewardEn: "100 Days National Legend Honor",
      rewardHi: "100 दिन का राष्ट्रीय लेजेंड सम्मान",
      icon: "💎"
    }
  ];

  return (
    <div className="streaks-page-container">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div>
          <h2 className="page-title">{t('streakMilestonesTitle')} 🔥</h2>
          <p className="page-subtitle">{t('streakSubtitle')}</p>
        </div>
      </div>

      {/* Streak Counter Cards */}
      <div className="streak-stats-row">
        <div className="streak-hero-card active-flame">
          <div className="flame-icon-circle">
            <Flame className="fire-pulse-icon" size={24} />
          </div>
          <div className="flame-info">
            <span className="flame-count">{currentStreak} {t('daysStreak')}</span>
            <span className="flame-label">{t('currentStreakLabel')}</span>
          </div>
        </div>

        <div className="streak-hero-card record-card">
          <div className="flame-icon-circle trophy">
            <Trophy size={24} />
          </div>
          <div className="flame-info">
            <span className="flame-count">{longestStreak} {t('daysStreak')}</span>
            <span className="flame-label">{t('longestStreakLabel')}</span>
          </div>
        </div>
      </div>

      {/* Milestone Roadmap */}
      <div className="milestones-section">
        <h3 className="section-title">{t('milestoneRoadmap')}</h3>

        <div className="milestones-timeline-grid">
          {milestones.map((ms, idx) => {
            const isUnlocked = currentStreak >= ms.days;
            const daysLeft = ms.days - currentStreak;

            return (
              <div
                key={idx}
                className={`milestone-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="milestone-badge-header">
                  <span className="badge-big-icon">{ms.icon}</span>
                  <div className="milestone-days-pill">
                    🔥 {ms.days} {t('daysStreak')}
                  </div>
                </div>

                <h4 className="milestone-badge-name">{ms.badge}</h4>
                <p className="milestone-hero-name">
                  {lang === 'hi' ? ms.heroHi : ms.heroEn}
                </p>

                <div className="milestone-virtue-tag">
                  <span>{lang === 'hi' ? ms.virtueHi : ms.virtueEn}</span>
                </div>

                <div className="milestone-footer-status">
                  {isUnlocked ? (
                    <div className="status-unlocked-badge">
                      <CheckCircle2 size={16} />
                      <span>{t('unlockedStatus')}</span>
                    </div>
                  ) : (
                    <div className="status-locked-badge">
                      <Lock size={16} />
                      <span>{daysLeft} {t('daysToGo')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
