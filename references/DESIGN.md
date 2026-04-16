# Design System Document: The Modern Scribe

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system is an exercise in "Digital Archivalism." It rejects the sterile, bright-white "SaaS-standard" in favor of a moody, high-contrast editorial experience that feels like a rare manuscript illuminated by candlelight. 

The system moves beyond the template look by embracing **Absolute Geometry** (zero-radius corners) and **Tonal Depth**. We break the rigid digital grid through intentional asymmetry—placing text in wide margins and using overlapping elements to create a sense of physical layering. The goal is a UI that feels curated, not just rendered.

## 2. Colors & Surface Philosophy
The palette is rooted in the ink-and-parchment tradition, reimagined for high-performance OLED displays.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts or subtle tonal transitions. A section does not "end" with a line; it transitions into a different depth tier.

### Surface Hierarchy & Nesting
Instead of a flat grid, treat the UI as a series of physical layers. Use the `surface-container` tiers to create "nested" depth:
*   **Base Layer:** `surface` (#131313) for the primary canvas.
*   **Recessed Content:** `surface-container-low` (#1c1b1b) for secondary sidebars or utility zones.
*   **Featured Elements:** `surface-container-high` (#2a2a2a) to draw the eye toward interactive modules.

### Signature Textures & Gradients
To avoid a "flat" dark mode, use subtle radial gradients on main CTAs. Transition from `primary` (#f7bd48) to `primary-container` (#1b1000) at a 45-degree angle to provide a "burnished gold" effect. For floating elements, use **Glassmorphism**: a background of `surface-container` at 80% opacity with a `24px` backdrop-blur to allow underlying content to bleed through softly.

## 3. Typography
The typographic soul of this system lies in the tension between the modern, utilitarian `Manrope` and the scholarly, high-contrast `Newsreader`.

*   **Display & Headlines (Newsreader):** Use these for storytelling and brand-heavy moments. The high-contrast serifs convey authority and historical weight.
*   **Body & Labels (Manrope):** Use these for data-heavy tasks and functional UI. The clean sans-serif ensures legibility against deep dark backgrounds.

**Typographic Hierarchy:**
*   **Display-LG (3.5rem):** Reserved for hero titles. Leading should be tight (1.1) to create a "block" of text.
*   **Headline-MD (1.75rem):** Used for section starts. Always paired with a `label-md` "over-line" in `primary` (#f7bd48) for a curatorial feel.
*   **Body-LG (1rem):** The workhorse. Set in `on-surface` (#e5e2e1) with generous line-height (1.6) to prevent "halpation" (text glowing) on dark backgrounds.

## 4. Elevation & Depth
In "The Digital Curator" system, elevation is a matter of light, not lines.

*   **The Layering Principle:** Achieve lift by stacking. Place a `surface-container-lowest` (#0e0e0e) card on a `surface-container-low` (#1c1b1b) background to create a "sunken" archival drawer effect.
*   **Ambient Shadows:** For floating menus, use extra-diffused shadows. 
    *   *Spec:* `0px 20px 40px rgba(0, 0, 0, 0.4)`. 
    *   Avoid grey shadows; use a dark tint of the background color to maintain tonal purity.
*   **The "Ghost Border":** If a boundary is required for accessibility, use the `outline-variant` (#444748) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons: The Wax Seal
*   **Primary:** Solid `primary` (#f7bd48) with `on-primary` (#412d00) text. No rounded corners (`0px`). Use all-caps `label-md` typography.
*   **Secondary:** Solid `secondary` (#b2ceb3) (Forest Green). This is for "Confirm" or "Success" actions.
*   **Tertiary:** Transparent background with a `primary` text color. On hover, apply a subtle `surface-container-highest` background.

### Cards & Lists: The Manuscript Fold
*   **Cards:** Strictly forbid divider lines. Separate content using `surface-container` shifts. For example, a card's header is `surface-container-high` and its body is `surface-container`.
*   **Lists:** Use `8px` of vertical whitespace between items instead of lines. The "active" state should be a subtle `primary` left-border (2px wide) while the background remains the same.

### Input Fields: The Ledger
*   **Styling:** Underline-only style using `outline` (#8e9192). When focused, the underline transitions to `primary` (#f7bd48) and the label floats upward using `label-sm`.
*   **Error State:** Use `error` (#ffb4ab) for text, but keep the container background dark to maintain the "ink-black" aesthetic.

### Signature Component: The "Curator's Loupe"
A specialized tooltip/hover state for images or data points. Use a `surface-bright` (#3a3939) background with a `1px` Ghost Border and `Newsreader` italic typography to provide context, mimicking a scholar's handwritten notes in a margin.

## 6. Do’s and Don’ts

### Do
*   **Do** use extreme whitespace. Let the "ink" breathe against the "parchment."
*   **Do** use `secondary` (#b2ceb3) sparingly as a quiet accent for organic elements or "active" success states.
*   **Do** treat images with a slight desaturation (0.9) and a subtle grain overlay to match the historical aesthetic.

### Don’t
*   **Don't** use any border-radius. Every corner must be a sharp 90-degree angle to maintain the "Modern Brutalist" edge.
*   **Don't** use pure white (#FFFFFF). Only use `on-surface` (#e5e2e1) or `tertiary` (#d1c5b5) for text to prevent eye strain and maintain the "aged" feel.
*   **Don't** use standard "Slide-in" animations. Use "Fade-and-Scale" (0.98 to 1.0) to mimic the appearance of a page being laid onto a table.