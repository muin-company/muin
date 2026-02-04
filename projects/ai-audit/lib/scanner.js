import { readFile } from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { patterns, skipPatterns, defaultExtensions } from './patterns.js';

/**
 * Result of scanning a file
 * @typedef {Object} Finding
 * @property {string} file - File path
 * @property {number} line - Line number
 * @property {string} pattern - Pattern name that matched
 * @property {string} severity - high/medium/low
 * @property {string} description - Human readable description
 * @property {string} match - The matched text (redacted)
 * @property {string} context - Line context
 */

/**
 * Redact sensitive data, showing only first/last few chars
 * @param {string} text 
 * @returns {string}
 */
function redact(text) {
  if (text.length <= 8) return '***';
  const visible = Math.min(4, Math.floor(text.length / 4));
  return text.slice(0, visible) + '...' + text.slice(-visible);
}

/**
 * Scan a single file for sensitive data
 * @param {string} filePath 
 * @returns {Promise<Finding[]>}
 */
export async function scanFile(filePath) {
  const findings = [];
  
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    for (const pattern of patterns) {
      // Reset regex lastIndex for global patterns
      pattern.regex.lastIndex = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let match;
        
        // Create a new regex for each line to avoid lastIndex issues
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        
        while ((match = regex.exec(line)) !== null) {
          // Skip if it looks like a false positive
          if (isFalsePositive(match[0], pattern, line, filePath)) {
            continue;
          }
          
          findings.push({
            file: filePath,
            line: i + 1,
            pattern: pattern.name,
            severity: pattern.severity,
            description: pattern.description,
            match: redact(match[0]),
            context: line.trim().slice(0, 100) + (line.length > 100 ? '...' : '')
          });
          
          // Only report first match per line per pattern
          break;
        }
      }
    }
  } catch (err) {
    // Skip files that can't be read (binary, permissions, etc)
    if (err.code !== 'ENOENT' && err.code !== 'EISDIR') {
      // Silently skip unreadable files
    }
  }
  
  return findings;
}

/**
 * Check if a match is likely a false positive
 */
function isFalsePositive(match, pattern, line, filePath) {
  const lowerLine = line.toLowerCase();
  const fileName = path.basename(filePath).toLowerCase();
  
  // Skip regex pattern definitions (common in security tools)
  if (/regex:|new RegExp|\/.*\/[gimsuy]*,?\s*$/.test(line)) {
    return true;
  }
  
  // Skip example/placeholder values
  if (/example|placeholder|your[_-]?|xxx|test|dummy|fake|sample/i.test(match)) {
    return true;
  }
  
  // Skip if in a comment explaining the pattern
  if (lowerLine.includes('# example') || lowerLine.includes('// example')) {
    return true;
  }
  
  // Email-specific false positives
  if (pattern.name === 'Email Address') {
    // Skip common example/test emails
    if (/example\.com|test\.com|localhost|@example|@test/i.test(match)) {
      return true;
    }
    // Skip npm package scopes that look like emails
    if (/@[a-z]+\//.test(line)) {
      return true;
    }
  }
  
  // Skip IP addresses that are localhost or documentation ranges
  if (pattern.name === 'IP Address') {
    if (/^(127\.|0\.|192\.168\.|10\.|172\.(1[6-9]|2|3[01])\.|255\.)/i.test(match)) {
      return true;
    }
  }
  
  // Skip phone patterns in version numbers
  if (pattern.name === 'Phone Number') {
    if (/version|v\d|\d+\.\d+\.\d+/i.test(line)) {
      return true;
    }
  }
  
  // Skip lock files and generated files
  if (/lock\.json|lock\.yaml|\.min\./i.test(fileName)) {
    return true;
  }
  
  return false;
}

/**
 * Get all files to scan
 * @param {string} targetPath - Directory or file to scan
 * @param {Object} options
 * @returns {Promise<string[]>}
 */
export async function getFiles(targetPath, options = {}) {
  const { extensions = defaultExtensions, ignore = [] } = options;
  
  // Build glob pattern
  const extPattern = extensions.length > 1 
    ? `**/*{${extensions.join(',')}}` 
    : `**/*${extensions[0]}`;
  
  // Also match files without extensions (like .env, Dockerfile, etc)
  const patterns = [
    path.join(targetPath, extPattern),
    path.join(targetPath, '**/.*'),  // dotfiles
    path.join(targetPath, '**/Dockerfile*'),
    path.join(targetPath, '**/docker-compose*'),
  ];
  
  const allIgnore = [...skipPatterns, ...ignore];
  
  const files = await glob(patterns, {
    ignore: allIgnore,
    nodir: true,
    absolute: true
  });
  
  return [...new Set(files)]; // dedupe
}

/**
 * Main scan function
 * @param {string} targetPath 
 * @param {Object} options
 * @returns {Promise<{findings: Finding[], stats: Object}>}
 */
export async function scan(targetPath, options = {}) {
  const files = await getFiles(targetPath, options);
  const allFindings = [];
  
  const stats = {
    filesScanned: 0,
    totalFindings: 0,
    high: 0,
    medium: 0,
    low: 0
  };
  
  for (const file of files) {
    const findings = await scanFile(file);
    allFindings.push(...findings);
    stats.filesScanned++;
    
    for (const f of findings) {
      stats.totalFindings++;
      stats[f.severity]++;
    }
    
    // Yield for progress updates
    if (options.onProgress) {
      options.onProgress(file, stats.filesScanned, files.length);
    }
  }
  
  return { findings: allFindings, stats };
}

export { patterns, skipPatterns, defaultExtensions };
