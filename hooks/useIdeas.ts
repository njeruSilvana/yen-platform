'use client';

import { useState, useEffect, useCallback } from 'react';
import { ideasAPI } from '@/lib/api';
import { Idea } from '@/types/idea.types';

// userId can be:
//   undefined → fetch all ideas (public browse page)
//   null      → don't fetch yet (auth is still loading on dashboard)
//   string    → fetch only this user's ideas (dashboard after auth resolves)
export function useIdeas(userId?: string | null) {
  const [ideas, setIdeas]     = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    // null means "caller isn't ready yet" — don't make any API call
    if (userId === null) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // string userId  → dashboard: fetch only that user's ideas
      // undefined      → public page: fetch all ideas
      const response = userId
        ? await ideasAPI.getByUserId(userId)
        : await ideasAPI.getAll();

      if (response.success && response.data) {
        setIdeas(response.data as Idea[]);
      } else {
        setError(response.error || 'Failed to fetch ideas');
        setIdeas([]);
      }
    } catch {
      setError('An error occurred while fetching ideas');
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]); // fetchIdeas is memoized by userId via useCallback

  const likeIdea = async (id: string) => {
    const response = await ideasAPI.like(id);
    if (response.success) {
      fetchIdeas(); // Refresh to get updated like count
    }
  };

  const fundIdea = async (id: string, amount: number) => {
    const response = await ideasAPI.fund(id, amount);
    if (response.success) {
      fetchIdeas();
    }
    return response;
  };

  return {
    ideas,
    loading,
    error,
    likeIdea,
    fundIdea,
    refetch: fetchIdeas,
  };
}