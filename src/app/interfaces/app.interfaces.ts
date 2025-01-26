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
  id: number;
  name: string;
  description: string;
  image: string;
  views: number;
  duration: string;
  rating: number;
  download_Count: number;
  nbre_episode: number;
  user: User;
}
export interface Episode {
  id: number;
  title: string;
  number: number;
  description: string;
  duration: number;
  coverImage: string;
  views: number;
  numberOfLikes: number;
  numberOfComments: number;
  podcast: Podcast;
  likes:Like;
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
  user: User;
  createdAt: string;
  replies?: Comment[];
}
