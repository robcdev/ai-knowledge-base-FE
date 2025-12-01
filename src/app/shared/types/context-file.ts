export interface ContextFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  summary?: string;
  url: string; // URL to access the file
  resourceMode: 'file' | 'url';
}

export type ResourceMode = 'file' | 'url';
