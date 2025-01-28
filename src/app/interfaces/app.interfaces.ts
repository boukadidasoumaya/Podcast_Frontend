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
  duration: string; // Format: "50m"
  description: string;
  image: string; // URL to the podcast's image
  rating: number; // Average rating
  download_Count: number;
  nbre_episode: number; // Total number of episodes
  user: User;
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
  coverImage: string;
  numberOfLikes: number;
  numberOfComments: number;
  likes:Like;
description :string;
}

export interface Like {
  id:number
}
export interface PodcastId{
  id:number
}
export interface EpisodeId{
  id:number
}
export interface Comment {
  id: number;
  content: string;
  parent?: Comment | null;
  podcast?: PodcastId;
  episode?: EpisodeId;
  user: Partial<User>;
  createdAt: string;
  replies?: Comment[];
  likesCount:number;
  isLiked?:boolean;
}

export interface Owner {
  firstName: string;
  photo: string;
  interests: string[];
}
