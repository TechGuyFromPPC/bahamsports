// src/lib/demo-data.ts
export const demoTournaments = {
  "basketball-summer-2026": {
    name: "Summer Basketball Cup 2026",
    sport: "basketball",
    teams: ["Shooters", "Pirates", "Dunkers"],
    games: [{ home: "Shooters", away: "Dunkers", date: "June 15" }]
  },
  "pickleball-open-2026": {
    name: "Pickleball Open 2026",
    sport: "pickleball",
    teams: ["Paddle Pros", "Net Ninjas"],
    games: [{ home: "Paddle Pros", away: "Net Ninjas", date: "June 20" }]
  }
};

// src/lib/demo-data.ts

export const players = {
  "juan-dela-cruz": {
    name: "Juan Dela Cruz",
    team: "Bancao-Bancao Shooters",
    number: "10",
    position: "Guard",
    stats: { ppg: 12.5, rpg: 4.2, apg: 3.1 }
  },
  "pedro-penduko": {
    name: "Pedro Penduko",
    team: "San Pedro Pirates",
    number: "23",
    position: "Forward",
    stats: { ppg: 18.2, rpg: 7.5, apg: 1.2 }
  }
};