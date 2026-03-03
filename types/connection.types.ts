export type ConnectionType = 'mentor' | 'investor' | 'partner';
export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export interface Connection {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: ConnectionType;
  status: ConnectionStatus;
  message?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateConnectionData {
  toUserId: string;
  type: ConnectionType;
  message?: string;
}