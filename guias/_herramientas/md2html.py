#!/usr/bin/env python3
"""md2html — convierte las guías Markdown en HTML autocontenido para Moodle.

  * Todo el estilo va EN LÍNEA (style="..."): Moodle limpia los <style> al pegar en una Página.
  * Las imágenes se incrustan en base64: un único fichero, sin carpeta de capturas.
  * Las citas (>) se convierten en cuadros de colores según su etiqueta (ver LEEME.md).

Uso:
  python3 md2html.py guia.md [-o salida.html]
  python3 md2html.py --todo CARPETA_GUIAS      # genera CARPETA_GUIAS/_moodle/*.html
Requisitos: pip install markdown-it-py beautifulsoup4 pygments
"""
import base64, html, mimetypes, os, re, sys, unicodedata
from urllib.parse import unquote
from markdown_it import MarkdownIt
from bs4 import BeautifulSoup, NavigableString
try:
    from pygments import highlight
    from pygments.lexers import get_lexer_by_name
    from pygments.formatters import HtmlFormatter
except ImportError:
    highlight = None

FUENTE = "'Segoe UI',-apple-system,Roboto,Helvetica,Arial,sans-serif"
MONO = "'Cascadia Code',Consolas,'SF Mono',Menlo,monospace"
TINTA, SUAVE, LINEA, PAPEL, ACENTO = '#1c1e21', '#5b6168', '#e2e5e9', '#f6f7f9', '#7a3e1d'

# tipo: (color del borde y del título, fondo, icono, título por defecto)
CUADROS = {
    'nota':       ('#1d4ed8', '#eff6ff', 'ℹ️', 'Nota'),
    'consejo':    ('#1c6b4a', '#eff7f2', '💡', 'Consejo'),
    'importante': ('#b45309', '#fff7ed', '❗', 'Importante'),
    'aviso':      ('#b3261e', '#fdf1f0', '⚠️', 'Aviso'),
    'analogia':   ('#6b3fa0', '#f5f0fb', '🧩', 'Analogía'),
    'ampliacion': ('#0e7490', '#ecfeff', '🚀', 'Ampliación'),
    'ejemplo':    ('#7a3e1d', '#fbf3ec', '✏️', 'Ejemplo'),
    'antes':      ('#475569', '#f1f5f9', '🧭', 'Antes de empezar'),
}
GITHUB = {'NOTE': 'nota', 'NOTA': 'nota', 'TIP': 'consejo', 'CONSEJO': 'consejo',
          'IMPORTANT': 'importante', 'IMPORTANTE': 'importante', 'WARNING': 'aviso',
          'CAUTION': 'aviso', 'AVISO': 'aviso', 'ANALOGIA': 'analogia', 'ANALOGÍA': 'analogia',
          'AMPLIACION': 'ampliacion', 'AMPLIACIÓN': 'ampliacion', 'EJEMPLO': 'ejemplo', 'ANTES': 'antes'}
PALABRAS = [  # (regex sobre la etiqueta en minúsculas y sin tildes, tipo) — gana la primera
    (r'^antes de empezar|^requisitos', 'antes'),
    (r'^analog', 'analogia'),
    (r'^(aviso|cuidado|atencion|peligro|ojo|error|no |nunca|sin |kali|cambiar el puerto no|ftp esta obsoleto)', 'aviso'),
    (r'^(importante|recuerda|clave|detalle clave|la regla de oro|conclusion|mayuscula|esto es|el orden importa|instalar ≠|la particion efi|todo es un fichero|en linux casi todo)', 'importante'),
    (r'^(consejo|truco|regla|tip|atajo|instantanea|para practicar|buena costumbre|el tabulador|empieza siempre|comprueba|como sacar|como pasar)|es un truco|es el que quieres|lo mas rentable|para practicar', 'consejo'),
    (r'^(ampliacion|para saber mas|extra|reto|si vas rapido|actividad opcional)', 'ampliacion'),
    (r'^ejemplo', 'ejemplo'),
]

