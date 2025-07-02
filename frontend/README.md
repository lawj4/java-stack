# Todo Frontend

A modern React TypeScript application built with Vite for managing todo items.

## Features

- ⚡ **Fast Development** - Vite for lightning-fast hot reload
- 🎨 **Modern UI** - Tailwind CSS for beautiful, responsive design
- 🔧 **TypeScript** - Full type safety and better developer experience
- 📱 **Responsive** - Works on desktop and mobile devices
- 🔄 **Real-time Updates** - Instant UI updates with React hooks

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Vitest** - Testing framework

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/     # React components
├── services/       # API services
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
├── index.tsx       # App entry point
└── index.css       # Global styles
```

## API Integration

The frontend communicates with the Spring Boot backend API running on `http://localhost:8080`. API requests are proxied through Vite's development server.

## Development

### Adding New Components

1. Create a new file in `src/components/`
2. Export your component as default
3. Import and use in other components

### Styling

This project uses Tailwind CSS for styling. You can:
- Use utility classes directly in JSX
- Create custom components in `src/components/`
- Add custom styles in `src/index.css`

### Testing

Tests are written with Vitest and React Testing Library:
- Unit tests for components
- Integration tests for user interactions
- API service tests

## Build and Deploy

### Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment

The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Run linting before committing: `npm run lint`
4. Ensure type checking passes: `npm run type-check` 