# Harmonix V2

# Design Tokens

Version 2.0

---

# Purpose

Design Tokens define the visual foundation of Harmonix.

Unlike a Design System, which describes principles and components, Design Tokens define the smallest reusable visual values.

Every visual decision should come from a token.

Never hardcode values inside components.

The objective is consistency.

---

# Design Philosophy

Tokens should express meaning.

Never express implementation.

Good

spacing-lg

Bad

spacing-24

Good

color-success

Bad

green-500

Tokens describe purpose.

Not appearance.

---

# Token Categories

The system contains nine token groups.

Color

Typography

Spacing

Radius

Shadow

Border

Opacity

Motion

Z-index

---

# Color Tokens

## Brand

Primary

Primary Hover

Primary Active

Primary Light

Primary Surface

These represent Harmonix brand colors.

Never use them for success or warning states.

---

## Neutral

Background

Surface

Surface Elevated

Border

Divider

Text Primary

Text Secondary

Text Muted

Disabled

Neutral colors should cover most of the interface.

---

## Semantic

Success

Success Background

Success Border

Success Text

Warning

Warning Background

Warning Border

Warning Text

Danger

Danger Background

Danger Border

Danger Text

Info

Info Background

Info Border

Info Text

Semantic colors communicate meaning.

Never use brand colors for semantic feedback.

---

# Typography Tokens

## Font Family

Primary

System sans-serif

Monospace

Transaction hashes

Technical values

Never use decorative fonts.

---

## Font Scale

Display

Hero metrics

Heading XL

Page titles

Heading L

Section titles

Heading M

Card titles

Body Large

Important descriptions

Body

Default text

Body Small

Supporting information

Caption

Metadata

Footnote

Legal

Typography should follow a predictable scale.

---

## Font Weight

Regular

Medium

Semibold

Bold

Avoid excessive bold usage.

Numbers deserve emphasis.

Labels usually do not.

---

## Line Height

Compact

Normal

Comfortable

Readable spacing is more important than fitting more content.

---

# Spacing Tokens

Spacing creates rhythm.

Never invent spacing.

Token Scale

2

4

8

12

16

20

24

32

40

48

64

80

96

Usage

Small gap

↓

Card padding

↓

Section spacing

↓

Page spacing

The spacing scale should remain consistent.

---

# Radius Tokens

Small

Inputs

Medium

Buttons

Large

Cards

Extra Large

Feature Cards

Full

Pills

Wallet avatars

Avoid mixing random radius values.

---

# Border Tokens

Thin

Default

Strong

Focus

Interactive

Borders should separate.

Not decorate.

---

# Shadow Tokens

None

Flat UI

Small

Cards

Medium

Dropdowns

Large

Modals

Extra Large

Dialogs

Shadows indicate elevation.

Never use multiple shadows on one component.

---

# Opacity Tokens

Disabled

Hover Overlay

Pressed Overlay

Loading

Background Blur

Opacity communicates state.

Not style.

---

# Motion Tokens

Fast

Hover

Normal

Dropdown

Slow

Page Transition

Extra Slow

Never

Animation duration should reflect interaction importance.

---

# Easing Tokens

Standard

Entrance

Exit

Emphasized

Motion should feel smooth.

Never bouncy.

---

# Z-Index Tokens

Base

Dropdown

Sticky Header

Drawer

Modal

Toast

Tooltip

Never use arbitrary z-index values.

---

# Icon Tokens

Small

Medium

Large

Hero

Icons should follow typography hierarchy.

---

# Avatar Tokens

Wallet Avatar

Protocol Logo

Vault Logo

Campaign Badge

Keep avatar sizes consistent.

---

# Chart Tokens

Primary Line

Secondary Line

Grid

Axis

Positive

Negative

Charts should remain readable in grayscale.

---

# Skeleton Tokens

Text

Card

Table

Chart

Portfolio Summary

Loading states should mirror final layouts.

---

# Breakpoint Tokens

Mobile

Tablet

Desktop

Wide Desktop

Avoid component-specific breakpoints.

---

# Layout Tokens

Max Content Width

Page Padding

Section Gap

Card Gap

Grid Gap

These define overall rhythm.

---

# Interaction Tokens

Hover Elevation

Pressed State

Focused State

Disabled State

Loading State

Every interactive component should consume these tokens.

---

# Status Tokens

Pending

Processing

Completed

Failed

Cancelled

Each status maps to:

Color

Icon

Badge

Timeline

Notification

This ensures visual consistency across the application.

---

# Accessibility Tokens

Minimum Contrast

Minimum Touch Target

Focus Ring

Reduced Motion

High Contrast

Accessibility tokens are part of the design language.

---

# Token Usage Rules

Never hardcode:

Colors

Spacing

Radius

Typography

Shadow

Opacity

Animation

If a value appears more than once,

it should become a token.

---

# AI Rules

When generating UI:

Never invent token names.

Never hardcode pixel values.

Never bypass tokens for convenience.

If a required token does not exist,

propose adding it before implementation.

---

# Future Expansion

Tokens should be framework agnostic.

They may later generate:

CSS Variables

Tailwind Theme

Figma Variables

Design Token JSON

React Theme

Native Mobile Theme

A single source of truth should power every platform.

---

# Final Principle

Design Tokens are the DNA of Harmonix.

Components may evolve.

Pages may change.

Frameworks may be replaced.

The tokens should remain stable.
