import express from 'express';
import { listPokemons, updatePokemon } from '../controllers/pokemonController.js';

const router = express.Router();

router.get('/', listPokemons);
router.put('/:pokemon_id', updatePokemon);

export default router;