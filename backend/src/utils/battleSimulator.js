export function simulateBattle(team1, team2, weaknessMap) {
  const rounds = [];
  let i = 0;
  let j = 0;
  let roundNo = 1;

  // Initialize life for each pokemon
  const team1Life = team1.map(p => p.life);
  const team2Life = team2.map(p => p.life);

  while (i < team1.length && j < team2.length) {
    const p1 = team1[i];
    const p2 = team2[j];

    // Get weakness factors
    const f1 = weaknessMap.get(`${p1.type}-${p2.type}`) || 1.0;
    const f2 = weaknessMap.get(`${p2.type}-${p1.type}`) || 1.0;

    const p1LifeBefore = team1Life[i];
    const p2LifeBefore = team2Life[j];

    // Calculate damage
    team1Life[i] -= p2.power * f2;
    team2Life[j] -= p1.power * f1;

    rounds.push({
      round: roundNo,
      team1: {
        pokemon: p1,
        life_before: p1LifeBefore,
        life_after: Math.max(team1Life[i], 0)
      },
      team2: {
        pokemon: p2,
        life_before: p2LifeBefore,
        life_after: Math.max(team2Life[j], 0)
      }
    });

    // Move to next pokemon if current one is defeated
    if (team1Life[i] <= 0) {
      i++;
    }
    if (team2Life[j] <= 0) {
      j++;
    }

    roundNo++;
  }

  return {
    winner: i < team1.length ? 'team1' : 'team2',
    rounds
  };
}