---
version: anydesign-1
name: The unfAIr Advantage
source: https://unfairadvantage.academy/
captured_at: 2026-10-31
description: |
  A near-black, editorial-luxury dark theme. Large light-weight serif headlines on warm charcoal, one champagne-gold accent used for CTAs, eyebrows and italic emphasis, and hairline white borders instead of heavy shadows. Reads as an exclusive fellowship, not a SaaS landing page.
colors:
  bg: "#121212"
  bg-2: "#171717"
  surface: "rgba(255,255,255,0.03)"
  surface-2: "rgba(255,255,255,0.05)"
  border: "rgba(255,255,255,0.08)"
  border-strong: "rgba(255,255,255,0.14)"
  text-primary: "#F0ECE4"
  text-muted: "#B8B4AD"
  text-faint: "#7E7B75"
  accent: "#C9AD6A"
  accent-bright: "#E9C979"
  accent-deep: "#A8874A"
  on-accent: "#1A1200"
  paper: "#F4F1E9"
  paper-2: "#ECE8DD"
  ink: "#0B0A08"
typography:
  display-hero: { fontFamily: "Instrument Serif, Georgia, serif", fontSize: 76.5px, fontWeight: 400, lineHeight: 1.08, letterSpacing: -0.01em }
  display-section: { fontFamily: "Instrument Serif, Georgia, serif", fontSize: 46.4px, fontWeight: 400, lineHeight: 1.15, letterSpacing: -0.005em }
  heading: { fontFamily: "Instrument Serif, Georgia, serif", fontSize: 38.4px, fontWeight: 400, lineHeight: 1.08, letterSpacing: -0.02em }
  subheading: { fontFamily: "Instrument Serif, Georgia, serif", fontSize: 25.6px, fontWeight: 400, lineHeight: 1.08, letterSpacing: -0.02em }
  body: { fontFamily: "Inter, system-ui, sans-serif", fontSize: 16px, fontWeight: 400, lineHeight: 1.6 }
  button: { fontFamily: "Inter, system-ui, sans-serif", fontSize: 15.7px, fontWeight: 600, lineHeight: 1.6 }
  eyebrow: { fontFamily: "Inter, system-ui, sans-serif", fontSize: 11.5px, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0.22em }
spacing:
  base: 4px
  scale: [8, 15, 18, 28, 30, 34, 36, 56, 90, 110, 120, 150]
rounded:
  card: 14px
  md: 16px
  default: 18px
  sm: 12px
  lg: 28px
  pill: 100px
shadows:
  float: "0 30px 80px -30px rgba(0,0,0,0.8)"
  glow-accent: "0 0 80px -20px rgba(201,173,106,0.45)"
  button-bevel: "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.25)"
gradients:
  accent-text: "linear-gradient(120deg, #F0D48A 0%, #C9AD6A 100%)"
  button-gold: "linear-gradient(#F1D68F 0%, #D9B665 48%, #B8923F 100%)"
  card-sheen: "linear-gradient(rgba(255,255,255,0.035), rgba(255,255,255,0.01))"
  hero-headline: "linear-gradient(90deg, #8D8D8D 0%, #FFFFFF 35%, #FFFFFF 65%, #8D8D8D 100%)"
layout:
  max-width: 1200px
  header-height: 75px
  section-padding-y: 110px
motion:
  ease: "cubic-bezier(0.22, 1, 0.36, 1)"
components:
  button-primary: { backgroundColor: "{gradients.button-gold}", textColor: "{colors.on-accent}", rounded: "{rounded.pill}", padding: 15px 28px }
  link-ghost: { textColor: "{colors.text-muted}", rounded: "0px", padding: 0 0 2px }
  card-program: { backgroundColor: "{gradients.card-sheen}", textColor: "{colors.text-primary}", rounded: "{rounded.card}", padding: 34px 30px 30px }
  dropdown: { backgroundColor: "rgba(22,22,22,0.97)", textColor: "{colors.text-primary}", rounded: "{rounded.md}", padding: 8px }
  header: { backgroundColor: "transparent", textColor: "{colors.text-primary}", rounded: "0px", padding: 0 }
