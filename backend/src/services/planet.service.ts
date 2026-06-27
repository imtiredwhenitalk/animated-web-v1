import { IPlanet, IPlanetSummary } from '../types/planet.types';

// Наша "база даних" поки що в пам'яті
const planets: IPlanet[] = [
  {
    id: 'moon',
    name: 'Moon',
    title: 'Welcome to the',
    description: `The Moon is Earth's silent companion, a pale wanderer in the night sky.
It has no air to breathe, no water to drink — only dust and ancient scars
from a time before memory. Yet it pulls the oceans into restless rhythms
and keeps our world from swaying too far in its cosmic dance.
Though cold and still, it has guided travelers, inspired poets,
and cradled the footsteps of those who dared to visit.
The Moon does not shine by its own light — it borrows from the Sun —
but in its quiet way, it has always been a lantern for Earth.`,
    videoUrl: '/assets/moon_720p.mp4',
    facts: ['Diameter: 2,159 miles', 'Gravity: 1/6 of Earth', 'Tidally locked']
  },
  {
    id: 'earth',
    name: 'Earth',
    title: 'Welcome Home',
    description: `Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.`,
    videoUrl: '/assets/earth2.mp4',
    facts: ['Diameter: 7,926 miles', '70.8% water coverage', 'Only known planet with life']
  }
];

export class PlanetService {
  // Отримати всі планети (тільки id та назву для навігації)
  getAllPlanets(): IPlanetSummary[] {
    return planets.map(({ id, name }) => ({ id, name }));
  }

  // Отримати одну планету по ID
  getPlanetById(id: string): IPlanet | null {
    return planets.find(p => p.id === id) || null;
  }
}