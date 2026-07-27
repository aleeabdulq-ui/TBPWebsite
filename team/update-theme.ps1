$teamDir = 'c:\Users\aliab\Desktop\WEBSITES\TBPwebsite\team'
$alreadyDone = @('victor.html', 'yewamde.html', 'amadi.html')
$files = Get-ChildItem $teamDir -Filter '*.html' | Where-Object {$_.Length -gt 1000 -and $alreadyDone -notcontains $_.Name}

function Update-TeamFile {
    param($filePath)
    
    $content = Get-Content $filePath -Raw
    
    # Pattern 1: Add dark mode CSS after :root
    if ($content -match '(\s+:root\s*\{[^}]+\})') {
        $darkModeCSS = @"

    [data-theme="dark"] {
      --glass-white: rgba(30, 30, 30, 0.6);
      --glass-white-strong: rgba(25, 25, 25, 0.85);
      --glass-background: rgba(40, 40, 40, 0.4);
      --glass-border: rgba(255, 255, 255, 0.1);
      --glass-shadow: rgba(0, 0, 0, 0.3);

      --primary-bg: #0F0F0F;
      --secondary-bg: #1A1A1A;
      --accent-color: #4DA6FF;
      --accent-hover: #66B3FF;
      --text-primary: #FFFFFF;
      --text-secondary: #E0E0E0;
      --text-tertiary: #A0A0A0;
      --border-color: rgba(255, 255, 255, 0.1);
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
    }
"@
        $content = $content -replace '(\s+:root\s*\{[^}]+\})', "`$1$darkModeCSS"
    }
    
    # Pattern 2: Add transition to body and dark mode body styling
    if ($content -match 'overflow-x: hidden;') {
        $content = $content -replace '(overflow-x: hidden;)', "`$1`n      transition: background-color var(--transition-base), background-image var(--transition-base);"
    }
    
    # Pattern 3: Add dark mode body before Glassmorphism
    if ($content -match '/\* Glassmorphism') {
        $darkBody = @"

    [data-theme="dark"] body {
      background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%);
      background-attachment: fixed;
    }
"@
        $content = $content -replace '(\s+/\* Glassmorphism)', "$darkBody`n    `$1"
    }
    
    # Pattern 4: Add background-color to header
    if ($content -match 'header\s*\{[^}]*box-shadow:') {
        $content = $content -replace '(box-shadow: var\(--shadow-sm\);)', "`$1`n      background-color: var(--primary-bg);"
    }
    
    # Pattern 5: Add theme-sync script before closing body
    if ($content -match '</script>\s*</body>' -and $content -notmatch 'theme-sync.js') {
        $content = $content -replace '(  </script>\s*</body>\s*</html>)', "
  <!-- Include theme synchronization script -->
  <script src=""../js/theme-sync.js"" defer></script>
  </body>
</html>"
    }
    
    Set-Content $filePath $content
}

foreach ($file in $files) {
    $path = $file.FullName
    Update-TeamFile $path
    Write-Host "✓ Updated $($file.Name)"
}

Write-Host "`nCompleted updating $($files.Count) files"
