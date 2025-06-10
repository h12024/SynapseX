import React, { useState } from 'react';
import { Database, Cpu, Shield, Bell, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    semanticSearchThreshold: 0.7,
    maxResults: 10,
    embeddingModel: 'all-MiniLM-L6-v2',
    enableRealtimeIndexing: true,
    enableQueryLogging: true,
    enablePerformanceOptimization: true,
    notificationEmails: true,
    backupFrequency: 'daily',
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would typically send the settings to your backend
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
        <p className="text-gray-600">Configure SynapseX system parameters and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Search Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Search Configuration</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semantic Search Threshold
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={settings.semanticSearchThreshold}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  semanticSearchThreshold: parseFloat(e.target.value)
                }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.1 (Broad)</span>
                <span>{settings.semanticSearchThreshold}</span>
                <span>1.0 (Precise)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Results
              </label>
              <select
                value={settings.maxResults}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  maxResults: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={5}>5 results</option>
                <option value={10}>10 results</option>
                <option value={20}>20 results</option>
                <option value={50}>50 results</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Model Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI Model Configuration</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Embedding Model
              </label>
              <select
                value={settings.embeddingModel}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  embeddingModel: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all-MiniLM-L6-v2">all-MiniLM-L6-v2 (Fast)</option>
                <option value="all-mpnet-base-v2">all-mpnet-base-v2 (Balanced)</option>
                <option value="all-distilroberta-v1">all-distilroberta-v1 (Accurate)</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableRealtimeIndexing}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    enableRealtimeIndexing: e.target.checked
                  }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Enable real-time indexing
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enablePerformanceOptimization}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    enablePerformanceOptimization: e.target.checked
                  }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Performance optimization
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Security & Privacy</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Query Logging</label>
                <p className="text-xs text-gray-500">Log user queries for analytics</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableQueryLogging}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  enableQueryLogging: e.target.checked
                }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  backupFrequency: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <p className="text-xs text-gray-500">Receive system alerts and reports via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notificationEmails}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                notificationEmails: e.target.checked
              }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};