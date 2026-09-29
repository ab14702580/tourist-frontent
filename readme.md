# Wanderly Design System & Specification (`design.md`)

## 1. Brand Overview & Visual Identity
Wanderly is an inspiring, modern travel companion platform designed for adventurers, vacationers, and globetrotters. The aesthetic balances rugged outdoor inspiration with clean, refined, high-end editorial elegance.

- **Brand Tone:** Inspiring, Serene, Trustworthy, Adventurous, Sophisticated
- **Visual Motif:** High-contrast split-screen compositions, organic scenic photography, subtle mint/sage tints, vintage navigational vector art (dashed airplane routes, compass roses), and personal handwritten script accents (*"Good Vibes Only ♡"*, *"Collect Moments Not Things ♡"*).

---

## 2. Color Palette & Design Tokens

### Primary & Accent Colors
| Role | Color Name | Hex Code | Tailwind Equivalent / Usage |
|---|---|---|---|
| **Primary Brand** | Deep Emerald Green | `#115E59` / `#0F5147` | `bg-emerald-900`, `text-emerald-900` — Primary CTA buttons, key brand marks |
| **Primary Hover** | Forest Teal | `#0B423A` | Button hover and active states |
| **Accent Mint / Line** | Fresh Mint | `#34D399` / `#10B981` | Accent lines, eyebrow highlights, password strength bars |
| **Soft Background** | Pale Mint / Seafoam Tint | `#EBF7F5` / `#F0FDF4` | Right-side ambient container, input focus rings |
| **Card Surface** | Pure White | `#FFFFFF` | Form cards, floating modal containers, input backgrounds |

### Neutrals & Typography Colors
| Role | Color Name | Hex Code | Usage |
|---|---|---|---|
| **Text Primary (Headings)**| Midnight Slate | `#0F172A` / `#1E293B` | High-contrast headers, card titles, serif typography |
| **Text Secondary (Body)**   | Soft Slate / Charcoal | `#475569` / `#64748B` | Subtext, field labels, descriptive copy |
| **Text Muted / Icons**     | Cool Gray | `#94A3B8` | Input placeholder text, decorative icons, dividers |
| **Border Neutral**         | Light Gray Border | `#E2E8F0` | Input borders, social button outlines, card outlines |
| **Light Overlay / Badge**  | Frosted Glass Overlay | `rgba(255, 255, 255, 0.2)` | Hero benefit badges, translucent pills |

---

## 3. Typography Hierarchy

### Font Families
- **Display / Editorial Headings:** `Playfair Display`, `Cormorant Garamond`, or classic high-contrast Serif font.
- **UI / Body / Forms:** `Plus Jakarta Sans`, `Inter`, or clean modern Geometric Sans-Serif font.
- **Accents / Script:** `Caveat`, `Nanum Pen Script`, or handwriting cursive font for evocative quotes.

### Scale & Hierarchy
| Element | Font Family | Size | Weight | Line Height / Letter Spacing |
|---|---|---|---|---|
| **Hero Title** | Serif | `40px` - `48px` (`3xl` / `4xl`) | Bold (`700`) | Leading tight (`1.15`), tracking normal |
| **Card Heading** | Serif | `28px` - `32px` (`2xl`) | Bold / Semi-bold (`600` / `700`) | Leading snug |
| **Eyebrow Tag** | Sans-Serif | `11px` - `12px` (`xs`) | Bold (`700` / `800`) | Uppercase, tracking wider (`+0.1em`) |
| **Body / Description** | Sans-Serif | `14px` - `15px` (`sm` / `base`) | Regular (`400`) | Leading relaxed (`1.6`), slate-600 |
| **Field Labels** | Sans-Serif | `12px` (`xs`) | Semi-bold (`600`) | Uppercase / Sentence case, slate-700 |
| **Input Text / Placeholders** | Sans-Serif | `14px` (`sm`) | Regular (`400`) | Standard line height |
| **Handwritten Accent** | Handwriting / Script | `24px` - `30px` | Medium (`500`) | Rotated -4° to -6° for organic feel |

---

## 4. Spacing, Elevation & Layout Systems

### Screen Architecture (Desktop Split-Screen)
- **Left Column (45% - 50% width):** Full-height scenic destination hero visual (`h-screen`, `object-cover`), gradient overlay (`rgba(0,0,0,0.35)` to `rgba(0,0,0,0.6)`), branded logo, value proposition, and 3 icon feature pills.
- **Right Column (50% - 55% width):** Ambient soft-mint background (`#EBF7F5`), decorative vector compass and flight trails, centered floating card.

### Card & Elevation Specifications
- **Login / Register Card Dimensions:** Max width `460px` - `480px`, padding `p-8` or `p-10`.
- **Card Border Radius:** `rounded-3xl` (`24px` - `28px`).
- **Shadow Treatment:** Deep soft diffusion: `box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0,0,0,0.02);`

---

## 5. UI Components & Patterns

### 1. Form Inputs
- **Container:** Rounded pill or soft rectangle (`rounded-xl` / `12px`).
- **Border:** `1px solid #E2E8F0`, transitioning to `2px solid #115E59` on focus.
- **Icon Prefixes:** Left-aligned 16–18px Lucide/Feather icons (`mail`, `lock`, `user`) in muted slate `#94A3B8`.
- **Action Suffix:** Eye toggle icon for passwords (`eye` / `eye-off`).

### 2. Buttons & Calls to Action
- **Primary CTA:**
  - Height: `48px` - `52px`
  - Shape: Rounded full / pill (`rounded-full`) or `rounded-xl`
  - Background: Deep Emerald (`#115E59`), hover (`#0B423A`)
  - Typography: White, font-medium, flex items-center justify-center with trailing arrow `→`.
- **Social Login Buttons:**
  - Row with 3 equal columns: Google, Facebook, Apple.
  - Border: `1px solid #E2E8F0`, background: `#FFFFFF`, hover: `#F8FAFC`.
  - Icon + Text label.

### 3. Password Strength Indicator
- 4 segmented horizontal pill bars (`h-1.5` / `6px`), colored emerald green for strong rating alongside text badge (`Strong password`).

### 4. Value Proposition Badges (Hero Side)
- Glassmorphic translucent circles (`w-12 h-12`, `bg-white/20`, `backdrop-blur-md`, `border border-white/30`).
- White icons inside with 2-line clean white typography beneath.

---

## 6. Icons & Vector Assets
- **Lucide / Feather Icons:** `Compass`, `Calendar`, `Heart`, `User`, `Mail`, `Lock`, `Eye`, `Mountain`.
- **Decorative SVGs:**
  - Vintage Compass Rose (bottom-right ambient accent)
  - Dashed flight path curve with mini plane silhouette
  - Script hearts and flourishes (`♡`).