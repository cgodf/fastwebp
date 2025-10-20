<div align="center">

# 🚀 FastWebP

### Convert WebP to JPG Instantly in Your Browser

**100% Private • No Uploads • Canvas API Powered**

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.fastwebptojpg.com&style=for-the-badge&logo=vercel)](https://www.fastwebptojpg.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[🌐 Live Demo](https://www.fastwebptojpg.com) • [📖 How It Works](https://www.fastwebptojpg.com/how-it-works) • [🐛 Report Bug](https://github.com/cgodf/fastwebp/issues) • [✨ Request Feature](https://github.com/cgodf/fastwebp/issues)

![FastWebP Screenshot](https://via.placeholder.com/800x400/0d9488/ffffff?text=FastWebP+Screenshot+Coming+Soon)
<!-- TODO: Replace with actual screenshot -->

</div>

---

## 📖 Why FastWebP?

Ever tried sharing WebP images with friends on Android or Windows? They can't open WebP files. Most converter websites either:

- ❌ Require uploading your personal photos to their servers
- ❌ Limit file count unless you pay
- ❌ Install bloatware or malware
- ❌ Plaster watermarks on your images
- ❌ Have terrible mobile experience

**FastWebP solves all of these problems.**

### ✨ What Makes It Different

FastWebP converts files **entirely in your browser** using Canvas API. Your photos literally never leave your device. No servers, no uploads, no privacy concerns.

---

## 🎯 Features

### Core Functionality
- 🚀 **Lightning Fast** - Instant conversion using Canvas API
- 🔒 **100% Private** - All processing happens locally in your browser
- 📦 **Batch Conversion** - Convert multiple files at once
- 💾 **ZIP Download** - Download all converted files in a single archive
- 🎨 **High Quality** - Maintains image quality with optimized compression
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices

### Technical Features
- ⚡ Built with Next.js 15 and React 19
- 🎯 Canvas API-powered conversion (native browser implementation)
- 🌓 Light/Dark mode support
- ♿ Accessibility-focused design
- 📊 Anonymous analytics (Google Analytics)
- 💰 AdSense integration ready
- 🔍 SEO optimized

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) with App Router & Turbopack |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Conversion** | Native Canvas API (browser-based) |
| **File Handling** | react-dropzone, JSZip |
| **Analytics** | Google Analytics 4 (optional) |
| **Deployment** | Vercel |
| **Bundle Size** | ~134 KB (optimized) |

---

## ⚡ Quick Start

```bash
git clone https://github.com/cgodf/fastwebp.git
cd fastwebp
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start converting!

---

## 🚀 Full Installation Guide

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/cgodf/fastwebp.git
cd fastwebp

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
fastwebp/
├── app/
│   ├── components/         # React components
│   │   ├── ConversionPipeline.tsx
│   │   ├── FileDropzone.tsx
│   │   ├── FileList.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── services/          # Business logic
│   │   └── webpConverter.ts
│   ├── how-it-works/      # Static pages
│   ├── privacy/
│   ├── terms/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
│   ├── fastwebplogo.svg
│   ├── favicon.ico
│   └── manifest.json
├── types/                 # TypeScript definitions
└── docs/                  # Documentation
```

---

## 🎨 Features in Detail

### Browser-Based Processing
All file conversion happens in your browser using Canvas API. Your files never leave your device, ensuring complete privacy and security.

### Batch Conversion
Convert multiple WebP files simultaneously with real-time progress tracking and error recovery.

### ZIP Download
Download all converted files at once in a convenient ZIP archive.

### Error Recovery
Individual file retry functionality if conversion fails for specific files.

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- WCAG AAA color contrast

---

## 🔐 Privacy & Security

FastWebP is designed with privacy as the top priority:

- ✅ **No file uploads** - All processing happens locally
- ✅ **No server storage** - Files never touch our servers  
- ✅ **No tracking** - Minimal anonymous analytics only
- ✅ **No accounts** - No registration or login required
- ✅ **Open source** - Code is transparent and auditable

See our [Privacy Policy](https://www.fastwebptojpg.com/privacy) for details.

---

## 📝 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (optional)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

### Customization

- **Theme colors:** Edit `app/globals.css`
- **Metadata:** Update `app/layout.tsx`
- **Conversion limits:** Modify `FileDropzone.tsx` constants
- **Ad placements:** Edit `AdPlaceholder.tsx`

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cgodf/fastwebp)

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

FastWebP works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted with Node.js

---

## 📊 Browser Support

FastWebP works on all modern browsers with Canvas API support:

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 57+ | ✅ Fully Supported |
| Firefox | 52+ | ✅ Fully Supported |
| Safari | 11+ | ✅ Fully Supported |
| Edge | 16+ | ✅ Fully Supported |
| Mobile Safari (iOS) | 11+ | ✅ Fully Supported |
| Chrome Mobile | Latest | ✅ Fully Supported |

---

## ⚡ Performance

- **Bundle Size:** 134 KB (gzipped)
- **First Load:** < 2 seconds
- **Conversion Speed:** ~500ms per 5MB file
- **Concurrent Processing:** Up to 10 files
- **Mobile Support:** Full feature parity

---

## 🗺️ Roadmap

- [x] Basic WebP to JPG conversion
- [x] Batch processing
- [x] Dark mode
- [x] Mobile optimization
- [ ] PDF output support
- [ ] PNG output option
- [ ] Quality slider
- [ ] EXIF data preservation
- [ ] Progressive Web App (PWA)
- [ ] Offline mode

**Want to help?** Check out [open issues](https://github.com/cgodf/fastwebp/issues)!

---

## ❓ FAQ

<details>
<summary><b>Is my data really safe?</b></summary>

Yes! All conversion happens in your browser using Canvas API. You can verify this by opening your browser's Network tab - you'll see zero file uploads. The code is open source, so you can audit it yourself.
</details>

<details>
<summary><b>Why is it free?</b></summary>

FastWebP is ad-supported (non-intrusive) and open source. Since processing happens client-side, there are no server costs for conversions.
</details>

<details>
<summary><b>How many files can I convert?</b></summary>

Up to 10 files simultaneously, with a max of 50MB per file and 200MB total batch size.
</details>

<details>
<summary><b>Does it work offline?</b></summary>

After the initial load, FastWebP can work offline since all processing is local. PWA support is on the roadmap for better offline experience.
</details>

<details>
<summary><b>Can I use this commercially?</b></summary>

Yes! The code is MIT licensed. You can fork it, modify it, and use it for commercial purposes.
</details>

---

## 🤝 Contributing

We love contributions! Whether it's bug reports, feature requests, or code contributions, all are welcome.

### Ways to Contribute

- 🐛 [Report bugs](https://github.com/cgodf/fastwebp/issues/new?labels=bug)
- 💡 [Suggest features](https://github.com/cgodf/fastwebp/issues/new?labels=enhancement)
- 📝 Improve documentation
- 🌍 Add translations
- ⭐ Star this repo if you find it useful!

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/fastwebp.git`
3. **Create** a branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and test thoroughly
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Code Standards

- Write TypeScript with strict types
- Follow existing code style (ESLint + Prettier)
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Hosting platform
- [react-dropzone](https://react-dropzone.js.org/) - File upload component
- [JSZip](https://stuk.github.io/jszip/) - ZIP file generation

---

## 🌟 Show Your Support

If FastWebP helped you, please consider:

- ⭐ **Starring** this repository
- 🐦 **Sharing** on [Twitter](https://twitter.com/intent/tweet?text=Check%20out%20FastWebP%20-%20a%20privacy-focused%20WebP%20to%20JPG%20converter!%20https://www.fastwebptojpg.com)
- 📝 **Writing** a review or blog post
- 🤝 **Contributing** to the project

---

## 📬 Contact & Community

- 🌐 **Website:** [www.fastwebptojpg.com](https://www.fastwebptojpg.com)
- 🐛 **Issues:** [GitHub Issues](https://github.com/cgodf/fastwebp/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/cgodf/fastwebp/discussions)
- 📧 **Email:** info@fastwebptojpg.com

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/cgodf/fastwebp?style=social)
![GitHub forks](https://img.shields.io/github/forks/cgodf/fastwebp?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/cgodf/fastwebp?style=social)

---

<div align="center">

**Made with ❤️ for privacy-conscious users**

[Website](https://www.fastwebptojpg.com) • [Twitter](https://twitter.com/fastwebp) • [GitHub](https://github.com/cgodf/fastwebp)

**If you found this useful, please ⭐ star the repo!**

</div>
