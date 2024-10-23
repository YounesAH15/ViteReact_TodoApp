import React from 'react';
import { Trash2, CheckCircle, Circle, Archive } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  archived?: boolean;
  onToggle: (id: string) => void;
  onArchive: (id: string) => void;
  archivedAt?: string;
}

export function TodoItem({ 
  id, 
  text, 
  completed, 
  archived, 
  onToggle, 
  onArchive,
  archivedAt 
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3 flex-1">
        {!archived && (
          <button
            onClick={() => onToggle(id)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            {completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
        )}
        <div className="flex flex-col">
          <span className={`${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {text}
          </span>
          {archivedAt && (
            <span className="text-xs text-gray-400">
              Archived on {new Date(archivedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      {!archived && (
        <button
          onClick={() => onArchive(id)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-all"
          title="Archive todo"
        >
          <Archive className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}