import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit3, 
  Plus, 
  Filter,
  Lock,
  Check
} from 'lucide-react';

export const TasksListPage = ({
  tasks,
  searchQuery,
  onToggleTask,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
  onOpenAddTask
}) => {
  const { lang, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [notice, setNotice] = useState('');

  const completedCount = tasks.filter(task => task.completed).length;
  const completionPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);
  const momentumLabel = lang === 'hi'
    ? (completionPercent >= 75 ? 'उत्कर्ष पर हैं' : completionPercent >= 40 ? 'रफ्तार में हैं' : 'शुरुआत कर रहे हैं')
    : (completionPercent >= 75 ? 'Momentum is strong' : completionPercent >= 40 ? 'Momentum is building' : 'You are just getting started');

  const handleManualCheckboxClick = (e, isCompleted) => {
    e.stopPropagation();
    if (!isCompleted) {
      const msg = lang === 'hi'
        ? "⚠️ मैन्युअल रूप से चेक नहीं कर सकते! टास्क पूरा करने के लिए कार्ड के नीचे 'Complete Task' बटन दबाएं।"
        : "⚠️ Cannot check manually! Click the 'Complete Task' button at the bottom of the task to complete it.";
      setNotice(msg);
      setTimeout(() => setNotice(''), 4500);
    }
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    const q = searchQuery.toLowerCase().trim();
    const titleMatch = task.title.toLowerCase().includes(q) || (task.titleHi && task.titleHi.toLowerCase().includes(q));
    const descMatch = task.description && task.description.toLowerCase().includes(q);
    const catMatch = task.category.toLowerCase().includes(q);
    const priorityMatch = task.priority.toLowerCase().includes(q);
    const matchesSearch = !q || (titleMatch || descMatch || catMatch || priorityMatch);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !task.completed) ||
      (statusFilter === 'completed' && task.completed);

    const matchesCategory =
      categoryFilter === 'all' || task.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesPriority =
      priorityFilter === 'all' || task.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <div className="tasks-page-container">
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
          animation: 'fadeIn 0.3s ease'
        }}>
          <Lock size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-banner">
        <div>
          <h2 className="page-title">{t('tasksList')}</h2>
          <p className="page-subtitle">
            {lang === 'en'
              ? 'Complete tasks via the bottom Complete Task button to auto-check checkboxes & unlock your Certificate.'
              : 'चेकबॉक्स को स्वचालित रूप से चेक करने और प्रमाणपत्र अनलॉक करने के लिए नीचे दिए गए Complete Task बटन पर क्लिक करें।'}
          </p>
        </div>
        <button className="btn-primary-tiranga" onClick={onOpenAddTask}>
          <Plus size={18} />
          <span>{t('addTask')}</span>
        </button>
      </div>

      <div className="tasks-momentum-banner">
        <div>
          <p className="momentum-title">{lang === 'hi' ? 'कार्य की गति' : 'Course & Task Momentum'}</p>
          <p className="momentum-text">{completionPercent}% {lang === 'hi' ? 'पूरा' : 'complete'} ({completedCount}/{tasks.length} {lang === 'hi' ? 'कार्य' : 'tasks'}) • {momentumLabel}</p>
        </div>
        <div className="momentum-pill">
          {completionPercent === 100 ? (lang === 'hi' ? '📜 प्रमाणपत्र अनलॉक है!' : '📜 Certificate Unlocked!') : (lang === 'hi' ? '🔒 प्रमाणपत्र लॉक है' : '🔒 Certificate Locked')}
        </div>
      </div>

      {/* Filter Bar Controls */}
      <div className="tasks-filter-bar">
        <div className="filter-group">
          <Filter size={18} className="filter-icon" />
          <span className="filter-label">{t('all')}:</span>
          
          <button
            className={`filter-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            {t('all')} ({tasks.length})
          </button>
          
          <button
            className={`filter-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            {t('active')} ({tasks.filter(t => !t.completed).length})
          </button>

          <button
            className={`filter-tab-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            {t('completed')} ({tasks.filter(t => t.completed).length})
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="filter-dropdowns">
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">{t('category')}: {t('all')}</option>
            <option value="Work">{t('work')}</option>
            <option value="Personal">{t('personal')}</option>
            <option value="Health">{t('health')}</option>
            <option value="Mission">{t('mission')}</option>
          </select>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">{t('priority')}: {t('all')}</option>
            <option value="High">{t('high')}</option>
            <option value="Medium">{t('medium')}</option>
            <option value="Low">{t('low')}</option>
          </select>
        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length === 0 ? (
        <div className="empty-tasks-placeholder">
          <p>
            {searchQuery
              ? (lang === 'en' ? `No tasks found matching "${searchQuery}"` : `"${searchQuery}" से मेल खाने वाला कोई कार्य नहीं मिला`)
              : t('noTasksToday')}
          </p>
          <button className="btn-primary-tiranga" onClick={onOpenAddTask}>
            <Plus size={18} />
            <span>{t('addTask')}</span>
          </button>
        </div>
      ) : (
        <div className="task-cards-grid">
          {filteredTasks.map(task => (
            <div key={task.id} className={`task-full-card ${task.completed ? 'completed' : ''}`}>
              <div className="card-top-row">
                {/* Disabled manual checkbox - auto checks only when bottom complete button is clicked */}
                <button
                  className="checkbox-action-btn"
                  onClick={(e) => handleManualCheckboxClick(e, task.completed)}
                  title={task.completed ? "Task Completed!" : "Cannot check manually! Click the Complete Task button at bottom."}
                  style={{ cursor: task.completed ? 'default' : 'not-allowed', opacity: task.completed ? 1 : 0.6 }}
                >
                  {task.completed ? (
                    <CheckCircle2 size={22} className="check-icon-green" />
                  ) : (
                    <Circle size={22} className="unchecked-icon" />
                  )}
                </button>

                <div className="card-title-block">
                  <h4 className="card-task-title">
                    {lang === 'hi' && task.titleHi ? task.titleHi : task.title}
                  </h4>
                  {task.dueDate && (
                    <span className="card-due-date">📅 {task.dueDate}</span>
                  )}
                </div>

                <div className="card-actions-group">
                  <button className="action-icon-btn" onClick={() => onEditTask(task)}>
                    <Edit3 size={18} />
                  </button>
                  <button className="action-icon-btn delete" onClick={() => onDeleteTask(task.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {task.description && (
                <p className="card-task-desc">{task.description}</p>
              )}

              {/* Bottom Card Meta & Explicit COMPLETE TASK Button */}
              <div className="card-bottom-meta" style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="task-meta-tags">
                  <span className={`tag-category ${task.category.toLowerCase()}`}>
                    {task.category}
                  </span>
                  <span className={`tag-priority ${task.priority.toLowerCase()}`}>
                    {task.priority} Priority
                  </span>
                </div>

                {/* Explicit Complete Task Button at the Bottom */}
                <button
                  className={`complete-task-btn ${task.completed ? 'done' : ''}`}
                  onClick={() => (onCompleteTask || onToggleTask)(task.id)}
                  disabled={task.completed}
                  type="button"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: task.completed ? 'default' : 'pointer',
                    background: task.completed ? 'rgba(19, 136, 8, 0.25)' : 'linear-gradient(135deg, #138808, #16a34a)',
                    color: task.completed ? '#4ade80' : '#ffffff',
                    border: task.completed ? '1px solid #138808' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {task.completed ? (
                    <>
                      <Check size={16} />
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
  );
};
