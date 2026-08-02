import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

const BADGES = [
  {
    id: 'gandhi_first',
    icon: '🌟',
    fighter: 'Mahatma Gandhi',
    qualityEn: 'First Step Badge',
    qualityHi: 'पहला कदम बैज',
    descEn: 'Complete your first task to embark on the journey of self-discipline.',
    descHi: 'आत्म-अनुशासन की यात्रा शुरू करने के लिए अपना पहला कार्य पूरा करें।',
    quoteEn: 'A journey of a thousand miles begins with a single step.',
    quoteHi: 'हजारों मील की यात्रा एक कदम से शुरू होती है।',
    check: (tasks, stats, todayProgress) => {
      void stats;
      void todayProgress;
      return tasks.filter(t => t.completed).length >= 1;
    },
    progress: (tasks, stats, todayProgress) => {
      void stats;
      void todayProgress;
      return Math.min((tasks.filter(t => t.completed).length / 1) * 100, 100);
    },
    targetText: '1 Completed Task'
  },
  {
    id: 'bhagat_courage',
    icon: '🔥',
    fighter: 'Bhagat Singh',
    qualityEn: 'Courage Badge',
    qualityHi: 'साहस बैज',
    descEn: 'Complete 5 tasks showing fearlessness and dedication.',
    descHi: 'निडरता और समर्पण दिखाते हुए 5 कार्य पूरे करें।',
    quoteEn: 'Revolution is an inalienable right of mankind.',
    quoteHi: 'क्रांति मानव जाति का एक अनिवार्य अधिकार है।',
    check: (tasks, stats, todayProgress) => {
      void stats;
      void todayProgress;
      return tasks.filter(t => t.completed).length >= 5;
    },
    progress: (tasks, stats, todayProgress) => {
      void stats;
      void todayProgress;
      return Math.min((tasks.filter(t => t.completed).length / 5) * 100, 100);
    },
    targetText: '5 Completed Tasks'
  },
  {
    id: 'patel_discipline',
    icon: '🦚',
    fighter: 'Sardar Patel',
    qualityEn: 'Discipline Badge',
    qualityHi: 'अनुशासन बैज',
    descEn: 'Complete 100% of today’s tasks with iron discipline.',
    descHi: 'लोहे जैसे अनुशासन के साथ आज के 100% कार्य पूरे करें।',
    quoteEn: 'Manpower without unity is not a strength.',
    quoteHi: 'एकता के बिना जनशक्ति कोई ताकत नहीं है।',
    check: (tasks, stats, todayProgress) => {
      void stats;
      return todayProgress === 100 && tasks.length > 0;
    },
    progress: (tasks, stats, todayProgress) => {
      void stats;
      return todayProgress;
    },
    targetText: '100% Daily Tasks'
  },
  {
    id: 'rani_determination',
    icon: '✨',
    fighter: 'Rani Lakshmibai',
    qualityEn: 'Determination Badge',
    qualityHi: 'संकल्प बैज',
    descEn: 'Maintain a 3-day completion streak without giving up.',
    descHi: 'बिना हार माने 3 दिन की निरंतरता (streak) बनाए रखें।',
    quoteEn: 'We will fight to the last drop of blood for freedom.',
    quoteHi: 'हम आज़ादी के लिए खून की आखिरी बूंद तक लड़ेंगे।',
    check: (tasks, stats) => {
      void tasks;
      return stats.streak >= 3;
    },
    progress: (tasks, stats) => {
      void tasks;
      return Math.min((stats.streak / 3) * 100, 100);
    },
    targetText: '3-Day Streak'
  },
  {
    id: 'subhas_leadership',
    icon: '🛡️',
    fighter: 'Subhas Chandra Bose',
    qualityEn: 'Leadership Badge',
    qualityHi: 'नेतृत्व बैज',
    descEn: 'Achieve a 7-day streak like Netaji leading from the front.',
    descHi: 'नेताजी की तरह आगे से नेतृत्व करते हुए 7 दिन का स्ट्रिक हासिल करें।',
    quoteEn: 'Give me blood and I will give you freedom!',
    quoteHi: 'तुम मुझे खून दो, मैं तुम्हें आज़ादी दूंगा!',
    check: (tasks, stats) => {
      void tasks;
      return stats.streak >= 7;
    },
    progress: (tasks, stats) => {
      void tasks;
      return Math.min((stats.streak / 7) * 100, 100);
    },
    targetText: '7-Day Streak'
  },
  {
    id: 'ambedkar_knowledge',
    icon: '📚',
    fighter: 'Dr. B. R. Ambedkar',
    qualityEn: 'Knowledge Badge',
    qualityHi: 'ज्ञान बैज',
    descEn: 'Reach a 15-day streak through constant learning and focus.',
    descHi: 'निरंतर सीखने और ध्यान के माध्यम से 15 दिन की स्ट्रिक तक पहुँचें।',
    quoteEn: 'Educate, Agitate, Organize.',
    quoteHi: 'शिक्षित बनो, संघर्ष करो, संगठित रहो।',
    check: (tasks, stats) => {
      void tasks;
      return stats.streak >= 15;
    },
    progress: (tasks, stats) => {
      void tasks;
      return Math.min((stats.streak / 15) * 100, 100);
    },
    targetText: '15-Day Streak'
  },
  {
    id: 'azad_bravery',
    icon: '🏆',
    fighter: 'Chandrashekhar Azad',
    qualityEn: 'Bravery Badge',
    qualityHi: 'वीरता बैज',
    descEn: 'Complete 15 total missions with unwavering courage.',
    descHi: 'अडिग साहस के साथ 15 कुल मिशन पूरे करें।',
    quoteEn: 'Aazad hi rahe hain, aazad hi rahenge!',
    quoteHi: 'आज़ाद ही रहे हैं, आज़ाद ही रहेंगे!',
    check: (tasks) => tasks.filter(t => t.completed).length >= 15,
    progress: (tasks) => Math.min((tasks.filter(t => t.completed).length / 15) * 100, 100),
    targetText: '15 Total Missions'
  },
  {
    id: 'gandhi_gold',
    icon: '👑',
    fighter: 'Gandhi Ji Gold',
    qualityEn: 'Perseverance Badge',
    qualityHi: 'दृढ़ता स्वर्ण बैज',
    descEn: 'Sustain a 30-day streak demonstrating golden perseverance.',
    descHi: 'सुनहरी दृढ़ता का प्रदर्शन करते हुए 30 दिन का स्ट्रिक बनाए रखें।',
    quoteEn: 'Strength does not come from physical capacity. It comes from an indomitable will.',
    quoteHi: 'ताकत शारीरिक क्षमता से नहीं आती। यह अदम्य इच्छाशक्ति से आती है।',
    check: (tasks, stats) => {
      void tasks;
      return stats.streak >= 30;
    },
    progress: (tasks, stats) => {
      void tasks;
      return Math.min((stats.streak / 30) * 100, 100);
    },
    targetText: '30-Day Streak'
  },
  {
    id: 'bharat_ratna',
    icon: '🏆',
    fighter: 'Bharat Ratna',
    qualityEn: 'Productivity Master Badge',
    qualityHi: 'उत्पादकता मास्टर बैज',
    descEn: 'Achieve a Productivity Score above 85% with ultimate dedication.',
    descHi: 'परम समर्पण के साथ 85% से अधिक उत्पादकता स्कोर प्राप्त करें।',
    quoteEn: 'Serving the nation through daily excellence.',
    quoteHi: 'दैनिक उत्कृष्टता के माध्यम से राष्ट्र की सेवा।',
    check: (tasks, stats, todayProgress, productivityScore) => {
      void tasks;
      void stats;
      void todayProgress;
      return productivityScore >= 85;
    },
    progress: (tasks, stats, todayProgress, productivityScore) => {
      void tasks;
      void stats;
      void todayProgress;
      return Math.min((productivityScore / 85) * 100, 100);
    },
    targetText: '85+ Productivity Score'
  },
  {
    id: 'legend_india',
    icon: '💎',
    fighter: 'Legend of India',
    qualityEn: 'Century Legend Badge',
    qualityHi: 'शताब्दी लेजेंड बैज',
    descEn: 'Reach a legendary 100-day streak! Become a true titan of productivity.',
    descHi: 'एक महान 100-दिवसीय स्ट्रिक तक पहुँचें! उत्पादकता के सच्चे नायक बनें।',
    quoteEn: 'Jai Hind! Vande Mataram!',
    quoteHi: 'जय हिन्द! वंदे मातरम्!',
    check: (tasks, stats) => {
      void tasks;
      return stats.streak >= 100;
    },
    progress: (tasks, stats) => {
      void tasks;
      return Math.min((stats.streak / 100) * 100, 100);
    },
    targetText: '100-Day Streak'
  }
];