---

# Design Analysis: The unfAIr Advantage

> Analysis generated with the `anydesign` skill. Date: 2026-10-31. Emphasis: design system (reconstruction secondary)

## Source

Live URL https://unfairadvantage.academy/ (home page only). Captured through the user's Chrome (the cloud sandbox could not reach the site): CSS custom properties from `:root`, computed styles from the live DOM, and two viewport screenshots. Limitations: desktop only (1366px), no mobile frames, no hover/focus states captured, inner pages not visited.

## TL;DR

A dark editorial theme where Instrument Serif at large size carries the voice and a single champagne-gold family does all the signalling. Everything else is warm off-white text on #121212 with 1px translucent borders. Rebuild it by holding the gold to CTAs, eyebrows and one italic word per headline.

## 1. Visual identity

### 1.1 Surface description

- **Personality:** exclusive, editorial, calm, confident, premium. ✅
- **Mood:** a members' club after dark; spotlit hero on near-black. ✅
- **Stylistic references:** luxury-brand sites and Apple-like dark product pages, with a serif display face. ⚠️
- **Information density:** low; hero padding 150px top, sections 110px. ✅
- **Implicit positioning:** selective fellowship for builders, not a course marketplace ("Apply Now", "top 1%"). ✅

### 1.2 Brand voice / Atmosphere

The design believes its audience wants to be chosen, not sold to. Restraint signals selectivity: one dark ground, one metal, one serif. Hairline borders and slow, soft glows suggest quality without noise, while the large, tightly set headlines make AI mastery feel like a craft rather than a tool category.

### 1.3 The "ONE brand thing"

