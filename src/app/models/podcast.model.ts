export interface CreatePodcast {
    id?: number; 
    name: string;
    topic: string;
    description: string;
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
    podcast: CreatePodcast;
  }