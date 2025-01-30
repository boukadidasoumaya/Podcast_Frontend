export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string | null;
  profession: string | null;
  facebookLink: string | null;
  linkedinLink: string | null;
  instagramLink: string | null;

}

export interface Podcast {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  id: number;
  name: string;
  views: number;
  duration: number; // Format: "50m"
  description: string;
  image: string; // URL to the podcast's image
  rating: number; // Average rating
  download_Count: number;
  nbre_episode: number; // Total number of episodes
  user: User;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
}