- **The thing:** the champagne gold family (`{colors.accent}` #C9AD6A, `{colors.accent-bright}` #E9C979) paired with Instrument Serif italic emphasis ("*Builders*").
- **Why it carries the brand:** it is the only chroma on a monochrome warm-black page, so it reads as the signature.
- **Restraint:** all other text is off-white or grey; cards have no colored fills.
- **Where:** primary pill CTA, uppercase eyebrows, italic keyword in the H1, wordmark accent mark. Not on body text, cards or borders.

## 2. Design System (tokens)

### 2.1 Colors

| Token | Hex | Role | Where it appears | Confidence |
|---|---|---|---|---|
| `bg` | #121212 | Page background | body, every section | ✅ |
| `bg-2` | #171717 | Alternate band | secondary sections | ✅ |
| `surface` | rgba(255,255,255,0.03) | Card fill | program cards | ✅ |
| `surface-2` | rgba(255,255,255,0.05) | Raised fill | hover/raised | ⚠️ |
| `border` | rgba(255,255,255,0.08) | Default hairline | cards, dropdown | ✅ |
| `border-strong` | rgba(255,255,255,0.14) | Emphasis border | defined, usage not observed | ⚠️ |
| `text-primary` | #F0ECE4 | Headings, body | all copy | ✅ |
| `text-muted` | #B8B4AD | Secondary copy | descriptions | ✅ |
| `text-faint` | #7E7B75 | Tertiary | captions | ⚠️ |
| `accent` | #C9AD6A | Eyebrows, gold base | eyebrow labels | ✅ |
| `accent-bright` | #E9C979 | Italic emphasis | H1 italic word | ✅ |
| `accent-deep` | #A8874A | Gold shadow tone | gradient end | ⚠️ |
| `on-accent` | #1A1200 | Text on gold | button label | ✅ |
| `paper` | #F4F1E9 | Light-band ground | defined in vars, not seen on home | ❓ |

The site also defines legacy aliases (`--violet`, `--cyan`, `--magenta`, `--lime`) that all resolve to gold shades; treat them as one family, not separate hues. ✅ Navy `#3A2F14` and `ink`/`paper` tokens exist for light sections that were not observed.

### 2.2 Typography

Display: **Instrument Serif** ✅ (Georgia fallback). Body/UI: **Inter** ✅ (system-ui fallback). Bungee is loaded but unused on the home page; the wordmark in the header uses a serif, a small brand "Space Grotesk" class appears on the wordmark element only. ⚠️

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display-hero` | 76.5px | 400 | 82.6px | H1, white-to-grey horizontal gradient text |
| `display-section` | 46.4px | 400 | 53.4px | H2 |
| `heading` | 38.4px | 400 | 41.5px | H3 |
| `subheading` | 25.6px | 400 | 27.6px | H4 (audience labels) |
| `body` | 16px | 400 | 25.6px | paragraphs |
| `button` | 15.7px | 600 | 25.1px | CTAs |
| `eyebrow` | 11.5px | 400 | 18.4px | uppercase label |

Notable: serif headings stay at weight 400 with negative tracking (-0.01em to -0.02em); eyebrows are uppercase with +0.22em tracking.

### 2.3 Spacing

Base 4px ⚠️. Observed: button padding 15/28 and 18/36, card padding 34/30/30, section padding 110px (hero 150 top / 120 bottom, others 56 to 120), header 75px. Section rhythm is generous and mostly 110px. Consistency: medium; several values are not multiples of 4.

### 2.4 Radii

Tiered ✅: pill `100px` for CTAs, `14px` program cards, `16px` dropdowns, `18px` default panel, `12px` small, `28px` large. Do not mix pill into cards.

### 2.5 Elevation system

| Level | Name | Treatment | Use |
|---|---|---|---|
| 0 | Flat | 1px `border` + `surface` sheen gradient | cards |
| 1 | Float | `0 30px 80px -30px rgba(0,0,0,.8)` | dropdown menus |
| 2 | Gold glow | `0 0 80px -20px rgba(201,173,106,.45)` | hero arc, CTA halo |

Philosophy: depth comes from translucent surface tone and soft light, not hard shadows. The gold button adds a top inset highlight and bottom inset shade for a metallic bevel. Decorative depth: an arched gold light line beneath the hero and a spotlight vignette on the hero.

### 2.6 Borders

1px solid, white at 8% (cards, dropdown) and gold-tinted `rgba(255,225,150,0.55)` on the primary button. Focus treatment not captured ❓.

### 2.7 Accessibility quick-check

Contrast on `bg` #121212 (full table in design-a11y.md):

- text-primary 15.9:1 AAA; text-muted 9.07:1 AAA; accent 8.63:1 AAA; accent-bright 11.68:1 AAA
- on-accent on gold button 9.58:1 AAA
- text-faint 4.44:1: AA for large text only, avoid for body copy

## 3. Components Inventory

### 3.1 Generic components

#### button-primary

- Variants: 1 observed (gold pill). ✅
- Sizes: 15.7px text, 15/28 padding (nav, cards); 16.8px text, 18/36 padding (hero). ✅
- Treatment: metallic gold vertical gradient, 1px `rgba(255,225,150,0.55)` border, bevel inset shadows, gold glow underneath. ✅
- Text: Inter 600, `{colors.on-accent}`; sentence case ("Apply Now"). ✅
- States: hover/focus not captured ❓.

#### link-ghost

- Secondary action "For organisations →": 15.2px, weight 400, #C9C9C9, 2px bottom padding (underline-style). ✅
- No fill, no border box; pairs beside the primary CTA. ✅

#### card-program

- 476 x 276, `card-sheen` gradient, 1px `border`, 14px radius, padding 34/30/30. ✅
- Heading in Instrument Serif 25.6px (e.g. "Beginners", "Professionals"), copy in `text-muted`. ✅
- No shadow at rest. ✅

#### dropdown

- Nav mega-menu panel: rgba(22,22,22,0.97), 16px radius, 8px padding, 1px `border`, Float shadow; 320px wide. ✅

#### header

- Fixed, 75px tall, transparent over a dark fade; serif wordmark at left, centered links (Programs, Enterprise, About, Careers, Support), gold pill CTA right. ✅
- A thin gold scroll-progress bar sits on the top edge. ✅

### 3.2 Signature components

- **Gradient-text hero headline:** H1 filled with a grey-white-grey horizontal gradient, with one italic gold word and a blinking caret (typewriter effect). Appears once, in the hero.
- **Gold arc glow:** a curved light line under the hero CTAs, setting the spotlight mood.
- **Blurred-to-sharp reveal:** section headings fade in from blur on scroll (seen mid-transition). ⚠️

## 4. Layout & Composition

### 4.1 Grid & containers

Max width 1200px ✅, centered content, generous vertical rhythm (110px between sections). Hierarchy is set by serif size and the gold eyebrow, then muted body.

### 4.2 Composition patterns

Centered hero (eyebrow, headline, paragraph, CTA pair); centered section intros (eyebrow + serif H2); two- and three-up card grids for programs. Sections all share `bg` with no color banding. ✅

### 4.3 Responsive behavior

| Breakpoint | Observation | Confidence |
|---|---|---|
| Desktop 1366 | Full nav, centered hero | ✅ |
| Tablet / mobile | Not captured | ❓ |

Re-run with mobile frames to confirm collapse behavior; CTA padding (15px vertical) gives about 50px height, above the 44px touch target.

### 4.4 Image behavior

Home above-the-fold has no photography; atmosphere is gradients and glows. A "60 second film" video block follows. Imagery rules beyond that are unknown ❓.

## 5. Reconstruction Notes

Stack: no framework signal in the captured styles; semantic CSS variables (`--bg`, `--text`, `--grad`, `--radius`) suggest hand-written CSS. Default: plain CSS variables or Tailwind with these tokens.

Quick wins:

1. Set body to `{colors.bg}` / `{colors.text-primary}` with Inter.
2. Build the gold pill once (gradient + bevel + glow) and reuse it.
3. Use Instrument Serif 400 for every heading with negative tracking.

Tricky bits:

1. Gradient-clipped H1 text with an inline italic gold word.
2. Hero arc glow and spotlight (layered radial gradients).
3. Scroll-reveal with blur-to-sharp.
4. Instrument Serif and Inter must be loaded from Google Fonts.

Implicit states to define: hover (brighter gold, lift), focus ring (gold), pressed, disabled, loading, form error.

| Layer | Confidence | Why |
|---|---|---|
| Color | High | Read from `:root` variables |
| Typography | High | Computed styles |
| Components | Medium | Home page only, no states |
| Layout | Medium | Desktop only |

## 6. Do's and Don'ts

### Do

- Reserve `{colors.accent}` family for CTAs, eyebrows and one italic keyword per headline.
- Set all headings in Instrument Serif weight 400 with negative letter-spacing.
- Use `{colors.border}` hairlines and `card-sheen` instead of shadows for cards.
- Keep primary CTAs as the 100px pill with `{colors.on-accent}` text.
- Keep sections on `{colors.bg}` with about 110px vertical padding.

### Don't

- Don't use bold serif or Inter for headlines.
- Don't use `{colors.text-faint}` for body text (4.44:1).
- Don't add a second hue; the legacy violet/cyan/magenta variables are gold here.
- Don't put the pill radius on cards or the 14px card radius on buttons.
- Don't use heavy drop shadows or pure white backgrounds on the dark ground.

## 7. Open Questions

- Hover, focus, pressed and disabled states of buttons and links.
- Mobile and tablet layouts and breakpoint values.
- Whether the `paper` light palette is used on inner pages.
- Form field styling (no inputs on the home page).

## 8. Companion files

- `design-tokens.json`: generated from this frontmatter with `build_tokens_json.py`.
- `design-a11y.md`: contrast table for six text/surface pairs.
- Capture: two Chrome screenshots (hero, film section) plus computed-style and `:root` variable dumps.
