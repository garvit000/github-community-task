# Deployment Guide for BlogSpace

## Quick Deploy to Vercel

### Step 1: Prepare Your Repository
1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: BlogSpace application"
```

2. Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - Add all Firebase environment variables from your `.env.local`
6. Click "Deploy"

### Step 3: Configure Firebase for Production
1. In Firebase Console, add your Vercel domain to authorized domains:
   - Go to Authentication > Settings > Authorized domains
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

2. Update Firestore security rules for production:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.authorId;
      allow create: if request.auth != null;
    }
  }
}
```

## Alternative Deployment Options

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy

### Render
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

## Environment Variables Required

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Test creating blog posts
- [ ] Test editing and deleting posts
- [ ] Verify responsive design on mobile
- [ ] Check animations are working
- [ ] Test Firebase security rules
- [ ] Verify environment variables are set correctly

## Troubleshooting

### Common Issues:
1. **Firebase Auth not working**: Check authorized domains
2. **Firestore permission denied**: Verify security rules
3. **Environment variables not loading**: Ensure they're set in deployment platform
4. **Build errors**: Check all dependencies are installed

### Support:
- Check Firebase Console for authentication and database logs
- Check Vercel/Netlify deployment logs
- Verify all environment variables are correctly set
