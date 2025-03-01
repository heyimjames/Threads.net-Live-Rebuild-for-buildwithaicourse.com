# Threads Clone

A responsive Threads clone built with Next.js and shadcn/ui.

## Features

- 🌓 Light, dark, and "Crazy" theme support
- 📱 Fully responsive design
- 🧩 Modular components using shadcn/ui
- 🔄 Tab-based navigation
- 👤 User profiles
- 🔔 Notifications system
- 🔍 Explore page
- 🎉 Interactive animations (confetti, hover effects)

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Lucide React](https://lucide.dev/) - Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/threads-clone.git
cd threads-clone
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
threads-clone/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── explore/         # Explore page
│   │   ├── notifications/   # Notifications page
│   │   ├── profile/         # Profile page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── navbar.tsx       # Navigation bar
│   │   ├── theme-provider.tsx # Theme provider
│   │   └── theme-toggle.tsx # Theme toggle button
│   └── lib/                 # Utility functions
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind CSS configuration
└── components.json          # shadcn/ui configuration
```

## Customization

### Themes

The app uses CSS variables for theming. You can customize the colors in `src/app/globals.css`. Three themes are available:

- **Light**: Clean, bright interface for daytime use
- **Dark**: Eye-friendly dark mode for nighttime use
- **Crazy**: Vibrant, colorful theme with bold purples and greens

### Animations

The app includes several interactive animations:

- **Confetti Animation**: Colorful confetti burst when creating a new post
- **Image Hover Effects**: Subtle spring scaling effect when hovering over images

### Components

All UI components are from shadcn/ui and can be customized. See the [shadcn/ui documentation](https://ui.shadcn.com/docs) for more information.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
