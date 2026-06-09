# juanmazaragoza.com

Personal portfolio site — built with vanilla HTML/CSS/JS, zero dependencies, zero build step.

## Structure

```
├── index.html          # Single-page app entry point
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Router, project data, interactions
└── images/             # ← Put your downloaded images here
```

## Setup

1. Copy all images from `~/juanmazaragoza-backup/images/` into the `images/` folder here
2. Copy `cv_juan_manuel_zaragoza.pdf` into `images/` as well

```bash
cp ~/juanmazaragoza-backup/images/* images/
cp ~/juanmazaragoza-backup/cv/cv_juan_manuel_zaragoza.pdf images/
```

## Deploy to GitHub Pages

```bash
# 1. Create a new repo on github.com named: juanmazaragoza.com (or any name)

# 2. Init and push
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/juanmzaragoza/juanmazaragoza.com.git
git push -u origin main

# 3. Go to repo Settings → Pages → Source: Deploy from branch → main / root
```

## Custom domain (when ready)

Create a file named `CNAME` in this folder with:
```
juanmazaragoza.com
```

Then configure your domain DNS:
- A record → 185.199.108.153
- A record → 185.199.109.153
- A record → 185.199.110.153
- A record → 185.199.111.153
- CNAME www → juanmzaragoza.github.io

## Local preview

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open http://localhost:8000
