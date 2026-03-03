'use client';

import { useState, useEffect } from 'react';
import { connectionsAPI } from '@/lib/api';
import { Connection, CreateConnectionData } from '@/types/connection.types';

export function useConnections(userId: string | null) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await connectionsAPI.getByUserId(userId);
      if (response.success && response.data) {
        setConnections(response.data);
      } else {
        setError(response.error || 'Failed to fetch connections');
      }
    } catch (err) {
      setError('An error occurred while fetching connections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [userId]);

  const createConnection = async (data: CreateConnectionData) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    const response = await connectionsAPI.create(data, userId);
    if (response.success) {
      fetchConnections(); // Refresh connections
    }
    return response;
  };

  const updateConnectionStatus = async (
    id: string, 
    status: 'accepted' | 'rejected'
  ) => {
    const response = await connectionsAPI.updateStatus(id, status);
    if (response.success) {
      fetchConnections(); // Refresh connections
    }
    return response;
  };

  return {
    connections,
    loading,
    error,
    createConnection,
    updateConnectionStatus,
    refetch: fetchConnections,
  };
}