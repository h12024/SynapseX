import React, { useState } from 'react';
import { Search, Mic, Sparkles, Clock, Target, Database } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';

export const SearchInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    'How to optimize TimescaleDB performance?',
    'Vector embeddings for semantic search',
    'AI agent architecture patterns',
    'Natural language processing with LLMs'
  ]);
  const { search, results, isLoading, metrics } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await search(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    search(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your documents..."
            className="w-full pl-12 pr-20 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-lg transition-all duration-200"
          />
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-primary-500 to-accent-600 text-white px-6 py-2 rounded-xl hover:from-primary-600 hover:to-accent-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Search Suggestions */}
      {!results.length && !isLoading && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Try these queries:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm transition-colors duration-200 border border-transparent hover:border-primary-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Query Metrics */}
      {metrics && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-gray-600">Query Time</span>
            </div>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {metrics.queryTime.toFixed(0)}ms
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-accent-500" />
              <span className="text-sm text-gray-600">Documents</span>
            </div>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {metrics.documentsSearched}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-success-500" />
              <span className="text-sm text-gray-600">Results</span>
            </div>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {metrics.resultsReturned}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-sm text-gray-600">Avg Relevance</span>
            </div>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {metrics.averageRelevance.toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Search Results ({results.length})
          </h3>
          {results.map((result) => (
            <div
              key={result.document.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-900 hover:text-primary-600 cursor-pointer">
                  {result.document.title}
                </h4>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                    {result.document.type.toUpperCase()}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-success-600">
                      {result.relevanceScore.toFixed(1)}% match
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-success-500 to-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${result.relevanceScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {result.highlights.length > 0 && (
                <div className="space-y-2">
                  {result.highlights.map((highlight, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {highlight}...
                    </p>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Uploaded {result.document.uploadedAt.toLocaleDateString()} • 
                  {(result.document.size / 1024).toFixed(0)} KB
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Document →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Searching through your documents...</p>
          </div>
        </div>
      )}

      {/* No Results */}
      {!isLoading && query && results.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search query or upload more documents.</p>
        </div>
      )}
    </div>
  );
};