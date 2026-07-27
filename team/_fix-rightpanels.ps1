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

$profileRightBlock = @'

    /* RIGHT SIDE - SCROLLABLE CONTENT */
    .profile-right {
      padding: var(--spacing-xl);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-lg);
      overflow-y: auto;
      max-height: calc(100vh - var(--header-height) - var(--spacing-lg) * 2);
      animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      display: flex;
      flex-direction: column;
    }
'@

foreach ($file in $files) {
  if (!(Test-Path $file)) {
    Write-Host "Missing: $file"
    continue
  }

  $text = Get-Content $file -Raw

  # If a main profile-right block is missing (only responsive overrides exist), insert it.
  if ($text -notmatch '(?s)\.profile-right\s*\{\s*padding:\s*var\(--spacing-xl\)') {
    $text = [regex]::Replace(
      $text,
      '(?s)\.quick-contact-btn:active\s*\{.*?\}\s*',
      { param($m) $m.Value + $profileRightBlock },
      1
    )
    Set-Content -Path $file -Value $text
    Write-Host "Fixed: $file"
  } else {
    Write-Host "OK: $file"
  }
}
