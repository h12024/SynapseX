export interface Document {
  id: string;
  title: string;
  content: string;
  type: 'pdf' | 'docx' | 'txt' | 'md';
  uploadedAt: Date;
  size: number;
  embedding?: number[];
}

export interface SearchResult {
  document: Document;
  relevanceScore: number;
  highlights: string[];
  semanticSimilarity: number;
}

export interface QueryMetrics {
  queryTime: number;
  documentsSearched: number;
  resultsReturned: number;
  averageRelevance: number;
}

export interface SystemMetrics {
  totalDocuments: number;
  totalQueries: number;
  averageRetrievalTime: number;
  successRate: number;
  efficiencyImprovement: number;
}