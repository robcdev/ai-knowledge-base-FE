#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Script to add a new context file to the mock data
 * Usage: node add-mock-context-file.js
 */

function generateUUID() {
  return crypto.randomUUID();
}

function generateContextFile(data) {
  return {
    id: generateUUID(),
    name: data.name,
    size: data.size,
    uploadDate: new Date().toISOString(),
    url: data.url,
    summary: data.summary || undefined,
  };
}

function addContextFileToMock(contextFile) {
  const mockFilePath = path.join(__dirname, '../../../public/mocks/context-files.json');
  
  try {
    // Read existing mock data
    const fileContent = fs.readFileSync(mockFilePath, 'utf8');
    const mockData = JSON.parse(fileContent);

    // Add new item
    mockData.push(contextFile);

    // Write back to file
    fs.writeFileSync(mockFilePath, JSON.stringify(mockData, null, 2), 'utf8');

    console.log('✓ Successfully added context file to mock data');
    console.log(`  Name: ${contextFile.name}`);
    console.log(`  ID: ${contextFile.id}`);
    console.log(`  Total files: ${mockData.length}`);
    
    return true;
  } catch (error) {
    console.error('✗ Error adding context file to mock:', error.message);
    return false;
  }
}

// Example: Add a new file
const newFile = generateContextFile({
  name: 'example-new-file.pdf',
  size: 512000,
  url: 'https://aiknowledgebase.blob.core.windows.net/context-files/example-new-file.pdf',
  summary: 'This is an example of a newly added context file using the utility script.',
});

// Uncomment to actually add the file:
// addContextFileToMock(newFile);

console.log('\n📝 To add a custom file, modify this script and uncomment addContextFileToMock()');
console.log('\nExample file that would be added:');
console.log(JSON.stringify(newFile, null, 2));

module.exports = { generateContextFile, addContextFileToMock };
