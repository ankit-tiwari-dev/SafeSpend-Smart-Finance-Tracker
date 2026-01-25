# 🚀 SafeSpend Production & OAuth Deployment Guide

This guide addresses common issues encountered when moving from local development to a production-grade environment, specifically focusing on Google OAuth 2.0.

## 1. Resolving Google OAuth "Access Blocked" Error

If you see an error saying "Access Blocked: Your app has not been verified", follow these steps:

1.  **Go to Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com)
2.  **Select your project**.
3.  **Navigate to API & Services > OAuth consent screen**.
4.  **Publishing Status**: If it says "Testing", you MUST add your email address to the **Test users** list.
    - Scroll down to the "Test users" section.
    - Click **+ ADD USERS**.
    - Enter the Gmail address you are using to test the application.
5.  **Alternatively**: Click **PUBLISH APP** to move it to production status (this may require a basic verification process if using sensitive scopes).

## 2. Fixing "Redirect URI Mismatch"

This error occurs when the `GOOGLE_CALLBACK_URL` in your `.env` file does not exactly match the one configured in Google Cloud Console.

1.  **In Google Cloud Console**: Go to **APIs & Services > Credentials**.
2.  Click on your **OAuth 2.0 Client ID**.
3.  Under **Authorized redirect URIs**, ensure you have:
    - `http://localhost:5000/api/v1/auth/google/callback` (for local dev)
    - `https://your-production-backend.com/api/v1/auth/google/callback` (for production)
4.  **Sync `.env`**: Make sure your `server/.env` file has the identical URL:
    ```env
    GOOGLE_CALLBACK_URL=https://your-production-backend.com/api/v1/auth/google/callback
    ```

## 3. Production Grade Configuration Checklist

### Environment Variables
Ensure the following are set on your hosting platform (Railway, Render, etc.):
- `NODE_ENV`: Set to `production`.
- `CLIENT_URL`: Your live frontend URL (e.g., `https://safespend-pro.vercel.app`).
- `MONGO_URI`: Use a MongoDB Atlas production cluster URI.
- `GMAIL_REFRESH_TOKEN`: Ensure you've followed the OAuth Playground steps to get a permanent refresh token.

### Security
- **Secure Cookies**: The server is already configured to use `secure: true` in production. Ensure your backend is served over **HTTPS**.
- **CORS**: Ensure your backend CORS configuration allows your production `CLIENT_URL`.

## 4. GitHub Upload
1.  Initialize git: `git init`
2.  Ensure `.gitignore` contains `.env` and `node_modules`.
3.  Add all files: `git add .`
4.  Commit: `git commit -m "chore: initial production-ready commit"`
5.  Push to your GitHub repository.
