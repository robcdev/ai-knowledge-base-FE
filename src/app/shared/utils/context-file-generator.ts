/* import { ContextFile } from '../types/context-file';
import * as fs from 'fs';
import * as path from 'path'; */

/**
 * Generates a UUID v4
 */
/* function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface CreateContextFileData {
  name: string;
  size: number;
  url: string;
  summary?: string;
}
 */
/**
 * Generates a new context file item with provided data
 * @param data - The data to create the context file with
 * @returns The generated ContextFile object
 */
/* export function generateContextFile(data: CreateContextFileData): ContextFile {
  return {
    id: generateUUID(),
    name: data.name,
    size: data.size,
    uploadDate: new Date(),
    url: data.url,
    summary: data.summary,
  };
} */

/**
 * Adds a generated context file to the mock JSON file
 * NOTE: This function is for Node.js environment only (development/testing)
 * @param contextFile - The context file to add to the mock data
 * @param mockFilePath - Path to the mock JSON file (default: public/mocks/context-files.json)
 */
/* export function addContextFileToMock(
  contextFile: ContextFile,
  mockFilePath: string = path.join(process.cwd(), 'public/mocks/context-files.json')
): void {
  if (typeof window !== 'undefined') {
    throw new Error('This function can only be used in Node.js environment');
  }

  try {
    // Read existing mock data
    const fileContent = fs.readFileSync(mockFilePath, 'utf8');
    const mockData: ContextFile[] = JSON.parse(fileContent);

    // Add new item
    mockData.push(contextFile);

    // Write back to file
    fs.writeFileSync(mockFilePath, JSON.stringify(mockData, null, 2), 'utf8');

    console.log(`✓ Added context file "${contextFile.name}" to mock data`);
    console.log(`  ID: ${contextFile.id}`);
    console.log(`  Total files: ${mockData.length}`);
  } catch (error) {
    console.error('Error adding context file to mock:', error);
    throw error;
  }
} */

/**
 * Example usage in a Node.js script:
 * 
 * ```typescript
 * import { generateContextFile, addContextFileToMock } from './context-file-generator';
 * 
 * const newFile = generateContextFile({
 *   name: 'new-document.pdf',
 *   size: 1024000,
 *   url: 'https://example.com/file.pdf',
 *   summary: 'A new document'
 * });
 * 
 * addContextFileToMock(newFile);
 * ```
 */
