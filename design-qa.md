# Design QA

## Evidence

- Source visual truth, live hero before refinement: `/workspace/scratch/01-live-hero.png`
- Source visual truth, live research chapter before refinement: `/workspace/scratch/02-live-research.png`
- Browser-rendered implementation, refined hero: `/workspace/scratch/07-local-hero-refined.png`
- Browser-rendered implementation, refined research title: `/workspace/scratch/05-local-research.png`
- Browser-rendered implementation, reasoning sequence: `/workspace/scratch/08-local-sequence.png`
- Browser-rendered implementation, dark mode: `/workspace/scratch/12-local-dark.png`
- Browser-rendered implementation, unified footer: `/workspace/scratch/13-local-footer-refined.png`
- Full-view comparison evidence: `/workspace/scratch/qa-comparison-home.jpg` and `/workspace/scratch/qa-comparison-research.jpg`
- Source and implementation captures: 1363 × 936 pixels.
- CSS viewport: 1363 × 936; device density: 1×. Source and implementation captures were matched without density scaling.
- State: desktop, automatic daytime/light theme. Dark-mode behavior was captured separately.

## Findings

- No remaining P0, P1, or P2 findings.
- Fonts and typography: one native system sans family now carries navigation, display, body, and data labels, with a restrained editorial serif used only for the key word “evidence” and one result emphasis. The refined hero fixes the original five-line wrap and maintains readable body copy.
- Spacing and layout rhythm: the portrait, homepage copy, SciTaRC title, reasoning sequence, afterword, and footer use the same 1200 px grid, border weight, and vertical rhythm. The duplicate research navigation and isolated black chapter were removed.
- Colors and visual tokens: the page uses one warm-ivory/graphite/muted-blue system. Dark mode maps the same semantic tokens to warm near-black and soft blue rather than introducing a different visual world. Footer, research, cards, filters, and dialogs all inherit these tokens.
- Image quality and asset fidelity: the hero uses the supplied original portrait with a stable desktop crop. The unreferenced abstract research graphic was removed from the visible experience; no placeholder, CSS drawing, inline SVG, or generated research imagery remains.
- Copy and content: homepage language is more direct and specific. SciTaRC remains accurately described as accepted at COLM 2026, and the three-stage explanation preserves the benchmark’s comprehension/planning/execution logic.
- Focused-region evidence: the reasoning sequence and footer were inspected independently because their text and dividers are too small to judge in the full-height comparison. Both preserve the same type, line, and color tokens as the hero.

## Comparison History

1. Source audit:
   - [P1] The light portrait hero, pure-black SciTaRC chapter, light afterword, and black footer read as separate sites.
   - [P1] A second sticky research navigation competed with the global navigation.
   - [P2] Cards, timeline panels, footer, and gallery used different radii, shadows, colors, and spacing rules.
   - [P2] Hero, section reveals, black-stage clip, hover lifts, and pointer parallax created several unrelated motion vocabularies.
2. First implementation pass:
   - Unified the palette, removed the second navigation, replaced the black research chapter with a continuous editorial case study, and reduced motion to entrance rhythm plus scroll-linked image/title movement.
   - [P2] The first browser capture wrapped the hero headline into five lines, leaving “with” isolated.
   - [P2] The local preview footer still contained the previous hard-coded footer copy.
3. Fixes:
   - Reduced the desktop headline scale and rebalanced the copy column to produce a deliberate four-line composition.
   - Updated and restarted the local preview shell so the footer matches production source.
4. Post-fix evidence:
   - Side-by-side captures show one continuous palette and a stable left-copy/right-portrait composition.
   - The research comparison shows the title retained as the visual anchor without changing the site’s color world.
   - The focused sequence capture shows consistent dividers, baseline alignment, and staged reveal behavior.

## Browser Verification

- Primary interactions tested: hero-to-research anchor, smooth back-to-top completion, automatic/light/dark/automatic theme cycle, scroll-linked hero movement, scroll-linked SciTaRC title movement, and staged content reveals.
- Theme state returned to automatic daytime/light after the interaction test.
- Console checked: no warnings or errors from `terminal.local`. Browser-extension metadata errors were excluded as unrelated to the site.
- Responsive behavior is defined at 980 px, 760 px, and 520 px, with a single-column mobile hero, readable research rows, simplified grids, and `prefers-reduced-motion` fallbacks.

## Follow-up Polish

- P3: the cloud browser did not expose a resizable viewport in this run, so the mobile breakpoints were checked from source and compiled CSS rather than a separate mobile screenshot.

final result: passed
