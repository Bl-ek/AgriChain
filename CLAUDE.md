# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
# Install dependencies
npm install

# Set up Supabase (see below)
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env

# Run development server
npm run dev  # Starts on http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4
- **Backend/Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Routing**: React Router v6
- **State Management**: React Context
- **UI Notifications**: react-hot-toast
- **Blockchain**: Custom SHA-256 implementation in src/utils/blockchain.js

## Architecture Overview

AgriChain is a single-page application (SPA) with client-side routing. The app connects to Supabase for all backend operations.

### Core Flow

1. **Authentication**: Users login via Supabase Auth (email + password). Auth state is managed via `AuthContext` which listens to `supabase.auth.onAuthStateChange()`.
2. **Protected Routes**: All routes except `/login` are wrapped with `ProtectedRoute` which redirects unauthenticated users to login.
3. **Data Operations**: All database operations use Supabase's JavaScript client directly. Realtime subscriptions are set up in the Dashboard component.
4. **Blockchain Tracking**: Every produce registration and dispatch is recorded on a custom blockchain ledger stored in the `blockchain` table.

### Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with logout
│   ├── ProtectedRoute.jsx  # Auth guard for routes
│   └── StatCard.jsx        # Reusable stat card component
├── pages/
│   ├── Login.jsx           # Email/password login form
│   ├── Dashboard.jsx       # Stats, alerts, recent dispatches (Realtime)
│   ├── AddProduce.jsx      # Register new produce with batch #
│   ├── Inventory.jsx       # View all produce with search
│   ├── Dispatch.jsx        # Dispatch produce to destination
│   └── Reports.jsx         # Stock summary, transaction history, blockchain
├── context/
│   └── AuthContext.jsx     # Global auth state
├── utils/
│   └── blockchain.js       # SHA-256 hashing, block creation
├── supabaseClient.js       # Supabase client singleton
├── App.jsx                 # Router setup + provider composition
└── main.jsx               # React root
```

## Database Schema

You must create these tables in Supabase before the app will work:

```sql
-- Produce table
CREATE TABLE produce (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  source TEXT NOT NULL,
  received_by TEXT NOT NULL,
  date_received TIMESTAMPTZ DEFAULT NOW()
);

-- Dispatches table
CREATE TABLE dispatches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_number TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  destination TEXT NOT NULL,
  dispatched_by TEXT NOT NULL,
  date_dispatched TIMESTAMPTZ DEFAULT NOW()
);

-- Blockchain ledger table
CREATE TABLE blockchain (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  block_index INTEGER NOT NULL,
  data TEXT NOT NULL,
  hash TEXT NOT NULL,
  previous_hash TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

**Enable Row Level Security (RLS)** on all tables:
- Policy: `auth.uid() IS NOT NULL` for SELECT, INSERT, UPDATE, DELETE
- This ensures only authenticated users can read/write data

## Key Components

### AuthContext (src/context/AuthContext.jsx)
- Manages user login state
- Provides `signIn(email, password)` and `signOut()` functions
- Syncs with Supabase Auth via `onAuthStateChange`

### Blockchain Utility (src/utils/blockchain.js)
- `addBlock(supabase, data)` — Creates a new block with SHA-256 hash
- Validates chain integrity: each block's `previous_hash` links to prior block's `hash`
- Called whenever produce is registered or dispatched

### Dashboard (src/pages/Dashboard.jsx)
- Uses Supabase Realtime subscriptions to listen for changes to `produce` and `dispatches` tables
- Calculates total stock (SUM) and groups by produce name for low-stock alerts (< 50 kg)
- Shows 5 most recent dispatches

### Reports (src/pages/Reports.jsx)
- **Stock Summary**: Aggregates produce by name
- **Transaction History**: Merges produce registrations and dispatches with color-coded badges
- **Blockchain Ledger**: Displays all blocks with integrity check (green ✓ = chain intact, red ✗ = broken chain)

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these values from your Supabase project settings.

## Styling

The app uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin. No `tailwind.config.js` needed.

- Primary color: `green-600`
- Navbar: `gray-800` background
- Tables: Alternating `bg-gray-50` rows
- Alerts: Red badges for low stock, green for received, red for dispatched

## Common Patterns

### Fetching with error handling
```javascript
const { data, error } = await supabase.from('table_name').select('*')
if (error) throw error
```

### Realtime subscription (see Dashboard)
```javascript
supabase
  .channel('channel-name')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'produce' }, () => {
    // Refresh data
  })
  .subscribe()
```

### Protected route usage
Wrap components in `<ProtectedRoute>` in App.jsx to require authentication.

## Troubleshooting

- **Blank page on login**: Check that Supabase URL and key are correct in `.env`
- **RLS policy errors**: Ensure RLS is enabled on all tables and policies allow `auth.uid() IS NOT NULL`
- **Data not updating**: Verify Realtime is enabled on Supabase for the tables
- **Batch number collision**: Very unlikely due to 8-char hex (16^8 combinations), but batch_number has UNIQUE constraint
