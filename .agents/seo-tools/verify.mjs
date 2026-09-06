import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { parse } from 'yaml';
import { root, config, save } from './common.mjs';

const findings = [];
const expectedAgents = ['seo-orchestrator', 'technical-seo', 'local-seo', 'content-seo', 'performance-seo'];
const expectedSkills = ['seo-orchestration', 'technical-seo-audit', 'local-seo-quality', 'content-search-intent', 'performance-verification'];
const documentedTools = new Set(['view_file', 'list_dir', 'grep_search', 'search_web', 'read_url_content',
  'run_command', 'write_to_file', 'replace_file_content', 'multi_replace_file_content', 'invoke_subagent']);
for (const [folder, names, entry] of [['agents', expectedAgents, 'agent.md'], ['skills', expectedSkills, 'SKILL.md']]) {
  const present = await readdir(join(root, '.agents', folder));
  if (present.length !== names.length) findings.push(`Unexpected ${folder} count`);
  for (const name of names) {
    try {
      const text = await readFile(join(root, '.agents', folder, name, entry), 'utf8');
      const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)/);
      if (!match) throw new Error('Frontmatter/body missing');
      const data = parse(match[1], { uniqueKeys: true });
      if (data.name !== name || !/^[a-z0-9-]{1,63}$/.test(data.name) || typeof data.description !== 'string' || !data.description.trim()) throw new Error('Invalid identity');
      if (folder === 'agents') {
        if (data.subagent !== true || data.mainAgent !== (name === 'seo-orchestrator')) throw new Error('Invalid agent role');
        if (!['pro', 'inherit', 'flash'].includes(data.model) || data.commandExecutionPolicy !== 'sandbox') throw new Error('Invalid model/policy');
        if (!Array.isArray(data.tools) || data.tools.some(tool => !documentedTools.has(tool))) throw new Error('Unexpected tool');
        for (const skill of data.skills || []) await access(join(root, '.agents', skill, 'SKILL.md'));
      }
    } catch (error) { findings.push(`${folder}/${name}: ${error.message}`); }
  }
}
for (const name of ['SEO_PROJECT_CONTEXT.md', 'START_SEO_AUDIT.txt', 'INTEGRATION.md']) {
  try { await access(join(root, '.agents', name)); } catch { findings.push(`Missing ${name}`); }
}
for (const path of ['.agents/seo.local.json', '.agents/reports/test.json', '.agents/seo-tools/node_modules/test']) {
  try { execFileSync('git', ['check-ignore', '-q', path], { cwd: root, windowsHide: true }); }
  catch { findings.push(`Not ignored: ${path}`); }
}
const report = { generatedAt: new Date().toISOString(), site: config.site,
  agentCount: expectedAgents.length, skillCount: expectedSkills.length,
  structuralDiscovery: findings.length ? 'FAIL' : 'PASS', findings,
  installationObservation: { date: '2026-09-06', antigravityVersion: '2.12.2' },
  applicationDiscoveryUI: 'NOT_TESTED: open the exact project root in Antigravity and use /agents.',
  discoveryReference: 'https://antigravity.google/docs/subagents/',
  skillReference: 'https://antigravity.google/docs/skills/' };
console.log(await save('discovery.json', report));
console.log(JSON.stringify(report));
if (findings.length) process.exitCode = 1;
