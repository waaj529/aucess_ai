# Aivora React - AI Chatbot Agency Website

Modern React.js conversion of the Aivora HTML template, built with Vite for optimal performance.

## 🚀 Features

- ⚡️ Built with React 18 & Vite for lightning-fast development
- 🎨 Pixel-perfect conversion from original HTML template
- 📱 Fully responsive design
- 🎭 Smooth animations with WOW.js integration
- 🔄 Interactive Swiper sliders for testimonials
- 📦 Component-based architecture for easy maintenance
- 🎯 Clean separation of data and presentation

## 📦 Installation

```bash
# Navigate to the project directory
cd aivora-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
aivora-react/
├── public/
│   └── assets/           # Static assets (images, fonts)
├── src/
│   ├── components/
│   │   ├── Layout/       # Header, Footer, Preloader, etc.
│   │   ├── Sections/     # Main page sections
│   │   └── UI/           # Reusable UI components
│   ├── data/             # Content data files
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── assets/css/       # Stylesheets
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── package.json
└── vite.config.js
```

## 🧩 Components

### Layout Components
- **Header** - Navigation with sticky behavior
- **Footer** - Footer with newsletter signup
- **Preloader** - Loading animation
- **BackToTop** - Scroll to top button

### Section Components
- **HeroSection** - Main banner with CTA
- **VideoSection** - Tab-based showcase
- **FeaturesSection** - Feature grid
- **BrandMarquee** - Scrolling brand logos
- **ProcessSection** - Interactive 3-step process
- **TestimonialsSection** - Customer testimonials slider

### UI Components
- **Button** - Custom button with SVG gradients
- **SectionTitle** - Reusable section headings

## 🎨 Customization

All content is separated into data files in `src/data/`:
- `navigation.js` - Menu items
- `features.js` - Feature cards
- `testimonials.js` - Customer testimonials
- `brands.js` - Brand logos

Edit these files to update content without touching component code.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is a React conversion of the Aivora HTML template.
Original template by XpressBuddy.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 🔄 Migration Notes

### From Original HTML Template

This React version maintains 100% visual parity with the original HTML template while providing:

1. **Better Performance**: Vite's fast HMR and optimized builds
2. **Maintainability**: Component-based architecture
3. **Scalability**: Easy to add new sections and features
4. **Developer Experience**: Modern tooling and hot reload

### Key Differences

- jQuery plugins replaced with React equivalents (Swiper for sliders)
- All JavaScript functionality converted to React hooks
- CSS files imported directly (no changes to styling)
- Assets moved to `public/assets/` directory

## 📚 Dependencies

### Core
- React 18.x
- React DOM 18.x
- Vite 7.x

### UI Libraries
- Bootstrap 5.x
- Swiper 11.x (for sliders)
- React Router DOM 7.x

### Utilities
- AOS (Animate On Scroll)
- React Scroll

## 🎯 Development

The project uses ES6+ features and follows React best practices:
- Functional components with hooks
- Props destructuring
- Conditional rendering
- Array mapping for dynamic lists
- CSS imports in components

## 🐛 Known Issues

- Integration and Pricing sections are placeholders (can be added later)
- Some advanced animations from original may need fine-tuning
- Marquee effect uses CSS animations (no external library)

## 📞 Support

For questions or issues, please open a GitHub issue.

---

Built with ❤️ using React & Vite
