import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export const Layout = ({
  children,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenAddTask,
  onVoiceAddTask,
  unlockedBadgesCount,
  streakDays
}) => {
  return (
    <div className="app-layout-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unlockedBadgesCount={unlockedBadgesCount}
        streakDays={streakDays}
      />
      <div className="app-main-viewport">
        <TopHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenAddTask={onOpenAddTask}
          onVoiceAddTask={onVoiceAddTask}
          activeTab={activeTab}
        />
        <main className="page-content-scrollable">
          {children}
        </main>
      </div>
    </div>
  );
};
