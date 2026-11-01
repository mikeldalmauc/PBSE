// md2html.js — versión en JavaScript de md2html.py, sin necesidad de Python.
// Se lanza con _herramientas/exportar.ps1, que usa el Node que trae VS Code y Edge para los PDF.
// Genera, por cada guía, el HTML para Moodle (estilos en línea, imágenes en base64) y una variante
// para imprimir a PDF (con <details> abiertos, enlaces a .pdf y reglas de impresión).
'use strict';
const fs = require('fs');
const path = require('path');
const VENDOR = path.join(__dirname, 'vendor');
const MarkdownIt = require(path.join(VENDOR, 'markdown-it.min.js'));
global.hljs = require(path.join(VENDOR, 'highlight.min.js'));
require(path.join(VENDOR, 'powershell.min.js'));
require(path.join(VENDOR, 'dos.min.js'));
const hljs = global.hljs;

const FUENTE = "'Segoe UI',-apple-system,Roboto,Helvetica,Arial,sans-serif";
const MONO = "Consolas,'Cascadia Mono','SF Mono',Menlo,monospace";
const TINTA = '#1c1e21', SUAVE = '#5b6168', LINEA = '#e2e5e9', PAPEL = '#f6f7f9', ACENTO = '#7a3e1d';

const CUADROS = {
  nota:       ['#1d4ed8', '#eff6ff', 'ℹ️', 'Nota'],
  consejo:    ['#1c6b4a', '#eff7f2', '💡', 'Consejo'],
  importante: ['#b45309', '#fff7ed', '❗', 'Importante'],
  aviso:      ['#b3261e', '#fdf1f0', '⚠️', 'Aviso'],
  analogia:   ['#6b3fa0', '#f5f0fb', '🧩', 'Analogía'],
  ampliacion: ['#0e7490', '#ecfeff', '🚀', 'Ampliación'],
  ejemplo:    ['#7a3e1d', '#fbf3ec', '✏️', 'Ejemplo'],
  antes:      ['#475569', '#f1f5f9', '🧭', 'Antes de empezar'],
};
const GITHUB = { NOTE: 'nota', NOTA: 'nota', TIP: 'consejo', CONSEJO: 'consejo', IMPORTANT: 'importante',
  IMPORTANTE: 'importante', WARNING: 'aviso', CAUTION: 'aviso', AVISO: 'aviso', ANALOGIA: 'analogia',
  'ANALOGÍA': 'analogia', AMPLIACION: 'ampliacion', 'AMPLIACIÓN': 'ampliacion', EJEMPLO: 'ejemplo', ANTES: 'antes' };
const PALABRAS = [
  [/^antes de empezar|^requisitos/, 'antes'],
  [/^analog/, 'analogia'],
  [/^(aviso|cuidado|atencion|peligro|ojo|error|no |nunca|sin |kali|cambiar el puerto no|ftp esta obsoleto)/, 'aviso'],
  [/^(importante|recuerda|clave|detalle clave|la regla de oro|conclusion|mayuscula|esto es|el orden importa|instalar ≠|la particion efi|todo es un fichero|en linux casi todo)/, 'importante'],
  [/^(consejo|truco|regla|tip|atajo|instantanea|para practicar|buena costumbre|el tabulador|empieza siempre|comprueba|como sacar|como pasar)|es un truco|es el que quieres|lo mas rentable|para practicar/, 'consejo'],
  [/^(ampliacion|para saber mas|extra|reto|si vas rapido|actividad opcional)/, 'ampliacion'],
  [/^ejemplo/, 'ejemplo'],
];
const COLORES_TIPO = { 'Explicación': '#1d4ed8', 'Chuleta': '#1c6b4a', 'Ejercicios': '#b45309', 'Guía': '#6b3fa0', 'Tarea': '#0e7490', 'Repaso': '#b3261e' };
const HL = { // colores tipo monokai, como el pygments del exportador original
  keyword: '#f92672', 'selector-tag': '#f92672', literal: '#ae81ff', built_in: '#66d9ef', type: '#66d9ef',
  string: '#e6db74', regexp: '#e6db74', number: '#ae81ff', symbol: '#ae81ff', bullet: '#ae81ff',
  comment: '#8f8a75', quote: '#8f8a75', meta: '#8f8a75', title: '#a6e22e', section: '#a6e22e', name: '#f92672',
  attr: '#a6e22e', attribute: '#a6e22e', params: '#fd971f', variable: '#fd971f', 'template-variable': '#fd971f',
  subst: '#e6e9ee', property: '#66d9ef', operator: '#f92672', punctuation: '#e6e9ee',
};
const LENGUAJES = { sh: 'bash', shell: 'bash', zsh: 'bash', ps1: 'powershell', cmd: 'dos', batch: 'dos', jsonc: 'json' };
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const sinTildes = s => s.normalize('NFD').replace(/\p{M}/gu, '');
const slug = t => t.trim().toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, '').replace(/ /g, '-');
const cp = s => Array.from(s).length;                       // longitud en caracteres, como Python
const findCp = (s, sub) => { const i = s.indexOf(sub); return i < 0 ? -1 : cp(s.slice(0, i)); };
const unquote = s => { try { return decodeURIComponent(s); } catch { return s; } };
const addStyle = (tok, s) => { const v = tok.attrGet('style'); tok.attrSet('style', v ? v + ';' + s : s); };

function frontMatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!m) return [{}, text];
  const meta = {};
  for (const l of m[1].split('\n')) {
    const i = l.indexOf(':');
    if (i >= 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^"+|"+$/g, '');
  }
  return [meta, text.slice(m[0].length)];
}

function nombreExport(rutaMd, ext) {
  const tema = path.basename(path.dirname(path.normalize(rutaMd)));
  const base = path.basename(rutaMd, path.extname(rutaMd));
  return (/^\d\d-/.test(tema) ? `${tema}-${base}` : base) + ext;
}

function inlineText(inl, conIconos = true) {
  let t = '';
  for (const c of inl.children || []) {
    if (c.type === 'text' || c.type === 'code_inline') t += c.content;
    else if (c.type === 'softbreak' || c.type === 'hardbreak') t += '\n';
  }
  return t;
}

function primerStrong(inl) {
  const ch = inl.children || [];
  const i = ch.findIndex(c => c.type === 'strong_open');
  if (i < 0) return null;
  let t = '';
  for (let j = i + 1; j < ch.length && ch[j].type !== 'strong_close'; j++) {
    if (ch[j].type === 'text' || ch[j].type === 'code_inline') t += ch[j].content;
  }
  return { tok: ch[i], texto: t };
}

function tipoCuadro(tokens, i) {
  // i = blockquote_open. Sólo cuenta un párrafo hijo directo, como bq.find('p', recursive=False)
  if (!(tokens[i + 1] && tokens[i + 1].type === 'paragraph_open')) return ['nota', null, null];
  const inl = tokens[i + 2];
  const txt = inlineText(inl).replace(/^\s+/, '');
  const m = /^\[!(\w+)\]/u.exec(txt);
  if (m && GITHUB[m[1].toUpperCase()]) return [GITHUB[m[1].toUpperCase()], m[0], inl];
  if (txt.startsWith('⚠')) return ['aviso', null, inl];
  if (txt.startsWith('💡')) return ['consejo', null, inl];
  const st = primerStrong(inl);
  const etiqueta = st && findCp(txt, st.texto) <= 3 && findCp(txt, st.texto) >= 0 ? st.texto : '';
  const e = sinTildes(etiqueta.toLowerCase());
  for (const [rx, t] of PALABRAS) if (rx.test(e)) return [t, null, inl];
  return ['nota', null, inl];
}

