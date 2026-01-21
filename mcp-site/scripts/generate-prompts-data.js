#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Categories mapping
const CATEGORIES = {
  'python': { name: 'Python', icon: '🐍', color: 'bg-blue-500' },
  'typescript': { name: 'TypeScript', icon: '📘', color: 'bg-blue-600' },
  'java': { name: 'Java', icon: '☕', color: 'bg-orange-500' },
  'github': { name: 'GitHub', icon: '🐙', color: 'bg-gray-700' },
  'engineering': { name: 'Engineering', icon: '⚙️', color: 'bg-green-500' }
};

function extractMetadata(content, filePath) {
  const lines = content.split('\n');
  let title = '';
  let description = '';
  let examples = [];
  let tags = [];
  let promptSection = '';
  
  // Extract title (first # heading)
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      break;
    }
  }
  
  // Extract description from ## Description section
  const descriptionMatch = content.match(/## Description\n\n(.*?)(?=\n##|\n\n##|\Z)/s);
  if (descriptionMatch) {
    description = descriptionMatch[1].trim();
  } else {
    // Fallback to first paragraph after title
    const firstParagraphMatch = content.match(/# .*?\n\n(.*?)(?=\n##|\Z)/s);
    if (firstParagraphMatch) {
      description = firstParagraphMatch[1].trim();
    }
  }
  
  // Extract the actual prompt section
  const promptMatch = content.match(/## Prompt\n\n(.*?)(?=\n##|\Z)/s);
  if (promptMatch) {
    promptSection = promptMatch[1].trim().substring(0, 500) + (promptMatch[1].trim().length > 500 ? '...' : '');
  }
  
  // Extract example usage
  const exampleMatches = content.match(/Example usage:\n((?:- .*\n?)*)/g);
  if (exampleMatches) {
    examples = exampleMatches[0]
      .replace('Example usage:\n', '')
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.replace('- ', '').replace(/"/g, ''));
  }
  
  // Extract use cases
  const useCaseMatch = content.match(/Use this prompt when you want to:\n((?:- .*\n?)*)/g);
  let useCases = [];
  if (useCaseMatch) {
    useCases = useCaseMatch[0]
      .replace('Use this prompt when you want to:\n', '')
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.replace('- ', ''));
  }
  
  // Extract tags from content
  const techKeywords = ['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Vite', 'Jest', 'JUnit', 'Maven', 'Lombok', 'DDD', 'Docker', 'CI/CD', 'TypeScript', 'JavaScript', 'Python', 'Java', 'GitHub'];
  tags = techKeywords.filter(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return {
    title,
    description: description.substring(0, 300) + (description.length > 300 ? '...' : ''),
    promptPreview: promptSection,
    examples,
    useCases,
    tags,
    wordCount: content.split(' ').length,
    lastModified: fs.statSync(filePath).mtime.toISOString()
  };
}

function scanDirectory(dirPath, category) {
  const prompts = [];
  
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return prompts;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file.endsWith('.md') && !file.toLowerCase().includes('readme')) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const metadata = extractMetadata(content, filePath);
        
        const prompt = {
          id: `${category}_${file.replace('.md', '').replace(/[^a-zA-Z0-9]/g, '_')}`,
          filename: file,
          category,
          path: `../${category}/${file}`,
          ...metadata,
          categoryInfo: CATEGORIES[category] || { name: category, icon: '📄', color: 'bg-gray-500' }
        };
        
        prompts.push(prompt);
        console.log(`✓ Processed: ${category}/${file}`);
      } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
      }
    }
  }
  
  return prompts;
}

function generatePromptsData() {
  console.log('🔍 Scanning for prompt files...\n');
  
  // Check for prompts in ./prompts/ directory first (Docker build)
  // Otherwise check parent directory (local development)
  const appDir = path.resolve(__dirname, '..');
  const promptsDir = path.join(appDir, 'prompts');
  const rootDir = fs.existsSync(promptsDir) 
    ? promptsDir 
    : path.resolve(__dirname, '../..');
  
  console.log('Root directory:', rootDir);
  
  const allPrompts = [];
  const stats = {
    totalPrompts: 0,
    categories: {}
  };
  
  // Scan each category directory
  for (const category of Object.keys(CATEGORIES)) {
    const categoryPath = path.join(rootDir, category);
    console.log(`Scanning: ${categoryPath}`);
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Directory not found: ${categoryPath}, skipping...`);
      continue;
    }
    
    const prompts = scanDirectory(categoryPath, category);
    
    allPrompts.push(...prompts);
    stats.categories[category] = prompts.length;
    stats.totalPrompts += prompts.length;
    
    console.log(`📁 ${category}: ${prompts.length} prompts found`);
  }
  
  // Sort prompts by category and title
  allPrompts.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.title.localeCompare(b.title);
  });
  
  // Generate the data structure
  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalPrompts: stats.totalPrompts,
      categories: Object.keys(CATEGORIES).map(key => ({
        key,
        ...CATEGORIES[key],
        count: stats.categories[key] || 0
      }))
    },
    prompts: allPrompts
  };
  
  // Ensure data directory exists
  const dataDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Write to data file
  const outputPath = path.join(dataDir, 'prompts.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Generated prompts data:`);
  console.log(`   📊 Total prompts: ${stats.totalPrompts}`);
  console.log(`   📂 Categories: ${Object.keys(stats.categories).length}`);
  console.log(`   💾 Output: ${outputPath}`);
  
  return data;
}

// Run the script
console.log('Script starting...');
try {
  generatePromptsData();
} catch (error) {
  console.error('❌ Error generating prompts data:', error);
  process.exit(1);
}