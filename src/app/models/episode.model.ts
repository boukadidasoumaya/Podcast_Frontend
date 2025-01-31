export interface PodcastS {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    id: number;
    name: string;
    views: number;
    topic:string;
    duration: string; // Format: "50m"
    description: string;
    image: any; // URL to the podcast's image
    rating: number; // Average rating
    download_Count: number;
    nbre_episode: number;
    // Total number of episodes
  }

  export interface EpisodeS {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    id: number;
    name: string;
    number: number; // Episode number
    description:string;
    duration: number; // Duration in seconds
    filepath: any;
    coverImage:any; // URL to the video/audio file
    views: number; // Number of views
    podcast: PodcastS; // Nested podcast object
  }
