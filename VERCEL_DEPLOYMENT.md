# 🚀 SafeSpend - Vercel Deployment Guide

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:
- ✅ GitHub repository set up (https://github.com/ankit-tiwari-dev/SafeSpend-Smart-Finance-Tracker)
- ✅ Backend deployed (Railway, Render, or Heroku)
- ✅ Backend URL ready
- ✅ Vercel account (sign up at https://vercel.com)

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Backend First (If Not Done)

**Option A: Railway (Recommended)**
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose "server" directory as root
6. Add environment variables (see below)
7. Deploy and copy the URL

**Option B: Render**
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Set Root Directory: `server`
6. Build Command: `npm install`
7. Start Command: `npm start`
8. Add environment variables
9. Deploy and copy the URL

### Step 2: Prepare for Vercel Deployment

The `vercel.json` configuration file has been created for you with:
- Proper build commands for the client directory
- Output directory configuration
- SPA routing support

### Step 3: Deploy Frontend to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Add New" → "Project"

2. **Import Repository**
   - Click "Import Git Repository"
   - Select: `SafeSpend-Smart-Finance-Tracker`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following:
   
   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://your-backend-url.com/api/v1` |
   
   **Example:**
   - Railway: `https://safespend-backend-production.up.railway.app/api/v1`
   - Render: `https://safespend-api.onrender.com/api/v1`

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://safespend-[random].vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to project root
cd "d:\Finance Management System"

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

**CLI Prompts:**
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **safespend** (or your choice)
- In which directory is your code? **./client**
- Override settings? **N**

### Step 4: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

### Step 5: Update Backend CORS

After deployment, update your backend's `CLIENT_URL` environment variable:

**In Railway/Render:**
```env
CLIENT_URL=https://your-vercel-app.vercel.app
```

**In server.js CORS config (already set up):**
```javascript
cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
})
```

### Step 6: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to "APIs & Services" → "Credentials"
3. Click your OAuth 2.0 Client ID
4. Add to "Authorized redirect URIs":
   ```
   https://your-backend-url.com/api/v1/auth/google/callback
   ```
5. Add to "Authorized JavaScript origins":
   ```
   https://your-vercel-app.vercel.app
   ```
6. Save changes

## 🔧 Environment Variables Reference

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.com/api/v1
```

### Backend (Railway/Render)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/safespend
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SESSION_SECRET=your-session-secret-min-32-characters
CLIENT_URL=https://your-vercel-app.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend-url.com/api/v1/auth/google/callback
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## ✅ Post-Deployment Checklist

### 1. Test Core Features
- [ ] Visit your Vercel URL
- [ ] Test user registration
- [ ] Test login (email/password)
- [ ] Test Google OAuth login
- [ ] Add income transaction
- [ ] Add expense transaction
- [ ] Create budget
- [ ] Create goal
- [ ] Upload profile picture
- [ ] Switch themes (light/dark)
- [ ] Export data to Excel

### 2. Verify API Connection
Open browser console (F12) and check:
- No CORS errors
- API requests going to correct backend URL
- Successful authentication

### 3. Check Performance
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] No console errors

### 4. Mobile Testing
- [ ] Test on mobile browser
- [ ] Check responsive design
- [ ] Verify touch interactions

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
```bash
# Solution: Ensure all dependencies are in package.json
cd client
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

**Error: "Build exceeded maximum duration"**
- Check Vercel plan limits
- Optimize build process
- Remove unused dependencies

### API Connection Issues

**CORS Error**
- Verify `CLIENT_URL` in backend matches Vercel URL
- Check CORS configuration in `server.js`
- Ensure credentials: true in both frontend and backend

**404 on API Calls**
- Verify `VITE_API_URL` includes `/api/v1`
- Check backend is running
- Test backend URL directly in browser

### Google OAuth Not Working

- Verify redirect URIs in Google Cloud Console
- Check `GOOGLE_CALLBACK_URL` environment variable
- Ensure both frontend and backend URLs are authorized

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional)
1. Go to project settings
2. Enable "Analytics"
3. View real-time performance metrics

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user analytics

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel automatically builds and deploys
# Check deployment status in Vercel dashboard
```

## 🎉 Success!

Your SafeSpend application should now be live at:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend-url.com

Share your app and start managing finances! 💎

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check backend logs (Railway/Render)
3. Review browser console for errors
4. Verify all environment variables are set correctly

**Vercel Documentation**: https://vercel.com/docs
**Railway Documentation**: https://docs.railway.app
**Render Documentation**: https://render.com/docs
