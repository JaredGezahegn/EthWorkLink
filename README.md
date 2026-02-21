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

## Tech Stack

- React + TypeScript
- Vite
- React Router
- Tailwind CSS v4
- shadcn/ui components
- localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Test Accounts

### Admin
- Email: `admin@ethioworklink.com`
- Password: `admin123`

### Service Seeker
- Email: `seeker@test.com`
- Password: `seeker123`

### Company
- Email: `company@test.com`
- Password: `company123`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # Global state management
├── pages/            # Page components
│   ├── dashboard/    # Dashboard pages (admin, company, seeker)
│   ├── company/      # Company profile pages
│   ├── services/     # Services listing
│   └── jobs/         # Jobs listing
├── lib/              # Utilities and data
└── hooks/            # Custom React hooks
```

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
