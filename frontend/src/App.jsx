import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './components/pages/DashboardPage';
import { TasksListPage } from './components/pages/TasksListPage';
import { StreaksPage } from './components/pages/StreaksPage';
import { BadgesPage } from './components/pages/BadgesPage';
import { CertificatePage } from './components/pages/CertificatePage';
import { TaskFormModal } from './components/common/TaskFormModal';
import {
  fetchTasksAPI,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  fetchStatsAPI,
  updateStatsAPI
} from './services/api';
import './index.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    userName: 'Aarav Sharma',
    currentStreak: 5,
    longestStreak: 12,
    completedTasksTotal: 24,
    unlockedBadges: [
      'gandhi_first_step',
      'bhagat_singh_courage',
      'sardar_patel_discipline',
      'laksmi_determination',
      'subhas_leadership'
    ]
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Initial Load
  useEffect(() => {
    const loadData = async () => {
      const fetchedTasks = await fetchTasksAPI();
      const fetchedStats = await fetchStatsAPI();
      const normalizedTasks = (fetchedTasks || []).map(task => ({
        ...task,
        completedByButton: task.completed ? true : false
      }));
      setTasks(normalizedTasks);
      if (fetchedStats) setStats(fetchedStats);
    };
    loadData();
  }, []);

  const isCourseActive = tasks.length > 0;

  const handleCompleteTask = async (id) => {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask || targetTask.completed) return;

    let updatedTask = await updateTaskAPI(id, { completed: true, completedByButton: true });
    updatedTask = { ...updatedTask, completedByButton: true };
    const newTasks = tasks.map(t => t.id === id ? updatedTask : t);
    setTasks(newTasks);

    const totalCompleted = newTasks.filter(t => t.completed).length;
    const unlocked = [...(stats.unlockedBadges || [])];
    if (totalCompleted === 1 && !unlocked.includes('gandhi_first_step')) {
      unlocked.push('gandhi_first_step');
    }
    if (totalCompleted >= 5 && !unlocked.includes('bhagat_singh_courage')) {
      unlocked.push('bhagat_singh_courage');
    }
    if (newTasks.length > 0 && totalCompleted === newTasks.length && !unlocked.includes('sardar_patel_discipline')) {
      unlocked.push('sardar_patel_discipline');
    }
    const newStats = await updateStatsAPI({
      completedTasksTotal: stats.completedTasksTotal + 1,
      currentStreak: stats.currentStreak,
      unlockedBadges: unlocked
    });
    setStats(newStats);
  };

  // Check and update badges/streaks on task completion
  const handleToggleTask = async (id) => {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;
    const newCompleted = !targetTask.completed;
    let updatedTask = await updateTaskAPI(id, { completed: newCompleted });
    updatedTask = { ...updatedTask, completedByButton: newCompleted ? true : false };
    const newTasks = tasks.map(t => t.id === id ? updatedTask : t);
    setTasks(newTasks);

    // Calculate new stats
    const totalCompleted = newTasks.filter(t => t.completed).length;
    let newStreak = stats.currentStreak;
    const unlocked = [...(stats.unlockedBadges || [])];
    if (totalCompleted === 1 && !unlocked.includes('gandhi_first_step')) {
      unlocked.push('gandhi_first_step');
    }
    if (totalCompleted >= 5 && !unlocked.includes('bhagat_singh_courage')) {
      unlocked.push('bhagat_singh_courage');
    }
    if (newTasks.length > 0 && totalCompleted === newTasks.length && !unlocked.includes('sardar_patel_discipline')) {
      unlocked.push('sardar_patel_discipline');
    }
    const newStats = await updateStatsAPI({
      completedTasksTotal: stats.completedTasksTotal + (newCompleted ? 1 : -1),
      currentStreak: newStreak,
      unlockedBadges: unlocked
    });
    setStats(newStats);
  };

  // Add or Edit Save Handler
  const handleSaveTask = async (taskData) => {
    if (taskData.id) {
      // Edit
      const updated = await updateTaskAPI(taskData.id, taskData);
      setTasks(tasks.map(t => t.id === taskData.id ? updated : t));
    } else {
      // Add new
      const newTask = await addTaskAPI(taskData);
      setTasks([{ ...newTask, completedByButton: newTask.completed ? true : false }, ...tasks]);
    }
    setTaskToEdit(null);
  };

  // Voice Add Task Handler
  const handleVoiceAddTask = async (voiceTaskData) => {
    const newTask = await addTaskAPI(voiceTaskData);
    setTasks(prev => [newTask, ...prev]);
  };

  // Delete Task Handler
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTaskAPI(id);
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Open Edit Modal
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onOpenAddTask={handleOpenAddModal}
      onVoiceAddTask={handleVoiceAddTask}
      unlockedBadgesCount={stats.unlockedBadges ? stats.unlockedBadges.length : 5}
      streakDays={stats.currentStreak}
    >
      {activeTab === 'dashboard' && (
        <DashboardPage
          tasks={tasks}
          stats={stats}
          onToggleTask={handleToggleTask}
          onCompleteTask={handleCompleteTask}
          onOpenAddTask={handleOpenAddModal}
          onViewCertificate={() => setActiveTab('certificate')}
          onNavigateTab={setActiveTab}
        />
      )}
      {activeTab === 'tasks' && (
        <TasksListPage
          tasks={tasks}
          searchQuery={searchQuery}
          onToggleTask={handleToggleTask}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onOpenAddTask={handleOpenAddModal}
        />
      )}
      {activeTab === 'streaks' && (
        <StreaksPage stats={stats} />
      )}
      {activeTab === 'badges' && (
        <BadgesPage unlockedBadges={stats.unlockedBadges} />
      )}
      {activeTab === 'certificate' && (
        <CertificatePage userName={stats.userName || 'Aarav Sharma'} tasks={tasks} unlockedBadges={stats.unlockedBadges} courseActive={isCourseActive} />
      )}
      {/* Task Add/Edit Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </Layout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
