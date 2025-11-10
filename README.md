## 🚀 Introduction

This repository contains my portfolio website built using **React**, **TailwindCSS**, **Vite**, and **Lucide Icons**. It includes dark mode support, responsive animations, deployable project showcases, and more. 

---

## 🖼️ Screenshots

<img width="1796" height="865" alt="image" src="https://github.com/user-attachments/assets/d9c1f29d-8d15-4b42-b08f-6b74e42ad80b" />

---

<img align="center" width="250" height="375" alt="frame (1)" src="https://github.com/user-attachments/assets/02e92d57-8c17-4703-a714-6b98b7305396" />

---

## ⚙️ Tech Stack

- **React** – Component-based UI development
- **Vite** – Lightning-fast build tool
- **TailwindCSS** – Utility-first CSS for styling
- **Lucide Icons** – Clean and beautiful icon pack
- **Radix UI** – Accessible component primitives
- **TypeScript (optional)** – Type safety and tooling
- **GitHub & Vercel** – Deployment

---

## ⚡️ Features

- 🌑 **Light/Dark Mode Toggle**  
  Save theme preference in local storage with smooth transitions

- 💫 **Animated Backgrounds**  
  Stars, meteors, scroll effects, and glowing UI elements

- 📱 **Responsive Navigation**  
  Desktop and mobile menus with glassmorphism

- 👨‍💻 **Hero & About Sections**  
  Showcase who you are with smooth intro animations and buttons

- 📊 **Skills Grid**  
  Filterable progress bars and categories with animated width

- 🖼️ **Projects Showcase**  
  Display screenshots, tech stacks, and GitHub/demo links

- 📩 **Contact Section**  
  Social icons + responsive contact form with toast notifications

- 🚀 **One-Click Deployment**  
  Easily host your site with Vercel and GitHub

- 📝 **Automatic AI Blogging (with github actions)**   
  The site automatically fetches top AI/ML news, generates summaries, and posts them as blog articles. No manual intervention needed.

---

## 🖼️ How to run

- `npm install`
- `npm run dev`
- For contact form: `npm install @emailjs/browser`

---

## ☁️ Deployment

### Deploy on Vercel

1. Push your code to GitHub  
2. Go to [vercel.com](https://vercel.com)  
3. Import your repository  
4. Click **Deploy**  

Your live website will be hosted on a custom subdomain.

---

## 📝 Automatic Blogging

This portfolio supports **automatic AI/ML blogging** using Google Gemini and NewsData.io. Each day (or scheduled time), the system:

- Fetches top AI/ML news articles  
- Generates summarized content using AI  
- Optionally generates a relevant AI image  
- Creates a new blog post in Markdown format  

No manual action is required — everything is automated via **GitHub Actions**.

**Setup (once)**:

```bash
pip install google-generativeai requests
