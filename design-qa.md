# Design QA — TBP Windows 11 Homepage

## Design direction

- Windows 11-inspired Mica navigation, cool white surfaces, restrained teal and gold brand accents, soft elevation, and rounded media frames.
- Architectural project imagery is the primary content and visual focus.
- Source imagery: `C:\Users\aliab\Pictures\webpix`.

## Image behavior

- Hero: five wide project images use `object-fit: cover` and fill the entire hero media stage.
- Slideshow timing: 3.5 seconds between changes.
- Slideshow transitions: fade, wipe, zoom, slide, and focus/blur rotate across slides.
- Project marquee: all 22 supplied project images appear in a continuous right-moving gallery immediately below the hero.
- Marquee media uses `object-fit: contain` so the full project image remains visible.
- Marquee duration is 150 seconds for slow motion; hover or keyboard focus pauses it.
- Selected-project and cinematic media frames continue to use `object-fit: contain`.

## Navigation and responsive behavior

- Header and footer include Home, About, Services, Projects, Team, Reviews, Blog, Careers, and Contact.
- Desktop uses the full Mica navigation shell.
- Mobile uses the same links in a full-screen menu with Escape-to-close support.
- No horizontal overflow at 390 × 844.

## Fidelity ledger

| Area | Concept target | Rendered result | Status |
| --- | --- | --- | --- |
| Navigation | Floating Windows 11 Mica shell | Matching translucent shell, elevation, teal/gold active state | Pass |
| Hero | Dominant architectural image | Full-stage project image with restrained Mica copy surface | Pass |
| Gallery | Image-led project presentation | All 22 supplied projects in a slow continuous rail | Pass |
| Typography | Segoe/Inter-like clear hierarchy | Inter with Windows-compatible fallbacks and matched scale | Pass |
| Palette | True white, cool gray, deep teal, small gold accents | Matching code-native design tokens | Pass |
| Practice/footer | Open split statement and deep-teal footer | Matching split surface and compact footer using real TBP contact details | Pass |
| Mobile | Clear collapse with image priority | Compact header, readable hero, full-width imagery, no overflow | Pass |

## Intentional deviations

- A compact Mica copy surface was added over the hero because the original project image has trees and a streetlight behind the text area; this preserves legibility without tinting the full image.
- The footer uses TBP’s real Lagos address and email instead of the placeholder contact details shown in the generated concept.
- The requested all-project moving gallery was added after concept generation and treated as a user-approved extension.

## Validation

- HTTP 200 for the homepage and all referenced local assets.
- `git diff --check` passed.
- `node --check js/landing-editorial.js` passed.
- Playwright Chromium desktop screenshot: 1536 × 1024.
- Playwright Chromium mobile screenshot: 390 × 844.
- Playwright interaction test passed: slideshow timing/class change, 44 marquee cards after seamless duplication, 22 loaded source gallery images, hero `cover`, gallery `contain`, mobile menu, Escape close, console health, and overflow.
- Browser/IAB was attempted first but unavailable because its runtime did not receive the required sandbox context; Playwright Chromium was used as the fallback.

Final result: passed.
