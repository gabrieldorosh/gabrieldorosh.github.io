---
title: Sudoku Solver
shortTitle: Sudoku Solver
summary: "An interactive Sudoku solver that uses recursive backtracking to complete a 9×9 puzzle instantly or replay the recorded placements through a simple visual interface."
seoDescription: "An interactive Next.js Sudoku solver that uses recursive backtracking for 9×9 puzzles and replays recorded placements through an animated board."
year: "2024"
type: "Interactive algorithm visualisation"
role: "Sole developer"
featured: false
order: 4
draft: false
listed: false
accent: "#b86fa6"
technologies:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
repoUrl: https://github.com/gabrieldorosh/sudoku_solver
phoneScreens: []
---

## Goal

- **Purpose:** I built this small web tool to make a recursive backtracking algorithm visible through an interactive Sudoku board.
- **Modes:** A puzzle can be solved immediately or replayed as a sequence of attempted placements.
- **Audience:** The visual mode is intended for anyone learning how a depth-first search explores candidate values and builds a solution.

## Algorithm

- **Search order:** The solver scans the board row by row until it finds the next empty cell.
- **Candidate testing:** It tries values from 1 to 9 and rejects any value already present in the same row, column, or 3×3 box.
- **Recursion:** A valid candidate is placed before the solver recurses. If that branch reaches a dead end, the cell is reset and the next candidate is tried.
- **Outcome:** The search returns the first solution it can complete or reports that no solution was found when every candidate branch is exhausted.

## Interface

- **Inputs:** Each controlled cell accepts a value from 1 to 9 or can be left blank.
- **Controls:** Solve completes the puzzle, Clear resets the board, and Animate switches between immediate and visual solving. Editing is disabled during playback.
- **Feedback:** During animation, the active row, column, 3×3 box, and newly placed cell are highlighted.
- **Validation:** Stronger validation of duplicate or contradictory starting values remains necessary; a fully filled invalid board is not currently rejected reliably.

## Animated solving

- **What it shows:** The animation replays the number placements recorded while the recursive search runs.
- **Important limitation:** Backtrack removals are not recorded, so the playback is an illustration of attempted placements rather than a complete trace of the algorithm's changing state.
- **Future improvement:** Recording reversal steps would make failed branches and recovery much easier to follow.

## Reflection

- **Separation of concerns:** The recursive solver lives in `lib/sudokuSolver.ts`, separate from the React interface and animation state.
- **State:** The project highlighted the difference between mutating a search board efficiently and presenting that search as a reliable visual sequence.
- **Next steps:** Add puzzle pre-validation, automated solver tests, accessible cell labels, and adjustable animation timing.
