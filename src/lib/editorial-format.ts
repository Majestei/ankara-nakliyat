// A deliberately small format for our reviewed, local editorial copy.
// Escape source HTML; allow same-site paths and the official address-service sources.
export function editorialInline(text: string): string {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return escaped
        .replace(/\[([^\]\n]+)\]\(((?:\/(?!\/)|https:\/\/(?:www\.)?(?:nvi\.gov\.tr|turkiye\.gov\.tr)\/)[a-zA-Z0-9_/#?=&%.-]*)\)/g, '<a href="$2">$1</a>')
        .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
}

export function editorialHtml(content: string): string {
    return content.split(/\n\s*\n/).map(block => {
        const lines = block.trim().split('\n');
        const heading = lines[0].match(/^(#{2,3})\s+(.+)$/);
        if (heading) {
            const tag = heading[1].length === 2 ? 'h2' : 'h3';
            const title = `<${tag}>${editorialInline(heading[2])}</${tag}>`;
            return title + (lines.length > 1 ? editorialHtml(lines.slice(1).join('\n')) : '');
        }
        if (lines.every(line => /^-\s/.test(line))) {
            return `<ul>${lines.map(line => `<li>${editorialInline(line.replace(/^-\s+/, ''))}</li>`).join('')}</ul>`;
        }
        if (lines.every(line => /^\d+\.\s/.test(line))) {
            return `<ol>${lines.map(line => `<li>${editorialInline(line.replace(/^\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
        }
        return `<p>${editorialInline(lines.join(' '))}</p>`;
    }).join('\n');
}
