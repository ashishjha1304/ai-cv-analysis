# 🚀 FREE HOSTING GUIDE - Step by Step
**Choose Best Option for Your Project**

---

## OPTION 1: VERCEL (⭐ RECOMMENDED)

### Why Vercel is Best for This Project
✅ Free tier with unlimited deployments  
✅ Automatic HTTPS & global CDN  
✅ Perfect for React applications  
✅ Easy environment variable management  
✅ Zero-downtime deployments  
✅ Supports both frontend & backend (as serverless)

### Step-by-Step Deployment

#### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your repositories

#### Step 2: Deploy Frontend to Vercel

**Method A: Via GitHub (Easiest)**
1. Push your code to GitHub
2. Go to Vercel Dashboard
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Vercel auto-detects React:
   - Build command: `npm run build`
   - Framework: React
   - Output directory: `build`
   - Root directory: `client`
6. Add environment variable:
   - Name: `REACT_APP_API_URL`
   - Value: `http://localhost:5000` (local) or `https://your-api-domain.com` (production)
7. Click "Deploy"
8. Wait 1-2 minutes
9. Get your free URL: `https://your-project-name.vercel.app`

**Method B: Using Vercel CLI**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from client directory
cd client
vercel
```

#### Step 3: Configure Backend API

Since you have a Node.js backend, you have options:

**Option A: Deploy Backend to Render.com (See Option 3 below)**
Then update Vercel environment variable with Render URL.

**Option B: Use Vercel Serverless Functions**
1. Create `api/` folder in client directory
2. Add serverless functions that proxy to your backend
3. Not recommended for your use case (use Render instead)

#### Step 4: Set Environment Variables
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   ```
   REACT_APP_API_URL=https://your-backend-api.onrender.com
   ```
4. Redeploy: Click "Deployments" → Latest → "Redeploy"

#### Step 5: Custom Domain (Optional)
1. Buy domain from Namecheap (~$2.99/year)
2. In Vercel: Settings → Domains
3. Add your domain
4. Follow DNS instructions
5. SSL certificate automatic

**Final URL:** `https://yourdomain.com`

---

## OPTION 2: NETLIFY

### Why Netlify
✅ Very beginner-friendly  
✅ GitHub integration  
✅ Good performance  
⚠️ Build minutes limit (300/month free)

### Step-by-Step

#### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Click "Sign up"
3. Choose "GitHub"
4. Authorize Netlify

#### Step 2: Connect Repository
1. Click "Add new site"
2. Choose "Import an existing project"
3. Select "GitHub"
4. Choose your repository
5. Select branch (main)

#### Step 3: Build Settings
Netlify usually auto-detects React, but configure if needed:
- **Build command:** `cd client && npm run build`
- **Publish directory:** `client/build`
- **Node version:** 18.x (check your package.json)

#### Step 4: Environment Variables
1. Site settings → Build & deploy → Environment
2. Add:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-api.onrender.com`

#### Step 5: Deploy
1. Click "Deploy site"
2. Wait 2-3 minutes
3. Get free URL: `https://your-site.netlify.app`

#### Step 6: Custom Domain
1. Domain settings → Add custom domain
2. Buy domain or point existing domain
3. Update DNS nameservers to Netlify

### Pros & Cons
✅ Simpler UI than Vercel  
✅ Good for beginners  
⚠️ Limited build minutes (might be restrictive)  
⚠️ Slightly slower than Vercel

---

## OPTION 3: DEPLOY BACKEND TO RENDER.COM

### Why Render
✅ Free tier: 750 hours/month (enough for always-on)  
✅ Auto-deploys from Git  
✅ Automatic HTTPS  
✅ Environment variables easy  
✅ Perfect for Node.js backend

### Step-by-Step Backend Deployment

#### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign up"
3. Choose "GitHub"
4. Authorize Render

#### Step 2: Create Web Service
1. Dashboard → "New +"
2. Select "Web Service"
3. Connect your repository
4. Choose repository

#### Step 3: Configure Service
- **Name:** `ai-resume-backend`
- **Runtime:** Node
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Region:** Pick closest to you
- **Plan:** Free

#### Step 4: Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add each:
1. `MONGO_URI` = `your_mongodb_atlas_uri`
2. `GROQ_API_KEY` = `your_groq_key`
3. `PORT` = `5000`
4. `CORS_ORIGIN` = `https://your-vercel-app.vercel.app`
5. `NODE_ENV` = `production`

#### Step 5: Deploy
1. Click "Deploy"
2. Wait 3-5 minutes for initial deployment
3. Get your backend URL: `https://ai-resume-backend.onrender.com`

#### Step 6: Keep Backend Awake (Free Tier)
Render free tier can sleep. Use this to keep it awake:
```bash
# In your client code, add ping every 15 minutes
setInterval(() => {
  fetch('https://ai-resume-backend.onrender.com/api/health')
    .catch(err => console.log('Health check'));
}, 15 * 60 * 1000);
```

Or create `server/routes/health.js`:
```javascript
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});
```

---

## OPTION 4: GITHUB PAGES (FRONTEND ONLY)

### ⚠️ Limitation
❌ Cannot host Node.js backend  
❌ Only for static React builds

### If You Only Need Frontend Hosting

