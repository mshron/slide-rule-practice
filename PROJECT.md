# Slide Rule Practice Website

A TypeScript/React website that helps users practice slide rule calculations.

## Core Functionality
- Generates random mathematical problems suitable for slide rule practice
- Allows users to configure problem complexity through various controls
- Displays equations using MathJax formatting
- Shows exact calculated answers for verification

## Problem Generation Settings
1. Operations (checkboxes):
   - Multiplication (default)
   - Division (default)
   - Square
   - Cube
   - Square Root
   - Cube Root
   - Log10
   - Ln
   - e^x

2. Steps (slider):
   - Range: 2-5 steps
   - Default: 2
   - Controls number of operations in equation
   - Example: 2 steps = "2.3 × 4.5", 3 steps = "2.3 × 4.5 × 6.7"

3. Magnitude (slider):
   - Range: 1-5
   - Default: 2
   - Controls the range of powers of 10 for generated numbers
   - Numbers are generated as (1.1-9.9) × 10^n where n is between -magnitude and +magnitude

4. Significant Figures (slider):
   - Range: 1-3
   - Default: 1
   - Controls how many significant figures are shown in the input numbers
   - Does not affect answer precision (answers show full floating point precision)

## Technical Implementation
- Built with Vite + React + TypeScript
- Styled with Tailwind CSS
- Uses MathJax for equation rendering
- Mobile-responsive design
- Numbers are generated to avoid trivial calculations (no 1.0, 10, 100, etc.)

## User Flow
1. User loads page with default settings (multiplication/division, 2 steps, magnitude 2, 1 significant figure)
2. User can adjust settings using controls
3. Clicks "Generate Problem" to create new equation
4. Solves problem using slide rule
5. Clicks "Show Answer" to verify solution
6. Can generate new problem to continue practicing