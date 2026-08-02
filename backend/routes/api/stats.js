import express from 'express';
const srouter = express.Router();

let userStats = {
  user: {
    name: 'Aarav Sharma',
    avatar: '🇮🇳',
    joinedDate: '2026-01-26'
  },
  currentStreak: 5,
  longestStreak: 12,
  completedTasksTotal: 24,
  lastCompletedDate: new Date().toISOString().split('T')[0],
  unlockedBadges: [
    'gandhi_first_step',
    'bhagat_singh_courage',
    'sardar_patel_discipline',
    'laksmi_determination',
    'subhas_leadership'
  ]
};

// GET user stats
srouter.get('/', (req, res) => {
  res.json({ success: true, data: userStats });
});

// POST update streak
srouter.post('/streak', (req, res) => {
  const { streak, badgeId } = req.body;
  if (streak !== undefined) userStats.currentStreak = streak;
  if (streak > userStats.longestStreak) userStats.longestStreak = streak;
  if (badgeId && !userStats.unlockedBadges.includes(badgeId)) {
    userStats.unlockedBadges.push(badgeId);
  }
  res.json({ success: true, data: userStats });
});

export default  srouter;
