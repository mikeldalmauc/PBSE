# exportar.ps1 — genera las guías listas para Moodle, sin instalar nada:
#   _moodle\*.html      una página por guía, estilos en línea e imágenes incrustadas (base64)
#   _moodle\pdf\*.pdf   la misma guía en PDF (A4, respuestas de autocomprobación desplegadas)
#
# Uso, desde la carpeta «guias»:
#   powershell -ExecutionPolicy Bypass -File _herramientas\exportar.ps1              # todas
#   powershell -ExecutionPolicy Bypass -File _herramientas\exportar.ps1 -Solo "09-*" # sólo los PDF de un tema
#
# Necesita VS Code (usa su Node interno para md2html.js) y Microsoft Edge (imprime los PDF).
param([string]$Solo = '*')
$ErrorActionPreference = 'Stop'

$guias = Split-Path $PSScriptRoot -Parent
$code = @("$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe", "$env:ProgramFiles\Microsoft VS Code\Code.exe") |
    Where-Object { Test-Path $_ } | Select-Object -First 1
$edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
    Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $code) { throw 'No encuentro VS Code (Code.exe).' }
if (-not $edge) { throw 'No encuentro Microsoft Edge (msedge.exe).' }

$tmp = Join-Path $env:TEMP 'guias-exportar'
$pdfhtml = Join-Path $tmp 'pdfhtml'
$perfil = Join-Path $tmp 'edge-perfil'
$salidaPdf = Join-Path $guias '_moodle\pdf'
if (Test-Path $pdfhtml) { Remove-Item $pdfhtml -Recurse -Force }
New-Item -ItemType Directory -Force $pdfhtml, $perfil, $salidaPdf | Out-Null

# 1. Markdown → HTML (para Moodle y para imprimir)
$env:ELECTRON_RUN_AS_NODE = '1'
# Code.exe es una aplicación gráfica: sin la tubería, PowerShell no esperaría a que termine
& $code (Join-Path $PSScriptRoot 'md2html.js') $guias (Join-Path $guias '_moodle') $pdfhtml | ForEach-Object { $_ }
Remove-Item Env:ELECTRON_RUN_AS_NODE

# 2. HTML → PDF con Edge sin ventana
foreach ($h in Get-ChildItem (Join-Path $pdfhtml "$Solo.html")) {
    $pdf = Join-Path $salidaPdf ($h.BaseName + '.pdf')
    if (Test-Path $pdf) { Remove-Item $pdf -Force }
    $argumentos = @('--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--no-first-run',
        "--user-data-dir=`"$perfil`"", '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=8000', "--print-to-pdf=`"$pdf`"", "`"$(([Uri]$h.FullName).AbsoluteUri)`"")
    Start-Process -FilePath $edge -ArgumentList $argumentos -Wait -WindowStyle Hidden
    if (Test-Path $pdf) { 'PDF  ' + $h.BaseName } else { 'FALLO  ' + $h.BaseName }
}
"Listo: HTML en _moodle\  ·  PDF en _moodle\pdf\"
