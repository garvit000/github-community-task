# BlogSpace - Modern Blog Application

A beautiful, full-stack blog application built with Next.js, Firebase, and stunning animations using GSAP and Three.js.

## Features

- 🔐 **User Authentication** - Sign up and login with Firebase Auth
- ✍️ **CRUD Operations** - Create, read, update, and delete blog posts
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Beautiful Animations** - GSAP and Three.js animations throughout the app
- 🔥 **Firebase Integration** - Real-time data storage with Firestore
- 🌟 **Modern UI** - Glassmorphism design with gradient backgrounds

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion, Three.js
- **Backend**: Firebase (Auth + Firestore)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase config

4. Create environment variables:
```bash
cp .env.example .env.local
```

5. Add your Firebase configuration to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

### Authentication
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Configure any additional settings as needed

### Firestore Database
1. Go to Firebase Console > Firestore Database
2. Create database in production mode
3. Set up security rules:

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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can also be deployed to:
- Netlify
- Render
- Railway
- Any platform that supports Next.js

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── blog/           # Blog page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── AuthForm.tsx    # Authentication form
│   ├── BlogPost.tsx    # Blog post components
│   ├── Layout.tsx      # Main layout
│   └── ThreeBackground.tsx # Three.js background
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
└── lib/               # Utilities and services
    ├── firebase.ts     # Firebase configuration
    └── blogService.ts  # Blog CRUD operations
```

## Features in Detail

### Authentication
- Secure user registration and login
- Protected routes
- User session management
- Display name support

### Blog Management
- Create new blog posts with title and content
- Edit existing posts (only by author)
- Delete posts (only by author)
- View all posts in a responsive grid
- Real-time updates

### UI/UX
- Glassmorphism design
- Smooth animations with GSAP and Framer Motion
- Three.js particle background
- Mobile-responsive layout
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.