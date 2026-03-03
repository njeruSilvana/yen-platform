export type IdeaCategory = 
  | 'Technology' 
  | 'Agriculture' 
  | 'Healthcare' 
  | 'Education' 
  | 'Finance'
  | 'E-commerce'
  | 'Sustainability';

export interface Idea {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: IdeaCategory;
  fundingGoal: number;
  currentFunding: number;
  likes: number;
  userName?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateIdeaData {
  title: string;
  description: string;
  category: IdeaCategory;
  fundingGoal: number;
}