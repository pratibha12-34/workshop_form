const TASKS_KEY = 'azadi_tasks_v1';
const STATS_KEY = 'azadi_stats_v1';
const defaultTasks = [
  {
    id: '1',
    title: 'Morning Yoga & Meditation',
    titleHi: 'सुबह का योग और ध्यान',
    description: 'Start the day with focus and discipline',
    category: 'Health',
    priority: 'High',
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: '2',
    title: 'Study Freedom Movement History',
    titleHi: 'स्वतंत्रता आंदोलन के इतिहास का अध्ययन करें',
    description: 'Read about Bhagat Singh and Netaji Subhas Chandra Bose',
    category: 'Mission',
    priority: 'High',
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: '3',
    title: 'Complete Project Presentation',
    titleHi: 'प्रोजेक्ट प्रस्तुति पूरी करें',
    description: 'Prepare slides for daily team review',
    category: 'Work',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: '4',
    title: 'Help a Neighbor / Community Service',
    titleHi: 'पड़ोसी की मदद करें / समाज सेवा',
    description: 'Spread kindness and unity in the neighborhood',
    category: 'Personal',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString().split('T')[0]
  }
];
const defaultStats = {
  userName: 'Aarav Sharma',
  currentStreak: 5,
  longestStreak: 12,
  completedTasksTotal: 24,
  lastActiveDate: new Date().toISOString().split('T')[0],
  unlockedBadges: [
    'gandhi_first_step',
    'bhagat_singh_courage',
    'sardar_patel_discipline',
    'laksmi_determination',
    'subhas_leadership'
  ]
};
export const getStoredTasks = () => {
  const data = localStorage.getItem(TASKS_KEY);
  if (!data) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultTasks;
  }
};
export const saveStoredTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
export const getStoredStats = () => {
  const data = localStorage.getItem(STATS_KEY);
  if (!data) {
    localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
    return defaultStats;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultStats;
  }
};
export const saveStoredStats = (stats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};
