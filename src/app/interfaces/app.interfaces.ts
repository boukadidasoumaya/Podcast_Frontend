export interface User{
  id :number;
  photo: string;
  username: string;
  role : string;
}

export interface Episode {
  id:string;
  name: string;
  description: string;
  file: File | null; 
}

export interface Podcast {
  id:string;
  name: string;
  topic: string;
  description: string;
  episodesCount: number;
  image: File | null;
  episodes: Episode[];
}


export interface Comment {
  id: number;
  content: string;
  parent?: Comment | null;
  podcast?: Podcast;
  episode?: Episode;
  user: User;
  createdAt: string;
  replies?: Comment[]; 
}

export interface Owner {
  firstName: string;
  photo: string;
  interests: string[];
}