export const BadgesPage = ({ unlockedBadges = [] }) => {
  const { lang, t } = useLanguage();
  const tasks = [];
  const stats = { streak: 5 };
  const todayProgress = 100;
  const productivityScore = 90;
  const [activeModalBadge, setActiveModalBadge] = useState(null);

  const unlockedCount = BADGES.filter(b => (unlockedBadges && unlockedBadges.includes(b.id)) || b.check(tasks, stats, todayProgress, productivityScore)).length;

  return (
    <div className="badges-page-container">
      <div className="badges-header-banner">
        <div className="badges-header-content">
          <div className="badge-page-pill">
            <Award size={16} />
            <span>{t('badges')}</span>
          </div>
          <h2 className="badges-page-title">
            {t('badgesTitle')}
          </h2>
          <p className="badges-page-subtitle">
            {t('badgesSubtitle')}
          </p>
        </div>

        <div className="badges-count-card">
          <span className="badges-count-label">{t('badgesEarned')}</span>
          <span className="badges-count-value">{unlockedCount} / {BADGES.length}</span>
        </div>
      </div>

      <div className="badges-grid">
        {BADGES.map((badge) => {
          const isUnlocked = badge.check(tasks, stats, todayProgress, productivityScore);
          const progPct = Math.round(badge.progress(tasks, stats, todayProgress, productivityScore));

          return (
            <div
              key={badge.id}
              onClick={() => setActiveModalBadge(badge)}
              className={`badge-card ${isUnlocked ? 'unlocked' : ''}`}
            >
              <div className="badge-card-top">
                <span className="badge-icon">{badge.icon}</span>
                <span className={`badge-status-pill ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  {isUnlocked ? <CheckCircle2 size={14} /> : <Lock size={14} />}
                </span>
              </div>

              <div className="badge-card-copy">
                <h4 className="badge-card-title">{badge.fighter}</h4>
                <p className="badge-card-subtitle">{lang === 'en' ? badge.qualityEn : badge.qualityHi}</p>
                <p className="badge-card-description">{lang === 'en' ? badge.descEn : badge.descHi}</p>
              </div>

              <div className="badge-card-progress">
                <div className="badge-progress-summary">
                  <span className="badge-progress-target">{badge.targetText}</span>
                  <span className="badge-progress-value">{progPct}%</span>
                </div>
                <div className="badge-progress-track">
                  <div className={`badge-progress-fill ${isUnlocked ? 'unlocked' : ''}`} style={{ width: `${progPct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {activeModalBadge && (
        <div className="modal-overlay">
          <div className="glass-card w-full max-w-md p-6 relative bg-[#0F172A] border-amber-500/40 animate-fadeIn text-center space-y-4">
            
            <button 
              onClick={() => setActiveModalBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border border-amber-500/40 flex items-center justify-center text-5xl shadow-2xl">
              {activeModalBadge.icon}
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">{activeModalBadge.fighter}</h3>
              <p className="text-sm font-bold text-amber-400">
                {lang === 'en' ? activeModalBadge.qualityEn : activeModalBadge.qualityHi}
              </p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
              "{lang === 'en' ? activeModalBadge.quoteEn : activeModalBadge.quoteHi}"
            </div>

            <p className="text-xs text-slate-400">
              {lang === 'en' ? activeModalBadge.descEn : activeModalBadge.descHi}
            </p>

            <div className="pt-2">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${
                activeModalBadge.check(tasks, stats, todayProgress, productivityScore)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {activeModalBadge.check(tasks, stats, todayProgress, productivityScore) ? '✅ UNLOCKED' : '🔒 LOCKED'}
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};