import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import WikiPage from './components/WikiPage';

type AppPath = 'landing' | 'app' | 'wiki';

const App: React.FC = () => {
  const [path, setPath] = useState<AppPath>('landing');
  const [previousPath, setPreviousPath] = useState<AppPath>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navigateTo = (newPath: AppPath) => {
    setPreviousPath(path);
    setPath(newPath);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsAuthModalOpen(false);
    navigateTo('app');
  };

  const renderView = () => {
    switch (path) {
      case 'landing':
        return (
          <LandingPage 
            onAccess={() => setIsAuthModalOpen(true)} 
            onWiki={() => navigateTo('wiki')} 
          />
        );
      case 'app':
        return (
          <Dashboard 
            onWiki={() => navigateTo('wiki')} 
            onLogout={() => navigateTo('landing')}
          />
        );
      case 'wiki':
        return (
          <WikiPage 
            onBack={() => navigateTo(previousPath === 'wiki' ? 'landing' : previousPath)} 
          />
        );
      default:
        return <LandingPage onAccess={() => setIsAuthModalOpen(true)} onWiki={() => navigateTo('wiki')} />;
    }
  };

  return (
    <div className="antialiased min-h-screen bg-white relative">
      {renderView()}
      
      {/* Clerk Auth Modal Popup */}
      {isAuthModalOpen && (
        <AuthPage 
          onLogin={handleLogin} 
          onBack={() => setIsAuthModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;