# Energy-as-a-Service (EaaS) Frontend

A modern React frontend for the Energy-as-a-Service platform built with Vite, Tailwind CSS, and Recharts.

## Features

- 🔐 User Authentication (Login/Register)
- 📊 Real-time Energy Dashboard with WebSocket
- 📈 Interactive Charts (Line, Area, Bar, Pie)
- 💰 Billing & Invoice Management
- 🎫 Support Ticket System
- ⚡ Smart Meters Management
- 🤖 AI Advisor Chat
- 📋 Services & Plans Selection
- ⚙️ Settings & Profile Management
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 🎨 Modern UI with Tailwind CSS
- ♿ Accessibility Features (ARIA labels, keyboard navigation)

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_WS_URL=ws://localhost:5000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common UI components (Navbar, LoadingSpinner, EmptyState, ErrorMessage, SuccessMessage)
│   ├── subscription/   # Subscription flow components
│   ├── dashboard/      # Dashboard components
│   ├── billing/        # Billing components
│   ├── support/        # Support ticket components
│   ├── alerts/         # Alert components
│   └── notifications/  # Notification components
├── pages/              # Page components
│   ├── design-system/  # Design system documentation pages
│   └── ...             # Feature pages (Dashboard, Billing, Support, etc.)
├── services/           # API service layer
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── config/             # Configuration files (design system, constants)
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages

- `/` - Home/Landing page
- `/login` - User login
- `/register` - User registration
- `/onboarding` - 3-step subscription flow
- `/dashboard` - Real-time energy dashboard
- `/services-plans` - View and select energy plans
- `/subscription` - Manage current subscription
- `/billing` - Bill list and details
- `/support` - Support tickets
- `/meters` - Smart meters management
- `/ai-advisor` - AI-powered energy advisor chat
- `/settings` - Application settings
- `/profile` - User profile and preferences
- `/design-system` - Design system documentation

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_WS_URL` | WebSocket URL | `ws://localhost:5000` |

## Deployment

### Vercel

1. Connect your Git repository
2. Set environment variables in Vercel dashboard
3. Deploy

### Netlify

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables
5. Deploy

## Features in Detail

### Real-time Dashboard
- Live energy metrics updated every 5 seconds via WebSocket
- Interactive charts with multiple view types
- Savings and carbon impact tracking

### Subscription Flow
- 3-step onboarding process
- Plan recommendation based on monthly bill
- Mock payment processing

### Billing
- View all bills
- Detailed bill breakdown
- PDF invoice download
- Payment processing

### Support
- Create and track support tickets
- Real-time ticket updates
- Category-based ticket management

### Smart Meters
- View registered smart meters
- Sync meter data
- Monitor connection status
- Track last sync time

### AI Advisor
- Chat-based energy advisor
- Plan recommendations
- Savings calculations
- Market research assistance

### Services & Plans
- Browse available energy plans
- View current subscription
- Compare plan features
- Subscribe or change plans

### Error Handling
- Consistent error messages across the app
- User-friendly error states
- Empty state components
- Success notifications

## Demo Credentials

Use these credentials to test the app:

- Email: `demo1@eaas.com`
- Password: `Demo@123`

## Troubleshooting

**API connection errors:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`

**WebSocket connection errors:**
- Ensure backend WebSocket server is running
- Check `VITE_WS_URL` in `.env`

**Build errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

## License

ISC

