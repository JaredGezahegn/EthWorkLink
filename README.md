# EthioWorkLink

A platform connecting clients with trusted blue-collar workers and service providers in Ethiopia.

## Features

- **Service Seekers**: Browse skilled workers, request services, hire professionals
- **Service Providers**: Showcase completed work, manage requests, post job openings
- **Admin Panel**: Manage users, approve companies, view reports
- **Bilingual**: English and Amharic support

## Service Categories

Focus on blue-collar trades:
- Electrician
- Plumbing
- Construction
- Cleaning
- Welding
- Carpentry
- more blue colar works

## Tech Stack

- React + TypeScript
- Vite
- React Router
- Tailwind CSS v4
- shadcn/ui components
- Firebase Authentication (Google Sign-In)
 

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Firebase account (for Google Sign-In)

### Installation

```bash
# Install dependencies
npm install
```

### Firebase Setup (Required for Google Sign-In)
 

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

For detailed Firebase setup instructions, see [GOOGLE-AUTH-SETUP.md](./GOOGLE-AUTH-SETUP.md)

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # Global state management
├── pages/            # Page components
## Data Persistence

Currently uses browser localStorage for data storage, including:
- User accounts
- Company profiles
- Services and jobs
- Requests and applications

**Note**: For production deployment, consider migrating to Firebase Firestore or another database solution for:
- Cross-device data access
- Better security
- Data backup and recovery
- Scalability

## Authentication

The app supports two authentication methods:

1. **Email/Password**: Traditional registration and login
2. **Google Sign-In**: OAuth authentication via Firebase

Firebase Authentication handles:
- User identity verification
- Secure token management
- Session persistence
- Google OAuth flow

## Environment Variables

Required environment variables (stored in `.env`):

```bash
VITE_FIREBASE_API_KEY          # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN      # Firebase auth domain
VITE_FIREBASE_PROJECT_ID       # Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET   # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID  # Firebase messaging sender ID
VITE_FIREBASE_APP_ID           # Firebase app ID
VITE_FIREBASE_MEASUREMENT_ID   # Firebase measurement ID (optional)
```

**Security Note**: Never commit `.env` file to version control. Use `.env.example` as a template.

## Key Features

### For Service Seekers
- Browse and filter services by category, location, rating
- Request services from providers
- Apply for job openings
- Track application status

### For Companies
- Create portfolio with photos of completed work
- Manage service requests (accept/reject/complete)
- Post job openings
- View and manage job applications

### For Admins
- Approve/reject company registrations
- Manage users and companies
- View system statistics and reports
- Configure system settings

## Data Persistence

All data is stored in browser localStorage, including:
- User accounts
- Company profiles
- Services and jobs
- Requests and applications

## License

MIT
