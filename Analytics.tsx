import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Clock, Target, Database, Zap, Brain } from 'lucide-react';
import { SystemMetrics } from '../types';

const performanceData = [
  { name: 'Week 1', efficiency: 45, queries: 120, accuracy: 78 },
  { name: 'Week 2', efficiency: 52, queries: 180, accuracy: 82 },
  { name: 'Week 3', efficiency: 61, queries: 245, accuracy: 85 },
  { name: 'Week 4', efficiency: 73, queries: 320, accuracy: 88 },
  { name: 'Week 5', efficiency: 82, queries: 410, accuracy: 91 },
  { name: 'Week 6', efficiency: 87, queries: 485, accuracy: 93 },
];

const queryDistribution = [
  { type: 'Technical', count: 145, percentage: 35 },
  { type: 'Business', count: 98, percentage: 24 },
  { type: 'Research', count: 87, percentage: 21 },
  { type: 'Documentation', count: 82, percentage: 20 },
];

const mockMetrics: SystemMetrics = {
  totalDocuments: 1247,
  totalQueries: 8934,
  averageRetrievalTime: 142,
  successRate: 94.7,
  efficiencyImprovement: 87.3,
};

export const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Analytics</h2>
        <p className="text-gray-600">Monitor performance and efficiency metrics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Documents</p>
              <p className="text-2xl font-bold text-gray-900">{mockMetrics.totalDocuments.toLocaleString()}</p>
            </div>
            <Database className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Queries</p>
              <p className="text-2xl font-bold text-gray-900">{mockMetrics.totalQueries.toLocaleString()}</p>
            </div>
            <Brain className="w-8 h-8 text-accent-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">{mockMetrics.averageRetrievalTime}ms</p>
            </div>
            <Clock className="w-8 h-8 text-success-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockMetrics.successRate}%</p>
            </div>
            <Target className="w-8 h-8 text-success-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Efficiency</p>
              <p className="text-2xl font-bold text-success-600">{mockMetrics.efficiencyImprovement}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-success-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-success-500 to-success-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-success-100 mb-1 text-sm">Improvement</p>
              <p className="text-2xl font-bold">80%+ Goal</p>
              <p className="text-success-200 text-sm">Achieved!</p>
            </div>
            <Zap className="w-8 h-8 text-success-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Efficiency Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="efficiency"
                stroke="#10b981"
                fill="#d1fae5"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Query Volume */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Volume & Accuracy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="queries"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Query Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Distribution by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={queryDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-lg border border-primary-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-primary-900">Performance Trend</h4>
          </div>
          <p className="text-primary-800 text-sm">
            System efficiency has improved by 87% over the past 6 weeks, exceeding the 80% target goal.
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-lg border border-accent-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-accent-900">AI Processing</h4>
          </div>
          <p className="text-accent-800 text-sm">
            Vector embeddings and semantic search are delivering 94.7% success rate in query resolution.
          </p>
        </div>

        <div className="bg-gradient-to-br from-success-50 to-success-100 p-6 rounded-lg border border-success-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-success-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-success-900">Speed Optimization</h4>
          </div>
          <p className="text-success-800 text-sm">
            Average query response time is 142ms, making document retrieval incredibly fast and efficient.
          </p>
        </div>
      </div>
    </div>
  );
};