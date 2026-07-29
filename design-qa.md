# Design QA — TBP Homepage Option 1

## Comparison target

- Source visual truth: `tmp/design-reference-option-1.png`
- Final desktop implementation: `tmp/implementation-desktop-full.png`
- Desktop first screen: `tmp/implementation-desktop-top.png`
- Final mobile implementation: `tmp/implementation-mobile-full.png`
- Mobile navigation state: `tmp/implementation-mobile-menu.png`
- Route/state: `http://localhost:8080/pages/index.html`, logged-out public homepage

## Capture normalization

- Source pixels: 864 × 1821, density 1x.
- Desktop viewport: 1440 × 1024 CSS px, device scale factor 1.
- Desktop full-page capture: 1425 × 3308 px; the 15 px width difference is the native vertical scrollbar gutter.
- Mobile viewport and capture width: 390 × 844 CSS px, device scale factor 1; full-page capture is 390 × 3772 px.
- The source and desktop implementation were opened together in one visual comparison input, top-aligned and evaluated proportionally. The implementation is intentionally not resampled because the reference is a concept board rather than a pixel-spec screenshot.

## Full-view comparison evidence

- Composition: full-bleed dusk hero, small white brand and navigation, lower-right pale project caption, centered studio name, three equal project columns, text-only practice section, and charcoal footer all match the selected concept's hierarchy.
- Fonts and typography: Manrope's light optical weight closely matches the reference's thin neo-grotesk. Navigation, metadata, letter spacing, and mixed micro/regular text hierarchy are consistent and remain legible.
- Spacing and layout rhythm: the desktop uses a 3-column grid, generous warm-white space, square imagery, hairline metadata dividers, and a compact text-led lower section. The implementation is slightly longer than the concept because it includes an explicit project index CTA and real footer links; this is acceptable P3 product detail.
- Colors and visual tokens: deep blue photography, warm-white paper, charcoal ink, fine gray rules, and the dark footer align with the source. No decorative gradients, card radii, or shadows were introduced.
- Image quality and asset fidelity: the hero uses a purpose-made wide Peace Tower asset grounded in the supplied TBP render. Project cards use TBP's real Peace Tower, Shamballa, and Welcome Centre imagery with sharp, deliberate crops. No placeholder, CSS-drawn, or third-party project imagery remains.
- Copy and content: labels are concise and TBP-specific. Navigation is limited to Projects, Practice, People, and Contact. The practice statement is intentionally short.

## Focused-region evidence

- Hero/header: `tmp/implementation-desktop-top.png` confirms the full building, negative sky, legible white navigation, and lower-right caption at 1440 × 1024.
- Mobile hero and flow: `tmp/implementation-mobile-full.png` confirms a complete first screen, stacked project cards, text-led practice section, and readable footer with no horizontal overflow.
- Mobile menu: `tmp/implementation-mobile-menu.png` confirms a clear open state with an accessible close control and four primary routes.

## Comparison history

### Iteration 1

- Earlier finding [P1]: the portrait Peace Tower source was forced into a landscape viewport, cropping the roof and base and making the building excessively large.
- Fix: created `images/generated/peace-tower-hero-wide.png` from the supplied TBP Peace Tower render, preserving the building while extending the surrounding Lagos dusk context.
- Post-fix evidence: `tmp/implementation-desktop-top.png` shows the complete building centered with appropriate negative space and the intended project caption.

### Iteration 2

- Earlier finding [P1]: the lower practice section contained a large split image and oversized statement that were not present in the selected visual target.
- Fix: removed the image, reduced the heading scale, and converted the section to a compact text-only block before the footer.
- Post-fix evidence: `tmp/implementation-desktop-full.png` now follows the source's quiet transition from project grid to practice note to footer.

### Iteration 3

- Earlier finding [P2]: the desktop page was materially taller than the source because the project CTA and footer used excessive vertical spacing.
- Fix: tightened the project-section bottom padding, CTA margin, footer padding, and footer-bottom margin.
- Post-fix evidence: final desktop height is 3308 px at 1425 px content width, with hierarchy and whitespace preserved.

## Functional verification

- Mobile menu opened by button and closed with Escape; `aria-expanded` changed from `true` to `false`.
- Sticky header entered its scrolled state after page movement.
- Projects, About/Practice, People, and Contact destination pages all returned HTTP 200.
- All four homepage images loaded with non-zero natural dimensions.
- Horizontal overflow: none at 1440 px or 390 px.
- Browser console errors: none.

## Findings

- No actionable P0, P1, or P2 issues remain.

## Follow-up polish

- [P3] The implementation includes “Selected Projects” and “All projects” labels that add useful navigation but make the page slightly more explicit than the concept.

## Implementation checklist

- [x] Match the selected project-first visual hierarchy.
- [x] Use TBP-owned project imagery.
- [x] Verify desktop and mobile layouts.
- [x] Test the mobile menu and primary destinations.
- [x] Check console errors and image loading.

final result: passed
