import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pokemonRoutes from './routes/pokemon.js';
import teamRoutes from './routes/team.js';
import battleRoutes from './routes/battle.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

// Routes
app.use('/pokemons', pokemonRoutes);
app.use('/team', teamRoutes);
app.use('/teams', teamRoutes);
app.use('/battle', battleRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pokemon Battle API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});