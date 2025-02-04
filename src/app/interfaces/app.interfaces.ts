export interface User {
  createdAt: string;              // e.g. "2025-01-31 21:55:21.000000"
  updatedAt: string;              // e.g. "2025-01-31 21:55:21.000000"
  deletedAt: string | null;       // Can be NULL if not deleted
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string | null;
  profession: string | null;
  whatsappUser: string | null;
  twitterLink: string | null;
  instagramLink: string | null;
  password: string;
  salt: string;
  role: string;
  resetCode: string | null;
  resetCodeExpiration: string | null;
}


export interface Podcast {
  id: number;
  name: string;
  views: number;
  duration: number;
  topic:string;
  description: string;
  image: string;
  rating: number;
  download_Count: number;
  nbre_episode: number;
  user: Partial<User>;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
}
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

export interface Episode {
  id: number;
  name: string;
  number: number;
  duration: number;
  filepath: string;
  views: number;
  podcast: Podcast;
  coverImage: string;
  numberOfLikes: number;
  numberOfComments: number;
  likes:LikeEpisode[];
  comments:Comment[];
  description :string;
}
export interface LikeEpisode{
  id:number;
  user:Partial<User>;
  episode:Partial<Episode>;
}
export interface LikeComment {
  id:number;
  user:Partial<User>;
  comment:Comment;
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
  likesComment?:Partial<LikeComment>
}

export interface Owner {
  firstName: string;
  photo: string;
  interests: string[];
}

export interface Topic {
  id: number;
  title: string;
  image: string;
  podcastCount: string;
}

export interface Contact{
  fullName:string,
  email:string,
  subject:string,
  content:string
}
