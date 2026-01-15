# Pokemon Battle Arena

A full-stack web application for creating Pokemon teams and simulating battles between them. Built with Angular 21 (frontend) and Node.js/Express (backend).

## Quick Start

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Node dependencies
npm install

# Start development server
npm run dev

# Or production mode
npm start
```

Backend will run on: **http://localhost:8000**

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start development server
npm start
```

Frontend will run on: **http://localhost:4200**

---

## Features

- **List all pokemons** - View pokemon with their stats (power, life, type)
- **Edit pokemon** - Adjust power, life, and type
- **Create teams** - Build teams of exactly 6 pokemons
- **View teams** - See all teams sorted by power with member pokemons
- **Battle simulation** - Simulate round-by-round battles with damage calculations
- **Type weakness system** - Strategic battle outcomes based on type matchups

---

## Project Structure

```
pokemon-battle/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── server.js          # Express app setup
│   │   ├── db.js              # PostgreSQL connection
│   │   ├── routes/            # API route handlers
│   │   ├── controllers/        # Business logic
│   │   └── utils/             # Battle simulator
│   ├── package.json           # Node dependencies
│   └── .env                   # Environment variables
│
└── frontend/                  # Angular application
    ├── src/
    │   ├── app/
    │   │   ├── components/    # UI components
    │   │   ├── services/      # API service
    │   │   └── models/        # TypeScript interfaces
    │   └── main.ts            # Application entry
    └── package.json           # Node dependencies
```

---

## Environment Setup

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://postgres:3QBhCBbQnsMB596g@db.gvrayrpuascufmfclesy.supabase.co:5432/postgres
PORT=8000
```

---

## API Endpoints

### Pokemons
- `GET /pokemons` - List all pokemons
- `PUT /pokemons/:pokemon_id` - Update pokemon stats

### Teams
- `GET /teams` - List all teams sorted by power
- `POST /team` - Create new team (exactly 6 pokemons)

### Battle
- `POST /battle` - Simulate battle between two teams

---

## Battle Algorithm

```
1. Teams fight in order (position 1-6)
2. Each round: both pokemon attack simultaneously
3. Damage = power × type_weakness_factor
4. When pokemon life ≤ 0, next pokemon enters
5. Battle ends when one team has no pokemon left
6. Winner = team with remaining pokemon
```

## Frontend Architecture

### Components
- **PokemonListComponent** - Display all pokemons
- **PokemonEditComponent** - Edit pokemon stats
- **TeamsListComponent** - View teams with members and power
- **TeamCreateComponent** - Create team of 6 pokemons
- **BattleComponent** - Simulate and display battles

### Features
- **State Management** - Angular Signals for reactive state
- **Http Client** - Centralized API service
- **Responsive Design** - Works on desktop and tablet
- **Animations** - Floating pokemon, health bars, battle effects

---

## Technologies

- **Backend**: Node.js, Express.js, PostgreSQL (pg)
- **Frontend**: Angular 21, TypeScript
- **Database**: Supabase

## Database

SQL scripts are located in `/db`

- `schema_team.sql`  
  Creates team and team_pokemon tables

- `functions_team.sql`  
  PostgreSQL functions for inserting teams and listing teams by power (Requirement 5)