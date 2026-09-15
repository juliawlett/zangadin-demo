$html = [System.IO.File]::ReadAllText('c:\Users\julia.lima\Documents\julia\vendas-landpages\demo\zangadin-demo\zangadin-demo.html');
$regex = [System.Text.RegularExpressions.Regex]::new('data:image/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)')
$found = $regex.Matches($html)
Write-Host "Total base64 images found: $($found.Count)"

$targetDir = 'c:\Users\julia.lima\Documents\julia\vendas-landpages\demo\zangadin-demo\public\images'
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

for ($i = 0; $i -lt $found.Count; $i++) {
    $ext = $found[$i].Groups[1].Value
    if ($ext -eq 'jpeg') { $ext = 'jpg' }
    $b64 = $found[$i].Groups[2].Value
    $bytes = [System.Convert]::FromBase64String($b64)
    $outPath = Join-Path $targetDir "img_$i.$ext"
    [System.IO.File]::WriteAllBytes($outPath, $bytes)
    Write-Host "Saved img_$i.$ext ($($bytes.Length) bytes)"
}
