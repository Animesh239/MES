# Mining Engineering Society (MES) 🏔️⛏️

A comprehensive web platform for the Mining Engineering Society featuring modern design, content management, and administrative capabilities.

## 🌟 Features

### 📖 Publication Management (Minerva)

- **Digital Publications**: Manage PDF publications with cover images
- **Poetry Collection**: Create and manage poems with MDX formatting
- **Article Library**: Publish and organize articles with rich text content
- **MDX Support**: Full MDX rendering with React components for enhanced content

### 👥 Member Management

- **Alumni Network**: Complete alumni directory with profiles and career information
- **Stakeholder Directory**: Industry partners and stakeholder management
- **Photo Integration**: Profile photos for all members with Cloudinary support

### 🎉 Event Management

- **Event Gallery**: Image galleries for past and upcoming events
- **Event Types**: Categorized events (workshops, seminars, conferences)
- **Visual Management**: Rich image support for event documentation

### 🎯 MINARE Integration

- **Gallery Management**: Photo gallery for MINARE events
- **Team Profiles**: Team member management with roles and photos
- **Sponsor Directory**: Sponsor management and display

### 🔐 Admin Dashboard

- **Modern UI**: Glassmorphism design with dark theme
- **Content Management**: Full CRUD operations for all content types
- **MDX Preview**: Real-time MDX rendering in modal views
- **Responsive Design**: Mobile-friendly administrative interface

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Glassmorphism UI** - Modern design with backdrop blur effects

### Backend & Database

- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Primary database
- **Server Actions** - Next.js server-side functions

### Content & Media

- **MDX Support** - Rich content with React components
- **Cloudinary** - Image hosting and optimization
- **Custom Modal System** - Content preview and management

### Authentication

- **Custom Auth** - Secure admin authentication system
- **Session Management** - Persistent login sessions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image hosting)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/swaindhruti/MES.git
   cd mining-engineering-society
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with the following variables:

   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"

   # Authentication
   AUTH_SECRET="your_auth_secret"
   ```

4. **Database Setup**

   ```bash
   npm run db:push
   npm run db:migrate
   ```

5. **Run Development Server**

   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Main Site: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/dashboard`
   - Login: `http://localhost:3000/login`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Main application routes
│   │   ├── dashboard/     # Admin dashboard
│   │   │   ├── poems/     # Poetry management
│   │   │   ├── articles/  # Article management
│   │   │   ├── alumni/    # Alumni management
│   │   │   ├── events/    # Event management
│   │   │   └── ...        # Other admin pages
│   │   ├── login/         # Authentication
│   │   └── ...            # Public pages
│   └── api/               # API routes
├── actions/               # Server actions
│   ├── auth/             # Authentication actions
│   ├── mes/              # MES-related actions
│   │   ├── events/       # Event CRUD
│   │   ├── members/      # Member management
│   │   └── minerva/      # Publication actions
│   │       ├── poems/    # Poetry actions
│   │       └── articles/ # Article actions
│   └── minare/           # MINARE actions
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── db/                  # Database configuration
│   └── schema.ts        # Drizzle schema definitions
├── lib/                 # Utility libraries
└── config/              # Configuration files
```

## 🎨 Design System

### Color Schemes

- **Dashboard**: Black with glassmorphism effects
- **Poems**: Orange gradient theme (`orange-400` to `orange-600`)
- **Articles**: Purple gradient theme (`purple-400` to `purple-600`)
- **Alumni**: Green gradient theme (`green-400` to `green-600`)
- **Events**: Blue gradient theme (`blue-400` to `blue-600`)

### UI Components

- **Glassmorphism Cards**: `backdrop-blur-xl` with `bg-black/40`
- **Gradient Buttons**: Theme-specific gradient backgrounds
- **Modal System**: Full-screen overlays with blur effects
- **Form Elements**: Dark theme with focus states

## 📊 Database Schema

### Core Tables

- **`alumni`** - Alumni member information with photos
- **`stakeholders`** - Industry stakeholder directory
- **`events`** - Event management with image galleries
- **`minerva`** - PDF publication management
- **`poems`** - Poetry content with MDX support
- **`articles`** - Article content with MDX support
- **`users`** - Admin user authentication

### MINARE Tables

- **`gallery`** - MINARE photo gallery
- **`members`** - MINARE team members

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
```

### MDX Content

The platform supports MDX formatting for poems and articles:

- **Headers**: `# ## ###` with gradient styling
- **Text Formatting**: `**bold**` and `*italic*`
- **Code**: `` `inline code` `` with syntax highlighting
- **Blockquotes**: `> quoted text` with colored borders
- **Lists**: `- item` with bullet points

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Ensure database and environment variables are configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Mining Engineering Society**

- Academic institution platform
- Student organization management
- Industry partnership facilitation

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ by the MES Development Team**
