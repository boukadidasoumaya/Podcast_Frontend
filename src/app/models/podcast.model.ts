export interface Podcast {
    id?: number; 
    name: string;
    topic: string;
    description: string;
    nbre_episode: number;
    image: any;
  }
  
  export interface CreateEpisode {
    id?: number;  
    name: string;
    number: number;
    description: string;
    duration: number;
    filepath: any;
    coverImage: any;
    podcast: Podcast;
  }