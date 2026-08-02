import { useLanguage } from '../../context/LanguageContext';
import { Footprints, Waves, Home } from 'lucide-react';

export const DandiProgressBar = ({ progress = 0 }) => {
  const { lang, t } = useLanguage();
  const cappedProgress = Math.min(Math.max(progress, 0), 100);

  const steps = [
    { label: t('dandiStart'), percent: 0 },
    { label: '25%', percent: 25 },
    { label: '50%', percent: 50 },
    { label: '75%', percent: 75 },
    { label: t('dandiSea'), percent: 100 }
  ];

  return (
    <div className="dandi-progress-card">
      <div className="dandi-card-header">
        <div className="dandi-title-group">
          <Footprints size={24} className="dandi-march-icon" />
          <h3 className="dandi-card-title">{t('dandiProgressTitle')}</h3>
        </div>
        <span className="dandi-percent-badge">{cappedProgress}%</span>
      </div>

      <p className="dandi-subtitle-text">
        {lang === 'en'
          ? "As you complete daily tasks, your walking figure advances towards the Dandi sea!"
          : "जैसे-जैसे आप दैनिक कार्य पूरे करते हैं, आपकी चलने वाली आकृति दांडी समुद्र तट की ओर बढ़ती है!"}
      </p>

      {/* Dandi March Interactive Track */}
      <div className="dandi-track-container">
        {/* Track Line Background */}
        <div className="dandi-track-line-bg">
          <div
            className="dandi-track-line-fill"
            style={{ width: `${cappedProgress}%` }}
          />
        </div>

        {/* Animated Walking Figure */}
        <div
          className="dandi-walker-figure"
          style={{ left: `calc(${cappedProgress}% - 18px)` }}
        >
          <div className="walker-icon-wrapper">
            <Footprints size={20} className="walker-animated-icon" />
          </div>
        </div>

        {/* Checkpoint Milestone Nodes */}
        <div className="dandi-milestones-row">
          {steps.map((step, idx) => {
            const isReached = cappedProgress >= step.percent;
            return (
              <div key={idx} className={`milestone-node ${isReached ? 'reached' : ''}`}>
                <div className="node-icon-circle">
                  {step.percent === 0 ? (
                    <Home size={18} className="node-start-icon" />
                  ) : step.percent === 100 ? (
                    <Waves size={18} className="node-sea-icon" />
                  ) : (
                    <span>{step.percent}%</span>
                  )}
                </div>
                <span className="node-label">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
