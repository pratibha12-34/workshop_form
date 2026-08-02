import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { exportCertificatePDF } from '../../services/pdfExport';
import { freedomBadges } from '../../config/badgesConfig';
import { Award, FileText, Printer, CheckCircle2, Lock, Star, Medal } from 'lucide-react';

export const CertificatePage = ({ userName = 'Aarav Sharma', tasks = [], unlockedBadges = [], courseActive = false }) => {
  const { lang, t } = useLanguage();

  const [nameInput, setNameInput] = useState(userName);
  const [certDate, setCertDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeMode, setActiveMode] = useState('daily');
  const [selectedBadgeId, setSelectedBadgeId] = useState(unlockedBadges[0] || '');

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(task => task.completed).length;
  const allTasksCompleted = totalTasks > 0 && completedCount === totalTasks;
  const canGenerateDaily = courseActive && allTasksCompleted;

  const unlockedBadgeOptions = freedomBadges ? freedomBadges.filter(badge => unlockedBadges.includes(badge.id)) : [];
  const streakBadges = unlockedBadgeOptions.filter(badge => badge.type === 'streak');
  const taskBadges = unlockedBadgeOptions.filter(badge => badge.type !== 'streak');
  const selectedBadge = unlockedBadgeOptions.find(badge => badge.id === selectedBadgeId) || null;

  const handleDownloadPDF = () => {
    if (activeMode === 'daily') {
      if (!courseActive) {
        alert(lang === 'hi'
          ? '⚠️ कोई सक्रिय कोर्स नहीं है! प्रमाण-पत्र जनरेट करने के लिए पहले कार्य जोड़ें और Complete Task बटन से पूरा करें।'
          : '⚠️ No active course yet! Add tasks and complete them using the bottom Complete Task button before generating the certificate.');
        return;
      }
      if (!allTasksCompleted) {
        alert(lang === 'hi'
          ? "⚠️ प्रमाण-पत्र जनरेट नहीं किया जा सकता! आपको प्रत्येक टास्क के नीचे दिए गए 'Complete Task' बटन पर क्लिक करके सभी टास्क पूरे करने होंगे।"
          : "⚠️ Certificate cannot be generated yet! You must complete all tasks by pressing the 'Complete Task' button at the bottom of each task first.");
        return;
      }
      exportCertificatePDF({
        userName: nameInput || 'Aarav Sharma',
        dateStr: certDate,
        lang,
        type: 'daily',
        badge: undefined
      });
    } else if (selectedBadge) {
      exportCertificatePDF({
        userName: nameInput || 'Aarav Sharma',
        dateStr: certDate,
        lang,
        type: activeMode === 'badge' ? 'badge' : 'streak',
        badge: selectedBadge
      });
    }
  };

  const handlePrint = () => {
    if (activeMode === 'daily') {
      if (!courseActive) {
        alert(lang === 'hi'
          ? '⚠️ कोई सक्रिय कोर्स नहीं है! प्रिंट करने से पहले कार्य जोड़ें और Complete Task बटन से पूरा करें।'
          : '⚠️ No active course yet! Add tasks and complete them using the bottom Complete Task button before printing.');
        return;
      }
      if (!allTasksCompleted) {
        alert(lang === 'hi'
          ? "⚠️ प्रमाण-पत्र प्रिंट नहीं किया जा सकता! आपको प्रत्येक टास्क के नीचे दिए गए 'Complete Task' बटन से सभी टास्क पूरे करने होंगे।"
          : "⚠️ Certificate cannot be printed yet! You must complete all tasks by pressing the 'Complete Task' button at the bottom of each task first.");
        return;
      }
    }
    window.print();
  };

  const isDownloadDisabled = (activeMode === 'daily' && !canGenerateDaily) || 
    ((activeMode === 'badge' || activeMode === 'streak') && !selectedBadge);

  const getFilteredBadges = () => {
    if (activeMode === 'badge') return unlockedBadgeOptions.filter(b => b.type !== 'streak');
    if (activeMode === 'streak') return unlockedBadgeOptions.filter(b => b.type === 'streak');
    return [];
  };

  const getButtonLabel = () => {
    if (activeMode === 'daily') {
      return allTasksCompleted 
        ? t('downloadPDF') 
        : (lang === 'hi' ? 'प्रमाण-पत्र लॉक है' : 'Certificate Locked');
    } else if (activeMode === 'badge') {
      return selectedBadge 
        ? (lang === 'hi' ? 'बैज प्रमाण-पत्र डाउनलोड करें' : 'Download Badge Certificate')
        : (lang === 'hi' ? 'कोई बैज चुनें' : 'Select a Badge');
    } else {
      return selectedBadge 
        ? (lang === 'hi' ? 'स्ट्रिक प्रमाण-पत्र डाउनलोड करें' : 'Download Streak Certificate')
        : (lang === 'hi' ? 'कोई स्ट्रिक चुनें' : 'Select a Streak');
    }
  };

  return (
    <div className="certificate-page-container">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div>
          <h2 className="page-title">{t('certTitle')} 📜</h2>
          <p className="page-subtitle">
            {lang === 'en'
              ? 'Generate Daily Completion, Badge Achievement, or Streak Milestone certificates.'
              : 'दैनिक पूर्णता, बैज उपलब्धि, या स्ट्रिक माइलस्टोन प्रमाण-पत्र जनरेट करें।'}
          </p>
        </div>

        {/* Customize Form & Controls */}
        <div className="cert-controls-card">
          <div className="cert-form-row">
            <div className="form-group">
              <label className="form-label">{t('userName')}</label>
              <input
                type="text"
                className="form-control-input"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('certDate')}</label>
              <input
                type="date"
                className="form-control-input"
                value={certDate}
                onChange={(e) => setCertDate(e.target.value)}
              />
            </div>

            <div className="cert-action-buttons">
              <button
                className={`btn-primary-tiranga ${allTasksCompleted ? 'pulse-gold' : ''}`}
                onClick={handleDownloadPDF}
                disabled={isDownloadDisabled}
                style={{
                  opacity: isDownloadDisabled ? 0.5 : 1,
                  cursor: isDownloadDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                {activeMode === 'daily' && allTasksCompleted ? <FileText size={18} /> : 
                 activeMode !== 'daily' && selectedBadge ? <FileText size={18} /> : <Lock size={18} />}
                <span>{getButtonLabel()}</span>
              </button>

              <button
                className="btn-secondary-glass"
                onClick={handlePrint}
                disabled={isDownloadDisabled}
                style={{
                  opacity: isDownloadDisabled ? 0.5 : 1,
                  cursor: isDownloadDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                <Printer size={18} />
                <span>{t('printCert')}</span>
              </button>
            </div>
          </div>

          {/* Certificate Mode Switch - Three modes */}
          <div className="cert-mode-switch">
            <button 
              className={`cert-mode-btn ${activeMode === 'daily' ? 'active' : ''}`} 
              onClick={() => setActiveMode('daily')} 
              type="button"
              style={activeMode === 'daily' ? {borderColor: '#FF9933', background: 'rgba(255,153,51,0.15)'} : {}}
            >
              <CheckCircle2 size={16} />
              {lang === 'hi' ? 'दैनिक पूर्णता' : 'Daily Completion'}
            </button>
            <button 
              className={`cert-mode-btn ${activeMode === 'badge' ? 'active' : ''}`} 
              onClick={() => {
                setActiveMode('badge');
                if (taskBadges.length > 0) setSelectedBadgeId(taskBadges[0]?.id || unlockedBadges[0] || '');
              }} 
              type="button"
              style={activeMode === 'badge' ? {borderColor: '#FFD700', background: 'rgba(255,215,0,0.15)'} : {}}
            >
              <Medal size={16} />
              {lang === 'hi' ? 'बैज उपलब्धि' : 'Badge Achievement'}
            </button>
            <button 
              className={`cert-mode-btn ${activeMode === 'streak' ? 'active' : ''}`} 
              onClick={() => {
                setActiveMode('streak');
                if (streakBadges.length > 0) setSelectedBadgeId(streakBadges[0]?.id || unlockedBadges[0] || '');
              }} 
              type="button"
              style={activeMode === 'streak' ? {borderColor: '#FF4500', background: 'rgba(255,69,0,0.15)'} : {}}
            >
              <Star size={16} />
              {lang === 'hi' ? 'स्ट्रिक माइलस्टोन' : 'Streak Milestone'}
            </button>
          </div>

          {/* Certificate Eligibility Status Banner */}
          <div className="cert-status-banner" style={{
            padding: '14px 20px',
            borderRadius: '14px',
            fontWeight: '700',
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: (activeMode === 'daily' && allTasksCompleted) ? 'rgba(19, 136, 8, 0.2)' : 'rgba(239, 68, 68, 0.15)',
            border: (activeMode === 'daily' && allTasksCompleted) ? '1px solid #138808' : '1px solid #ef4444',
            color: (activeMode === 'daily' && allTasksCompleted) ? '#4ade80' : '#fca5a5'
          }}>
            {activeMode === 'daily' && courseActive && allTasksCompleted ? <CheckCircle2 size={20} /> : <Lock size={20} />}
            <span>
              {activeMode === 'daily' && courseActive && allTasksCompleted
                ? (lang === 'hi'
                  ? `🎉 बधाई हो! आपने सभी ${totalTasks} कार्य पूरे कर लिए हैं। दैनिक प्रमाण-पत्र जनरेट करने के लिए तैयार है!`
                  : `🎉 Congratulations! You completed all ${totalTasks} tasks. Daily Certificate is ready to generate!`)
                : activeMode === 'daily' && !courseActive
                  ? (lang === 'hi'
                    ? '🔒 कोई सक्रिय कोर्स नहीं है। पहले कार्य जोड़ें और Complete Task बटन का उपयोग करें।'
                    : '🔒 No active course yet. Add tasks and use the Complete Task button to begin.')
                  : activeMode === 'daily'
                    ? (lang === 'hi'
                      ? `🔒 प्रगति: ${completedCount}/${totalTasks} पूरे। सभी कार्य पूरे करने पर दैनिक प्रमाण-पत्र अनलॉक होगा।`
                      : `🔒 Progress: ${completedCount}/${totalTasks} completed. Complete all tasks to unlock daily certificate.`)
                    : (lang === 'hi'
                      ? `✅ ${selectedBadge ? (lang === 'hi' ? selectedBadge.nameHi : selectedBadge.nameEn) : 'एक बैज या स्ट्रिक चुनें'} - प्रमाण-पत्र तैयार है।`
                      : `✅ ${selectedBadge ? (lang === 'hi' ? selectedBadge.nameEn : selectedBadge.nameEn) : 'Select a badge or streak'} - Certificate is ready.`)}
            </span>
          </div>

          {/* Badge/Streak Selector for non-daily modes */}
          {(activeMode === 'badge' || activeMode === 'streak') && (
            <div className="badge-cert-controls" style={{ marginTop: '16px' }}>
              <div style={{display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <div style={{flex: '1', minWidth: '280px'}}>
                  <label className="form-label" style={{marginBottom: '6px', display: 'block'}}>
                    {activeMode === 'badge' 
                      ? (lang === 'hi' ? '🏅 उपलब्ध बैज चुनें' : '🏅 Select Achievement Badge')
                      : (lang === 'hi' ? '⭐ स्ट्रिक माइलस्टोन चुनें' : '⭐ Select Streak Milestone')}
                  </label>
                  <select
                    className="form-control-select"
                    value={selectedBadgeId}
                    onChange={(e) => setSelectedBadgeId(e.target.value)}
                    style={{width: '100%'}}
                  >
                    {(() => {
                      const filtered = getFilteredBadges();
                      if (filtered.length > 0) {
                        return filtered.map(badge => (
                          <option key={badge.id} value={badge.id}>
                            {badge.icon} {lang === 'hi' ? badge.nameHi : badge.nameEn} — {badge.freedomFighter}
                          </option>
                        ));
                      }
                      return <option value="">{lang === 'hi' ? 'कोई अनलॉक किया गया बैज नहीं' : 'No unlocked badges yet'}</option>;
                    })()}
                  </select>
                </div>

                {selectedBadge && (
                  <div style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '14px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.9rem',
                    flex: '1',
                    minWidth: '280px'
                  }}>
                    <span style={{fontSize: '2rem'}}>{selectedBadge.icon}</span>
                    <div>
                      <div style={{fontWeight: 700, color: '#FFD700', fontSize: '1rem'}}>
                        {lang === 'hi' ? selectedBadge.nameHi : selectedBadge.nameEn}
                      </div>
                      <div style={{fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px'}}>
                        {selectedBadge.freedomFighter} — {lang === 'hi' ? selectedBadge.virtueHi : selectedBadge.virtueEn}
                      </div>
                      <div style={{fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic', marginTop: '4px'}}>
                        "{lang === 'hi' ? selectedBadge.quoteHi : selectedBadge.quoteEn}"
                      </div>
                      <div style={{fontSize: '0.78rem', color: '#138808', marginTop: '4px', fontWeight: 600}}>
                        {lang === 'hi' ? selectedBadge.requirementHi : selectedBadge.requirementEn}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Printable Certificate Canvas Preview */}
      <div className="certificate-preview-viewport">
        <div className="certificate-card-frame" id="printable-certificate" style={{ 
          opacity: ((activeMode === 'daily' && allTasksCompleted) || activeMode !== 'daily') ? 1 : 0.6 
        }}>
          <div className="cert-border-saffron"></div>
          <div className="cert-border-green"></div>
          <div className="cert-border-gold-inner">
            {/* Header Emblem */}
            <div className="cert-header">
              {activeMode === 'daily' ? (
                <Award className="cert-top-emblem" size={32} />
              ) : (
                <Medal className="cert-top-emblem" size={32} />
              )}
              <h1 className="cert-main-title">
                {activeMode === 'badge' ? 'CERTIFICATE OF BADGE ACHIEVEMENT' : 
                 activeMode === 'streak' ? 'CERTIFICATE OF STREAK MILESTONE' : 
                 'CERTIFICATE OF COURSE & TASK COMPLETION'}
              </h1>
              <h3 className="cert-sub-title">
                {activeMode === 'badge' && selectedBadge 
                  ? `${selectedBadge.icon} ${(lang === 'hi' ? selectedBadge.virtueHi : selectedBadge.virtueEn).toUpperCase()}`
                  : activeMode === 'streak' && selectedBadge
                    ? `${selectedBadge.icon} ${(lang === 'hi' ? selectedBadge.nameHi : selectedBadge.nameEn).toUpperCase()} — ${selectedBadge.threshold} ${lang === 'hi' ? 'दिन स्ट्रिक' : 'DAY STREAK'}`
                    : activeMode === 'daily'
                      ? 'ALL TASKS COMPLETED ✓'
                      : 'ACHIEVEMENT UNLOCKED'}
              </h3>
              <div className="cert-divider-gold"></div>
            </div>

            {/* Awardee Details */}
            <div className="cert-body">
              <p className="cert-present-text">This official certificate is proudly awarded to</p>
              <h2 className="cert-recipient-name">
                {nameInput ? nameInput.toUpperCase() : 'AARAV SHARMA'}
              </h2>

              <p className="cert-achievement-text">
                {selectedBadge && activeMode === 'badge'
                  ? (lang === 'hi' 
                    ? `यह प्रमाण-पत्र "${selectedBadge.nameHi}" बैज प्राप्त करने पर दिया जाता है। आपने ${selectedBadge.freedomFighter} के मार्ग पर चलते हुए ${selectedBadge.virtueHi} का परिचय दिया।` 
                    : `This certificate is awarded for achieving the "${selectedBadge.nameEn}" badge. By embodying the spirit of ${selectedBadge.freedomFighter}, you have demonstrated ${selectedBadge.virtueEn}.`)
                  : selectedBadge && activeMode === 'streak'
                    ? (lang === 'hi'
                      ? `यह प्रमाण-पत्र ${selectedBadge.threshold} दिनों की स्ट्रिक पूरी करने पर दिया जाता है। आपने ${selectedBadge.freedomFighter} के समान ${selectedBadge.virtueHi} दिखाया।`
                      : `This certificate is awarded for achieving a ${selectedBadge.threshold}-day streak. Like ${selectedBadge.freedomFighter}, you have shown ${selectedBadge.virtueEn}.`)
                    : (lang === 'hi'
                      ? 'ने साहस, अनुशासन और व्यक्तिगत उत्कृष्टता के समर्पण के साथ आज के सभी कार्यों को सफलतापूर्वक पूरा किया है।'
                      : 'Has successfully completed all daily tasks with courage, discipline, and dedication to personal excellence.')}
              </p>

              <div className="cert-motto-pill">
                <span>KARTAVYA • कार्तव्य</span>
              </div>
            </div>

            {/* Certificate Footer Seal & Signatures */}
            <div className="cert-footer-row">
              <div className="cert-footer-col">
                <span className="footer-label-title">Date</span>
                <span className="footer-value-date">{certDate}</span>
              </div>

              <div className="cert-seal-emblem">
                <div className="seal-outer-gold">
                  <CheckCircle2 className="seal-check-icon" size={20} />
                  <span className="seal-text-top">VERIFIED</span>
                  <span className="seal-text-bottom">SEAL</span>
                </div>
              </div>

              <div className="cert-footer-col right">
                <div className="signature-line">Freedom Focus Mission Board</div>
                <span className="footer-label-title">{t('certSignatureLabel')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
