# YEN - Youth Entrepreneur Network

A web-based platform connecting young entrepreneurs with investors, mentors, and partners to transform innovative ideas into sustainable businesses.

## 🎨 Design Colors

- **Primary (Trust & Leadership)**: Deep Blue `#0F3D57`
- **Secondary (Growth & Energy)**: Teal `#1ABC9C`
- **Background**: White `#FFFFFF`
- **Text**: Dark Gray `#2C2C2C`
- **Highlight/CTA**: Soft Orange `#F59E0B`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Code Quality**: ESLint
- **Development**: VS Code

## 📁 Project Structure

```
yen-platform/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Registration page
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard
│   ├── ideas/
│   │   └── page.tsx            # Browse ideas
│   ├── pitch/
│   │   └── page.tsx            # Pitch new idea
│   └── mentors/
│       └── page.tsx            # Find mentors/investors
├── server/
│   └── index.ts                 # Express backend
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── .eslintrc.json
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- VS Code (recommended)

### Step 1: Create Project Directory

```bash
mkdir yen-platform
cd yen-platform
```

### Step 2: Initialize Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
# Install all dependencies
npm install next@14 react@18 react-dom@18 express cors bcryptjs jsonwebtoken mongoose

# Install dev dependencies
npm install -D @types/node @types/react @types/express @types/bcryptjs @types/jsonwebtoken @types/cors typescript tailwindcss postcss autoprefixer eslint eslint-config-next tsx
```

### Step 4: Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

### Step 5: Create Project Files

Copy all the provided code files into their respective locations:

1. Copy `package.json` content
2. Copy `tsconfig.json` content
3. Copy `tailwind.config.ts` content
4. Copy `.eslintrc.json` content
5. Create `app/` directory and add all page files
6. Create `server/` directory and add `index.ts`
7. Add `globals.css` to `app/` directory

### Step 6: Create Next.js Config

Create `next.config.js` in the root:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

## 🎯 Running the Application

### Terminal 1 - Backend Server

```bash
npm run server
```

The backend will run on `http://localhost:5000`

### Terminal 2 - Frontend (Next.js)

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📖 Features

### 1. **Home Page** (`/`)
- Hero section with platform introduction
- Statistics showcase
- How it works section
- Call-to-action for early access

### 2. **Registration** (`/register`)
- User signup form
- Role selection (Entrepreneur, Investor, Mentor)
- Form validation
- Password confirmation

### 3. **Login** (`/login`)
- User authentication
- Remember me option
- Redirect to dashboard on success

### 4. **Dashboard** (`/dashboard`)
- Personalized welcome message
- Statistics cards (ideas, connections, likes)
- My ideas overview
- Connections management
- Quick actions menu

### 5. **Ideas Marketplace** (`/ideas`)
- Browse all business ideas
- Filter by category
- Like ideas
- View funding progress
- Connect with idea creators

### 6. **Pitch Idea** (`/pitch`)
- Submit new business ideas
- Category selection
- Funding goal setting
- Rich text description
- Tips for great pitches

### 7. **Find Mentors** (`/mentors`)
- Browse mentors and investors
- Toggle between tabs
- Connect with experts
- View profiles
- Join as mentor/investor CTA

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Ideas
- `GET /api/ideas` - Get all ideas
- `POST /api/ideas` - Create new idea
- `POST /api/ideas/:id/like` - Like an idea
- `POST /api/ideas/:id/fund` - Fund an idea

### Connections
- `GET /api/connections/:userId` - Get user connections
- `POST /api/connections` - Create connection request
- `PATCH /api/connections/:id` - Update connection status

### Users
- `GET /api/mentors` - Get all mentors
- `GET /api/investors` - Get all investors

## 💾 Data Storage

Currently using in-memory storage. For production, implement MongoDB with Mongoose:

1. Install MongoDB
2. Update `server/index.ts` to connect to MongoDB
3. Create Mongoose schemas for User, Idea, and Connection
4. Replace in-memory arrays with database queries

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change theme colors:

```typescript
colors: {
  primary: '#0F3D57',
  secondary: '#1ABC9C',
  highlight: '#F59E0B',
}
```

### Components
All pages are in `app/` directory and can be customized independently.

## 🔐 Security Notes

⚠️ **Important for Production:**

1. **Password Hashing**: Implement bcrypt for password hashing
2. **JWT Tokens**: Add JWT authentication
3. **Environment Variables**: Use `.env` for sensitive data
4. **CORS**: Configure CORS properly for production
5. **Input Validation**: Add proper validation on all inputs
6. **Rate Limiting**: Implement rate limiting on API endpoints

## 📝 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **ESLint**: Run `npm run lint` to check code quality
3. **TypeScript**: All files use TypeScript for type safety
4. **Tailwind**: Use Tailwind utility classes for styling

## 🐛 Troubleshooting

### Backend Connection Error
- Ensure backend server is running on port 5000
- Check if port is available
- Verify fetch URLs in frontend code

### Styling Issues
- Run `npm run dev` again to rebuild Tailwind
- Check `globals.css` is imported in `layout.tsx`
- Clear browser cache

### TypeScript Errors
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration
- Restart VS Code TypeScript server

## 🚀 Next Steps

1. Add MongoDB database integration
2. Implement file upload for business plans
3. Add messaging between users
4. Create admin dashboard
5. Implement payment gateway for funding
6. Add email notifications
7. Build mobile-responsive design improvements
8. Add analytics and reporting

## 📄 License

This project is created for educational purposes.

## 👥 Contributing

This is a project template. Feel free to customize and extend it for your needs!

---

**Built with ❤️ for Young Entrepreneurs**