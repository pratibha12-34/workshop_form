import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Shield } from 'lucide-react';

export const GreetingBanner = ({ userName = 'Aarav' }) => {
  const { t } = useLanguage();

  return (
    <div className="greeting-hero-banner">
      <div className="banner-content">
        <div className="banner-badge-pill">
          <Shield size={18} className="banner-logo-icon" />
          <span>KARTAVYA! • कार्तव्य!</span>
        </div>
        
        <h2 className="greeting-heading">
          {t('welcomeUser')}, <span className="user-name-highlight">{userName}</span>! <Sparkles className="waving-icon" size={24} />
        </h2>

        <p className="greeting-mission-text">
          {t('greetingMission')}
        </p>
      </div>

      <div className="banner-visual-emblem">
        <div className="emblem-circle-glow">
          <Shield size={32} className="emblem-icon" />
        </div>
      </div>
    </div>
  );
};
