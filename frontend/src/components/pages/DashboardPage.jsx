import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GreetingBanner } from '../common/GreetingBanner';
import { DandiProgressBar } from '../common/DandiProgressBar';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Plus,
  Lock,
  Check
} from 'lucide-react';

export const DashboardPage = ({
  tasks,
  stats,
  onToggleTask,
  onCompleteTask,
  onOpenAddTask,
  onNavigateTab
}) => {
  const { lang, t } = useLanguage();
  const [notice, setNotice] = useState('');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const isAllComplete = totalTasks > 0 && completedTasks === totalTasks;
  const nextPriorityTask = tasks.find(task => !task.completed) || null;
  const missionQuote = lang === 'hi'
    ? 'एक दिन की अनुशासनात्मक शुरुआत, पूरे जीवन की सफलता बनती है।'
    : 'One disciplined day becomes the foundation of a stronger life.';

  const handleManualCheckboxClick = (e, isCompleted) => {
    e.stopPropagation();
    if (!isCompleted) {
      const msg = lang === 'hi'
        ? "⚠️ मैन्युअल रूप से चेक नहीं कर सकते! टास्क पूरा करने के लिए नीचे 'Complete Task' बटन दबाएं।"
        : "⚠️ Cannot check manually! Click the 'Complete Task' button at the bottom of the task to complete it.";
      setNotice(msg);
      setTimeout(() => setNotice(''), 4500);
    }
  };

  return (
    <div className="dashboard-page-container">
      {/* Notice Banner */}
      {notice && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid #ef4444',
          color: '#fca5a5',
          padding: '12px 20px',
          borderRadius: '14px',
          fontWeight: '700',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <Lock size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Greeting Banner */}
      <GreetingBanner
        userName={stats.userName || 'Aarav'}
      />

      {/* Stats Cards Grid */}
      <div className="dashboard-stats-grid">
        <div className="stat-card saffron-glow">
          <div className="stat-icon-wrapper saffron">
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalTasks}</span>
            <span className="stat-label">{t('totalTasks')}</span>
          </div>
        </div>

        <div className="stat-card green-glow">
          <div className="stat-icon-wrapper green">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{completedTasks}</span>
            <span className="stat-label">{t('completedTasks')}</span>
          </div>
        </div>

        <div className="stat-card orange-glow">
          <div className="stat-icon-wrapper fire">
            <Flame size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.currentStreak} {t('daysStreak')}</span>
            <span className="stat-label">{t('currentStreak')}</span>
          </div>
        </div>

        <div className="stat-card gold-glow">
          <div className="stat-icon-wrapper gold">
            <Award size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.unlockedBadges ? stats.unlockedBadges.length : 5}</span>
            <span className="stat-label">{t('badgesEarned')}</span>
          </div>
        </div>

        <div className="stat-card blue-glow">
          <div className="stat-icon-wrapper blue">
            <TrendingUp size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{progressPercent}%</span>
            <span className="stat-label">{t('productivityScore')}</span>
          </div>
        </div>
      </div>

      {/* Daily Completion Celebration Alert Banner */}
      {isAllComplete && (
        <div className="all-complete-banner">
          <div className="celebration-badge-icon">📜</div>
          <div className="celebration-text">
            <h3>{t('allDailyCompleteTitle')}</h3>
            <p>{t('allDailyCompleteSubtitle')}</p>
          </div>
          <button
            className="btn-primary-tiranga pulse-gold"
            onClick={() => onNavigateTab('certificate')}
          >
            <Award size={18} />
            <span>{t('viewCertificate')}</span>
          </button>
        </div>
      )}

      <div className="dashboard-insight-row">
        <div className="insight-card quote-card">
          <p className="insight-label">{lang === 'hi' ? 'मिशन श्लोक' : 'Mission Quote'}</p>
          <h4>“{missionQuote}”</h4>
        </div>

        <div className="insight-card focus-card">
          <p className="insight-label">{lang === 'hi' ? 'आज का ध्यान' : 'Focus of the Day'}</p>
          <h4>{nextPriorityTask ? (lang === 'hi' && nextPriorityTask.titleHi ? nextPriorityTask.titleHi : nextPriorityTask.title) : (lang === 'hi' ? 'सब कुछ पूरा हो चुका है' : 'Everything is already complete')}</h4>
        </div>
      </div>

      {/* Dandi March Progress Bar Component */}
      <DandiProgressBar progress={progressPercent} />

      {/* Today's Tasks Section */}
      <div className="dashboard-section-card">
        <div className="section-header-row">
          <div>
            <h3 className="section-title">{t('todaysTasks')}</h3>
            <p className="section-subtitle">
              {lang === 'en' ? 'Click Complete Task button to complete modules and auto-check tasks' : 'कार्यों को पूरा करने के लिए Complete Task बटन दबाएं'}
            </p>
          </div>
          <div className="section-actions">
            <button className="btn-secondary-glass" onClick={onOpenAddTask}>
              <Plus size={18} />
              <span>{t('quickAdd')}</span>
            </button>
            <button className="btn-link-action" onClick={() => onNavigateTab('tasks')}>
              <span>{t('viewAllTasks')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-tasks-placeholder">
            <p>{t('noTasksToday')}</p>
            <button className="btn-primary-tiranga" onClick={onOpenAddTask}>
              <Plus size={18} />
              <span>{t('addTask')}</span>
            </button>
          </div>
        ) : (
          <div className="dashboard-tasks-list">
            {tasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className={`task-row-card ${task.completed ? 'completed' : ''}`}
              >
                {/* Manual direct checkbox clicking is disabled */}
                <button
                  className="task-checkbox-btn"
                  onClick={(e) => handleManualCheckboxClick(e, task.completed)}
                  title={task.completed ? "Completed" : "Cannot check manually! Click Complete Task button below."}
                  style={{ cursor: task.completed ? 'default' : 'not-allowed', opacity: task.completed ? 1 : 0.6 }}
                  aria-label={task.completed ? 'Task completed' : 'Task pending'}
                >
                  {task.completed ? (
                    <CheckCircle2 size={20} className="check-icon-green" />
                  ) : (
                    <Circle size={20} className="unchecked-icon" />
                  )}
                </button>
                
                <div className="task-content">
                  <span className="task-title-text">
                    {lang === 'hi' && task.titleHi ? task.titleHi : task.title}
                  </span>
                  {task.description && (
                    <p className="task-desc-text">{task.description}</p>
                  )}
                </div>

                <div className="task-meta-stack">
                  <div className="task-meta-tags">
                    <span className={`tag-category ${task.category.toLowerCase()}`}>
                      {task.category}
                    </span>
                    <span className={`tag-priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Explicit Complete Task Button */}
                  <button
                    className="complete-task-btn"
                    onClick={() => (onCompleteTask || onToggleTask)(task.id)}
                    disabled={task.completed}
                    type="button"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      cursor: task.completed ? 'default' : 'pointer',
                      background: task.completed ? 'rgba(19, 136, 8, 0.25)' : 'linear-gradient(135deg, #138808, #16a34a)',
                      color: task.completed ? '#4ade80' : '#ffffff',
                      border: task.completed ? '1px solid #138808' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {task.completed ? (
                      <>
                        <Check size={14} />
                        <span>{t('completed')}</span>
                      </>
                    ) : (
                      <span>{t('completeTask')}</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
