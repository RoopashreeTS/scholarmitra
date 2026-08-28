<<<<<<< HEAD
# ScholarMitra — AI Scholarship Discovery & Matching Platform

ScholarMitra is a modern, transparent, and explainable scholarship discovery web platform designed for collegiate, technical, and postgraduate students across India.

---

## 🌟 Core Features

- **Explainable Smart Matching Engine**: Multi-factor scoring assessing Course, Domicile State, Academic Score (%/CGPA), Social Category, and Family Income with transparent criteria breakdown (`✓` and `⚠`).
- **Interactive Scholarship Assistant**: Conversational AI guidance for eligibility inquiries, Karnataka SSP rules, and document requirements.
- **Dynamic Explorer & Multi-Filters**: Instant text search, multi-criteria filtering, and sorting (Best Match, Approaching Deadlines, Highest Amount).
- **Comprehensive Details & Official Redirection**: Transparent scheme breakdown with safety confirmation dialog before redirecting to official portals (`scholarships.gov.in`, `ssp.postmatric.karnataka.gov.in`, `aicte-india.org`).
- **Application Readiness Checklist**: Interactive tracker for core documents with `localStorage` persistence.
- **Visual Analytics & Insights**: Category allocations, verified ratio (94.4%), and average award value.

---

## 🚀 Local Development

To run locally using Python:

```bash
# Navigate to project directory
cd scholarmitra

# Start the preview server
python server.py
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🌐 Public Deployment Options

ScholarMitra is a 100% static, client-side application with zero required backend dependencies. It can be deployed in under 2 minutes using any of the following methods:

### Option 1: GitHub Pages (Free & Simple)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial ScholarMitra release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/scholarmitra.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select `Deploy from a branch` and choose `main` / `root`.
4. Your site will be live at `https://<your-username>.github.io/scholarmitra/`.

### Option 2: Vercel (Fastest & Free SSL)
1. Install Vercel CLI (`npm i -g vercel`) or sign in at [vercel.com](https://vercel.com).
2. Run `vercel` in the project root or import the GitHub repository on the Vercel dashboard.
3. Deploy instantly with global edge CDN and automatic HTTPS.

### Option 3: Netlify (Drag & Drop or Git)
1. Log in to [netlify.com](https://www.netlify.com).
2. Drag and drop the `scholarmitra` folder directly into the Netlify dashboard, or connect your GitHub repo.
3. Your site is deployed immediately with a live public URL.

### Option 4: Render / Cloud Server
- Use the included `server.py` with Python environment.
- Render automatically detects `os.environ.get("PORT")` and runs `python server.py`.

---

## 📁 Project Structure

```
scholarmitra/
├── index.html       # Single-page application markup & semantic structure
├── style.css        # Education + AI design system (#8B5CF6 brand & category accents)
├── data.js          # Verified 2026-27 scholarship database & assistant intelligence
├── app.js           # Explainable match calculation, filters, assistant, checklist
├── server.py        # Python local & cloud HTTP server
├── test_build.py    # Automated test and validation script
└── .gitignore       # Git ignore rules
```
=======
# scholarmitra
>>>>>>> 1a9ae19c773b659a03228d273afd4be3918f45d6
