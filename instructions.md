# Chat Application Setup Instructions

## Prerequisites

Before setting up the chat application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (v5 or higher)
- **Redis** (v6 or higher)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/chat-app
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here-change-in-production
JWT_REFRESH_EXPIRES_IN=30d

# Client Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Chat App
```

### 4. Start Development Servers

```bash
# Start the frontend (Next.js)
npm run dev

# In a new terminal, start the backend (Express.js)
npm run dev:server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Detailed Setup Instructions

### Database Setup

#### MongoDB

1. **Install MongoDB** (if not already installed):
   - **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service**:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Create database**:
   ```bash
   mongosh
   use chat-app
   ```

#### Redis

1. **Install Redis** (if not already installed):
   - **Windows**: Download from [Redis for Windows](https://github.com/microsoftarchive/redis/releases)
   - **macOS**: `brew install redis`
   - **Linux**: `sudo apt-get install redis-server`

2. **Start Redis service**:
   ```bash
   # Windows
   redis-server
   
   # macOS/Linux
   sudo systemctl start redis
   ```

### External Services Setup

#### Cloudinary (Media Storage)

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard
3. Add to `.env.local`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

#### GIPHY API (GIF Integration)

1. Get a free API key from [GIPHY](https://developers.giphy.com/)
2. Add to `.env.local`:
   ```env
   GIPHY_API_KEY=your-giphy-api-key
   ```

#### OpenAI API (AI Features)

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   ```

#### Email Service (Nodemailer)

1. For Gmail, create an App Password
2. Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

#### Twilio (SMS Notifications)

1. Create a free account at [Twilio](https://www.twilio.com/)
2. Get your credentials from the console
3. Add to `.env.local`:
   ```env
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE_NUMBER=your-twilio-phone-number
   ```

#### Firebase (Push Notifications)

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Download service account key
3. Add to `.env.local`:
   ```env
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   ```

### OAuth Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Add to `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Production
npm run build           # Build frontend
npm run start           # Start production frontend
npm run server:start    # Start production backend

# Testing
npm run test            # Run tests
npm run test:watch      # Run tests in watch mode

# Linting
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
```

### Code Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── lib/                # Utility libraries
├── hooks/              # Custom React hooks
└── utils/              # Helper functions

server/
├── models/             # Database models
├── routes/             # API routes
├── middleware/         # Express middleware
├── services/           # Business logic
└── config/             # Configuration files
```

### Adding New Features

1. **Create TypeScript types** in `src/types/index.ts`
2. **Add state management** in appropriate store files
3. **Create React components** in `src/components/`
4. **Add API endpoints** in `server/routes/`
5. **Create database models** in `server/models/`
6. **Update documentation** in `planning.md`

## Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Writing Tests

- **Component tests**: Use React Testing Library
- **API tests**: Use Jest with supertest
- **E2E tests**: Use Playwright or Cypress

## Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Backend Deployment (Railway/Heroku)

1. **Create account** on Railway or Heroku

2. **Connect repository**:
   ```bash
   # Railway
   railway login
   railway init
   railway up
   
   # Heroku
   heroku create
   git push heroku main
   ```

3. **Set environment variables** in dashboard

4. **Add buildpacks** (if needed):
   ```bash
   heroku buildpacks:add heroku/nodejs
   ```

### Database Deployment

#### MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

#### Redis Cloud

1. Create account at [Redis Cloud](https://redis.com/try-free/)
2. Create database
3. Get connection string
4. Update `REDIS_URL` in environment variables

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

#### MongoDB Connection Issues

```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection
mongosh --eval "db.runCommand('ping')"
```

#### Redis Connection Issues

```bash
# Check Redis status
sudo systemctl status redis

# Start Redis
sudo systemctl start redis

# Test connection
redis-cli ping
```

#### Node Modules Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables

Ensure all required environment variables are set:

```bash
# Check environment variables
node -e "console.log(process.env.NODE_ENV)"
```

### Database Migrations

```bash
# Run migrations
npm run migrate

# Seed database
npm run seed
```

## Performance Optimization

### Frontend

1. **Code splitting**:
   ```javascript
   const LazyComponent = lazy(() => import('./LazyComponent'));
   ```

2. **Image optimization**:
   ```javascript
   import Image from 'next/image';
   ```

3. **Bundle analysis**:
   ```bash
   npm run analyze
   ```

### Backend

1. **Database indexing**:
   ```javascript
   // Add indexes to frequently queried fields
   db.messages.createIndex({ chatId: 1, createdAt: -1 });
   ```

2. **Caching**:
   ```javascript
   // Use Redis for caching
   const cached = await redis.get(key);
   ```

3. **Connection pooling**:
   ```javascript
   // Configure MongoDB connection pool
   mongoose.connect(uri, {
     maxPoolSize: 10,
     serverSelectionTimeoutMS: 5000,
   });
   ```

## Security Best Practices

### Environment Variables

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Rotate secrets regularly

### Input Validation

```javascript
// Validate user input
const { error } = userSchema.validate(req.body);
if (error) return res.status(400).json({ error: error.details[0].message });
```

### Rate Limiting

```javascript
// Implement rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### CORS Configuration

```javascript
// Configure CORS properly
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```

## Monitoring and Logging

### Error Tracking

1. **Set up Sentry**:
   ```javascript
   import * as Sentry from "@sentry/nextjs";
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
   });
   ```

2. **Log errors**:
   ```javascript
   try {
     // Your code
   } catch (error) {
     Sentry.captureException(error);
   }
   ```

### Performance Monitoring

1. **Set up monitoring** with tools like:
   - New Relic
   - DataDog
   - AWS CloudWatch

2. **Monitor key metrics**:
   - Response times
   - Error rates
   - Database performance
   - Memory usage

## Support and Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)

### Community

- [GitHub Issues](https://github.com/your-repo/issues)
- [Discord Server](https://discord.gg/your-server)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/your-app)

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 