def sin_tildes(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

def slug(txt):
    txt = txt.strip().lower()
    txt = re.sub(r'[^\w\s-]', '', txt, flags=re.UNICODE)
    return txt.replace(' ', '-')

def front_matter(text):
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m: return {}, text
    meta = {}
    for l in m.group(1).split('\n'):
        if ':' in l:
            k, v = l.split(':', 1); meta[k.strip()] = v.strip().strip('"')
    return meta, text[m.end():]

def nombre_export(ruta_md):
    """.../1-basico/03-procesos/2-chuleta.md → 03-procesos-2-chuleta.html"""
    ruta_md = os.path.normpath(ruta_md)
    tema = os.path.basename(os.path.dirname(ruta_md))
    base = os.path.splitext(os.path.basename(ruta_md))[0]
    if re.match(r'^\d\d-', tema): return f'{tema}-{base}.html'
    return base + '.html'

def estilo(tag, s):
    tag['style'] = (tag.get('style', '') + ';' + s).strip(';')

def tipo_cuadro(bq):
    """Devuelve (tipo, etiqueta_github_a_quitar)."""
    p = bq.find(['p'], recursive=False)
    if not p: return 'nota', None
    txt = p.get_text().lstrip()
    m = re.match(r'^\[!(\w+)\]', txt)
    if m and m.group(1).upper() in GITHUB: return GITHUB[m.group(1).upper()], m.group(0)
    if txt.startswith('⚠'): return 'aviso', None
    if txt.startswith('💡'): return 'consejo', None
    strong = p.find('strong')
    etiqueta = strong.get_text() if strong and txt.find(strong.get_text()) <= 3 else ''
    e = sin_tildes(etiqueta.lower())
    for rx, t in PALABRAS:
        if re.search(rx, e): return t, None
    return 'nota', None

def convertir(ruta_md, avisos):
    texto = open(ruta_md, encoding='utf-8').read().replace('\r\n', '\n')
    meta, cuerpo = front_matter(texto)
    md = MarkdownIt('commonmark', {'html': True}).enable(['table', 'strikethrough'])
    soup = BeautifulSoup(md.render(cuerpo), 'html.parser')
    base_dir = os.path.dirname(os.path.abspath(ruta_md))

    # encabezados con id estilo GitHub
    vistos = {}
    for h in soup.find_all(['h1', 'h2', 'h3', 'h4']):
        s = slug(h.get_text()); n = vistos.get(s, 0); vistos[s] = n + 1
        h['id'] = s if n == 0 else f'{s}-{n}'
    for h in soup.find_all('h2'):
        estilo(h, f'font-size:1.45em;line-height:1.25;margin:2.2em 0 .7em;padding-bottom:.3em;border-bottom:2px solid {LINEA};color:{TINTA}')
    for h in soup.find_all('h3'):
        estilo(h, f'font-size:1.15em;line-height:1.3;margin:1.8em 0 .6em;color:{TINTA}')
    for h in soup.find_all('h4'):
        estilo(h, f'font-size:1em;margin:1.5em 0 .5em;color:{ACENTO}')

    # índice en caja gris
    ind = soup.find('h2', id='índice')
    if ind:
        ul = ind.find_next_sibling()
        if ul and ul.name == 'ul':
            estilo(ul, f'background:{PAPEL};border:1px solid {LINEA};border-radius:8px;padding:14px 18px 14px 34px;font-size:.93em')
            for sub in ul.find_all('ul'): estilo(sub, 'padding-left:18px')

    # cuadros de colores
    for bq in soup.find_all('blockquote'):
        t, marca = tipo_cuadro(bq)
        color, fondo, icono, titulo = CUADROS[t]
        div = soup.new_tag('div')
        estilo(div, f'margin:1.3em 0;padding:12px 18px;border-left:5px solid {color};background:{fondo};border-radius:0 8px 8px 0')
        for c in list(bq.contents): div.append(c.extract())
        p = div.find('p')
        if marca and p:
            for s in p.find_all(string=True):
                if marca in s: s.replace_with(s.replace(marca, '', 1).lstrip()); break
            cab = soup.new_tag('p'); estilo(cab, f'margin:.2em 0 .4em;font-weight:700;color:{color}')
            cab.string = f'{icono} {titulo}'
            p.insert_before(cab)
        elif p:
            txt = p.get_text().lstrip()
            if not txt[:2].strip() or not re.match(r'^[⚠💡❗ℹ🧩🚀✏🧭]', txt):
                p.insert(0, NavigableString(icono + ' '))
            st = p.find('strong')
            if st and p.get_text().find(st.get_text()) <= 4: estilo(st, f'color:{color}')
        for q in div.find_all('p'): estilo(q, 'margin:.45em 0')
        bq.replace_with(div)

    # casillas de tareas
    for li in soup.find_all('li'):
        primero = li.contents[0] if li.contents else None
        if primero is not None and primero.name == 'p': primero = primero.contents[0] if primero.contents else None
        if isinstance(primero, NavigableString):
            m = re.match(r'^\[( |x|X)\]\s', primero)
            if m:
                primero.replace_with(('☑ ' if m.group(1).lower() == 'x' else '☐ ') + primero[m.end():])
                estilo(li, 'list-style:none;margin-left:-1.2em')

    # enlaces
    for a in soup.find_all('a', href=True):
        h = a['href']
        if h.startswith('#'):
            a['href'] = '#' + unquote(h[1:])
        elif re.match(r'^(https?:|mailto:)', h):
            a['target'] = '_blank'; a['rel'] = 'noopener'
        else:
            f, _, anc = h.partition('#')
            if f.endswith('.md'):
                a['href'] = nombre_export(os.path.join(base_dir, unquote(f))) + ('#' + unquote(anc) if anc else '')
        estilo(a, f'color:{ACENTO};text-decoration:none;border-bottom:1px solid rgba(122,62,29,.3)')

    # imágenes en base64
    for img in soup.find_all('img'):
        src = unquote(img.get('src', ''))
        if src.startswith('data:') or re.match(r'^https?:', src): pass
        else:
            ruta = os.path.join(base_dir, src)
            if os.path.exists(ruta):
                mime = mimetypes.guess_type(ruta)[0] or 'image/png'
                img['src'] = f'data:{mime};base64,' + base64.b64encode(open(ruta, 'rb').read()).decode()
            else:
                avisos.append(f'{ruta_md}: imagen no encontrada {src}')
        estilo(img, f'max-width:100%;height:auto;display:block;margin:1.3em auto;border:1px solid {LINEA};border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.07)')

    # código
    for pre in soup.find_all('pre'):
        code = pre.find('code')
        lang = ''
        if code and code.get('class'):
            lang = code['class'][0].replace('language-', '')
        estilo(pre, f'background:#1e2227;color:#e6e9ee;border-radius:8px;padding:14px 16px;overflow-x:auto;font-family:{MONO};font-size:.86em;line-height:1.5;white-space:pre-wrap;word-break:break-word')
        if highlight and code and lang and lang not in ('text', 'txt', 'plain', 'markdown', 'md'):
            try:
                lx = get_lexer_by_name({'sh': 'bash', 'shell': 'bash', 'zsh': 'bash', 'ps1': 'powershell', 'cmd': 'batch'}.get(lang, lang))
                fm = HtmlFormatter(nowrap=True, noclasses=True, style='monokai')
                nuevo = BeautifulSoup(highlight(code.get_text(), lx, fm), 'html.parser')
                code.clear(); code.append(nuevo)
                for sp in code.find_all('span'):
                    sp['style'] = re.sub(r'background-color:\s*#[0-9a-fA-F]+;?', '', sp.get('style', ''))
            except Exception:
                pass
        if code: estilo(code, f'font-family:{MONO};background:none;color:inherit')
    for code in soup.find_all('code'):
        if code.parent.name != 'pre':
            estilo(code, f'font-family:{MONO};font-size:.88em;background:#f3f4f6;border:1px solid {LINEA};border-radius:4px;padding:.1em .35em')

    # tablas
    for tb in soup.find_all('table'):
        estilo(tb, 'border-collapse:collapse;width:100%;font-size:.93em')
        for th in tb.find_all('th'): estilo(th, f'border:1px solid {LINEA};padding:7px 10px;text-align:left;vertical-align:top;background:{PAPEL};font-weight:600')
        for i, tr in enumerate(tb.find_all('tr')):
            for td in tr.find_all('td'):
                estilo(td, f'border:1px solid {LINEA};padding:7px 10px;text-align:left;vertical-align:top' + (';background:#fbfbfc' if i % 2 == 0 else ''))
        env = soup.new_tag('div'); estilo(env, 'overflow-x:auto;margin:1.2em 0')
        tb.wrap(env)
    for hr in soup.find_all('hr'): estilo(hr, f'border:0;border-top:1px solid {LINEA};margin:2.4em 0')

    # portada
    h1 = soup.find('h1')
    titulo = h1.get_text() if h1 else os.path.basename(ruta_md)
    colores_tipo = {'Explicación': '#1d4ed8', 'Chuleta': '#1c6b4a', 'Ejercicios': '#b45309',
                    'Guía': '#6b3fa0', 'Tarea': '#0e7490'}
    tipo = meta.get('tipo', '')
    chips = []
    for k, etq in (('tipo', 'Tipo'), ('nivel', 'Nivel'), ('tema', 'Tema'), ('competencias', 'CM'), ('duracion', 'Duración'), ('herramientas', 'Herramientas'), ('caracter', 'Carácter')):
        v = meta.get(k)
        if v and v not in ('—', '-'):
            fondo = colores_tipo.get(v, '') if k == 'tipo' else ''
            st = (f'background:{fondo};color:#fff;border:1px solid {fondo}' if fondo else f'background:{PAPEL};color:{SUAVE};border:1px solid {LINEA}')
            chips.append(f'<span style="display:inline-block;{st};border-radius:999px;padding:3px 11px;font-size:.8em;margin:0 6px 6px 0"><b>{etq}</b> {html.escape(v)}</span>')
    portada = BeautifulSoup(
        f'<div style="border-bottom:3px solid {ACENTO};padding:28px 0 18px;margin-bottom:10px">'
        f'<p style="font-size:.78em;letter-spacing:.09em;text-transform:uppercase;color:{ACENTO};font-weight:700;margin:0 0 8px">'
        f'{html.escape(meta.get("modulo", "Sistemas Operativos Monopuesto (SMR 1.º)"))}</p>'
        f'<h1 id="{h1["id"] if h1 else ""}" style="font-size:2em;line-height:1.2;margin:0 0 14px;color:{TINTA}">{html.escape(titulo)}</h1>'
        f'<div>{"".join(chips)}</div></div>', 'html.parser')
    if h1: h1.replace_with(portada)
    else: soup.insert(0, portada)

    contenido = (f'<div style="max-width:900px;margin:0 auto;background:#fff;padding:8px clamp(16px,5vw,56px) 48px;'
                 f'font-family:{FUENTE};font-size:16px;line-height:1.65;color:{TINTA}">{soup}'
                 f'<p style="margin-top:48px;padding-top:14px;border-top:1px solid {LINEA};font-size:.8em;color:{SUAVE}">'
                 f'{html.escape(meta.get("modulo", ""))} · {html.escape(tipo)}</p></div>')
    return titulo, contenido

def documento(titulo, contenido):
    return ('<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            f'<title>{html.escape(titulo)}</title>\n</head>\n'
            f'<body style="margin:0;background:{PAPEL}">\n{contenido}\n</body>\n</html>\n')

def main():
    args = sys.argv[1:]
    avisos = []
    if args and args[0] == '--todo':
        raiz = os.path.abspath(args[1] if len(args) > 1 else '.')
        dest = os.path.join(raiz, '_moodle'); os.makedirs(dest, exist_ok=True)
        n = 0
        for d, subdirs, fs in os.walk(raiz):
            subdirs[:] = sorted(s for s in subdirs if not s.startswith(('_', '.')))
            if not re.match(r'^\d\d-', os.path.basename(d)): continue
            for f in sorted(fs):
                if re.match(r'^\d-.*\.md$', f):
                    ruta = os.path.join(d, f)
                    t, c = convertir(ruta, avisos)
                    open(os.path.join(dest, nombre_export(ruta)), 'w', encoding='utf-8').write(documento(t, c))
                    n += 1
        print(f'{n} páginas en {dest}')
    elif args:
        ruta = args[0]
        salida = args[args.index('-o') + 1] if '-o' in args else os.path.splitext(ruta)[0] + '.html'
        t, c = convertir(ruta, avisos)
        open(salida, 'w', encoding='utf-8').write(documento(t, c))
        print(salida)
    else:
        print(__doc__); return
    for a in avisos: print('AVISO:', a)

if __name__ == '__main__':
    main()
