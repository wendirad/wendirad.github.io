# Wendirad Demelash Tiku - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. The website displays professional information, experience, education, projects, and skills from the `info.json` data file.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation (ready for future use)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

## 🛠️ Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
wendirad.github.io/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── services/         # Data services
│   │   └── dataService.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── info.json             # Portfolio data source
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 📝 Data Source

All portfolio data is loaded from `info.json` at the root of the project. The data structure includes:
- Personal information
- Work experience
- Education
- Projects
- Skills (technical and soft)
- Awards
- References

## 🎨 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with Tailwind CSS
- ✅ Type-safe with TypeScript
- ✅ Fast development with Vite
- ✅ Smooth scrolling navigation
- ✅ Component-based architecture
- ✅ Easy to customize and extend

## 🔧 Customization

1. **Update Data**: Edit `info.json` to update your portfolio information
2. **Styling**: Modify `tailwind.config.js` for theme customization
3. **Components**: Add or modify components in `src/components/`
4. **Colors**: Update the primary color scheme in `tailwind.config.js`

## 📄 License

Private project

