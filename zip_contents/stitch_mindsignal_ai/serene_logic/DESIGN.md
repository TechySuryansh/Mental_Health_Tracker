---
name: Serene Logic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006d3e'
  on-secondary: '#ffffff'
  secondary-container: '#8cf5b2'
  on-secondary-container: '#007241'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#8ff8b4'
  secondary-fixed-dim: '#73db9a'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

This design system is built on the intersection of empathetic wellness and high-performance technology. It targets individuals seeking mental clarity through AI, evoking an emotional response of safety, sophistication, and quiet intelligence.

The visual direction combines **Glassmorphism** with **Minimalism**. It utilizes frosted glass surfaces to represent the "transparency" of the AI, paired with the structural precision of a premium fintech platform. The aesthetic is defined by expansive whitespace, subtle light-leaks, and a reduction of visual noise to minimize cognitive load.

## Colors

The palette is anchored by **Soft Indigo** (#6366F1), representing the "Future-Forward AI" aspect of the platform. This is supported by a system of functional washes: **Sage Green** for positive reinforcement and **Muted Coral** for sensitive alerts.

In Light Mode, backgrounds utilize very light blue-grey tints to prevent stark white eye-strain. In Dark Mode, the interface shifts to a deep **Charcoal/Navy** (#0F172A) with subtle "glow" highlights. Surfaces are rarely solid; they use semi-transparent hex codes to allow background gradients to bleed through, creating a sense of depth and airiness.

## Typography

The design system utilizes **Inter** across all levels to achieve a clean, systematic, and highly legible interface. The type hierarchy relies on generous line-heights (1.6 for body text) to ensure content feels approachable and easy to digest during stressful moments.

Headlines use tight letter-spacing and semi-bold weights to provide a "Stripe-like" precision, while labels use slightly increased tracking for clarity in metadata. On mobile devices, headline sizes scale down aggressively to prevent awkward line breaks and maintain a calm vertical rhythm.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with high-impact "Focus Areas." For desktop, a 12-column grid is used with a maximum width of 1200px to ensure the eye doesn't have to travel too far horizontally.

Spacing is governed by an 8px base unit. To achieve the "Headspace" feel, vertical margins between sections are intentionally oversized (64px to 120px) to give components room to breathe. Elements should never feel cramped; if in doubt, increase the padding. Mobile layouts transition to a single-column stack with 20px side margins.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Backdrop Blurs**. Instead of traditional shadows, this system uses:

1.  **Level 1 (Base):** Subtle background gradients in lavender and sage.
2.  **Level 2 (Cards):** Surfaces with `backdrop-filter: blur(20px)` and a 1px white border at 20% opacity to define the edge.
3.  **Level 3 (Floating):** Elements like modals or primary action buttons use a soft, ultra-diffused shadow tinted with the primary color (e.g., `0 20px 40px rgba(99, 102, 241, 0.1)`).

Motion is critical: transitions should use a custom cubic-bezier `(0.4, 0, 0.2, 1)` for a smooth, "weighted" feel that mimics a natural breath.

## Shapes

The shape language is organic and soft. Standard components like input fields use `rounded-base`. High-level containers, such as dashboard cards and feature highlights, use `rounded-2xl` or `rounded-3xl`. 

Avoid sharp corners entirely. Even within complex components like data tables or lists, the outer container must maintain a high radius to preserve the "Calm" aesthetic.

## Components

### Buttons
Primary buttons use a solid Indigo-to-Violet gradient with a subtle inner-glow. Secondary buttons are "Glass" buttons—frosted transparent backgrounds with a thin border. All buttons have a minimum height of 48px to ensure ease of interaction.

### Glass Cards
The signature component. These must have a `backdrop-filter: blur(16px)` and a linear gradient border (top-left to bottom-right) that transitions from semi-transparent white to transparent.

### AI Chat Interface
Messages from the AI appear in "Sage Green" glass bubbles, while user messages are represented by simple, clean typography. The input field is a floating "Pill" that remains anchored at the bottom with a 20% transparent blur.

### Chips & Tags
Used for mood tracking or session categories. These are small, pill-shaped elements with low-contrast pastel backgrounds. Active states are indicated by a soft primary-color glow rather than a heavy color change.

### Smooth Progress Indicators
For meditation or session tracking, use continuous-path circular loaders with a "tapered" stroke that moves with a gentle ease-in-out rhythm.