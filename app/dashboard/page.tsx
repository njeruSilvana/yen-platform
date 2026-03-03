'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useIdeas } from '@/hooks/useIdeas';
import { useConnections } from '@/hooks/useConnections';
import EntrepreneurDashboard from '@/components/dashboard/EntrepreneurDashboard';
import MentorDashboard from '@/components/dashboard/MentorDashboard';
import InvestorDashboard from '@/components/dashboard/InvestorDashboard';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { ideas, loading: ideasLoading, likeIdea } = useIdeas(
    authLoading ? null : user?.id
  );
  const { connections, loading: connectionsLoading } = useConnections(user?.id || null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login');
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium tracking-wide">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const sharedProps = {
    user,
    connections,
    connectionsLoading,
  };

  return (
    <>
      <Navbar />
      {user.role === 'entrepreneur' && (
        <EntrepreneurDashboard
          {...sharedProps}
          ideas={ideas}
          ideasLoading={ideasLoading}
        />
      )}
      {user.role === 'mentor' && (
        <MentorDashboard {...sharedProps} />
      )}
      {user.role === 'investor' && (
        <InvestorDashboard {...sharedProps} />
      )}
      <Footer />
    </>
  );
}