export interface User{
  id :number;
  photo: string;
  username: string;
  role : string;
}
export interface Podcast{
  id:number
}
export interface Episode{
  id:number
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