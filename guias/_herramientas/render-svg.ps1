# render-svg.ps1 — convierte diagramas SVG en PNG con Edge sin ventana, para revisarlos.
#   powershell -ExecutionPolicy Bypass -File _herramientas\render-svg.ps1 ruta\images\*.svg
# Deja los PNG en %TEMP%\guias-render\<nombre>.png y comprueba que cada SVG es XML válido.
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Ficheros)
$edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
    Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw 'No encuentro Microsoft Edge (msedge.exe).' }
$salida = Join-Path $env:TEMP 'guias-render'
$perfil = Join-Path $salida 'edge-perfil'
New-Item -ItemType Directory -Force $salida, $perfil | Out-Null
foreach ($patron in $Ficheros) {
    foreach ($f in Get-ChildItem $patron) {
        try { $xml = [xml](Get-Content -Raw -Encoding UTF8 $f.FullName) }
        catch { "XML INVÁLIDO  $($f.Name): $($_.Exception.Message)"; continue }
        $w = [int]$xml.svg.width; $h = [int]$xml.svg.height
        $html = Join-Path $salida ($f.BaseName + '.html')
        $png = Join-Path $salida ($f.BaseName + '.png')
        "<!doctype html><html><body style='margin:0;background:#fff'><img src='$(([Uri]$f.FullName).AbsoluteUri)' width='$w' height='$h' style='display:block'></body></html>" |
            Set-Content -Encoding UTF8 $html
        $argumentos = @('--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--no-first-run',
            "--user-data-dir=`"$perfil`"", "--screenshot=`"$png`"", "--window-size=$w,$h", "`"$(([Uri]$html).AbsoluteUri)`"")
        Start-Process -FilePath $edge -ArgumentList $argumentos -Wait -WindowStyle Hidden
        if (Test-Path $png) { "OK  $($f.BaseName)  ($w x $h)  -> $png" } else { "SIN PNG  $($f.BaseName)" }
    }
}
