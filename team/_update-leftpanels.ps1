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

$leftCss = @'
.profile-container {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: var(--spacing-lg);
      max-width: 1800px;
      margin: 0 auto;
      padding: var(--spacing-lg);
      min-height: calc(100vh - var(--header-height));
    }

    .profile-left {
      position: sticky;
      top: calc(var(--header-height) + var(--spacing-lg));
      height: fit-content;
      max-height: calc(100vh - var(--header-height) - var(--spacing-lg) * 2);
      padding: var(--spacing-lg);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-lg);
      transition: var(--transition-slow);
      overflow-y: auto;
      overflow-x: hidden;
    }

    .profile-left:hover {
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
    }

    .profile-left::-webkit-scrollbar {
      width: 6px;
    }

    .profile-left::-webkit-scrollbar-track {
      background: transparent;
    }

    .profile-left::-webkit-scrollbar-thumb {
      background: rgba(0, 122, 255, 0.2);
      border-radius: var(--radius-full);
    }

    .profile-left::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 122, 255, 0.3);
    }

    .profile-card {
      text-align: center;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .profile-image-wrapper {
      position: relative;
      width: 100%;
      max-width: 160px;
      margin: 0 auto var(--spacing-lg);
      aspect-ratio: 1;
    }

    .profile-image {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-2xl);
      overflow: hidden;
      position: relative;
      box-shadow: var(--shadow-lg);
      transition: var(--transition-slow);
    }

    .profile-image::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      opacity: 0;
      transition: var(--transition-base);
      z-index: 1;
    }

    .profile-image:hover::before {
      opacity: 1;
    }

    .profile-image:hover {
      transform: scale(1.02);
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .profile-image-fallback {
      display: none;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--accent-color), #764ba2);
      color: white;
      font-size: 3rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      border-radius: var(--radius-2xl);
    }

    .profile-image-ring {
      position: absolute;
      inset: -4px;
      border-radius: var(--radius-2xl);
      background: linear-gradient(135deg, var(--accent-color), #764ba2);
      opacity: 0;
      transition: var(--transition-base);
      z-index: -1;
    }

    .profile-image-wrapper:hover .profile-image-ring {
      opacity: 0.3;
      inset: -8px;
    }

    .profile-name {
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--spacing-xs);
      letter-spacing: -0.03em;
      line-height: 1.2;
    }

    .profile-title {
      font-size: 0.75rem;
      color: var(--accent-color);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-xs) var(--spacing-sm);
      background: rgba(0, 122, 255, 0.08);
      border-radius: var(--radius-full);
      display: inline-block;
    }

    .profile-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-color), transparent);
      margin: var(--spacing-md) 0;
    }

    .profile-quick-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-md);
      width: 100%;
    }

    .quick-stat {
      text-align: center;
      padding: var(--spacing-sm) var(--spacing-xs);
      border-radius: var(--radius-md);
      background: var(--glass-background);
      border: 1px solid var(--border-color);
      transition: var(--transition-base);
    }

    .quick-stat:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      background: var(--glass-white);
    }

    .quick-stat-number {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--accent-color);
      display: block;
      margin-bottom: 2px;
    }

    .quick-stat-label {
      font-size: 0.5625rem;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .profile-info-section {
      margin-bottom: var(--spacing-sm);
      text-align: left;
      width: 100%;
    }

    .profile-info-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--text-primary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--spacing-xs);
    }

    .profile-info-title i {
      color: var(--accent-color);
      font-size: 0.875rem;
    }

    .profile-info-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-xs);
      border-radius: var(--radius-sm);
      transition: var(--transition-base);
      text-align: left;
      margin-bottom: 2px;
      font-size: 0.75rem;
    }

    .profile-info-item:hover {
      background: var(--glass-background);
    }

    .profile-info-item i {
      color: var(--accent-color);
      font-size: 0.875rem;
      min-width: 16px;
    }

    .profile-info-item a,
    .profile-info-item span {
      color: var(--text-secondary);
      text-decoration: none;
      transition: var(--transition-fast);
      font-size: 0.75rem;
    }

    .profile-info-item a:hover {
      color: var(--accent-color);
    }

    .profile-quick-contact {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: center;
      flex-wrap: wrap;
      padding-top: var(--spacing-sm);
    }

    .quick-contact-btn {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-full);
      background: var(--glass-background);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-primary);
      font-size: 1rem;
      cursor: pointer;
      transition: var(--transition-bounce);
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }

    .quick-contact-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--accent-color);
      opacity: 0;
      transition: var(--transition-base);
    }

    .quick-contact-btn:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: var(--shadow-md);
      border-color: var(--accent-color);
    }

    .quick-contact-btn:hover::before {
      opacity: 0.1;
    }

    .quick-contact-btn i {
      position: relative;
      z-index: 1;
    }

    .quick-contact-btn:active {
      transform: scale(0.95);
    }
'@

foreach ($file in $files) {
  if (!(Test-Path $file)) {
    Write-Host "Missing: $file"
    continue
  }

  $text = Get-Content $file -Raw
  $text = $text -replace '(?s)\.profile-container\s*\{.*?\}\s*\.profile-right\s*\{', ($leftCss + "`n`n    .profile-right {")
  $text = $text -replace '<div\s+style="[^"]*display\s*:\s*none;[^"]*">\s*([^<]+)\s*</div>', '<div class="profile-image-fallback">$1</div>'
  Set-Content -Path $file -Value $text
  Write-Host "Updated: $file"
}
