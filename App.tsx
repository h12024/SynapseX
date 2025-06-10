import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SearchInterface } from './components/SearchInterface';
import { DocumentManager } from './components/DocumentManager';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('search');

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <SearchInterface />;
      case 'documents':
        return <DocumentManager />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <SearchInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pb-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;