# ENFRNO 🔥

A sneaker trading marketplace built with Next.js, TypeScript, and Tailwind CSS. Trade kicks with the community!

## Demo Mode (No Supabase Required)

This app runs in **demo mode** by default! All features work without any backend setup:

- ✅ Browse listings with mock data
- ✅ View seller profiles
- ✅ Login/Register (stored locally)
- ✅ Dashboard with demo data
- ✅ Create listings (demo)
- ✅ Trade offers (demo)
- ✅ Messaging (demo)

**Perfect for demos and previews!**

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel

You can deploy immediately without any environment variables:

1. Push to GitHub
2. Connect to Vercel
3. Deploy!

The app will run in demo mode automatically.

## Enable Supabase (Optional)

When you're ready for production, add Supabase:

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Run the Database Schema

Copy the contents of `supabase-schema.sql` and run it in your Supabase SQL Editor.

### 3. Set Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Configure Auth

In Supabase Dashboard:
- Go to Authentication → URL Configuration
- Add your site URL to "Site URL"
- Add callback URL: `https://yourdomain.com/auth/callback`

## Features

### Core Marketplace
- 🏠 Home page with featured listings
- 🔍 Browse & search with filters (brand, size, condition, state)
- 👟 Detailed listing pages
- 👤 Seller profiles with listings

### Trading
- 💰 List items for sale
- 🔄 Trade offer system
- 💬 Direct messaging

### User Features
- 🔐 Authentication (email/password)
- 📊 Dashboard with stats
- 📝 Profile settings
- 📦 Listing management

### Design
- 🌙 Dark theme with flame aesthetic
- 🎨 Orange/red gradient accents
- 📱 Fully responsive
- ⚡ Fast & modern UI

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (optional)
- **Icons**: Lucide React
- **Fonts**: Oswald (headings) + Inter (body)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── browse/         # Browse listings
│   ├── dashboard/      # User dashboard
│   ├── listing/        # Listing details
│   ├── login/          # Auth pages
│   ├── register/
│   ├── seller/         # Seller profiles
│   └── sellers/        # All sellers
├── components/         # React components
├── lib/
│   ├── demo-data.ts    # Mock data for demo mode
│   ├── demo-auth.ts    # Local auth for demo mode
│   └── supabase/       # Supabase clients
└── types/              # TypeScript types
```

## License

MIT
