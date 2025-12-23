# Wendirad Demelash - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing professional experience, skills, projects, and contact information. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **AI Interaction**: Interactive AI chat feature for engaging with visitors
- **Contact Form**: Integrated contact form using Pageclip for form submissions
- **Analytics**: Microsoft Clarity integration for user behavior analytics
- **SEO Optimized**: Schema.org structured data for better search engine visibility
- **Cookie Consent**: GDPR-compliant cookie consent banner
- **Smooth Scrolling**: Navigation with smooth scroll indicators
- **Project Showcase**: Interactive project gallery with filtering
- **Work History Timeline**: Visual timeline of professional experience
- **Skills Display**: Comprehensive technical and soft skills showcase
- **Education Section**: Academic background with institution logos

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite (rolldown-vite)
- **Styling**: Tailwind CSS 3.4.19
- **Icons**: Lucide React
- **Form Handling**: Pageclip
- **Analytics**: Microsoft Clarity
- **Markdown**: react-markdown for content rendering
- **SEO**: schema-dts for structured data

## 📁 Project Structure

```
wendirad.github.io/
├── public/                 # Static assets
│   ├── imgs/              # Images and logos
│   ├── icons/             # Icon assets
│   └── res/               # Resources (CV, etc.)
├── src/
│   ├── components/
│   │   ├── sections/      # Page sections
│   │   │   ├── home.tsx
│   │   │   ├── ai-interaction/
│   │   │   ├── skills/
│   │   │   ├── work-history/
│   │   │   ├── projects/
│   │   │   ├── reach-out/
│   │   │   └── contact-form/
│   │   ├── ui/            # UI components
│   │   │   ├── footer.tsx
│   │   │   ├── navigation-bar.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── cookie-consent.tsx
│   │   └── icons/         # Icon components
│   ├── data_provider/     # Data management
│   ├── assets/
│   │   └── data/          # JSON data files
│   └── utils/             # Utility functions
└── index.html             # HTML entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wendirad/wendirad.github.io.git
cd wendirad.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📝 Configuration

### Pageclip Form Integration

The contact form uses Pageclip for form submissions. To configure:

1. Sign up at [Pageclip](https://pageclip.co)
2. Create a form and get your Site Key
3. Update the `PAGECLIP_ENDPOINT` in `src/components/sections/contact-form/contact-form.tsx`:
```typescript
const PAGECLIP_ENDPOINT = "https://send.pageclip.co/{yourSiteKey}/{formName}";
```

### Microsoft Clarity Analytics

Clarity is already integrated. To configure your project ID, update `src/utils/clarity.ts` with your Clarity project ID.

### Data Management

All content data is stored in `src/assets/data/data.json`. Update this file to modify:
- Personal information
- Work experience
- Education
- Skills
- Projects

## 🎨 Customization

### Theme Colors

Theme colors are configured in `tailwind.config.js`. The site uses:
- Primary colors: Gray scale
- Secondary colors: Custom secondary palette
- Tertiary colors: Accent colors for highlights

### Styling

The project uses Tailwind CSS with custom configuration. Modify `tailwind.config.js` to adjust:
- Color schemes
- Font families
- Spacing scales
- Breakpoints

## 📱 Sections

### Home
- Personal introduction
- Contact information
- Social media links
- Profile image with theme toggle

### AI Interaction
- Interactive AI chat interface
- RAG (Retrieval-Augmented Generation) integration

### Skills
- Technical skills with icons
- Soft skills
- Education timeline with institution logos
- Filterable skill tags

### Work History
- Professional experience timeline
- Company logos and details
- Role descriptions and responsibilities

### Projects
- Project showcase with images
- Technology tags
- Links to repositories and live demos
- Filterable by technology

### Contact
- Two contact sections:
  - Quick contact (email and CV download)
  - Contact form with Pageclip integration

### Footer
- Social media links
- Quick navigation
- Copyright information

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is configured for GitHub Pages deployment. The site is automatically deployed when changes are pushed to the main branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` directory to your hosting service

## 📄 License

This project is private and proprietary.

## 👤 Author

**Wendirad Demelash Tiku**
- Website: [wendirad.com](https://wendirad.com)
- GitHub: [@wendirad](https://github.com/wendirad)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the build tool
- [React](https://react.dev/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Pageclip](https://pageclip.co/) for form handling
- [Microsoft Clarity](https://clarity.microsoft.com/) for analytics
- [Lucide](https://lucide.dev/) for icons
