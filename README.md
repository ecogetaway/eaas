# ⚡ Energy-as-a-Service (EaaS) Platform

> A complete full-stack platform for managing solar energy subscriptions, real-time monitoring, billing, and support.

[![Test Coverage](https://img.shields.io/badge/tests-92%25%20passing-green)](./eaas-frontend/TEST-REPORT.md)
[![Backend](https://img.shields.io/badge/backend-Node.js%20Express-blue)](./eaas-backend)
[![Frontend](https://img.shields.io/badge/frontend-React%20Vite-blue)](./eaas-frontend)
[![Database](https://img.shields.io/badge/database-PostgreSQL-blue)](./eaas-backend)

## 🚀 Features

### ✅ Core Features (Complete)
- 🔐 **Authentication System** - JWT-based auth with registration, login, profile management
- 📊 **Real-time Dashboard** - Live energy monitoring with WebSocket updates (5-second intervals)
- 💰 **Subscription Management** - 3-step onboarding with plan selection and payment
- 📄 **Billing & Invoicing** - Automated bill generation with PDF download
- 🎫 **Support Tickets** - Complete ticket management system with comments and attachments
- 🔔 **Notifications & Alerts** - Real-time notifications and system alerts
- 📱 **Mobile Responsive** - Fully responsive design tested across 4 device sizes
- 🧪 **Comprehensive Testing** - 57 E2E test cases with 92% pass rate

### ⚠️ Partial Features
- 🔌 **Smart Meters** - UI ready, backend API pending

## 📁 Project Structure

```
eaas/
├── eaas-backend/          # Node.js + Express API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth, validation, error handling
│   │   └── scripts/      # Database migrations & seeding
│   └── package.json
│
├── eaas-frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── context/      # React context providers
│   │   └── hooks/        # Custom hooks
│   ├── tests/e2e/        # Playwright E2E tests
│   └── package.json
│
└── README.md             # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+ (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **Cache**: Redis 6+
- **Real-time**: Socket.io
- **Authentication**: JWT
- **PDF Generation**: PDFKit

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Icons**: Lucide React

### Testing
- **E2E Framework**: Playwright
- **Test Coverage**: 57 test cases
- **Pass Rate**: 92%

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (optional, for caching)

### Backend Setup

```bash
cd eaas-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb eaas_db

# Run migrations
npm run migrate

# Seed demo data
npm run seed

# Start development server
npm run dev
```

Backend runs on `http://localhost:5001`

### Frontend Setup

```bash
cd eaas-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with backend API URL

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📊 Demo Credentials

```
Email: demo1@eaas.com
Password: Demo@123
```

## 🧪 Running Tests

```bash
cd eaas-frontend

# Install Playwright browsers
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

See [TEST-REPORT.md](./eaas-frontend/TEST-REPORT.md) for detailed test results.

## 📚 Documentation

- [Backend README](./eaas-backend/README.md) - Backend API documentation
- [Frontend README](./eaas-frontend/README.md) - Frontend documentation
- [Test Report](./eaas-frontend/TEST-REPORT.md) - Comprehensive test results
- [Implementation Status](./IMPLEMENTATION-STATUS.md) - Feature completion status
- [Testing Guide](./eaas-frontend/TESTING.md) - How to run tests

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Subscriptions
- `GET /api/subscriptions/plans` - Get all plans
- `GET /api/subscriptions/plans/:planId` - Get plan by ID
- `GET /api/subscriptions/plans/recommend` - Get recommended plan
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions/user/:userId` - Get user subscriptions

### Energy Data
- `GET /api/energy/current/:userId` - Get current energy data
- `GET /api/energy/history/:userId` - Get energy history
- `GET /api/energy/dashboard/:userId` - Get dashboard summary
- `WebSocket: ws://localhost:5001` - Real-time energy updates

### Billing
- `GET /api/bills/user/:userId` - Get user bills
- `GET /api/bills/:billId` - Get bill details
- `GET /api/bills/:billId/invoice` - Download invoice PDF
- `POST /api/bills/:billId/pay` - Process payment

### Support
- `GET /api/tickets/user/:userId` - Get user tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/:ticketId` - Get ticket details
- `POST /api/tickets/:ticketId/comments` - Add comment

### Notifications & Alerts
- `GET /api/notifications/user/:userId` - Get notifications
- `GET /api/notifications/unread-count/:userId` - Get unread count
- `PUT /api/notifications/:notificationId/read` - Mark as read
- `GET /api/alerts/user/:userId` - Get alerts
- `PUT /api/alerts/:alertId/acknowledge` - Acknowledge alert

## 📈 Project Status

**Demo Ready**: ✅ Yes  
**Production Ready**: ⚠️ Needs enhancements

### Completed Features (12/13)
- ✅ Authentication System
- ✅ Dashboard & Real-time Monitoring
- ✅ Subscription Management
- ✅ Billing & Invoicing
- ✅ Support Tickets
- ✅ Notifications & Alerts
- ✅ Profile Management
- ✅ Database & Backend API
- ✅ IoT Data Simulator
- ✅ Testing Suite
- ✅ Mobile Responsive Design

### Partial Features (1/13)
- ⚠️ Smart Meters (UI ready, backend API pending)

See [IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md) for detailed status.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC

## 👥 Team

**EcoGetaway** - Energy-as-a-Service Platform

---

**Repository**: https://github.com/ecogetaway/eaas  
**Last Updated**: December 2024

