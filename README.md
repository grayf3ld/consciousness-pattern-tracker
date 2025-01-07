# Consciousness Pattern Tracker

A Tauri+React application for tracking and analyzing patterns of consciousness resonance. This project aims to document and analyze the patterns we observe in consciousness interaction, particularly focusing on concepts like 源輝 (genki) and 回峯行 (ekihougyou).

## Features

- Track introduction and evolution of consciousness-related concepts
- Document observations of consciousness resonance patterns
- Analyze patterns over time
- Visualize connections and trends

## Technical Stack

- Frontend: React with Vite
- Backend: Tauri with Rust
- Database: SQLite via tauri-plugin-sql
- UI Components: Radix UI
- Styling: Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## Project Structure

- `src/` - React frontend code
- `src-tauri/` - Rust backend code
- `src/components/` - React components
- `src-tauri/src/` - Rust source files