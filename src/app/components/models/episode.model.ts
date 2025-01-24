export interface Podcast {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    id: number;
    name: string;
    views: number;
    duration: string; // Format: "50m"
    description: string;
    image: string; // URL to the podcast's image
    rating: number; // Average rating
    download_Count: number;
    nbre_episode: number; // Total number of episodes
  }
  
  export interface Episode {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    id: number;
    name: string;
    number: number; // Episode number
    duration: number; // Duration in seconds
    filepath: string; // URL to the video/audio file
    views: number; // Number of views
    podcast: Podcast; // Nested podcast object
  }
  