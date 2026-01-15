import pool from '../db.js';
import { simulateBattle } from '../utils/battleSimulator.js';

async function fetchTeam(teamId) {
  const result = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.type,
      p.power,
      p.life,
      p.image
    FROM team_pokemon tp
    JOIN pokemon p ON tp.pokemon_id = p.id
    WHERE tp.team_id = $1
    ORDER BY tp.position
  `, [teamId]);

  return result.rows;
}

async function fetchWeaknessMap() {
  const result = await pool.query('SELECT type1, type2, factor FROM weakness');
  
  const weaknessMap = new Map();
  for (const row of result.rows) {
    weaknessMap.set(`${row.type1}-${row.type2}`, row.factor);
  }
  
  return weaknessMap;
}

export async function battle(req, res, next) {
  const { team1_id, team2_id } = req.body;

  try {
    const team1 = await fetchTeam(team1_id);
    const team2 = await fetchTeam(team2_id);
    const weaknessMap = await fetchWeaknessMap();

    if (team1.length === 0 || team2.length === 0) {
      return res.status(404).json({ error: 'One or both teams not found' });
    }

    const battleResult = simulateBattle(team1, team2, weaknessMap);
    
    res.json(battleResult);
  } catch (error) {
    next(error);
  }
}