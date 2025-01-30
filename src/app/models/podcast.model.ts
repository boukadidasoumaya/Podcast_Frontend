export interface Podcast {
    id?: string; 
    name: string;
    topic: string;
    description: string;
    nbre_episode: number;
    image: any;
  }
  
  export interface Episode {
    id?: string;  
    name: string;
    number: number;
    description: string;
    duration: number;
    filepath: any;
    coverImage: any;
    podcast: Podcast;
  }