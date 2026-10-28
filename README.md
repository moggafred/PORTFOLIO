# Mogga Fred Sam - Portfolio Website

A professional, responsive portfolio website showcasing your skills, projects, and experience as a Computer Science student.

## 📁 Project Structure

```
PORTFOLIO/
├── index.html      # Main HTML file with portfolio content
├── styles.css      # CSS styling and responsive design
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## 🎨 Features

- **Responsive Design**: Looks great on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Navigation**: Sticky navigation bar with smooth scrolling
- **Sections**:
  - Hero section with call-to-action button
  - About section with personal description
  - Skills section showcasing your expertise
  - Projects section highlighting your work
  - Contact section with links to connect
  - Footer

## 🚀 How to Use

1. **Open the Portfolio**: Open `index.html` in your web browser
2. **Navigate**: Use the navigation menu to scroll through different sections
3. **View on Mobile**: Test on various devices to see the responsive design

## 🎯 Customization Guide

### Update Your Information

1. **Name and Contact**:
   - Edit the name in the hero section (`index.html` line 35)
   - Update contact email in the contact section (line 189)

2. **Add Social Media Links**:
   - Update GitHub link (line 191)
   - Update LinkedIn link (line 192)

3. **Add Your Projects**:
   - Add public repositories to the `moggafred` GitHub account; they will appear automatically in the projects section, sorted by recent activity.
   - Update the `username` value in `script.js` if you want to show a different GitHub account.
   - To add a live demo link, set the repository's **About → Website** field on GitHub.
   - Forked and archived repositories are not shown. The portfolio loads up to 100 repositories from GitHub's public API, so it needs an internet connection.

4. **Update Skills**:
   - Customize skill cards in the skills section (lines 103-125)

### Change Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main blue */
    --secondary-color: #1e40af;    /* Dark blue */
    --accent-color: #06b6d4;       /* Cyan */
    --text-dark: #1f2937;          /* Dark text */
    --text-light: #6b7280;         /* Light text */
    --bg-light: #f9fafb;           /* Light background */
    --bg-white: #ffffff;           /* White background */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## ✨ Features Included

- ✅ Smooth scrolling navigation
- ✅ Mobile hamburger menu
- ✅ Fade-in animations on scroll
- ✅ Hover effects on cards
- ✅ Professional color scheme
- ✅ Typography optimization
- ✅ Shadow and gradient effects

## 🔧 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- The projects section reads repository names, descriptions, primary languages, creation years, and homepage links from GitHub.
- Consider adding a contact form using services like Formspree or Netlify Forms

## 🎓 Next Steps

1. Replace placeholder content with your actual projects
2. Add your real contact information
3. Deploy to a hosting service (GitHub Pages, Netlify, Vercel, etc.)
4. Add more sections as needed (e.g., Blog, Testimonials, etc.)

---

**Built with ❤️ for your professional presence**
