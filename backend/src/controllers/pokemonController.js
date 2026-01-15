import pool from '../db.js';

export async function listPokemons(req, res, next) {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.power,
        p.life,
        pt.name as type,
        p.image
      FROM pokemon p
      JOIN pokemon_type pt ON p.type = pt.id
      ORDER BY p.name
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function updatePokemon(req, res, next) {
  const { pokemon_id } = req.params;
  const { power, life, type } = req.body;

  try {
    // Get type ID
    const typeResult = await pool.query(
      'SELECT id FROM pokemon_type WHERE name = $1',
      [type]
    );

    if (typeResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const typeId = typeResult.rows[0].id;

    // Update pokemon
    const result = await pool.query(
      `UPDATE pokemon 
       SET power = $1, life = $2, type = $3 
       WHERE id = $4 
       RETURNING *`,
      [power, life, typeId, pokemon_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}