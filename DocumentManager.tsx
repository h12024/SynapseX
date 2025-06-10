import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download, Eye } from 'lucide-react';
import { Document } from '../types';

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'TimescaleDB Performance Optimization',
    content: 'TimescaleDB performance guide...',
    type: 'pdf',
    uploadedAt: new Date('2024-01-15'),
    size: 1024000,
  },
  {
    id: '2',
    title: 'Vector Embeddings Guide',
    content: 'Guide to vector embeddings...',
    type: 'docx',
    uploadedAt: new Date('2024-01-16'),
    size: 512000,
  },
  {
    id: '3',
    title: 'AI Agent Architecture',
    content: 'AI agent patterns...',
    type: 'md',
    uploadedAt: new Date('2024-01-17'),
    size: 256000,
  },
];

export const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        content: 'Document content will be processed...',
        type: getFileType(file.name),
        uploadedAt: new Date(),
        size: file.size,
      };
      setDocuments(prev => [...prev, newDoc]);
    });
  };

  const getFileType = (filename: string): 'pdf' | 'docx' | 'txt' | 'md' => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'pdf';
      case 'docx': case 'doc': return 'docx';
      case 'md': return 'md';
      default: return 'txt';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

  const formatFileSize = (bytes: number) => {
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Management</h2>
        <p className="text-gray-600">Upload and manage documents for semantic search indexing</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 mb-8 transition-colors duration-200 ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Documents
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop files here or click to browse
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">PDF</span>
            <span className="bg-gray-100 px-2 py-1 rounded">DOCX</span>
            <span className="bg-gray-100 px-2 py-1 rounded">TXT</span>
            <span className="bg-gray-100 px-2 py-1 rounded">MD</span>
          </div>
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt,.md"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors"
          >
            Choose Files
          </label>
        </div>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Documents</h3>
          <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Size</h3>
          <p className="text-3xl font-bold text-gray-900">
            {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Indexed</h3>
          <p className="text-3xl font-bold text-success-600">{documents.length}</p>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <div key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getFileIcon(doc.type)}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{doc.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="uppercase font-medium">{doc.type}</span>
                      <span>{formatFileSize(doc.size)}</span>
                      <span>{doc.uploadedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};