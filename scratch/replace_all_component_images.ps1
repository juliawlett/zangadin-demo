$compDir = 'c:\Users\julia.lima\Documents\julia\vendas-landpages\demo\zangadin-demo\src\components'

# 1. Update Gallery.astro
$galleryFile = Join-Path $compDir "Gallery.astro"
if (Test-Path $galleryFile) {
    $content = [System.IO.File]::ReadAllText($galleryFile)
    # Replace base64 strings in order with img_2, img_3, img_4, img_5, img_6
    $regex = [System.Text.RegularExpressions.Regex]::new('data:image/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+')
    $imgIndex = 2
    $evaluator = [System.Text.RegularExpressions.MatchEvaluator]{
        param($match)
        $script:ret = "/images/img_$script:imgIndex.jpg"
        $script:imgIndex++
        return $script:ret
    }
    $newContent = $regex.Replace($content, $evaluator)
    [System.IO.File]::WriteAllText($galleryFile, $newContent)
    Write-Host "Updated Gallery.astro with static image paths."
}

# 2. Update Experience.astro if it contains any base64
$expFile = Join-Path $compDir "Experience.astro"
if (Test-Path $expFile) {
    $content = [System.IO.File]::ReadAllText($expFile)
    $regex = [System.Text.RegularExpressions.Regex]::new('data:image/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+')
    $newContent = $regex.Replace($content, "/images/img_1.jpg")
    [System.IO.File]::WriteAllText($expFile, $newContent)
    Write-Host "Updated Experience.astro if base64 existed."
}

# 3. Update Footer.astro if it contains any base64
$footerFile = Join-Path $compDir "Footer.astro"
if (Test-Path $footerFile) {
    $content = [System.IO.File]::ReadAllText($footerFile)
    $regex = [System.Text.RegularExpressions.Regex]::new('data:image/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+')
    $newContent = $regex.Replace($content, "/images/img_7.png")
    [System.IO.File]::WriteAllText($footerFile, $newContent)
    Write-Host "Updated Footer.astro if base64 existed."
}
