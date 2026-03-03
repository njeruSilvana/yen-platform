export type UserRole = 'entrepreneur' | 'investor' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  bio?: string;
  location?: string;
  expertise?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}