import { useState, useCallback } from 'react';
import { SearchResult, QueryMetrics } from '../types';

// Mock data for demonstration
const mockDocuments = [
  {
    id: '1',
    title: 'TimescaleDB Performance Optimization',
    content: 'TimescaleDB is a time-series database built on PostgreSQL. It provides excellent performance for time-series data with automatic partitioning and compression.',
    type: 'pdf' as const,
    uploadedAt: new Date('2024-01-15'),
    size: 1024000,
  },
  {
    id: '2', 
    title: 'Vector Embeddings in Semantic Search',
    content: 'Vector embeddings represent text as high-dimensional vectors, enabling semantic similarity calculations through cosine similarity and other distance metrics.',
    type: 'docx' as const,
    uploadedAt: new Date('2024-01-16'),
    size: 512000,
  },
  {
    id: '3',
    title: 'AI Agent Architecture Patterns',
    content: 'AI agents can be designed with various architectural patterns including reactive agents, deliberative agents, and hybrid approaches combining both paradigms.',
    type: 'md' as const,
    uploadedAt: new Date('2024-01-17'),
    size: 256000,
  },
  {
    id: '4',
    title: 'Natural Language Processing with LLMs',
    content: 'Large Language Models excel at understanding natural language queries and can be fine-tuned for specific domain applications with high accuracy.',
    type: 'txt' as const,
    uploadedAt: new Date('2024-01-18'),
    size: 768000,
  },
];

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<QueryMetrics | null>(null);

  const search = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setResults([]);
      setMetrics(null);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock semantic search logic
    const searchResults: SearchResult[] = mockDocuments
      .map(doc => {
        const similarity = calculateSimilarity(query.toLowerCase(), doc.content.toLowerCase());
        const highlights = extractHighlights(doc.content, query);
        
        return {
          document: doc,
          relevanceScore: similarity * 100,
          highlights,
          semanticSimilarity: similarity,
        };
      })
      .filter(result => result.relevanceScore > 20)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    const queryMetrics: QueryMetrics = {
      queryTime: Math.random() * 500 + 100,
      documentsSearched: mockDocuments.length,
      resultsReturned: searchResults.length,
      averageRelevance: searchResults.reduce((sum, r) => sum + r.relevanceScore, 0) / searchResults.length || 0,
    };

    setResults(searchResults);
    setMetrics(queryMetrics);
    setIsLoading(false);
  }, []);

  return { search, results, isLoading, metrics };
};

function calculateSimilarity(query: string, content: string): number {
  const queryWords = query.split(' ').filter(word => word.length > 2);
  const contentWords = content.toLowerCase().split(' ');
  
  const matches = queryWords.filter(word => 
    contentWords.some(contentWord => contentWord.includes(word))
  );
  
  return matches.length / queryWords.length;
}

function extractHighlights(content: string, query: string): string[] {
  const words = query.split(' ').filter(word => word.length > 2);
  const sentences = content.split('.').filter(sentence => sentence.trim());
  
  return sentences
    .filter(sentence => 
      words.some(word => sentence.toLowerCase().includes(word.toLowerCase()))
    )
    .slice(0, 2)
    .map(sentence => sentence.trim());
}