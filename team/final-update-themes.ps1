# Update theme for all team member files
$teamDir = 'c:\Users\aliab\Desktop\WEBSITES\TBPwebsite\team'
$alreadyDone = @('victor.html', 'yewamde.html', 'amadi.html')
$files = Get-ChildItem $teamDir -Filter '*.html' | Where-Object {$_.Length -gt 1000 -and $alreadyDone -notcontains $_.Name}

$darkModeCSS = '
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
    }'

$darkBody = '
    [data-theme="dark"] body {
      background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%);
      background-attachment: fixed;
    }'

$themeScript = '  <!-- Include theme synchronization script -->
  <script src="../js/theme-sync.js" defer></script>'

foreach ($file in $files) {
    $path = $file.FullName
    $content = Get-Content $path -Raw
    
    # Add dark mode CSS 
    $content = $content.Replace("    }\n\n    *", "    }$darkModeCSS`n    *")
    
    # Add transition to body
    $content = $content.Replace("overflow-x: hidden;", "overflow-x: hidden;`n      transition: background-color var(--transition-base), background-image var(--transition-base);")
    
    # Add dark body
    $content = $content.Replace("`n    /* Glassmorphism", "$darkBody`n    /* Glassmorphism")
    
    # Add background-color to header
    $content = $content.Replace("box-shadow: var(--shadow-sm);", "box-shadow: var(--shadow-sm);`n      background-color: var(--primary-bg);")
    
    # Add theme-sync script (only if not already there)
    if ($content -notmatch 'theme-sync.js') {
        $content = $content.Replace("  </script>`n</body>", "  </script>`n`n$themeScript`n</body>")
    }
    
    Set-Content $path $content
    Write-Host "✓ $($file.Name)"
}

Write-Host "`n✓ Completed updating $($files.Count) team member pages"