#### Step 1: Update package.json
```json
{
  "name": "ai-resume-analyzer",
  "homepage": "https://yourusername.github.io/ai-resume-analyzer",
  "devDependencies": {
    "gh-pages": "^5.0.0"
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 3: Deploy
```bash
npm run deploy
```

#### Step 4: Access
https://yourusername.github.io/ai-resume-analyzer

### ⚠️ Backend Problem
- Your backend API won't work
- You'd need separate backend hosting

---

## COMPLETE SETUP GUIDE (Full Stack)

### Architecture
```
┌─────────────────────────────┐
│      Your Users             │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
┌────────────┐      ┌────────────┐
│  Vercel    │      │  Render    │
│ (Frontend) │      │ (Backend)  │
│ React App  │      │Node.js API │
│ Free URL:  │      │ Free URL:  │
│ proj.      │      │ proj-      │
│ vercel.app │      │ backend.   │
└────────────┘      │ onrender.  │
      ↕             │ com        │
  (API calls)       └────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   MongoDB    │
                    │    Atlas     │
                    │  (Database)  │
                    └──────────────┘
```

### Step-by-Step Full Setup

1. **Create accounts:**
   - GitHub (free account)
   - Vercel (free account)
   - Render.com (free account)
   - MongoDB Atlas (free account - already done ✅)

2. **Deploy Frontend:**
   - Push code to GitHub
   - Connect to Vercel
   - Get URL: `https://yourapp.vercel.app`

3. **Deploy Backend:**
   - Push code to GitHub (same repo)
   - Connect to Render.com
   - Get URL: `https://yourapp-backend.onrender.com`

4. **Connect Frontend to Backend:**
   - In Vercel settings, add environment variable:
     `REACT_APP_API_URL=https://yourapp-backend.onrender.com`
   - Redeploy

5. **Test:**
   - Visit `https://yourapp.vercel.app`
   - Try uploading a resume
   - Should work end-to-end!

---

## CUSTOM DOMAIN SETUP (Optional)

### Total Cost: $2-10/year

#### Step 1: Buy Domain
Best options for cheap domains:
- **Namecheap.com** - $2.99/year (+ $0.18 ICANN)
- **Domain.com** - $6-8/year
- **Google Domains** - $12/year

Buy a domain like: `aicareer.com`

#### Step 2: Point to Vercel (Frontend)

In Vercel Dashboard:
1. Go to Settings → Domains
2. Add custom domain: `aicareer.com`
3. Copy the nameservers Vercel provides
4. Go to your domain registrar (Namecheap, etc.)
5. Update nameservers to Vercel's

Wait 24-48 hours for DNS to propagate.

#### Step 3: Point Backend to Render (Optional Subdomain)

For backend subdomain `api.aicareer.com`:

1. In Render Dashboard → Web Service → Settings
2. Add custom domain: `api.aicareer.com`
3. You get a CNAME record
4. Add that CNAME in your domain registrar

#### Step 4: Update Frontend

In Vercel environment variables:
- Change `REACT_APP_API_URL` to `https://api.aicareer.com`
- Redeploy

#### Final URLs
- Frontend: `https://aicareer.com`
- Backend: `https://api.aicareer.com`

---

## MONITORING & UPTIME

After deploying, monitor your app:

### Option 1: Uptime Robot (Free)
1. Go to https://uptimerobot.com
2. Sign up free
3. Add monitors for:
   - `https://aicareer.com`
   - `https://api.aicareer.com`
4. Get alerts if site goes down

### Option 2: Vercel Analytics
Automatic in Vercel dashboard

### Option 3: Render Metrics
Check Render dashboard

---

## TROUBLESHOOTING

### "API Connection Fails"
1. Check `REACT_APP_API_URL` in Vercel environment
2. Verify backend is running on Render
3. Check CORS settings in backend
4. Verify MongoDB Atlas IP whitelist

### "Page Doesn't Load"
1. Check build logs in Vercel
2. Verify all dependencies are installed
3. Check for environment variable errors

### "Resume Upload Fails"
1. Check backend logs in Render
2. Verify Groq API key is valid
3. Check MongoDB connection
4. Verify file upload size < 10MB

### "Backend Takes Too Long"
1. Render free tier can be slow
2. Upgrade to paid tier ($7/month)
3. Or use Railway ($5 credit/month free)

---

## RECOMMENDED SETUP (My Recommendation)

### Best Free Setup
```
Frontend: Vercel (Free)
Backend: Render.com (Free)
Database: MongoDB Atlas (Free)
Domain: Namecheap ($2.99/year)

Total First Year: $2.99
Monthly: $0
```

### If You Want Better Performance
```
Frontend: Vercel ($20/month)
Backend: Render.com ($7/month)
Database: MongoDB Atlas (Free)
Domain: Namecheap ($2.99/year)

Total First Year: $336
Monthly: $27
```

---

## FINAL CHECKLIST

Before launching:

Frontend Deployment:
- [ ] All environment variables set
- [ ] Build runs without errors: `npm run build`
- [ ] Deployed to Vercel or Netlify
- [ ] Works on mobile browser
- [ ] Dark mode works

Backend Deployment:
- [ ] All environment variables set
- [ ] Server starts without errors: `npm start`
- [ ] Deployed to Render.com
- [ ] MongoDB connection works
- [ ] Groq API key validated

Integration:
- [ ] Frontend calls backend API correctly
- [ ] API response successful
- [ ] Error handling works
- [ ] Resume upload works end-to-end
- [ ] Candidate verification works

Custom Domain (if applicable):
- [ ] Domain purchased
- [ ] Nameservers updated
- [ ] DNS propagated
- [ ] HTTPS working
- [ ] Both URLs accessible

---

## SUPPORT

**Vercel Help:** https://vercel.com/docs  
**Netlify Help:** https://docs.netlify.com  
**Render Help:** https://render.com/docs  
**MongoDB Help:** https://docs.mongodb.com/  

---

**You're now ready to launch your app for FREE! 🚀**