function convertir(rutaMd, avisos, modo) {
  // modo: 'moodle' (HTML para Moodle) o 'pdf' (variante para imprimir)
  const texto = fs.readFileSync(rutaMd, 'utf8').replace(/\r\n/g, '\n');
  const [meta, cuerpo] = frontMatter(texto);
  const baseDir = path.dirname(path.resolve(rutaMd));
  const md = new MarkdownIt('commonmark', { html: true }).enable(['table', 'strikethrough']);
  const tokens = md.parse(cuerpo, {});

  // 1. encabezados con id estilo GitHub
  const vistos = {};
  let h1 = null;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type !== 'heading_open' || !/^h[1-4]$/.test(t.tag)) continue;
    const s = slug(inlineText(tokens[i + 1]));
    const n = vistos[s] || 0; vistos[s] = n + 1;
    t.attrSet('id', n === 0 ? s : `${s}-${n}`);
    if (t.tag === 'h2') addStyle(t, `font-size:1.45em;line-height:1.25;margin:2.2em 0 .7em;padding-bottom:.3em;border-bottom:2px solid ${LINEA};color:${TINTA}`);
    if (t.tag === 'h3') addStyle(t, `font-size:1.15em;line-height:1.3;margin:1.8em 0 .6em;color:${TINTA}`);
    if (t.tag === 'h4') addStyle(t, `font-size:1em;margin:1.5em 0 .5em;color:${ACENTO}`);
    if (t.tag === 'h1' && !h1) h1 = { i, id: t.attrGet('id'), titulo: inlineText(tokens[i + 1]) };
  }

  // 2. índice en caja gris
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'heading_open' && t.tag === 'h2' && t.attrGet('id') === 'índice') {
      const ul = tokens[i + 3];
      if (ul && ul.type === 'bullet_list_open') {
        addStyle(ul, `background:${PAPEL};border:1px solid ${LINEA};border-radius:8px;padding:14px 18px 14px 34px;font-size:.93em`);
        let nivel = 0;
        for (let j = i + 3; j < tokens.length; j++) {
          if (tokens[j].type === 'bullet_list_open') { if (nivel > 0) addStyle(tokens[j], 'padding-left:18px'); nivel++; }
          if (tokens[j].type === 'bullet_list_close') { nivel--; if (nivel === 0) break; }
        }
      }
    }
  }

  // 3. cuadros de colores
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'blockquote_open') continue;
    const [tipo, marca, inl] = tipoCuadro(tokens, i);
    const [color, fondo, icono, titulo] = CUADROS[tipo];
    tokens[i].meta = { color, fondo, cabecera: null };
    if (marca && inl) {
      for (const c of inl.children) {
        if (c.type === 'text' && c.content.includes(marca)) { c.content = c.content.replace(marca, '').replace(/^\s+/, ''); break; }
      }
      // quita el salto de línea que queda tras «[!TIP]»
      while (inl.children.length && (inl.children[0].type === 'softbreak' || (inl.children[0].type === 'text' && inl.children[0].content === ''))) inl.children.shift();
      tokens[i].meta.cabecera = `<p style="margin:.2em 0 .4em;font-weight:700;color:${color}">${icono} ${esc(titulo)}</p>`;
    } else if (inl) {
      const txt = inlineText(inl).replace(/^\s+/, '');
      if (!/^[⚠💡❗ℹ🧩🚀✏🧭]/u.test(txt)) {
        const nt = new (tokens[i].constructor)('text', '', 0); nt.content = icono + ' ';
        inl.children.unshift(nt);
      }
      const st = primerStrong(inl);
      if (st) { const pos = findCp(inlineText(inl), st.texto); if (pos >= 0 && pos <= 4) addStyle(st.tok, `color:${color}`); }
    }
    // márgenes de todos los párrafos del cuadro
    let nivel = 0;
    for (let j = i; j < tokens.length; j++) {
      if (tokens[j].type === 'blockquote_open') nivel++;
      if (tokens[j].type === 'blockquote_close') { nivel--; if (nivel === 0) break; }
      if (tokens[j].type === 'paragraph_open' && !tokens[j].hidden) addStyle(tokens[j], 'margin:.45em 0');
    }
  }

  // 4. casillas de tareas y recorrido de tokens en línea (enlaces, imágenes, código)
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'list_item_open') {
      let k = i + 1;
      if (tokens[k] && tokens[k].type === 'paragraph_open') k++;
      const inl = tokens[k];
      if (inl && inl.type === 'inline' && inl.children.length && inl.children[0].type === 'text') {
        const m = /^\[( |x|X)\]\s/.exec(inl.children[0].content);
        if (m) {
          inl.children[0].content = (m[1].toLowerCase() === 'x' ? '☑ ' : '☐ ') + inl.children[0].content.slice(m[0].length);
          addStyle(t, 'list-style:none;margin-left:-1.2em');
        }
      }
    }
    if (t.type !== 'inline') continue;
    for (const c of t.children) {
      if (c.type === 'link_open') {
        let h = c.attrGet('href') || '';
        if (h.startsWith('#')) h = '#' + unquote(h.slice(1));
        else if (/^(https?:|mailto:)/.test(h)) { c.attrSet('target', '_blank'); c.attrSet('rel', 'noopener'); }
        else {
          const k = h.indexOf('#');
          const f = k >= 0 ? h.slice(0, k) : h, anc = k >= 0 ? h.slice(k + 1) : '';
          if (f.endsWith('.md')) h = nombreExport(path.join(baseDir, unquote(f)), modo === 'pdf' ? '.pdf' : '.html') + (anc ? '#' + unquote(anc) : '');
        }
        c.attrSet('href', h);
        addStyle(c, `color:${ACENTO};text-decoration:none;border-bottom:1px solid rgba(122,62,29,.3)`);
      }
      if (c.type === 'image') {
        const src = unquote(c.attrGet('src') || '');
        if (!src.startsWith('data:') && !/^https?:/.test(src)) {
          const ruta = path.join(baseDir, src);
          if (fs.existsSync(ruta)) {
            const mime = MIME[path.extname(ruta).toLowerCase()] || 'image/png';
            c.attrSet('src', `data:${mime};base64,` + fs.readFileSync(ruta).toString('base64'));
          } else avisos.push(`${rutaMd}: imagen no encontrada ${src}`);
        }
        addStyle(c, `max-width:100%;height:auto;display:block;margin:1.3em auto;border:1px solid ${LINEA};border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.07)`);
      }
      if (c.type === 'code_inline') addStyle(c, `font-family:${MONO};font-variant-ligatures:none;font-size:.88em;background:#f3f4f6;border:1px solid ${LINEA};border-radius:4px;padding:.1em .35em`);
    }
  }

  // 5. tablas con filas alternas y otros bloques
  let fila = -1;
  for (const t of tokens) {
    if (t.type === 'table_open') { addStyle(t, 'border-collapse:collapse;width:100%;font-size:.93em'); fila = -1; }
    if (t.type === 'tr_open') fila++;
    if (t.type === 'th_open') addStyle(t, `border:1px solid ${LINEA};padding:7px 10px;text-align:left;vertical-align:top;background:${PAPEL};font-weight:600`);
    if (t.type === 'td_open') addStyle(t, `border:1px solid ${LINEA};padding:7px 10px;text-align:left;vertical-align:top` + (fila % 2 === 0 ? ';background:#fbfbfc' : ''));
    if (t.type === 'hr') addStyle(t, `border:0;border-top:1px solid ${LINEA};margin:2.4em 0`);
    if (t.type === 'html_block' || t.type === 'html_inline') {
      t.content = t.content.replace(/<summary>/g, `<summary style="cursor:pointer;font-weight:600;color:${ACENTO}">`);
      if (modo === 'pdf') t.content = t.content.replace(/<details>/g, '<details open>');
    }
  }

  // 6. render con las reglas propias
  const r = md.renderer.rules;
  const def = (name) => r[name] || ((tk, idx, opt, env, slf) => slf.renderToken(tk, idx, opt));
  const imgDef = r.image;
  r.blockquote_open = (tk, idx) => `<div style="margin:1.3em 0;padding:12px 18px;border-left:5px solid ${tk[idx].meta.color};background:${tk[idx].meta.fondo};border-radius:0 8px 8px 0">\n` + (tk[idx].meta.cabecera || '');
  r.blockquote_close = () => '</div>\n';
  const tableOpen = def('table_open'), tableClose = def('table_close');
  r.table_open = (tk, idx, opt, env, slf) => '<div style="overflow-x:auto;margin:1.2em 0">' + tableOpen(tk, idx, opt, env, slf);
  r.table_close = (tk, idx, opt, env, slf) => tableClose(tk, idx, opt, env, slf) + '</div>\n';
  r.image = (tk, idx, opt, env, slf) => imgDef(tk, idx, opt, env, slf);
  r.fence = (tk, idx) => {
    const t = tk[idx];
    const lang = (t.info || '').trim().split(/\s+/)[0];
    let cuerpoCodigo = esc(t.content);
    const lx = LENGUAJES[lang] || lang;
    if (lang && !['text', 'txt', 'plain', 'markdown', 'md'].includes(lang) && hljs.getLanguage(lx)) {
      cuerpoCodigo = hljs.highlight(t.content, { language: lx, ignoreIllegals: true }).value
        .replace(/<span class="hljs-([\w-]+)[^"]*">/g, (m, k) => `<span style="color:${HL[k] || '#e6e9ee'}">`);
    }
    const cls = lang ? ` class="language-${esc(lang)}"` : '';
    return `<pre style="background:#1e2227;color:#e6e9ee;border-radius:8px;padding:14px 16px;overflow-x:auto;font-family:${MONO};font-variant-ligatures:none;font-size:.86em;line-height:1.5;white-space:pre-wrap;word-break:break-word"><code${cls} style="font-family:${MONO};font-variant-ligatures:none;background:none;color:inherit">${cuerpoCodigo}</code></pre>\n`;
  };

  // 7. portada en lugar del h1
  const titulo = h1 ? h1.titulo : path.basename(rutaMd);
  const tipo = meta.tipo || '';
  const chips = [];
  for (const [k, etq] of [['tipo', 'Tipo'], ['nivel', 'Nivel'], ['tema', 'Tema'], ['competencias', 'CM'], ['duracion', 'Duración'], ['herramientas', 'Herramientas'], ['caracter', 'Carácter']]) {
    const v = meta[k];
    if (v && v !== '—' && v !== '-') {
      const fondo = k === 'tipo' ? (COLORES_TIPO[v] || '') : '';
      const st = fondo ? `background:${fondo};color:#fff;border:1px solid ${fondo}` : `background:${PAPEL};color:${SUAVE};border:1px solid ${LINEA}`;
      chips.push(`<span style="display:inline-block;${st};border-radius:999px;padding:3px 11px;font-size:.8em;margin:0 6px 6px 0"><b>${etq}</b> ${esc(v)}</span>`);
    }
  }
  const portada = `<div style="border-bottom:3px solid ${ACENTO};padding:28px 0 18px;margin-bottom:10px">` +
    `<p style="font-size:.78em;letter-spacing:.09em;text-transform:uppercase;color:${ACENTO};font-weight:700;margin:0 0 8px">` +
    `${esc(meta.modulo || 'Sistemas Operativos Monopuesto (SMR 1.º)')}</p>` +
    `<h1 id="${h1 ? h1.id : ''}" style="font-size:2em;line-height:1.2;margin:0 0 14px;color:${TINTA}">${esc(titulo)}</h1>` +
    `<div>${chips.join('')}</div></div>\n`;
  let html;
  if (h1) {
    html = md.renderer.render(tokens.slice(0, h1.i), md.options, {}) + portada + md.renderer.render(tokens.slice(h1.i + 3), md.options, {});
  } else {
    html = portada + md.renderer.render(tokens, md.options, {});
  }

  const contenido = `<div style="max-width:900px;margin:0 auto;background:#fff;padding:8px clamp(16px,5vw,56px) 48px;` +
    `font-family:${FUENTE};font-size:16px;line-height:1.65;color:${TINTA}">${html}` +
    `<p style="margin-top:48px;padding-top:14px;border-top:1px solid ${LINEA};font-size:.8em;color:${SUAVE}">` +
    `${esc(meta.modulo || '')} · ${esc(tipo)}</p></div>`;
  return [titulo, contenido];
}

