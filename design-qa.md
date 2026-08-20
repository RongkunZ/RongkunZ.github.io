# Design QA

## Evidence

- Source visual truth: `/workspace/scratch/ce862da56c40/generated_images/exec-b8146804-b90e-4966-ab2c-4007ad23e4ab.png`
- Browser-rendered implementation, light hero: `/workspace/scratch/rongkun-preview-home-final.jpg`
- Browser-rendered implementation, research chapter: `/workspace/scratch/rongkun-preview-research-final.jpg`
- Normalized side-by-side comparison: `/workspace/scratch/rongkun-design-comparison.jpg`
- Source pixels: 864 × 1821.
- Implementation captures: 1348 × 926 pixels each, stacked to 1348 × 1852.
- CSS viewport: 1363 × 936; device density: 1×. The source was scaled to 1852 px high and placed beside the stacked implementation captures for composition-level comparison.
- State: desktop, automatic daytime/light theme; second capture at `scrollY = 1024` with the black research chapter active.

## Findings

- No remaining P0, P1, or P2 differences.
- Typography: the implementation matches the reference's modern grotesk hierarchy, compact display tracking, serif italic emphasis, and large SciTaRC title. The production version uses the system's native San Francisco/Helvetica stack rather than loading a lookalike webfont, improving rendering quality and avoiding a generic template feel.
- Spacing and layout rhythm: the hero preserves the left editorial statement/right portrait relationship. The implementation intentionally gives SciTaRC its own screen before the table visual; this is a faithful Apple-like one-focus-per-screen interpretation rather than a density mismatch.
- Colors and tokens: ivory, neutral black, warm white, and restrained cobalt are consistent across both themes and all sections. The black research chapter remains the same authored visual object in daytime and nighttime themes.
- Image quality: the hero uses the supplied 3024 × 4032 original portrait, not a generated person. The SciTaRC table asset is a dedicated high-resolution raster with the selected mock's art direction; there are no placeholder drawings or CSS-generated research graphics.
- Copy and content: all visible claims are sourced from the existing portfolio content. SciTaRC's COLM 2026 status is reflected consistently. No invented metrics, awards, affiliations, or publication details were added.
- Focused region comparison: the hero and research chapter were inspected separately at full viewport size because the reference is a tall composite. The portrait crop, headline wrap, SciTaRC optical scale, local chapter navigation, and table-visual legibility were all readable at this scale.

## Comparison History

1. Initial browser pass:
   - [P1] Base navigation list items retained white backgrounds inside the black research state.
   - [P2] The research chapter navigation was hidden beneath the fixed global masthead.
   - [P2] The theme control behaved as a two-state override instead of the specified automatic/light/dark cycle.
2. Fixes:
   - Forced navigation list backgrounds to transparent and moved the theme control to the far edge of the full-width navigation row.
   - Positioned the sticky research navigation 64 px below the masthead.
   - Implemented the explicit `auto → light → dark → auto` cycle while keeping local-time selection as the default.
3. Post-fix evidence:
   - The research-state screenshot shows a continuous neutral-black masthead and visible local chapter navigation.
   - Browser interaction confirmed all three theme modes in order.
   - The primary hero anchor moved from `scrollY = 0` to the research target at `scrollY = 975`.

## Browser Verification

- Primary interactions tested: hero anchor navigation, sticky research chapter transition, automatic/light/dark theme cycle, navigation presence, scroll-linked progress and research state.
- Console checked: no errors from `terminal.local`; only unrelated browser-extension metadata errors were present.
- Responsive CSS includes dedicated 900 px and 680 px breakpoints, mobile image positioning, mobile headline scaling, reduced chapter navigation, and `prefers-reduced-motion` fallbacks.

## Follow-up Polish

- P3: a future iteration could add a bespoke mobile-only crop of the source portrait, but the current responsive crop preserves both the subject and mountain context.

final result: passed
