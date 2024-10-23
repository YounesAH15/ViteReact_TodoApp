import React from 'react';
import { CheckCheck, Archive, ListTodo } from 'lucide-react';
import { TodoStats as TodoStatsType } from '../types';

interface TodoStatsProps {
  stats: TodoStatsType;
  onShowArchived: () => void;
  showingArchived: boolean;
}

export function TodoStats({ stats, onShowArchived, showingArchived }: TodoStatsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm text-gray-600">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-blue-500" />
          <span>{stats.active} active</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCheck className="w-5 h-5 text-green-500" />
          <span>{stats.completed} completed</span>
        </div>
        <div className="flex items-center gap-2">
          <Archive className="w-5 h-5 text-gray-500" />
          <span>{stats.archived} archived</span>
        </div>
      </div>
      <button
        onClick={onShowArchived}
        className="text-sm text-gray-600 hover:text-blue-500 flex items-center gap-2"
      >
        <Archive className="w-4 h-4" />
        {showingArchived ? 'Show Active Todos' : 'Show Archived'}
      </button>
    </div>
  );
}