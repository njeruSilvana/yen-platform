const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// ── Generic fetch wrapper ─────────────────────────────────────────────────────
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    console.log('🔵 Calling API:', `${API_URL}${endpoint}`);

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log('🟢 Response status:', response.status);

    const data = await response.json();

    if (!response.ok) {
      console.error('🔴 API Error:', data);
      return { success: false, error: data.error || 'An error occurred' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('🔴 Network Error:', error);
    return { success: false, error: 'Network error. Please check your connection.' };
  }
}

// ── Normalizer helpers ────────────────────────────────────────────────────────
// MongoDB returns _id. Our frontend types use 'id'. These helpers make sure
// every object that comes from the API has 'id' set, regardless of what the
// backend sends. This is the single place where that translation happens.

function normalizeIdea(idea: any) {
  return {
    ...idea,
    // Use _id if id isn't already set (raw MongoDB docs use _id)
    id:       idea.id       || idea._id?.toString(),
    // userId is populated by Mongoose — extract the name for display
    userName: idea.userId?.name || idea.userName || 'Anonymous',
    // Ensure numeric fields always have a safe default
    likes:          idea.likes          ?? 0,
    currentFunding: idea.currentFunding ?? 0,
    fundingGoal:    idea.fundingGoal    ?? 0,
  };
}

function normalizeUser(user: any) {
  return {
    ...user,
    id: user.id || user._id?.toString(),
  };
}

// ── AUTH API ──────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data: any) =>
    fetchAPI<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (credentials: any) =>
    fetchAPI<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// ── IDEAS API ─────────────────────────────────────────────────────────────────
export const ideasAPI = {
  // Used by the public /ideas browse page — returns ALL active ideas
  getAll: async () => {
    const result = await fetchAPI<any[]>('/ideas');
    if (result.success && result.data) {
      // Backend returns a plain array — normalize each item
      const normalized = (Array.isArray(result.data) ? result.data : []).map(normalizeIdea);
      return { success: true, data: normalized };
    }
    return result;
  },

  // Used by the dashboard — returns ONLY this user's ideas
  // Calls GET /api/ideas/user/:userId which the backend filters by userId
  getByUserId: async (userId: string) => {
    const result = await fetchAPI<any[]>(`/ideas/user/${userId}`);
    if (result.success && result.data) {
      const normalized = (Array.isArray(result.data) ? result.data : []).map(normalizeIdea);
      return { success: true, data: normalized };
    }
    return result;
  },

  getById: (id: string) => fetchAPI<any>(`/ideas/${id}`),

  create: (data: any, userId: string) =>
    fetchAPI<any>('/ideas', {
      method: 'POST',
      body: JSON.stringify({ ...data, userId }),
    }),

  // FIX: was 'POST' — backend controller uses PUT for likes
  like: (id: string) => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const user    = userStr ? JSON.parse(userStr) : null;
    return fetchAPI<any>(`/ideas/${id}/like`, {
      method: 'PUT',                              // ← was POST, must be PUT
      body: JSON.stringify({ userId: user?.id }),
    });
  },

  fund: (id: string, amount: number) =>
    fetchAPI<any>(`/ideas/${id}/fund`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),
};

// ── CONNECTIONS API ───────────────────────────────────────────────────────────
export const connectionsAPI = {
  getByUserId: (userId: string) =>
    fetchAPI<any[]>(`/connections/${userId}`),

  create: (data: any, fromUserId: string) =>
    fetchAPI<any>('/connections', {
      method: 'POST',
      body: JSON.stringify({ ...data, fromUserId }),
    }),

  updateStatus: (id: string, status: 'accepted' | 'rejected') =>
    fetchAPI<any>(`/connections/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ── USERS API ─────────────────────────────────────────────────────────────────
export const usersAPI = {
  // These call /api/users/mentors and /api/users/investors
  // which are now properly registered in users.routes.js
  getMentors: async () => {
    const result = await fetchAPI<any[]>('/users/mentors');
    if (result.success && result.data) {
      return { success: true, data: result.data.map(normalizeUser) };
    }
    return result;
  },

  getInvestors: async () => {
    const result = await fetchAPI<any[]>('/users/investors');
    if (result.success && result.data) {
      return { success: true, data: result.data.map(normalizeUser) };
    }
    return result;
  },

  getById: (id: string) => fetchAPI<any>(`/users/${id}`),
};