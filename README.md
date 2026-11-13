# Aparna Sanjay | Portfolio

A responsive, single-page personal portfolio for Aparna Sanjay, Mathematics Teacher. Built with plain HTML, CSS and JavaScript, with no build step or dependencies.

## Features
- Hero, about, experience timeline, education, skills, references and contact sections
- Light and dark theme (remembers your choice)
- Mobile-friendly navigation, scroll animations and animated counters
- Contact form that opens the visitor's email app
- Honours `prefers-reduced-motion`

## Structure
```
index.html   page markup and content
style.css    styles and themes
script.js    interactivity
profile.jpg  (add your photo here, optional)
```

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Add your photo
Place a square-ish photo named `profile.jpg` next to `index.html`. Until then, the page shows the initials "AS".

## Deploy with GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## Editing content
All text lives in `index.html`. Colours are CSS variables at the top of `style.css`.
