import pool from '../db.js';

export async function createTeam(req, res, next) {
  const { name, pokemon_ids } = req.body;

  if (!pokemon_ids || pokemon_ids.length !== 6) {
    return res.status(400).json({ 
      error: 'A team must have exactly 6 pokemons.' 
    });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Create team
    const teamResult = await client.query(
      'INSERT INTO team (name) VALUES ($1) RETURNING *',
      [name]
    );

    const team = teamResult.rows[0];

    // Add pokemon to team
    for (let i = 0; i < pokemon_ids.length; i++) {
      await client.query(
        'INSERT INTO team_pokemon (team_id, pokemon_id, position) VALUES ($1, $2, $3)',
        [team.id, pokemon_ids[i], i + 1]
      );
    }

    await client.query('COMMIT');

    res.json({
      id: team.id,
      name: team.name
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
}

export async function listTeams(req, res, next) {
  try {
    const teamsResult = await pool.query('SELECT * FROM team');
    const teams = [];

    for (const team of teamsResult.rows) {
      // Get team pokemons with their details
      const pokemonsResult = await pool.query(`
        SELECT 
          p.id,
          p.name,
          p.type,
          p.power,
          p.life,
          tp.position
        FROM team_pokemon tp
        JOIN pokemon p ON tp.pokemon_id = p.id
        WHERE tp.team_id = $1
        ORDER BY tp.position
      `, [team.id]);

      const pokemons = pokemonsResult.rows;
      const totalPower = pokemons.reduce((sum, p) => sum + p.power, 0);

      teams.push({
        id: team.id,
        name: team.name,
        power: totalPower,
        pokemons: pokemons
      });
    }

    // Sort by power descending
    teams.sort((a, b) => b.power - a.power);

    res.json(teams);
  } catch (error) {
    next(error);
  }
}