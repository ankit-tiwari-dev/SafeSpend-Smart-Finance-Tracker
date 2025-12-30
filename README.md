<div align="center">

# 💎 SafeSpend

### Premium Personal Finance Management System

**Institutional-Grade Financial Intelligence Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-00e5ff.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)
[![React](https://img.shields.io/badge/React-19.1.0-00e5ff?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-00ffa3?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-00e5ff?logo=mongodb)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-00ffa3.svg)](CONTRIBUTING.md)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Documentation](#-documentation) • [License](#-license)

</div>

---

## 🎯 Overview

**SafeSpend** is an enterprise-grade personal finance management system built with the MERN stack, featuring a premium dark-mode interface, real-time analytics, and institutional-level security protocols. Designed for individuals who demand precision, clarity, and control over their financial data.

### Why SafeSpend?

- **🏛️ Institutional Aesthetic**: Premium UI/UX with "Studio Premiere" and "The Vault" themes
- **⚡ Real-Time Intelligence**: Live dashboards with dynamic charts and insights
- **🔐 Elite Security**: JWT authentication, bcrypt encryption, OAuth 2.0 integration
- **📊 Advanced Analytics**: Budget tracking, goal management, financial insights
- **🎨 Dual Themes**: Light and dark modes with seamless transitions
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices

---

## ✨ Features

### 💳 Financial Operations

#### **Capital Tracking**
- **Income Management**: Track revenue streams with category-based organization
- **Expense Monitoring**: Real-time expense logging with detailed categorization
- **Transaction History**: Comprehensive ledger with search and filter capabilities
- **Data Export**: Download financial reports in Excel format

#### **Budgetary Rails**
- **Budget Creation**: Set monthly budgets across multiple categories
- **Progress Tracking**: Visual progress bars with status indicators (Safe, Warning, Exceeded)
- **Budget Analytics**: Real-time consumption metrics and alerts
- **Category Management**: Custom categories with emoji icons

#### **Target Acquisition (Goals)**
- **Savings Goals**: Define and track financial objectives
- **Progress Visualization**: Circular progress indicators with percentage tracking
- **Goal Management**: Edit, update, and delete goals with ease
- **Achievement Tracking**: Monitor progress toward financial milestones

### 📈 Intelligence & Insights

#### **Dashboard Command Center**
- **Financial Overview**: Total balance, income, and expense summaries
- **Recent Transactions**: Latest 5 transactions with quick access
- **Visual Analytics**: Interactive bar and line charts
- **Quick Actions**: One-click access to add income/expense

#### **Insights Engine**
- **AI-Driven Analysis**: Intelligent financial pattern recognition
- **Spending Trends**: Category-wise expense breakdowns
- **Budget Health**: Real-time budget vs. actual comparisons
- **Recommendations**: Actionable insights for financial optimization

### 🔐 Security & Authentication

#### **Multi-Protocol Authentication**
- **Email/Password**: Secure registration with bcrypt hashing
- **Google OAuth 2.0**: One-click sign-in with Google
- **JWT Tokens**: Stateless authentication with secure token management
- **Session Management**: Persistent login with refresh token support

#### **Data Protection**
- **Encrypted Storage**: All sensitive data encrypted at rest
- **Secure API**: HTTPS-only communication
- **Input Validation**: Comprehensive server-side validation
- **CORS Protection**: Configured cross-origin resource sharing

### 👤 Identity Matrix (Profile)

- **Profile Management**: Update personal information and bio
- **Avatar Upload**: Cloudinary-powered image storage
- **Account Settings**: Manage security and preferences
- **Data Management**: Clear all transactions or delete account
- **Activity Tracking**: Account creation date and usage statistics

### 🎨 Premium UI/UX

#### **Dual Theme System**
- **Studio Premiere (Light)**: High-contrast institutional theme with Slate primary
- **The Vault (Dark)**: Premium dark mode with Electric Cyan accents
- **Seamless Transitions**: Smooth theme switching with CSS variables
- **Persistent Preferences**: Theme selection saved to localStorage

#### **Design Language**
- **Typography**: Outfit (display) + Inter (body) font pairing
- **Color System**: Semantic color tokens for consistency
- **Glassmorphism**: Modern blur effects and translucent surfaces
- **Micro-Animations**: Subtle hover effects and transitions
- **Responsive Grid**: Tailwind CSS 4.0 with custom breakpoints

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI framework with hooks and context |
| **Vite** | 7.0.4 | Lightning-fast build tool and dev server |
| **Tailwind CSS** | 4.1.11 | Utility-first CSS framework |
| **React Router** | 7.7.1 | Client-side routing and navigation |
| **Recharts** | 3.1.0 | Interactive data visualization |
| **Axios** | 1.11.0 | HTTP client for API requests |
| **React Hot Toast** | 2.5.2 | Elegant toast notifications |
| **React Icons** | 5.5.0 | Icon library (Lucide icons) |
| **Moment.js** | 2.30.1 | Date manipulation and formatting |
| **Emoji Picker React** | 4.13.2 | Emoji selection for categories |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20+ | JavaScript runtime environment |
| **Express** | 5.1.0 | Web application framework |
| **MongoDB** | 8.17.0 | NoSQL database via Mongoose ODM |
| **JWT** | 9.0.2 | JSON Web Token authentication |
| **bcryptjs** | 3.0.2 | Password hashing and encryption |
| **Passport** | 0.6.0 | Authentication middleware |
| **Google OAuth 2.0** | 2.0.0 | Social authentication strategy |
| **Cloudinary** | 1.41.3 | Cloud-based image storage |
| **Multer** | 2.0.2 | File upload middleware |
| **XLSX** | 0.18.5 | Excel file generation |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 17.2.1 | Environment variable management |

### Development Tools

- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting
- **Nodemon**: Auto-restart development server
- **Git**: Version control

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cluster)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/safespend.git
cd safespend
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd ../client
npm install
```

### 3. Environment Configuration

#### Backend `.env` (server/.env)

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/safespend
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/safespend

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Client URL
CLIENT_URL=http://localhost:5173

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Gmail API (for welcome emails - optional)
GMAIL_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GMAIL_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

#### Frontend `.env` (client/.env)

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## 🚀 Production Deployment

### Build for Production

#### Frontend Build
```bash
cd client
npm run build
```

The optimized build will be in `client/dist/`.

#### Backend Production
```bash
cd server
npm start
```

### Environment Variables

Update your production `.env` files with:
- Production MongoDB URI
- Secure JWT secret (use a strong random string)
- Production client URL
- Production Google OAuth credentials
- Production Cloudinary credentials

### Deployment Platforms

**Recommended Platforms:**
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: Railway, Render, Heroku, AWS EC2
- **Database**: MongoDB Atlas

---

## 📚 Documentation

### Project Structure

```
safespend/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, fonts
│   │   ├── components/    # React components
│   │   │   ├── Budgets/
│   │   │   ├── Cards/
│   │   │   ├── Charts/
│   │   │   ├── Dashboard/
│   │   │   ├── Expense/
│   │   │   ├── Goals/
│   │   │   ├── Income/
│   │   │   ├── Inputs/
│   │   │   ├── layouts/
│   │   │   └── Profile/
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── Auth/      # Login, SignUp
│   │   │   └── Dashboard/ # Dashboard pages
│   │   ├── services/      # API service layer
│   │   ├── styles/        # Global styles, themes
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── passport.js
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.js
│   │   ├── budget.controller.js
│   │   ├── expense.controller.js
│   │   ├── goal.controller.js
│   │   ├── income.controller.js
│   │   └── insight.controller.js
│   ├── middleware/       # Express middleware
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── models/          # Mongoose schemas
│   │   ├── Budget.js
│   │   ├── Expense.js
│   │   ├── Goal.js
│   │   ├── Income.js
│   │   └── User.js
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── budget.routes.js
│   │   ├── expense.routes.js
│   │   ├── goal.routes.js
│   │   ├── income.routes.js
│   │   └── insight.routes.js
│   ├── utils/           # Utility functions
│   │   ├── emailTemplates.js
│   │   └── googleMailer.js
│   ├── server.js        # Express app entry
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

### API Documentation

#### Authentication Endpoints

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login with email/password
GET    /api/auth/google            # Initiate Google OAuth
GET    /api/auth/google/callback   # Google OAuth callback
GET    /api/auth/user              # Get current user
PUT    /api/auth/profile           # Update user profile
DELETE /api/auth/account           # Delete user account
```

#### Income Endpoints

```
GET    /api/income                 # Get all income transactions
POST   /api/income                 # Create income transaction
PUT    /api/income/:id             # Update income transaction
DELETE /api/income/:id             # Delete income transaction
DELETE /api/income                 # Delete all income transactions
GET    /api/income/download        # Download income Excel report
```

#### Expense Endpoints

```
GET    /api/expense                # Get all expense transactions
POST   /api/expense                # Create expense transaction
PUT    /api/expense/:id            # Update expense transaction
DELETE /api/expense/:id            # Delete expense transaction
DELETE /api/expense                # Delete all expense transactions
GET    /api/expense/download       # Download expense Excel report
```

#### Budget Endpoints

```
GET    /api/budgets                # Get all budgets
POST   /api/budgets                # Create budget
PUT    /api/budgets/:id            # Update budget
DELETE /api/budgets/:id            # Delete budget
```

#### Goal Endpoints

```
GET    /api/goals                  # Get all goals
POST   /api/goals                  # Create goal
PUT    /api/goals/:id              # Update goal
DELETE /api/goals/:id              # Delete goal
```

#### Insight Endpoints

```
GET    /api/insights               # Get financial insights
```

---

## 🎨 Theme System

SafeSpend features a sophisticated dual-theme system:

### Studio Premiere (Light Theme)
- **Primary**: Slate (#0f172a)
- **Secondary**: Digital Cyan (#00d1ff)
- **Background**: Alabaster (#f8fafc)
- **Surface**: Pure White (#ffffff)

### The Vault (Dark Theme)
- **Primary**: Electric Cyan (#00e5ff)
- **Secondary**: Radiant Emerald (#00ffa3)
- **Background**: True Black (#050505)
- **Surface**: Deep Charcoal (#0f1115)

Themes are implemented using CSS custom properties for instant switching without page reload.

---

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **JWT Secrets**: Use strong, random strings for production
3. **HTTPS**: Always use HTTPS in production
4. **Input Validation**: All user inputs are validated server-side
5. **Password Hashing**: bcrypt with salt rounds for secure password storage
6. **CORS**: Properly configured for your production domain
7. **Rate Limiting**: Consider implementing rate limiting for API endpoints
8. **MongoDB**: Use MongoDB Atlas with IP whitelisting and authentication

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style

- Follow existing code formatting
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 🐛 Known Issues & Roadmap

### Current Limitations

- Email notifications require Gmail API setup (optional feature)
- Mobile app not yet available (web responsive only)
- Multi-currency support not implemented

### Planned Features

- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Budget templates
- [ ] Financial reports (PDF export)
- [ ] Mobile applications (iOS/Android)
- [ ] Two-factor authentication (2FA)
- [ ] Bank account integration
- [ ] Investment tracking
- [ ] Tax calculation assistance

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Copyright Notice

Copyright © 2025 SafeSpend Technologies Inc. All rights reserved.

"SafeSpend" and the SafeSpend logo are trademarks of SafeSpend Technologies Inc.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind Labs** for Tailwind CSS
- **MongoDB** for the database platform
- **Cloudinary** for image hosting
- **Recharts** for beautiful charts
- **Lucide Icons** for the icon set
- **Google** for OAuth 2.0 integration

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/safespend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/safespend/discussions)
- **Email**: support@safespend.app (replace with your email)

---

<div align="center">

**Built with 💎 by SafeSpend Technologies**

⭐ Star this repository if you find it helpful!

[Report Bug](https://github.com/yourusername/safespend/issues) • [Request Feature](https://github.com/yourusername/safespend/issues) • [Documentation](https://github.com/yourusername/safespend/wiki)

</div>
