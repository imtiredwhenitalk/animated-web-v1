export interface IPlanet {
  id: string;
  name: string;
  title: string;
  description: string;
  videoUrl: string;
  facts: string[];
}

export interface IPlanetSummary {
  id: string;
  name: string;
}