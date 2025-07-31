# Neon Bytes Portfolio 🚀

An interactive personal portfolio website built with Next.js, featuring neon animations, responsive design, and modern web technologies. This portfolio showcases Yeray Alonso Reyes' professional journey from mechanical engineering to software development.

## ✨ Features

### 🎯 Core Features
- **Neon Typewriter Effect**: Eye-catching hero animation that types out the name with neon glow
- **Interactive Timeline**: Chronological display of career milestones with scroll-triggered animations
- **Skills Showcase**: Animated skill bars with proficiency levels and categorization
- **Project Portfolio**: Filterable project gallery with hover effects and technology badges
- **Contact Form**: Functional contact form with validation and social media links
- **Responsive Design**: Fully optimized for all devices from mobile to desktop

### 🎨 Design Features
- **Neon Aesthetic**: Consistent cyber-punk inspired design with glowing effects
- **Dark Theme**: Modern dark color scheme with neon accents
- **Smooth Animations**: Intersection Observer-based animations for optimal performance
- **Mobile-First**: Progressive enhancement from mobile to desktop
- **Accessibility**: WCAG compliant with proper focus states and keyboard navigation

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.1
- **UI Library**: React 18.2.0
- **Styling**: CSS3 with CSS Modules
- **Animations**: CSS3 Keyframes + Intersection Observer API
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── components/           # React components
│   ├── AboutSection.js   # About me with skills
│   ├── ContactForm.js    # Contact form with validation
│   ├── Footer.js         # Site footer
│   ├── Hero.js           # Hero section with typewriter
│   ├── Layout.js         # Main layout wrapper
│   ├── NavBar.js         # Navigation with mobile menu
│   ├── ProjectCard.js    # Individual project cards
│   ├── ProjectsList.js   # Projects grid with filtering
│   ├── Timeline.js       # Career timeline container
│   └── TimelineItem.js   # Individual timeline entries
├── pages/                # Next.js pages
│   ├── api/             # API routes
│   ├── _app.js          # App wrapper
│   └── index.js         # Main homepage
├── styles/              # CSS Modules
│   ├── globals.css      # Global styles and theme
│   └── *.module.css     # Component-specific styles
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yeray-alonso/neon-bytes-portfolio.git
   cd neon-bytes-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Theme Colors
Edit the CSS custom properties in `styles/globals.css`:

```css
:root {
  --neon-primary: #00ffff;    /* Main neon color */
  --neon-secondary: #ff00ff;  /* Secondary neon */
  --neon-accent: #00ff88;     /* Accent color */
  --bg-primary: #0a0a0a;      /* Main background */
  --bg-secondary: #111111;    /* Section backgrounds */
  /* ... */
}
```

### Content Updates
- **Personal Info**: Update components with your information
- **Timeline Events**: Modify the `events` array in `Timeline.js`
- **Projects**: Update the `projects` array in `ProjectsList.js`
- **Skills**: Modify the `skills` array in `AboutSection.js`
- **Social Links**: Update `socialLinks` in `ContactForm.js`

### Adding Images
Place project images in `public/images/` and reference them:
```javascript
image: '/images/project-name-thumb.png'
```

## 📧 Contact Form Setup

The contact form uses a Next.js API route. To enable email functionality:

1. **Update the API route** in `pages/api/contact.js`
2. **Add email service** (Nodemailer, SendGrid, etc.)
3. **Set environment variables** for email credentials

Example with Nodemailer:
```javascript
// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Email sending logic here
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Deploy with zero configuration

### Other Platforms
- **Netlify**: Use `npm run build && npm run export`
- **AWS S3**: Static export for S3 hosting
- **GitHub Pages**: Static export with custom domain

## 🎯 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Minimal dependencies for fast loading
- **Images**: Optimized with Next.js Image component (when images added)

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Experience

- Touch-friendly navigation
- Optimized animations for mobile
- Responsive typography
- Mobile-first CSS approach

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Yeray Alonso Reyes**
- LinkedIn: [Yeray Alonso](https://linkedin.com/in/yeray-alonso)
- GitHub: [yeray-alonso](https://github.com/yeray-alonso)
- Newsletter: [Neon Bytes](https://neon-bytes.vercel.app)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Google Fonts for typography
- The open-source community for inspiration

---

⭐ **If you found this project helpful, please give it a star!** ⭐

*Built with ❤️ and lots of neon* 🌟

# FrontEndBytes Portfolio


This repository contains the source for **Neon Bytes**, an interactive
portfolio built with Next.js. It demonstrates Yeray Alonso Reyes' skills
through animations like a neon typewriter hero, scroll-triggered timeline,
project cards and a simple contact form.

The full product requirements used to build this project are included in
[PRD.md](PRD.md).

This is a simple Next.js portfolio implementing a hero typewriter effect, about section, timeline, projects list and contact form.


## Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
