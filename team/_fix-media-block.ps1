$ErrorActionPreference = 'Stop'

$files = @(
  'TBPwebsite\team\quadri.html',
  'TBPwebsite\team\bode.html',
  'TBPwebsite\team\onyedikachi.html',
  'TBPwebsite\team\azeez.html',
  'TBPwebsite\team\ife.html',
  'TBPwebsite\team\ayelo.html',
  'TBPwebsite\team\amadi.html',
  'TBPwebsite\team\yewamde.html',
  'TBPwebsite\team\tahir.html',
  'TBPwebsite\team\shola.html',
  'TBPwebsite\team\ore.html',
  'TBPwebsite\team\victor.html',
  'TBPwebsite\team\ayanfe.html',
  'TBPwebsite\team\joshua.html',
  'TBPwebsite\team\uche.html',
  'TBPwebsite\team\brenda.html',
  'TBPwebsite\team\esther.html'
)

$mediaBlock = @'

    @media (max-width: 1024px) {
      .profile-container {
        grid-template-columns: 1fr;
        height: auto;
      }

      .profile-left {
        position: relative;
        top: 0;
        max-height: none;
        height: auto;
      }

      .profile-right {
        max-height: none;
        height: auto;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
'@

$pattern = '(?s)\}\s*\.profile-right\s*\{\s*height:\s*auto;\s*max-height:\s*none;\s*\}\s*\.stats-grid\s*\{\s*grid-template-columns:\s*repeat\(2,\s*1fr\);\s*\}\s*\}'

foreach ($file in $files) {
  if (!(Test-Path $file)) {
    Write-Host "Missing: $file"
    continue
  }

  $text = Get-Content $file -Raw
  $textNew = [regex]::Replace($text, $pattern, "}`r`n$mediaBlock")

  if ($textNew -ne $text) {
    Set-Content -Path $file -Value $textNew
    Write-Host "Fixed: $file"
  } else {
    Write-Host "No change: $file"
  }
}
