//components/ideas/IdeaCard.tsx
import Link from 'next/link';
import { Idea } from '@/types/idea.types';

interface IdeaCardProps {
  idea: Idea;
  onLike?: (id: string) => void;
}

export default function IdeaCard({ idea, onLike }: IdeaCardProps) {
  const fundingPercentage = Math.min((idea.currentFunding / idea.fundingGoal) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full">
          {idea.category}
        </span>
        <button
          onClick={() => onLike?.(idea.id)}
          className="text-red-500 hover:text-red-600 transition"
        >
          ❤️ {idea.likes}
        </button>
      </div>

      <h3 className="text-xl font-bold text-primary mb-2">{idea.title}</h3>
      <p className="text-text text-sm mb-4 line-clamp-3">{idea.description}</p>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-text mb-1">
          <span>Funding Progress</span>
          <span>
            ${idea.currentFunding.toLocaleString()} / ${idea.fundingGoal.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-highlight h-2 rounded-full"
            style={{ width: `${fundingPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-text">by {idea.userName || 'Anonymous'}</span>
        <Link
          href={`/ideas/${idea.id}`}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}