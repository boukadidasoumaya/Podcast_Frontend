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
  views: number;
  duration: string;
  topic:string;
  description: string;
  image: string;
  rating: number;
  download_Count: number;
  nbre_episode: number;
  user: Partial<User>;
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
  description :string;
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

