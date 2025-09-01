# 📄 CV Converter — Resume Editor & PDF Exporter on Nuxt 3

**CV Converter** is a modern web-based application that allows users to create, edit, and export professional resumes (CVs) with live preview and full control over content. Built using Nuxt 3, TypeScript, and Tailwind CSS, it offers a smooth editing experience and supports dynamic content sections, undo/redo history, and PDF export with preserved styling.

**Features include:**

- Real-time resume editing — instantly see your changes reflected in a live preview.
- Multiple editable sections — including profile, skills, education, experience, languages, and awards.
- Dynamic sections — easily add, remove, and update items within each section.
- Undo/Redo support — step through your editing history without losing progress.
- PDF export — download a print-ready, styled resume as a PDF.
- Responsive design — works on both desktop and mobile devices.
- Multilingual support — structured for future integration of multiple languages.

**Tech Stack:**

- Framework: Nuxt 3 (Vue 3, Composition API)
- Language: TypeScript
- Styling: Tailwind CSS
- PDF Export: html2pdf.js, html2canvas
- State & History: Reactive refs + useSessionStorage (VueUse)
- Editor Logic: Composition API & custom composables

**Getting Started:**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cv-converter.git
   cd cv-converter

2. Install dependencies:
    ```bash
   npm install

3. Run the development server:
    ```bash
   npm run dev
4. Open your browser and navigate to:
     ```bash
   http://localhost:3000
5. To build the app for production:
    ```bash
   npm run build
6. To preview the production build locally:
    ```bash
    npm run preview

****
**Project Structure Overview:**

    components/
    ├── ResumeEditor.vue          # Main editor interface
    ├── ResumeWrapper.vue         # Template wrapper
    ├── History.vue               # Undo/redo logic
    ├── DownloadPdf.vue           # PDF export functionality
    ├── editor/                   # Dynamic input fields
    
    composables/
    ├── useHistoryFunctions.ts    # History tracking
    ├── useEditor.ts              # Editor state logic
    
    assets/
    ├── css/                      # Tailwind styles
    ├── images/                   # Profile and template assets
    
    pages/
    ├── index.vue                 # Main editing page
    
    types/
    ├── index.ts                  # Shared interfaces and types


**Author:**

    Created by [Your Name]
    GitHub: https://github.com/yourusername
    Email: [your@email.com]

**License:**

    MIT — free to use, modify, and distribute.

