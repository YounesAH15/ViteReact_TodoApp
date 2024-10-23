import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onArchive: (id: string) => void;
  archived?: boolean;
}

export function TodoList({ todos, onToggle, onArchive, archived = false }: TodoListProps) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          archived={archived}
          onToggle={onToggle}
          onArchive={onArchive}
          archivedAt={todo.archivedAt}
        />
      ))}
    </div>
  );
}