const IMPRESION = `<style>
@page { size: A4; margin: 14mm 13mm 16mm; }
html, body { background: #fff !important; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body > div { max-width: none !important; padding: 0 !important; font-size: 14.5px !important; }
pre { font-size: .8em !important; }
div[style*="overflow-x:auto"] { overflow: visible !important; }
pre, img, details, div[style*="border-left:5px"], tr { break-inside: avoid; }
h1, h2, h3, h4 { break-after: avoid; }
td code, th code { white-space: normal; word-break: normal; overflow-wrap: break-word; }
</style>\n`;

function documento(titulo, contenido, modo) {
  return '<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    `<title>${esc(titulo)}</title>\n` + (modo === 'pdf' ? IMPRESION : '') + '</head>\n' +
    `<body style="margin:0;background:${PAPEL}">\n${contenido}\n</body>\n</html>\n`;
}

function main() {
  const [raiz, salidaHtml, salidaPdfHtml] = process.argv.slice(2).map(p => path.resolve(p));
  const avisos = [];
  fs.mkdirSync(salidaHtml, { recursive: true });
  fs.mkdirSync(salidaPdfHtml, { recursive: true });
  const ficheros = [];
  (function recorre(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (!/^[_.]/.test(e.name)) recorre(p); }
      else if (/^\d\d-/.test(path.basename(d)) && /^\d-.*\.md$/.test(e.name)) ficheros.push(p);
    }
  })(raiz);
  for (const f of ficheros) {
    for (const [modo, dest, ext] of [['moodle', salidaHtml, '.html'], ['pdf', salidaPdfHtml, '.html']]) {
      const [t, c] = convertir(f, modo === 'moodle' ? avisos : [], modo);
      fs.writeFileSync(path.join(dest, nombreExport(f, ext)), documento(t, c, modo), 'utf8');
    }
    console.log('OK ' + nombreExport(f, ''));
  }
  console.log(`${ficheros.length} guías convertidas`);
  for (const a of avisos) console.log('AVISO: ' + a);
}
main();
