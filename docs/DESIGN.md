# Design System Strategy: The Curated Archive

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Archive."** 

This is not a standard historical repository; it is a high-end digital museum experience. The system moves away from the "template" look of modern web design by embracing **Architectural Rigor** and **Editorial Asymmetry**. By utilizing a strictly 0px border-radius scale, we evoke the precision of cut parchment, stone-carved inscriptions, and the authoritative layout of academic journals. 

The experience should feel tactile and weighted. We break the rigid, centered grid by using intentional overlapping elements—such as a high-resolution artifact image bleeding off the edge of a container—to create a sense of discovery and "physical" depth.

## 2. Colors & Tonal Depth
The palette is rooted in Mexico’s organic and academic history: the deep forest of the highlands, the sun-bleached cream of ancient documents, and the clay of the earth.

### The Palette (Material Design Implementation)
- **Primary (`#061b0e`):** Our "Ink." Used for deep forest-green backgrounds and high-authority text.
- **Surface/Background (`#fcf9f0`):** Our "Paper." A sophisticated antique white that reduces eye strain and provides a premium, non-digital feel.
- **Secondary (`#934b19`):** "Clay Red." Used for calls to action and highlighting historical significance.
- **Tertiary (`#370200`):** "Deep Earth." Used for moments of gravitas or heavy contrast.

### Layout Rules
- **The "No-Line" Rule:** To maintain a high-end feel, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through background color shifts. For example, a `surface-container-low` (`#f6f3ea`) section should sit directly against a `surface` (`#fcf9f0`) background to create a whisper-quiet transition.
- **Surface Hierarchy:** Treat the UI as layers of physical paper. Use `surface-container-highest` (`#e5e2da`) for the most prominent interactive cards and `surface-container-lowest` (`#ffffff`) for floating elements to create a natural, "stacked" hierarchy.
- **Signature Textures:** Incorporate a subtle noise texture (2-3% opacity) over the `surface` tokens to mimic high-quality cotton paper. For Hero sections, use a linear gradient transitioning from `primary` (`#061b0e`) to `primary-container` (`#1b3022`) to add "soul" and depth to large green voids.

## 3. Typography
The typographic system is a dialogue between the old world and the new.

- **Display & Headlines (Noto Serif):** This is our "Historical Voice." Use `display-lg` and `headline-lg` with tight letter-spacing to evoke the feeling of master-crafted title pages. It is authoritative, elegant, and timeless.
- **Body & Labels (Work Sans):** This is our "Curator’s Voice." A clean, highly legible sans-serif that balances the ornate nature of the serif titles. 
- **The Editorial Scale:** Use `label-md` with 10% letter-spacing in all-caps for "Exhibition Tags" or categories to create a sophisticated, museum-label aesthetic.

## 4. Elevation & Depth
In "The Curated Archive," depth is achieved through **Tonal Layering** rather than traditional shadows.

- **The Layering Principle:** Instead of shadows, stack containers. A `surface-container-high` card placed on a `surface-container-low` background creates a clear, sophisticated distinction.
- **Ambient Shadows:** When a floating effect is required (e.g., a modal or a primary artifact image), use an extra-diffused shadow.
    - *Example:* `box-shadow: 0 20px 40px rgba(28, 28, 23, 0.06);` (using a tinted version of `on-surface`).
- **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline-variant` token at 15% opacity. Never use a 100% opaque border.
- **Glassmorphism:** For navigation bars or floating "Museum Info" panels, use the `surface` color at 80% opacity with a `backdrop-blur(12px)`. This allows historical imagery to bleed through the UI, softening the hard edges of the 0px radius layout.

## 5. Components

### Buttons
- **Primary:** Background: `primary` (#061b0e); Text: `on-primary` (#ffffff). **Shape:** Strictly rectangular (0px radius). 
- **Secondary:** Border: 1px "Ghost Border" of `primary`; Text: `primary`.
- **States:** On hover, the Primary button should shift to `primary-container` with a subtle 2px vertical offset to simulate "lifting" off the paper.

### Cards & Exhibition Modules
- **Design:** Forbid all divider lines. Use `surface-container-low` for the card background against the `surface` page background.
- **Imagery:** Images should be treated as museum artifacts. Use a subtle `outline-variant` 1px inset border to give the photo a "framed" look.

### Input Fields
- **Style:** Move away from the four-sided box. Use a "Ledger Style" input: a single bottom border using `outline` (#737973) and a `surface-container-lowest` background. 
- **Focus State:** Transition the bottom border to `secondary` (#934b19) to provide a sophisticated, clay-colored accent.

### Interactive Timelines (Specialty Component)
- Use a vertical 1px line in `outline-variant` (20% opacity). Timeline markers should be 8x8px squares (0px radius) in `secondary`, creating a minimalist, precise chronological path.

## 6. Do's and Don'ts

### Do
- **Do** use large amounts of white space (using the `surface` token) to allow the "artifacts" (content) to breathe.
- **Do** use asymmetrical layouts. Place a title on the left and a body paragraph shifted to the right-center to mimic high-end editorial magazines.
- **Do** ensure all typography maintains high contrast against the "paper" backgrounds for maximum accessibility.

### Don't
- **Don't** use rounded corners. Even a 2px radius will break the "Architectural Rigor" of this system.
- **Don't** use pure black (#000000). Always use `primary` (#061b0e) or `on-surface` (#1c1c17) to maintain the sophisticated, academic tone.
- **Don't** use standard "drop shadows." If it looks like a standard web app, the "Museum" illusion is lost. Stick to tonal shifts and ambient, low-opacity blurs.