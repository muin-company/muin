#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { scan, patterns as allPatterns } from '../lib/scanner.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get version from package.json
const pkg = JSON.parse(
  await readFile(path.join(__dirname, '..', 'package.json'), 'utf-8')
);

// Severity colors
const severityColors = {
  high: chalk.red.bold,
  medium: chalk.yellow.bold,
  low: chalk.blue
};

const severityIcons = {
  high: '🚨',
  medium: '⚠️',
  low: 'ℹ️'
};

program
  .name('ai-audit')
  .description('Scan codebases for sensitive data before sharing with AI')
  .version(pkg.version)
  .argument('[path]', 'Path to scan', '.')
  .option('-v, --verbose', 'Show all findings including low severity')
  .option('-j, --json', 'Output as JSON')
  .option('-q, --quiet', 'Only output summary')
  .option('--no-color', 'Disable colors')
  .option('--severity <level>', 'Minimum severity to report (low, medium, high)', 'low')
  .option('--ignore <patterns>', 'Additional glob patterns to ignore (comma-separated)')
  .option('--list-patterns', 'List all detection patterns')
  .action(async (targetPath, options) => {
    // List patterns mode
    if (options.listPatterns) {
      console.log(chalk.bold('\n📋 Detection Patterns\n'));
      for (const p of allPatterns) {
        const color = severityColors[p.severity];
        console.log(`${severityIcons[p.severity]} ${color(p.name)}`);
        console.log(`   ${chalk.gray(p.description)}`);
        console.log(`   Severity: ${color(p.severity)}\n`);
      }
      process.exit(0);
    }

    const resolvedPath = path.resolve(targetPath);
    
    // Header
    if (!options.json && !options.quiet) {
      console.log('\n' + chalk.cyan.bold('🔍 ai-audit') + chalk.gray(` v${pkg.version}`));
      console.log(chalk.gray(`   Scanning: ${resolvedPath}\n`));
    }

    const spinner = ora({
      text: 'Scanning files...',
      isEnabled: !options.json && !options.quiet
    }).start();

    const ignorePatterns = options.ignore 
      ? options.ignore.split(',').map(p => p.trim())
      : [];

    const severityLevels = { low: 0, medium: 1, high: 2 };
    const minSeverity = severityLevels[options.severity] || 0;

    try {
      const { findings, stats } = await scan(resolvedPath, {
        ignore: ignorePatterns,
        onProgress: (file, current, total) => {
          spinner.text = `Scanning files... ${current}/${total}`;
        }
      });

      spinner.stop();

      // Filter by severity
      const filtered = findings.filter(f => 
        severityLevels[f.severity] >= minSeverity
      );

      // JSON output
      if (options.json) {
        console.log(JSON.stringify({ findings: filtered, stats }, null, 2));
        process.exit(filtered.some(f => f.severity === 'high') ? 1 : 0);
      }

      // Group findings by file
      const byFile = {};
      for (const f of filtered) {
        if (!byFile[f.file]) byFile[f.file] = [];
        byFile[f.file].push(f);
      }

      // Print findings
      if (!options.quiet && filtered.length > 0) {
        console.log(chalk.bold('\n📋 Findings\n'));
        
        for (const [file, fileFindings] of Object.entries(byFile)) {
          const relPath = path.relative(resolvedPath, file);
          console.log(chalk.white.bold(`  ${relPath}`));
          
          for (const f of fileFindings) {
            const color = severityColors[f.severity];
            const icon = severityIcons[f.severity];
            
            console.log(`    ${icon} ${color(f.pattern)} ${chalk.gray(`(line ${f.line})`)}`);
            
            if (options.verbose) {
              console.log(chalk.gray(`       Match: ${f.match}`));
              console.log(chalk.gray(`       Context: ${f.context}`));
            }
          }
          console.log();
        }
      }

      // Summary
      console.log(chalk.bold('─'.repeat(50)));
      console.log(chalk.bold('\n📊 Summary\n'));
      console.log(`   Files scanned: ${chalk.cyan(stats.filesScanned)}`);
      console.log(`   Total issues:  ${stats.totalFindings > 0 ? chalk.red.bold(stats.totalFindings) : chalk.green('0')}`);
      
      if (stats.totalFindings > 0) {
        console.log();
        if (stats.high > 0) console.log(`   ${severityIcons.high} High:   ${severityColors.high(stats.high)}`);
        if (stats.medium > 0) console.log(`   ${severityIcons.medium} Medium: ${severityColors.medium(stats.medium)}`);
        if (stats.low > 0 && minSeverity === 0) console.log(`   ${severityIcons.low} Low:    ${severityColors.low(stats.low)}`);
      }

      // Final verdict
      console.log();
      if (stats.high > 0) {
        console.log(chalk.red.bold('❌ FAIL: High severity issues found!\n'));
        console.log(chalk.yellow('   ⚠️  Do NOT share this code with AI tools until resolved.\n'));
        process.exit(1);
      } else if (stats.medium > 0) {
        console.log(chalk.yellow.bold('⚠️  WARNING: Medium severity issues found.\n'));
        console.log(chalk.gray('   Review before sharing with AI tools.\n'));
        process.exit(0);
      } else if (stats.low > 0) {
        console.log(chalk.blue('ℹ️  INFO: Minor issues found (PII, IPs, etc.)\n'));
        process.exit(0);
      } else {
        console.log(chalk.green.bold('✅ PASS: No sensitive data detected!\n'));
        console.log(chalk.gray('   Safe to share with AI tools.\n'));
        process.exit(0);
      }

    } catch (err) {
      spinner.fail('Scan failed');
      console.error(chalk.red(`\nError: ${err.message}\n`));
      process.exit(2);
    }
  });

program.parse();
